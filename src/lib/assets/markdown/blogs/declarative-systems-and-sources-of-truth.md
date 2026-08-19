---
title: Declarative systems and sources of truth
published: true
date: 1787100626
description: I write miscellaneous thoughts on the titular subject matter.
image:
  alt: >-
    a climate control component of a vehicle held over a table
  path: imperative-climate-control.jpg
---

While obtaining my computer science degree, I've been exposed to various types
of declarative systems. A _declarative system_ is driven by specifying a
desired state rather than a list of steps. An example of a declarative system
is a car whose climate control is managed by setting a desired temperature. The
car decides whether to turn on the heater or the air conditioner to achieve
that temperature. An example of a non-declarative system is a car whose climate
control is managed with a cold–hot slider and a fan speed dial. This system is
called _imperative_ because it is manipulated by commands.

![a climate control component of a vehicle held over a table](imperative-climate-control.jpg "This 90s Mazda Miata climate control unit exemplifies an imperative system.<br />Image credit: cropped from [Top Down Motorsports on eBay](https://www.ebay.com/itm/227282635898)")

There are many declarative systems in software engineering. Some I have
encountered recently are [NixOS], [Terraform], and [Kubernetes Deployments].
All are managed with a two-step process:
1. Write a text file that describes the desired state.
2. Trigger a tool called a _reconciler_ that modifies the current state to
   match the desired state. (This can be done by a human, a CI/CD pipeline, or
   a daemon.)

Why would it be desirable to manage a system declaratively when you could just
go in and change it yourself? Well, there are many advantages:

- The reconciler can be configured to reject invalid or undesirable states,
  making it harder to corrupt the system.
- The desired state can be tracked in version control, which provides a record
  of changes and a mechanism to easily revert a change. (Some people call this
  _GitOps_.)
- Source control also allows a team to modify the system without stepping on
  each others' toes.
- Declaritivity ensures a **single source of truth:** _There is an objectively
  correct state for the system to be in, and it is defined in exactly one place._

My first memory of running into issues with sources of truth was many years
ago, when I was making [a multiplayer tank game][bangbang]. I wasn't very
creative in middle school; the goal of the game was to shoot other tanks and be
the last standing. Each player connected to a central server. The clients all
did their own collision logic to determine when a tank shell hit another tank.
Because of network delays, positions of the tanks drifted over time, and
sometimes a tank would be operating on one player's computer but eliminated on
another's.

I solved the issue by making the server the single source of truth. The clients
no longer did any collision logic; they only displayed the data sent by the
server. The server called the shots (ha ha) and sent its conclusions to the
clients. Now there was no question whether a player was eliminated.

Shooter games tend to be more fun when they're imperative, but the point is all
stateful systems, declarative or not, need a source of truth. It is quite
unfortunate to not know
how many EC2 instances should be provisioned
or who should be scheduled for the next on-call shift
or which users should be authorized to view financial transactions.

The main issue with declarative configuration is drift. If anything besides the
reconciler modifies state, the source of truth becomes untruthful. For example,
perhaps an SRE provisions a resource in the AWS console to mitigate a critical
incident. Now, the desired state is no longer the one declared in source code.
If the reconciler is run, it will destroy the new resource to match the
declared state, potentially re-triggering the incident. This is messy and
difficult to deal with.

Another issue is convenience. I use a program called [Home Manager] to
declaratively manage my dotfiles with the [Nix language]. One of the behaviors
defined declaratively is how my laptop treats an external display. Should it
mirror the laptop screen or extend it in a certain direction? When I'm about to
give a final project presentation in front of a classroom, the last thing I
want to do is fuss with a Nix codebase to make the projector show my slides.

As a brand new engineer not yet finished with my bachelor's degree, I have much
to learn about declarative systems. For the most part, they seem like a very
elegant way to solve a problem. If my understanding increases sufficiently,
perhaps I will have enough thoughts to write another post about them someday.

[nixos]: https://nixos.org/
[terraform]: https://developer.hashicorp.com/terraform
[kubernetes deployments]: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
[bangbang]: https://github.com/byronsharman/bangbang
[home manager]: https://nix-community.github.io/home-manager/introduction.html
[nix language]: https://nix.dev/tutorials/nix-language
