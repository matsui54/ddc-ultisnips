import { BaseSource, Item } from "https://deno.land/x/ddc_vim@v4.3.1/types.ts";
import { Denops, vars } from "https://deno.land/x/ddc_vim@v4.3.1/deps.ts";
import { OnCompleteDoneArguments } from "https://deno.land/x/ddc_vim@v4.3.1/base/source.ts";
import { feedkeys } from "https://deno.land/x/denops_std@v5.0.1/function/mod.ts";

export type Snippets = {
  [word: string]: {
    location: string;
    description: string;
  };
};

export type Params = {
  expandSnippets: boolean;
};

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
      user_data: {
        ultisnips: info[trigger],
      },
    }));
  }

  override async onCompleteDone({
    denops,
    sourceParams,
  }: OnCompleteDoneArguments<Params, unknown>): Promise<void> {
    if (!sourceParams.expandSnippets) {
      return;
    }
    const keys = await denops.call("UltiSnips#ExpandSnippet");
    await feedkeys(denops, keys, "nit");
  }

  params(): Params {
    return {
      expandSnippets: false,
    };
  }
}
