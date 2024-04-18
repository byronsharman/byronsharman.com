![screenshot of Vim's opening screen](vim_screenshot.png)

One of the things I like about Vim is that each Vim user I know has their own distinct style. Some have installed hundreds of plugins, committing to memory the keybindings of each. Some use insert mode the whole time and pretend they're in an ordinary text editor. Some know all the cool Visual mode commands like `gCtrl-A`. Some [read the entire manual out loud recreationally](https://youtu.be/rT-fbLFOCy0). And I like using Ex commands.

For those that don't know, an Ex command is a command starting with `:`, like `:w` or `:qa`. They're inherited from the [historic editor](https://en.wikipedia.org/wiki/Ex_(text_editor)) that Vi replaced. If you have some time to kill, you can see all of them with [`:h holy-grail`](https://neovim.io/doc/user/vimindex.html#holy-grail). They're like a command line for Vim. In fact, you've probably already heard them referred to as Command-line mode.

## `:t` and `:m`

Some of my favorite Ex commands, aside from the universal ones, are `:copy` and `:move`, or their short forms `:t` and `:m`, which, when given a range and an address, copy or move the range to the line after the address. If you aren't familiar with ranges, take a moment to read [`:h :range`](https://neovim.io/doc/user/cmdline.html#%3Arange), which explains them better than I can.

`:t` is useful for single-use operations, where it is often less cumbersome than switching to Visual mode, selecting the lines you want to copy, yanking, and putting. Need to duplicate the previous two lines and the current line? Just do `:-2,t.`. Way smoother than `V2ky2jp`.

`:m` provides functionality lacking in most text editors today. Did you paste a line one line too low or too high? `:m+1` or `:m-2`. So much more satisfying than deleting and putting. Cut and paste as a workaround for moving is a sad UX clunkiness that society has grown complacent about. When in the same buffer, it doesn't make sense to delete and recreate when you just want to move. You're doing two actions in order to accomplish one. Switching from `yy` and `p` to `:m` is like switching from smashing `Backspace` in the terminal to pressing `Ctrl-U`. It's just a little more satisfying.

Also, remember marks? That feature that you never use because you don't understand why it'd be useful? Well, they're very handy when it comes to specifying ranges. Say your cursor is near the bottom of the screen, and there are some lines near the top that you want to copy to your current position. They're far away, so it's unwieldy to find the relative numbers and type `:-17,-14t.`. Instead, you want to select those lines with your mouse. So you mark the current line with `ma` and select the target lines graphically. This updates the `'<` and `'>` marks to reflect the start and end of the selection, respectively, and when you type `:` in Visual mode, the corresponding range `'<,'>` is automatically inserted. Now, type `:t'a` and your selection magically appears exactly where you wanted. Isn't that so much more natural than making a mouse selection, pressing `V` to make sure you've got everything, yanking it, then pressing `Ctrl-O` and ascertaining whether to choose `p` or `P`? Even better, if the starting line was the line you had edited most recently, you could have used the built-in mark `'.` that records the position of the last modification, skipping the `ma` step!

<small>**Note:** If you accidentally exit Visual mode before entering Command-line mode, you can use `*` as a shorthand for `'<,'>`. See [`:h :star`](https://neovim.io/doc/user/cmdline.html#%3Astar).</small>

At this point, you might be unconvinced. You've spent the last few minutes inventing counterexamples to the greatness of Ex commands. I concede that Ex commands are not universally superior; rather, they are preferable often enough to deserve incorporation into your Vim style. Besides, you can feel smug satisfaction in transcending the copy and paste metaphor, knowing that few people in the world can use their text editors like you. You can type these commands in front of your VS&nbsp;Code-using friends and watch their jaws drop. They'll think you're some super-hacker, just like non-computer people watching someone use the command line.

## `:norm`

What if you could combine the versatility of Normal mode commands with the power of Ex commands? `:norm[al]` is one of the most satisfying tools I know of in Vim. It executes whatever keystrokes you give it as if you were in Normal mode. It also works with ranges, so `:,/foo[0-9]/-1norm ^cEbar` changes the first word to `bar` for each of the lines from the current line to the line before the next line matching `foo[0-9]`.

Let's look at a more concrete example. Suppose you have this CSV data and you want to format it for insertion into a LaTeX table:
```
1, 1
2, 1
3, 2
4, 3
5, 5
6, 8
```
To convert this to LaTeX, you need to replace the commas with ampersands and append `\\` to each line. Let's say you address the first of those with the canonical `:%s/,/ \&`. Then, you have a couple options for the second. You could spend a few seconds coming up with a fancy regex like `:%s/.*/\0\\\\` or the slightly slimmer `:%s/$/\\\\`. You could painfully record a macro and replay it, `qaA\\^Escjq5@a`. You could think back to your multiple-cursor IDE days and reach for the setup-intensive Visual Block solution, `gg$Ctrl-VGA\\^Esc`. Or, you could do the **natural** and **brainless (in a good way)** option: `:%norm A\\`. This combines the power of `:s` with the intuition of the Visual block solution.

Still unconvinced? I've just gotten started on `:norm`. You know how when you discover macros for the very first time and play out a really good one, you feel immense satisfaction as everything falls into order and you briefly experience omnipotence? Well, if you want more of that feeling, try combining `:norm` with the [power of `:g[lobal]`](https://vim.fandom.com/wiki/Power_of_g). Say that you're writing a quick Python script to solve an Advent of Code problem and you want to comment out your multitudinous debug `print`s. `:g/print/norm I# `. Boom. You just commented every single line containing `print` in the entire file. If you have a keybinding configured for one of those new-fangled extensions that comment code depending on what language you're in, that'll work with `:norm` as well. You can also use `:g` with ranges if you have some non-debug `print`s that you want to keep.

<small>**Note:** If you don't want `:norm` to adapt to your custom mappings, use `:norm!`, which executes the vanilla keystrokes. This is especially useful for sending configuration-agnostic Vim tricks.</small>

This can get even more powerful. I was doing some discrete math homework in LaTeX with a template that caused tables to appear awkwardly without a line break.
![screenshot of the strange LaTeX artifact](inline_table.png "Look, an excuse to practice our Vim skills!")
First of all, since the point of this article is to demonstrate Vim capabilities, ignore the solution of fixing the LaTeX itself. Instead, I will discuss how to best append `\\` to every line preceding a `\begin{tabular}{...}`.

Right away, I knew I needed to automate this task because there were many tables in the document. Some of my readers might turn to `:s[ubstitute]` here. If you are a Mega Regexasaurus Extraordinaire and have the multiline pattern-matching syntax memorized, good for you. I, on the other hand, am a Normal Human Being, and I reach for the solution with the **same power** but **much less brainpower**. All I need to do is imagine in my head the keystrokes I would use to manually perform this once. Then, I type `:g/beg.*tab/norm kA\\`, and I'm done! I have effortlessly automated this extremely specific task:
1. Find all the lines matching the pattern `beg.*tab` (a way for me to match `\begin{tabular}` without having to type the whole thing).
1. For each of those lines, go to the preceding line.
1. Append `\\` to that line.

This is just the beginning. There's nothing stopping you from combining `:g` and `:norm` *and macros!*

Things like this are why you'll never be able to go back to VS&nbsp;Code after experiencing the Vim Enlightenment. What sort of text editor or IDE has this capability out of the box? OK, [Emacs probably does](https://xkcd.com/378/). However, as an amateur pianist and [typist](https://b-sharman.dev/blog/learning-3l), I'd rather keep my pinky fingers intact for the next few years.
