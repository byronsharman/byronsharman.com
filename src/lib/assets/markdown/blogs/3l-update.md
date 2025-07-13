3l is an alternative keyboard layout. It's been a while since my [original
post](/blog/learning-3l) detailing what makes it unique and why I started using
it. In that post, I pledged to update my blog with my progress.

The most common question I hear from the people who know I tried 3l is, "You're
still using that thing?" I guess most people had assumed the contrary. Yes, I'm
still using it. I'd like to address some other common questions below.

## I thought you use Vim; doesn't 3l mess up the `hjkl` keybindings?

I do not remap any of the default bindings in my Vim configuration. `hjkl` are
still properly placed relative to each other:

![diagram of the 3l layout with the h, j, k, and l keys highlighted](3l_with_hjkl_highlighted.png)

I've never managed to convince a Vim user that this isn't some cursed blemish
upon a sacrosanct arrangement. I can say from personal experience, however,
that muscle memory does not rely on the proximity of the movement keys to
associate their common function. They quickly feel natural.

Besides, people tend to overuse the `hjkl` keys, perhaps because they are the
first motion mentioned in the tutorial, perhaps due to the arrow keys'
prominence in other editors. I haven't actually recorded data to be sure, but I
would like to think I use these alternatives more often than `hjkl`, and that
everyone else should too:

* `w` and `b` and `W` and `B`
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
one go. In QWERTY, that's much more gnarly than `jdd:w`; in 3l, the two are
about the same speed. There are lots of little things like that, making 3l a
superior keyboard layout for Vim users.

## What happens if you need to type on someone else's computer?

3l is built into Linux distros, so I can usually just type `setxkbmap us 3l`
(or `loadkeys 3l` for a TTY). On non-Linux systems, I can still use QWERTY at
about 80&nbsp;WPM. This is probably thanks to the fact that I use it on my
phone, so my brain isn't allowed to forget where the keys are.

## What kept you from reverting to QWERTY?

I already mentioned the excellent Vim ergonomics. The other main advantage is
the cursor layer. It is extremely handy to access Home and End, PageUp and
PageDown, the arrow keys, and Backspace and Delete without moving your hands.
All of these are dramatically more reachable than in QWERTY, but Backspace
makes the biggest difference, as it's the most commonly used.

The other offering of the cursor layer is the numpad on the right-hand side of
the keyboard. For numbers with 3 or more digits, it's usually faster to use the
number row, but most of the time, like when typing "3l", only one or two
numbers are desired. I can scarcely stress enough the convenience of this
utility, which reduces numbers to the same kind of single-stroke motion as
words like *of*, *to*, and *as*. It also comes in handy for passwords.

## What are some of the drawbacks or pain points?

My speed hasn't improved much since the last blog; I'm at around 105 WPM. I
used to be faster when I used QWERTY, so this is admittedly frustrating.

The largest issue with the layout itself is platform support. Chrome doesn't
hide the slash key (which activates the cursor layer) from websites, so
`Ctrl+Home` and other common shortcuts are overridden in Microsoft&nbsp;365 to
be `Ctrl+/`, which defaults to toggling a list. That gets annoying fast. Also,
applying `Shift` on top of cursor layer keys to select doesn't work in GTK
apps. And recently, an `xkeyboard-config` update [broke the cursor layer
further](https://gitlab.freedesktop.org/xkeyboard-config/xkeyboard-config/-/issues/500)
on certain apps, although there's a fix pending for the next release.

## Summary

3l has been enjoyable to use for the last year. I'm glad I switched to it; it's
made me a much better Vim user, and its advantages outweigh its drawbacks. If
you're interested in trying it, you can [check it out on
GitHub](https://github.com/jackrosenthal/threelayout).
