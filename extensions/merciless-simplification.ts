import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";
import { readFile } from "node:fs/promises";
import { basename, isAbsolute, resolve } from "node:path";

/**
 * Merciless Simplification — micro extension.
 *
 * - /merciless-simplify command for humans, merciless_simplify tool for the LLM
 * - Tidy First auto-invocation: a standing system-prompt guideline (before_agent_start)
 *   plus a non-blocking notify nudge when editing large files (tool_call)
 */

const COMPLEX_LINE_THRESHOLD = Number(
  process.env.MERCILESS_SIMPLIFY_COMPLEX_LINES ?? 300,
);

const TIDY_FIRST_GUIDELINE =
  "Tidy First (Kent Beck): before making a change, make the change easy (this might be hard), then make the easy change. " +
  "If the code you're about to modify is complex, tangled, or risky to change, invoke the merciless_simplify tool first.";

export default function (pi: ExtensionAPI) {
  const nudged = new Set<string>();

  pi.on("session_start", () => nudged.clear());

  // Layer 1 — standing guideline so the model self-triggers before hard changes.
  pi.on("before_agent_start", (event) => ({
    systemPrompt: `${event.systemPrompt}\n\n${TIDY_FIRST_GUIDELINE}`,
  }));

  // Layer 2 — subtle, non-blocking nudge when editing/writing a complex file.
  pi.on("tool_call", async (event, ctx) => {
    if (event.toolName !== "edit" && event.toolName !== "write") return;
    const p = event.input?.path as string | undefined;
    if (!p) return;
    const abs = isAbsolute(p) ? p : resolve(ctx.cwd, p);
    const key = `${ctx.cwd}:${abs}`;
    if (nudged.has(key)) return;
    const lines = await countLines(abs);
    if (lines === null || lines < COMPLEX_LINE_THRESHOLD) return;
    nudged.add(key);
    ctx.ui.notify(
      `⚠️ ${basename(abs)} is ${lines} lines — Tidy First: consider /merciless-simplify ${abs} before changing it`,
      "info",
    );
  });

  pi.registerCommand("merciless-simplify", {
    description:
      "Run merciless simplification: analyze code smells, propose micro-tickets, get approval, execute",
    handler: async (args, ctx) => {
      const scope = args.trim() || "the codebase";
      const ok = await ctx.ui.confirm(
        "Merciless Simplification",
        `Analyze ${scope}, generate micro-tickets, and present them for approval before executing?`,
      );
      if (!ok) return;
      dispatch(pi, args.trim());
    },
  });

  pi.registerTool({
    name: "merciless_simplify",
    label: "Merciless Simplify",
    description:
      "Use BEFORE changing code when the change would be hard — tangled dependencies, duplication, unclear abstractions, large methods, or risky edits in unfamiliar modules — or when the change itself is non-trivial: large, touching many modules, or spanning complex areas. Tidy First (Kent Beck): 'Make the change easy (this might be hard), then make the easy change.' Call this to tidy the change-site first via micro-tickets (with human approval), so the actual change becomes small and safe.",
    parameters: Type.Object({
      targets: Type.Optional(
        Type.Array(
          Type.String({
            description: "Files or directories to simplify; defaults to the whole codebase",
          }),
        ),
      ),
    }),
    async execute(_toolCallId, params, _signal, _onUpdate, _ctx) {
      const targets = (params.targets ?? []).join(" ");
      dispatch(pi, targets);
      return {
        content: [
          {
            type: "text",
            text: "Queued merciless simplification as a follow-up. It will analyze the code, propose micro-tickets, and ask for approval before changing anything.",
          },
        ],
        details: {},
      };
    },
  });
}

async function countLines(path: string): Promise<number | null> {
  try {
    const content = await readFile(path, "utf8");
    return content.split("\n").length;
  } catch {
    return null; // missing file, binary, or unreadable
  }
}

function dispatch(pi: ExtensionAPI, args: string) {
  const message = `/skill:merciless-simplification ${args}`.trim();
  void pi.sendUserMessage(message, { deliverAs: "followUp" });
}
