import {
  BaseSource,
  Candidate,
} from "https://deno.land/x/ddc_vim@v0.14.0/types.ts#^";
import { Denops, vars } from "https://deno.land/x/ddc_vim@v0.14.0/deps.ts#^";

export type Snippets = {
  [word: string]: {
    location: string;
    description: string;
  };
};

export class Source extends BaseSource {
  async gatherCandidates(args: {
    denops: Denops;
  }): Promise<Candidate[]> {
    if (await vars.g.get(args.denops, "did_plugin_ultisnips") == null) {
      return [];
    }

    const snippets = await args.denops.call(
      "UltiSnips#SnippetsInCurrentScope",
      1,
    ) as {
      [trigger: string]: string;
    };
    const info = await vars.g.get(
      args.denops,
      "current_ulti_dict_info",
    ) as Snippets;
    return Object.keys(snippets).map((trigger) => ({
      word: trigger,
      menu: snippets[trigger],
      user_data: JSON.stringify({ "ultisnips": info[trigger] }),
    }));
  }
}
