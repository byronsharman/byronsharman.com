---
title: Switching to Niri
published: true
date: 1769550476
description: I've returned to a window manager.
---

Last semester, while trying to distract myself from studying for final exams, I
ran into [Niri](https://github.com/YaLTeR/niri/). Niri is a Wayland compositor
adopting a novel spatial metaphor in which windows scroll infinitely off the
edge of the screen:

<figure>
    <video
        src="https://github.com/YaLTeR/niri/assets/1794388/bce834b0-f205-434e-a027-b373495f9729"
        width="700"
        height="393.75"
        muted="muted"
        controls
    ></video>
    <figcaption>
        Linked from <a href="https://github.com/YaLTeR/niri/blob/main/README.md">the niri README</a>.
    </figcaption>
</figure>

## What is a Wayland compositor?

If you're familiar with [GNOME](https://www.gnome.org/) but haven't heard of
window managers before, it's important to note they don't fill the same role.
Niri is a _Wayland compositor_, which means it uses a protocol called
[Wayland](https://wayland.freedesktop.org/) to draw applications' pixels on a
display. This is a much smaller scope than the desktop experience provided by
the GNOME project. Functionalities like system menus, notification trays, and
status bars with clocks must be provided by a separate program.

> **Fun fact:** GNOME's built-in window manager is called
> [Mutter](https://mutter.gnome.org/).

## Setting it up

I used other window managers years ago but switched back to GNOME because
everything just works; the overall UX is cohesive and well-designed. This is
still true: GNOME offers the best out-of-the-box user experience on Linux.
However, the alternatives don't lag as far behind as they used to. In
particular, a young (started in August 2025) project called [Dank
Linux](https://danklinux.com/) offers a complete desktop experience. Aside from
its extremely cringe name, which makes me want to delete my browser history
every time I browse its documentation, it is an excellent project. Before,
building a desktop experience on top of a Wayland compositor required hours to
research, install, and configure different programs. Now, that is all
accomplished by a single package.

> There are [alternatives to Dank
> Linux](https://codeberg.org/domsch1988/awesome_shells), the most mature of
> which I assume to be
> [noctalia-shell](https://github.com/noctalia-dev/noctalia-shell).

With the sensible defaults provided by Niri and DMS, I didn't need to do any
configuration to start working. However, I did still have to manually install a
terminal emulator, file manager, image viewer, etc., which I selected from the
[GNOME app ecosystem](https://apps.gnome.org/). Assisted by prior experience
with dwm and i3, I learned the important keyboard shortcuts in about an hour.

## The user experience

I used to think of desktop environments as the face of my computer, the design
language that dictated my every interaction with it. My days of tinkering with
custom window manager setups, however, led me to realize something I wasn't
comfortable admitting at first: **Everything I do is just a different
combination of using a terminal and a web browser at the same time.** Once I
have these two open, the window manager is basically irrelevant. Really, the
only practical difference between GNOME, KDE, Hyprland, or Niri is the
mechanism for switching windows. That means window-switching is the most
important aspect of a window manager to get right.

Web development is a good test of a user interface's window-switching design
because it involves flipping back and forth between an editor and a web browser
every few seconds. GNOME's primary window switcher, the activities overview, is
too slow for this. The best recourse is `Alt+Tab`-ing through windows one at a
time, which is a little cumbersome when cycling between more than two windows.
It also weakens the spatial model of windows' relative positions.

Niri's window switching is excellent. Like other tiling window managers,
windows are focused with directional keyboard shortcuts. Unique to Niri,
though, is the fact that these shortcuts are practical even when a task
requires more windows than can fit on the screen. This is complemented by
touchpad gestures that very intuitively match the scrolling-desktop model. I
can move deftly through a sea of windows without getting lost.

It's also helpful to be able to see window halves dangling off the screen edge.
This makes it easier to retain context while trying to keep a pile of APIs and
callbacks in my head from toppling.

One of the things I hadn't expected when switching to Niri was how much
attention it earns. Nothing else looks quite like it, and many people at Mines
have asked me what I'm using. Occasionally, someone expresses their disbelief
that they saw a Niri user in the wild! This is a fun way to start a
conversation.

Of course, Niri isn't perfect. The built-in screenshot editor, for example, is
lacking in features, although it can be disabled in favor of a different
program. At the time of writing, there is no Home Manager integration except
through a flake which is out-of-date unless you switch to the aptly named
[`very-refactor`](https://github.com/sodiboo/niri-flake/tree/very-refactor)
branch. I don't think HDR support is even planned. That said, none of these are
a big deal for me. I hope to use Niri and DMS for quite some time!

> **Trivia:** Niri is relatively new, but [the concept of infinitely scrolling
> windows is not](https://vimeo.com/6712657).
