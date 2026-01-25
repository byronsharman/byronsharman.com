---
title: Switching to Niri
published: false
date: 1769361154
description: I've returned to a window manager.
---

Last semester, while practicing my habit of finding anything to do other than
studying for final exams, I ran into [Niri](https://github.com/YaLTeR/niri/).
Niri is a Wayland compositor adopting a novel spatial metaphor in which windows
scroll infinitely off the edge of the screen:

<figure>
    <video
        src="https://github.com/YaLTeR/niri/assets/1794388/bce834b0-f205-434e-a027-b373495f9729"
        muted="muted"
        controls
    ></video>
    <figcaption>
        Linked from <a href="https://github.com/YaLTeR/niri/blob/main/README.md">the niri README</a>.
    </figcaption>
</figure>

If you're familiar with GNOME but haven't heard of window managers before, it's
important to note they don't fill the same role. Niri is a _Wayland
compositor_, which means it uses a protocol called Wayland to draw
applications' pixels on a display. This is a much smaller scope than the desktop experience provided by the GNOME project. Functionalities like an app launcher menu
or, menus to power off or reboot, and notification trays must be provided by a
different program.

TODO: This is a fun piece of information, but I think it distracts from the rest of the article.
> If you're curious, GNOME's built-in window manager is called
> [Mutter](https://mutter.gnome.org/).

I used other window managers long ago, but I switched back to GNOME because
everything just works and I felt the overall UX was more cohesive and
well-designed. This is still true: GNOME offers the best out-of-the-box user
experience on Linux. However, the alternatives don't lag as far behind as they
used to. In particular, a young (started in August 2025) project called [Dank
Linux](https://danklinux.com/) offers a complete desktop experience on top of
your Wayland compositor. Aside from its extremely cringe name, which makes me
want to delete my browser history every time I browse its documentation, this
is an excellent project. Before tools like this, building a desktop experience
on top of a Wayland compositor required hours of work researching, installing,
and configuring different programs. Now, one just needs to install Dank Linux.
turns any Wayland compositor into a desktop experience not far from a full
desktop environment, without having to spend hours tinkering and configuring
things.

> A similar program is
> [noctalia-shell](https://github.com/noctalia-dev/noctalia-shell). You can
> find a list of them at
> [https://codeberg.org/domsch1988/awesome_shells](https://codeberg.org/domsch1988/awesome_shells).
