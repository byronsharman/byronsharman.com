---
title: Switching to NixOS and Niri (again)
published: false
date: 1769285090
description: I'm enjoying a new way to use my computer.
---

Most people who enjoy tinkering with computers follow a cycle like this:

1. Ooh, what's this Linux thing? Sounds good; I will try it.
1. _installs Ubuntu_; uses GNOME
1. This is pretty nice! But I hear about this notorious Arch Linux thing. It
   sounds pretty advanced, but I'd like to level up my skills; I'll give it a
   shot!
1. _installs Arch_
1. Wow, I just found out that instead of a desktop like GNOME I can actually
   run a lean Wayland compositor with my own stuff on top of it!
1. _dives down i3/dwm/Hyprland rabbit hole_
1. That was fun and I learned a lot, but I'm realizing that I really like how
   GNOME just works out of the box. I also like the stability of a
   non-rolling-release distro.
1. _switches back to GNOME on Fedora_

The funny thing is, I had fully completed that cycle around my sophomore year
of high school. I used GNOME, because it's well-designed and just works, along
with Arch Linux, because I have all the commands for `pacman` memorized and I
didn't feel like learning the equivalents on a Debian- or Fedora-based distro.

I realized that everything I do is just a different combination of using a
terminal and a web browser at the same time. The only interaction I have with
my computer outside of these two is switching between windows, which is so
negligible that the desktop environment and Linux distribution are completely
unimportant. I still think this assertion is true. However, some of my goals of
using a computer have changed.

