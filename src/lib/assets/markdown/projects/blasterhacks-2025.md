---
category: hackathon
hackathonName: Blasterhacks 2025
image:
  alt: a screenshot of two terminals synchronized with Pear
  path: /projects/images/pear.avif
languages:
- Go
name: Pear
type: blog
---
Pear allows multiple people to simultaneously access and use a terminal in real
time. Users are connected via [libp2p](https://libp2p.io/); since stdin and
stdout are streams, they can simply be copied over the network. I mostly worked
on figuring out how to connect multiple nodes with libp2p. The whole project is
written in Go.
