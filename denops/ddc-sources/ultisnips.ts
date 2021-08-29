import {
  BaseSource,
  Candidate,
} from "https://deno.land/x/ddc_vim@v0.4.1/types.ts#^";
import { Denops, vars } from "https://deno.land/x/ddc_vim@v0.4.1/deps.ts#^";

export class Source extends BaseSource {
  async gatherCandidates(args: {
    denops: Denops;
  }): Promise<Candidate[]> {
    if (await vars.g.get(args.denops, "did_plugin_ultisnips") == null) {
      return [];
    }

    const snippets = await args.denops.call(
      "UltiSnips#SnippetsInCurrentScope",
    ) as {
      [trigger: string]: string;
    };
    return Object.keys(snippets).map((trigger) => ({
      word: trigger,
      menu: snippets[trigger],
    }));
  }
}
