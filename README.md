# ddc-ultisnips

ultisnips source for ddc.vim

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### ddc.vim

https://github.com/Shougo/ddc.vim

### ultisnips

https://github.com/SirVer/ultisnips

## Configuration examples

```vim
call ddc#custom#patch_global('sources', ['ultisnips'])
call ddc#custom#patch_global('sourceOptions', {
      \ '_': {'matchers': ['matcher_head']},
      \ 'ultisnips': {'mark': 'US'},
      \ })
```

## Original version

https://github.com/SirVer/ultisnips/blob/master/rplugin/python3/deoplete/sources/ultisnips.py
