## Background

Blasterhacks is Mines' annual hackathon, an event where you spend a whole
weekend coding something awesome. [Last year's
Blasterhacks](/blog/blasterhacks-2024) was my first ever hackathon (and blog
post), and I loved it! I'm happy to say that this Blasterhacks is my sixth
hackathon and one of the most enjoyable yet. I'm a little behind the times with
this blog post—the event happened in April—but thanks to my trusty notes, I
haven't lost any details.

> **Aside:** If you're thinking, "Em dashes? He's using AI!" you're incorrect.
> A loyal, long-term em dash fan, I have had the codepoint `U+2024` memorized
> since high school.

[Lukas](https://lukaswerner.com/) was on my team last Blasterhacks, but since
then, he transferred to Oregon State. Thankfully, he flew all the way back to
Colorado to hack with us again this year! [Grant](https://grantlemons.com/)
also reunited with us.

## The first few hours
![Lukas and I work on our laptops in a nice campus building. We are both smiling.](lukas_and_byron.avif "Lukas (left) and I (right) worked all night long on Friday.")

The most memorable part of opening ceremonies was the keynote, given by Sumner
Evans. His competitive approach to hackathons contrasts with my casual one, so
I was interested to hear what he had to say. Although I recognize that hacking
with pressure to win can be a really fun way to experience a hackathon, I've
found that what judges find cool or interesting rarely aligns with what I find
cool or interesting, especially given the current prevalence of AI. Hackathons
are like marathons; some aspire to be the fastest, but most participate because
it's really hard to run 26&nbsp;miles nonstop, and the feeling of finally
accomplishing that feat after months of training is fun and fulfilling.

Similarly preferring the intrinsic fun of coding over the thrill of winning, my
teammates elected to avoid the web apps and AI wrappers that so often win
hackathons nowadays, resolving instead to make a light, privacy-respecting
command-line tool that enables others to remotely type in your terminal as if
they were sitting at your computer. Think VS&nbsp;Code's Live Share except for
a shell. For those of us who prefer to use version control, manage our
environment, and run and edit code in the terminal, this opens up a lot of
possibilities for pair programming. I suggested the name "Pear Programming"
because I'm addicted to puns. We decided to write our project in Go based on
prior experience and its suitability for use cases like this.

Our design was very simple. [tmux](https://github.com/tmux/tmux/wiki)'s
*sessions* feature already supports multiple connections to one terminal; we
only needed to add networking. A single computer hosts a tmux session, sharing
terminal output by piping `stdout` over the network. Other users' input is
captured by sending `stdin` in the same manner. The tricky part was our desire
to avoid sending this information through a central server. For the sake of
privacy and the ability to use our tool without depending on third-party
infrastructure, we wanted to set up peer-to-peer connections between each pair
of nodes. We planned to accomplish this using [libp2p](https://libp2p.io/).
There exists a similar library,
[perlin-network/noise](https://github.com/perlin-network/noise), but we favored
libp2p because it seemed like the definitive, best-known solution. We didn't
realize the impact this early decision would have on the rest of the hackathon.

After all this, Grant went to bed, but Lukas and I stayed up.

libp2p has a massive, complex API, so we decided to build a basic chat app to
learn it. However, we soon realized even this was too large a problem; it
needed to be subdivided further. The first manageable sub-problem we identified
was how to determine which of all devices on the entire internet are hosting a
Pear session. This is actually possible by querying all devices found over the
Kademlia Distributed Hash Table (the data structure libp2p uses to find nodes
on a network). If a device recognizes a randomly generated sequence of
human-readable words, we try to connect. Our program can generate those words
and have the user share them through a third-party communication service.

I started on this a couple hours after midnight, but my code couldn't find my
own DHT nodes, and I didn't understand why. Lukas was busy helping other teams,
but when he came back, we started to comprehend the issue. We hadn't realized
that the DHT requires a known bootstrap node before adding a new node to the
network. Unfortunately, this meant we needed a central server after all to set
up the connection. After talking through this, we decided to make a simple HTTP
name server that stores and serves a device registry. The address of this
server is hardcoded in Pear, so all computers know it. When a Pear session is
started, the name server adds it to the registry; when other computers want to
connect, the name server sends them a
[multiaddr](https://docs.libp2p.io/concepts/fundamentals/addressing/), which is
like an IP address with some extra information attached. To store multiaddrs,
we used [`bbolt`](https://github.com/etcd-io/bbolt), a KV database written in
Go.

While Lukas worked on this HTTP server and deployed it to
[Fly.io](https://fly.io/), I made a client prototype that connected to it.
Then, I made subcommands in our CLI: `host`, which starts a session, and
`connect`, which connects to a host.

At 07:45, Grant woke up! He worked on making our tmux wrapper intercept
`SIGINT` and kill the tmux session so that `Ctrl+C` could be used to close
Pear.

## Hole punching technical explanation
After a bagel breakfast, we realized our planned architecture required
modification. We had thought that knowing the host's multiaddr would be enough
to connect to it, but things aren't that simple. For security reasons, a
network's firewall only accepts packets from a source if they recently sent a
packet to that source. That means that unannounced requests, such as those
coming from a Pear client trying to connect to your host, will be blocked.

The way around this problem is to coordinate the host and client, telling them
to send each other a connection request at the exact same time. After sending a
packet to an address, the firewall briefly opens to that address so that it can
receive a response. If the two computers send each other messages at the same
time, their firewalls will open up just before they get each other's messages.
They can then use those messages to set up a peer-to-peer connection that no
longer requires complicated coordination. This technique is called *hole
punching*, and if you'd like a deeper explanation with pictures, you can read
the [IPFS blog on hole
punching](https://blog.ipfs.tech/2022-01-20-libp2p-hole-punching/).

This means that informing the client of the host's multiaddr was insufficient.
In addition to a name server, we also needed a *relay server*, another
component of libp2p which orchestrates the hole punching process. That sets up
a peer-to-peer connection through which all remaining networking runs.

When writing software, it's usually a good idea to solve the simplest version
of your problem and add features later rather than trying to do everything at
once. Once we understood the networking was more complex than we realized, we
decided to temporarily remove any tmux functionality from our host command. The
host would be a minimal working example until we figured out how to set up the
network.

## Getting stuck
![I lean back in my chair with one hand in the air. I am surrounded by many cans of Red Bull and empty plastic food containers.](byron.avif "Prolonged debugging makes me hungry. If you thought three bowls of pasta was a lot, do you see the tray behind my laptop?")

At 10:00, I started dozing off from time to time. The name server kept
returning 404s when we tried to register or fetch addresses from it. We got off
on the wrong track for a little while before realizing that the endpoints were
called `/api/register` and `/api/lookup`, but my code was making network
requests to `/register` and `/lookup`. Oops!

After we fixed this, clients panicked, indicating internal server errors, but
when we queried the server directly with `curl`, it worked fine. This was
because my code panicked if the server didn't return a 200 HTTP code, and the
server was returning a 201. Lesson learned: Unless writing status-code-specific
logic, an error handler should check
[`Response.ok`](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)
or a generic range of status codes.

Then we ran into a third silly mistake. We were failing to parse
multiaddrs…because we hadn't stripped trailing newlines.

After running into all these easily fixable mistakes, I realized I needed to
sleep, which I did on and off until about noon. Turns out hole punching is
really hard; we were still working on it when I woke up. The Blasterhacks
organizers gave us a much-needed Panda Express lunch, after which we walked to
Clear Creek and back, and I took another nap.

I woke up to us having trouble setting up the relay. If you don't remember from
before, the relay server is one of the components required for setting up a
connection. libp2p provides a library called `p2p-circuit` which performs this
functionality, but it's difficult to find minimal usage examples. After lots of
troubleshooting, we realized that the port on our Fly.io machine seemed to be
blocking all requests. We couldn't figure out why; even a barebones HTTP
service saw the same behavior. By 18:00, we'd been fighting libp2p for
20&nbsp;hours, and Lukas and I felt that its complexity made it a poor choice
for our small project and that we would be better off writing a new network
architecture.

Lukas hadn't taken the naps that I had and was very tired, but I woke him up at
19:20 to get pasta dinner. Grant never gave up on the codebase, reasoning that
restarting had too high a cost, and he slowly brought functionality to the
networking aspect, starting by trying to get it work locally before going over
the internet. I had briefly entertained this idea earlier but had dismissed it
when it didn't immediately work. I'll remember in the future that system
reduction can be a very effective form of troubleshooting. Again, good
engineers always start by solving a simplified version of the problem and
adding required features later.

## Progress!
![Lukas and Grant write code on their laptops. Beverage cans, electronics, and miscellaneous paraphernalia are strewn across their table.](lukas_and_grant.avif "Lukas (left) and Grant (right) enjoy some beverages while coding and chatting.")

Lukas and I started developing a TCP-based networking solution as a contingency
plan. Meanwhile, Grant's libp2p network solution was working locally, so we
deployed the name server on Fly.io again. This still didn't work. While
troubleshooting, Lukas noticed that Fly.io shares IPv4 addresses across
customers' apps, and that when we switched to an IPv6 address, which is
guaranteed to be individual, we got a different error. Our big breakthrough was
understanding that the non-exclusivity of the shared address was causing the
failure, and IPv6 was failing for an unrelated reason. Lukas purchased his own
IPv4 address on Fly.io for $2 a month, and finally, the networking worked, and
our app along with it! Anyone in the peer-to-peer network could type commands
on the host's terminal as if they were on the host's computer. Unfortunately,
any tool that frequently refreshed large portions of the screen, including
Neovim, broke the connection. However, we could still view man pages and use
[fzf](https://github.com/junegunn/fzf).

Though there were still a few hours till morning, I was too tired to accomplish
anything useful. I listened to some Liszt pieces I hadn't heard before and
chatted with some peeps in the lobby. Our team woke up for breakfast and went
on to judging, where we were awarded second place in the general track! We were
quite happy with this, as we had firmly de-prioritized winning, and several
other teams made creative and impressive projects.

## Retrospective
After being away for so long, it was great to see Lukas in person again!
Working with Grant was also a pleasure. It's fun to hang out with people who
share not only the same interests but even niche sub-interests. For example,
Neovim&nbsp;0.11 stable was released a couple days before the hackathon, and
all three of us were having fun trying its new features.

I've never been blocked on one problem for a whole day on a hackathon before.
Because we were confident in our ability to make the application in a few
hours by resorting to a traditional networking model, we were uniquely
positioned to throw a lot of time at our problem without having to worry about
pivoting. In retrospect, I think it was very strategic to stick with the
peer-to-peer solution because that was one of the coolest aspects of the
project. This strong advantage resulted directly from our conservative project
scope.

Additionally, trying something other than a web app was extremely refreshing,
and exposure to a new domain grew my technical knowledge a lot more than
solving a different flavor of the same problem. Learning a completely new
technology every hackathon makes a lot of sense.

I had limited prior Go experience, but this project increased both my
understanding and my appreciation of it. There are a lot of advantages to
having interfaces be essentially an API spec and nothing more. I resonate with
the idea of using good ol' `if` statements and `for` loops instead of making
syntactic sugar for everything (with the exception of channels, which make a
lot of sense). I want to use Go for future personal projects and would be happy
to use it in a professional capacity, too.

This is my last time participating in Blasterhacks because I am now president
of ACM and will be involved on the administrative side next time. I'm really
happy to end it on this note, and I hope that we will make it possible for
future students have as much fun and learn as much as I did!
