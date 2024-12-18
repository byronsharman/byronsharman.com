It's been a while since my [original post](/blog/learning-3l) detailing what 3l
is and why I started using it. In that post, I pledged to update my blog with
my progress.

The most common question I've gotten when mentioning the keyboard layout to
people who already knew I tried it is, "You're still using that thing?" I guess
it was expected that I'd revert to QWERTY for whatever reason. Yes, I'm still
using it.

I'd like to address the other common questions below as well as some thoughts
which I think merit sharing.

## I thought you use Vim; doesn't 3l mess up the `hjkl` keybindings?

I do not remap any of the default bindings in my Vim configuration. `hjkl` are
still properly placed relative to each other:

![diagram of the 3l layout with the h, j, k, and l keys highlighted](3l_with_hjkl_highlighted.png)

I've never managed to convince a Vim user that this isn't some cursed blemish
upon a sacrosanct arrangement. I can say from personal experience, however,
that these keys quickly feel quite natural. The muscle memory does not rely on
the proximity of the movement keys to associate their common function. They
could be anywhere; you will have no problem once your muscle memory learns
the new positions.

That is the primary argument for the suitability of this `hjkl` positioning,
but I would like to indulge in another argument, one that I believe to be
stronger. I think most people dramatically overuse the `hjkl` keys because they
come from editors where arrow keys are the sole paradigm, and these keys are
Vim's direct parallel. Moving one step at a time in any direction is quite slow
unless the complete motion desired is only one or two steps. I haven't actually
recorded data to be sure, but I would like to think I use these alternatives
much more often than `hjkl`, and that everyone else should too:

* `w` and `b`
* `W` and `B`
* `E` and `gE`
* `%`
* `{` and `}`
* `[{` and `]}` and `[(` and `])`
* `f` and `t` (usually, but not always, followed by some sort of bracket) and
`;` and `,`
* `*` and `#`
* `/` and `?` (many of my searches are two-letter strings allowing me to jump
to where I'm looking)
* `n` and `N`
* [Treesitter incremental selection](https://github.com/nvim-treesitter/nvim-treesitter?tab=readme-ov-file#incremental-selection)

Notice that many of these are easier to type on 3l than QWERTY. I would guess
that most 3l users are naturally more fluid in Vim because they suffer no
inconvenience in learning actions bound to symbol keys. For me, that's meant a
lot more [Ex commands](/blog/three-snazzy-vim-commands), especially ones with
ranges. My latest habit has been conjoining two Ex commands with a pipe, like
`:+d|w`, which deletes the line below the cursor and saves the buffer all in
one go. In QWERTY, that's much more gnarly than `jdd:w`. In 3l, the two are
about the same speed. There are lots of little things like that, making 3l a
superior keyboard layout for Vim users.

## What happens if you need to type on someone else's computer?

Most computers I use run Linux, and 3l is built into almost all distros, so
most of the time, I can just type `setxkbmap us 3l` (or `loadkeys 3l` for a
TTY). If that doesn't work, I can still use QWERTY on a desktop computer at
about 80&nbsp;WPM. I can change back and forth between the two like a bilingual
person. I think this is mostly thanks to the fact that I still use QWERTY on my
phone, so my brain isn't allowed to forget where the keys are.

## What kept you from going back to QWERTY?

I already mentioned the excellent Vim ergonomics. The other main advantage is
the cursor layer. It is extremely handy to access the arrow keys, Home and End,
PageUp and PageDown, and Backspace and Delete without moving your hands. All of
these are dramatically more reachable than in QWERTY, but Backspace makes the
biggest difference, as it's the most commonly used.

The other offering of the cursor layer is the numpad on the right-hand side of
the keyboard. For numbers with 3 or more digits, it's usually faster to use the
number row, but most of the time, like when typing "3l", only one or two
numbers are desired. I can scarcely stress enough the convenience of this
utility, which reduces numbers to the same kind of single-stroke motion as
words like *of*, *to*, and *as*. It also comes in handy for passwords.

## What are some of the drawbacks or pain points?

My speed hasn't improved measurably since the last blog; I'm still at around
105 WPM. I used to be faster when I used QWERTY, so this is admittedly
frustrating.

The largest issue with the layout itself is platform support. Chrome doesn't
hide the slash key (which activates the cursor layer) from websites, so
`Ctrl+Home` and other common shortcuts are overridden in Microsoft&nbsp;365 to
be `Ctrl+/`, which defaults to toggling a list. That gets annoying fast. Also,
applying `Shift` on top of cursor layer keys to select things doesn't work in
GTK apps for some reason. And recently, an `xkeyboard-config` update [broke the
cursor layer
further](https://gitlab.freedesktop.org/xkeyboard-config/xkeyboard-config/-/issues/500)
on certain Xorg apps, although there's a fix pending for the next release.

## Summary

3l has been enjoyable to use for the last year. I'm glad I switched to it; it's
made me a much better Vim user, and its advantages outweigh its drawbacks. If
you're interested in trying it too, you can [check it out on
GitHub](https://github.com/jackrosenthal/threelayout).
