import {
  BaseSource,
  Candidate,
  Context,
  DdcOptions,
  SourceOptions,
} from "https://deno.land/x/ddc_vim@v0.1.0/types.ts";
import { Denops, vars } from "https://deno.land/x/ddc_vim@v0.1.0/deps.ts";

export class Source extends BaseSource {
  async gatherCandidates(
    denops: Denops,
    _context: Context,
    _ddcOptions: DdcOptions,
    _options: SourceOptions,
    _params: Record<string, unknown>,
  ): Promise<Candidate[]> {
    if (await vars.g.get(denops, "did_plugin_ultisnips") == null) {
      return [];
    }

    const snippets = await denops.call("UltiSnips#SnippetsInCurrentScope") as {
      [trigger: string]: string;
    };
    return Object.keys(snippets).map((trigger) => ({
      word: trigger,
      menu: snippets[trigger],
    }));
  }
}
