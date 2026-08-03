import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";

/**
 * Merciless Simplification — micro extension.
 *
 * Thin shim over the merciless-simplification skill: a /merciless-simplify
 * command for humans and a merciless_simplify tool for the LLM. Both dispatch
 * the skill, which runs the methodology (analyze -> propose micro-tickets ->
 * human approval -> execute).
 */
export default function (pi: ExtensionAPI) {
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
      "Run the merciless simplification methodology (micro-tickets, risk-calibrated safety nets, human approval) on the codebase or given targets. Use when code complexity accumulates, duplication or dead abstractions appear, or after substantial feature work.",
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

function dispatch(pi: ExtensionAPI, args: string) {
  const message = `/skill:merciless-simplification ${args}`.trim();
  void pi.sendUserMessage(message, { deliverAs: "followUp" });
}
