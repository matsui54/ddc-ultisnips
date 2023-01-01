import { BaseSource, Item } from "https://deno.land/x/ddc_vim@v3.4.0/types.ts";
import { Denops, vars } from "https://deno.land/x/ddc_vim@v3.4.0/deps.ts";

export type Snippets = {
  [word: string]: {
    location: string;
    description: string;
  };
};

type Params = Record<never, never>;

export class Source extends BaseSource<Params> {
  async gather(args: {
    denops: Denops;
  }): Promise<Item[]> {
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
  params(): Params {
    return {};
  }
}