> The next few paragraphs are about operating systems. Skip to the
> [niri](#niri) section if that's what you're mostly interested in.

## NixOS

When I went to [Mines](https://mines.edu), I heard about a declarative language
called Nix. On traditional operating systems, your system environment is the
sum of every modification it has undergone since first installed. To get your
same setup on a different computer, you'd have to remember all those steps and
repeat them one at a time. Nix is different. With Nix, your system environment
is the direct result of a set of configuration files. If your configuration
files are the same, they will always result in an identical system environment.

> **Note:** There are some asterisks on that last sentence, but it's the
> general idea.

This didn't sound very useful to me at first, but I tried it, and I really
liked [home-manager](https://github.com/nix-community/home-manager). I liked it
because
- it left a clear record of what I had changed, especially when combined with
  source control;
- it installed my Neovim plugins in a way that felt less "loosey-goosey" than
  using a Neovim-specific package manager; and
- to be honest, a big part of it was just feeling cool to be using the same
  software that my smart friends were using.

You can actually install home-manager on a regular Linux distribution like
Arch, which is what I've done for the past couple of years. Then, in December,
two things happened:

I rediscovered [niri](https://github.com/YaLTeR/niri), and it seemed way cooler
than the tiling window managers I had tried in my "arch btw" phase.

I updated my desktop computer without reading about [the manual intervention
required for certain Nvidia cards on
Arch](https://archlinux.org/news/nvidia-590-driver-drops-pascal-support-main-packages-switch-to-open-kernel-modules/),
and suddenly I found myself with a nonbootable system and only two courses of
action: uninstall the drivers, or install some weird DKMS driver _from the
AUR_—the latter of which anyone familiar with the AUR can tell you is not what
one hopes to spend one's Saturday morning doing. This was kind of the turning
point for me. I pledged to switch to an operating system that supports
_rollbacks_: a feature where you can boot an older snapshot of your system,
meaning you'll never find yourself with an unusable computer after a software
update. At the time of writing this article, I'm familiar with two operating
systems that support rollbacks:

- [**Fedora Silverblue**](https://fedoraproject.org/atomic-desktops/silverblue/),
  a Fedora variant built on a technology called rpm-ostree which writes your
  system and its installed packages to an immutable image. Apparently, there are
  now newer technologies performing similar roles, but Silverblue was somewhat
  hyped up several years ago when I last looked into this stuff.  
- [**NixOS**](https://nixos.org/), an operating system built upon the Nix
  principles described earlier.

I'm sure there are more, but I think I was already subconsciously hoping for an
excuse to try NixOS again. I'd tried it in the summer of '24 and felt it solved
problems I didn't have. Now, I suddenly found myself having those problems: two
systems whose configurations I wanted to synchronize and whose reliability was
paramount. I figured I'd go all in this time, surviving whatever deep research
necessary to get to a usable system.

Over Christmas break, I took the time to set everything up, including a niri
installation. It took several days of concentrated effort, mostly because I was
trying to learn about flakes at the same time. The resource I found most
helpful in this effort was the tutorial titled [_NixOS & Flakes
Book_](https://nixos-and-flakes.thiscute.world/nixos-with-flakes/introduction-to-flakes).
I learned a lot about flakes and why they're useful, and I use them in my
personal projects now. Ironically, though I'd learned about flakes to be able
to work with [niri-flake](https://github.com/sodiboo/niri-flake), I discovered
that the regular version of niri packaged for Nix could do everything I wanted,
as long as I configured niri through its built-in `config.kdl` format instead
of configuring it in Nix and having home-manager transpile the Nix to kdl. This
seemed better to me anyway.

The Nix experience is still an experiment with rough edges. Everything from the
fragmented documentation to the obtuse error messages feels immature. Worse,
there are serious community management issues that have stultified progress on
[flakes, which are such an obviously good
thing](https://grahamc.com/blog/flakes-are-an-obviously-good-thing/).

Overall, NixOS is right for me, and I plan to install it on all my computers,
keep learning about it, and improve the modularity and maintainability of my
NixOS configuration. However, it's still for tinkerers. If you want to get
things done, use Fedora and GNOME.

<!-- TODO: I've been wanting to support automatic heading links for a long time; now might be the best time to do that -->

<h2 id="niri">Niri</h2>

In most tiling window managers, existing windows shrink to make room for new
windows. In Niri, a new window never causes existing windows to resize;
instead, insufficient windows with insufficient space scroll the whole screen
horizontally. It's best explained with a video:

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

I actually started using Niri on Arch a few weeks before installing NixOS.
GNOME's overview had worked for me for years, but I'd found that when I needed
to go between windows really fast, such as when debugging code in a terminal
next to my fullscreen editor, alt-tab was faster than the overview. Even that,
though, was a little bit tedious. It's hard to go fast when you have more than
3 or so windows open.

On the other side, window managers have made massive leaps in usability since I
last tried them. There are now "shells" that you can install on top of your
window manager and that are rapidly approaching the full functionality of a
desktop environment. Alongside Niri I have installed
[DankMaterialShell](https://danklinux.com/docs/), which, except for the cringe
name, is a really awesome piece of software. Niri and DMS provide a great
out-of-the-box experience with sensible defaults, which was one of my favorite
qualities in GNOME.

Niri is ergonomic and practical. It's really nice to quickly scroll over to an
adjacent window because it feels like less of a commitment. You can still see
half of your main window. When writing code, I'm either making a website I want
to see in a web browser or writing something text-based I want to see in a
terminal. Either way, I have both Neovim and some other window open, and being
able to scroll between the two feels really nice. This conceptual model also
makes touchpad gestures feel very natural.

One thing about Niri I hadn't expected is how many comments I get. It's so
unique and eye-catching that many different people have asked me what window
manager I'm using. Occasionally someone will recognize it and say, "Oh, is that
Niri?" After decades of following the floating window desktop metaphor, it's
exciting to see a new innovation. Oh, and it's written in Rust…you can't go
wrong with that!

> Interesting note: Niri is relatively new, but [the concept is
> not](https://vimeo.com/6712657).

## Conclusion

After many years of trying to make my computer get out of the way so I can do
the stuff I want with it, a series of chance circumstances led me to try some
interesting nascent technologies. NixOS I found to be a good fit for my rather
niche use case, but I wouldn't recommend it to someone new to Linux or who
wants something that "just works". Niri, on the other hand, was surprisingly
capable. If you're ready to try something new in the desktop space, it might be
worth giving it a shot!
