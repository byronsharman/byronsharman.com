---
title: DubHacks 2025
published: true
date: 1762109781
description: Our projection project was projected to be successful.
image:
  alt: Four students stand on a stage holding a banner that says 'Winner'
  path: stage.jpg
---

One of the cool things about pursuing education after high school is it opens
opportunities that you'd never have heard of otherwise. Opportunities like, for
example, flying to Seattle so you can spend your fall break writing code
overnight with your friends.

That's exactly where I found myself in late October. Except for my first
semester at Mines, I've gone to one out-of-state hackathon in the fall followed
by Blasterhacks and HackCU in the spring. Unfortunately, Colorado isn't close
to many MLH hackathons (those are the ones run in partnership with [Major
League Hacking](https://mlh.io/) and usually the largest and most well-known),
but the upside is that you get to see a totally different place every time you
go.

The way the flights worked out, I wasn't able to join my teammates until a
little after hacking started. This hackathon was only 22 hours in length, so
each one mattered! Even though the Seattle metro runs directly from the airport
to campus, I was too late for lunch, so when I arrived, I was running on
nothing but hope and a package of pretzels that United gave me on the flight.

DubHacks is hosted at the University of Washington in Seattle, a major tech
center in the PNW area and also only a road trip away from my friend
[Lukas](https://lukaswerner.com/), who joined Danial,
[Renn](https://renntg.com/), and I. The last time Lukas and Danial worked
together on a hackathon, they suffered from not having an idea beforehand,
which impacted the time they had to actually make their project. So this time,
we started a group chat several weeks in advance to come up with project ideas.
We were hooked by a concept called
[Dynamicland](https://dynamicland.org/2024/Intro/), which we noted would make a
very impressionable demo. If you don't have time to watch the linked video, the
basic idea is to combine computer vision with a projector to project images
onto real-life objects. We decided to manifest the concept by making a tabletop
version of [Desmos](https://www.desmos.com/calculator) where the user writes
math equations on paper cards, and the projector draws the graph of those
equations on other cards. Brainstorming the idea ahead of time meant we could
spend all of our time implementing it rather than wasting the first few hours
thinking about what to make.

Let me jump back to the actual hackathon timeline in Seattle. To recap, we
wanted several different types of cards, each with its own purpose:
- **equation** cards for users to write on and for the camera to scan
- **graph** cards for the equations to be graphed on
- **addition** cards that multiplied two equations
- other types that we ended up not using and that I won't mention for the sake
  of simplicity

Prioritizing ease of implementation over elegance, as one should always do at a
hackathon, we agreed that the easiest way to track the location of physical
cards would be to print a visual identifier on each corner which would contain
information like the type of the card it was on and which of the four corners
it corresponded to. We ended up using [ArUco
markers](https://docs.opencv.org/4.x/d5/dae/tutorial_aruco_detection.html),
which are very similar to the more well-known AprilTags, but built in to
OpenCV, our computer vision library of choice. Each marker is generated from a
unique integer, and that integer can be determined by looking at the marker.

We reserved ranges of integers for each type:
- 0–199 were graph cards
- 200–399 were equation cards
- 400–599 were addition cards

For example, look at this graph card:

![a white rectangle with black and white ArUco tags at each corner and text at the bottom center reading 'graph 0'](graph0.svg "One of many cards our users interacted with.")

- The top left tag has the number 0
- The top right tag has the number 1
- The bottom left tag has the number 2
- The bottom left tag has the number 3

With this simple specification, we can look at one tag and instantly know what
type of card it refers to and which corner of that card it is. Once we have two
or more tags, we know the orientation of the card. We ended up only recognizing
cards if we could recognize all four corners.

## Generating a PDF with Typst

We wanted to make hundreds of cards; manually making the image above in a
program like Inkscape would be extremely tedious. We knew these had to be
printed on paper anyway, so a better approach, we decided, was to make a PDF
file with each page corresponding to a card, or maybe fitting two cards on one
page for cards like equations that didn't require as much information.

That's right, programatically generating PDFs. Those of you who have seen me
recently already know where this is going…

Yep, [Typst](https://typst.app/). It's like LaTeX but if it was an actual
programming language with sensible defaults instead of a morass of macro
expansions that somehow works. It's like LaTeX but if you didn't have to look
up 5 different packages on CTAN to accomplish basic tasks. It's like LaTeX but
if it compiled in milliseconds. I've been [using it for some
time](/blog/summer-2025), so I wasted no time putting it to use.

Fist, I ran our Python script, written by Renn, that generated 1000 unique tags and
outputted them as cardinally numbered square images. Then, I made a Typst
object defining metadata for each card type:

```
#let metadata = (
  (
    name: "graph",
    num: 2, // how many cards to create
    offset: 0, // what number to start the tags at
    flipped: true, // if false, print two tags per page instead of one
  ),
  (
    name: "eqn",
    num: 24,
    offset: 200,
    flipped: false,
  ),
  (
    name: "add",
    num: 2,
    offset: 400,
    flipped: false,
  ),
)
```

I wrote a function called `single` which draws the four tags and the label that
make up a single card:

```
#let alignments = (
  top + left,
  top + right,
  bottom + left,
  bottom + right,
)

#let single(data, num) = {
    for i in range(4) {
      place(alignments.at(calc.rem(i, 4)))[
        #image("markers/marker-" + (data.offset + (num * 4) + i) + ".png", width: 3cm)
      ]
    }
    place(bottom + center)[#upper(data.name) #num]
}
```

Then, I wrote another function which calls `single` appropriately for the given
metadata:

```
#let generate(data) = {
  set page(paper: "us-letter", margin: SPC, flipped: data.flipped)
  for num in range(data.num) {
    if data.flipped {
      single(data, num)
      if num != data.num - 1 {
        pagebreak()
      }
    } else {
      block(height: (100% - SPC) / 2, width: 100%, single(data, num))
      if calc.rem(num, 2) == 0 {
        v(SPC)
      }
    }
  }
}

#for item in metadata {
  generate(item)
}
```

Being able to do simple things like write for loops and manipulate arrays made
this so much easier. In LaTeX, the only practical way of accomplishing this
would be to write a script in another programming language that then generates
LaTeX. Typst was far simpler.

Writing a Typst script was good progress, but the reality of engineering is
that people skills are just as important as engineering skills. Since none of
our team members were students at the University of Washington, none of us were
able to use the printers. Luckily, many UW students were in the same building
as us, and the first one I talked to kindly printed our sheets for us. I'm
proud of myself for asking a stranger to help us! I'm not sure I would have
been able to do that my freshman year.

## More progress

Our project required a laptop to connect to the projector and run the computer
vision code, and it's nice to have a spare laptop for that purpose so that no
one has to give up their coding computer any time anyone wants to test
something. Thankfully, we'd thought of this beforehand, and Danial had checked
out a laptop from the school library. Unfortunately, this meant we didn't have
root access on the laptop, so we found that even getting git installed was a
complicated process. I forget exactly how we made it work, but I think it
involved Lukas AirDropping the Go binary onto the library computer. Typical
hackathon shenanigans.

We braved the endless Seattle rain to grab some dinner—pizza and donuts—and
kept working on our prototype. Danial worked on using Gemini to analyze an
image of a handwritten equation and output its representation in
[SymPy](https://www.sympy.org/en/index.html), the library that we were using to
represent algebraic expressions. Renn made code that translated the camera view
to the projector view so that the projector's output could line up exactly with
the physical cards. He and I wrote code to find a card's bounding box using its
four tags and to draw that box on the card. This alone was pretty neat once we
got it working!

We found it a little tricky to turn the SymPy output into a format that OpenCV
could output through the projector. OpenCV wanted a numpy byte array, but SymPy
is designed for research and usually only outputs to files through matplotlib.
We looked through a lot of the source code, worrying that we'd have to vendor
some of it, but somehow we eventually landed on the tremendously intuitive
chain of properties and methods that was
`plot().fig.canvas.buffer_rgba().to_bytes()`, with some other calls in between
that I omitted for simplicity.

For some reason, this worked on my computer, but it crashed on Lukas's. After
thinking awhile, I realized it's because he has a high density display with one
logical pixel having a width of two physical pixels. So I added an environment
variable to account for that, and we were all good.

We started tying things together. Our initial implementation made a call to the
Gemini API every frame. Not a great long-term solution. I worked on caching
this result to improve the speed of our program and to avoid getting rate
limited.

## Moving around

The space we had chosen for hacking was nice, but unfortunately, it wasn't
available overnight, and the organizers asked us to move. This was highly
unfortunate because it meant we'd have to collapse the tripod, pack up the
projector and webcam, find a space close to an outlet with enough room for
everything, and set it up all over again. Finding a new space took the most
time; we probably lost half an hour, but eventually we decided we could just
use some of the furniture set up in the middle of the hallway. This is where we
stayed until morning.

## Design decisions

We had an interesting choice to make when it came to calling Gemini on the
equations. How do we minimize the number of times we make expensive calls to
our Gemini API key while also making sure that we can re-analyze an equation
card if it is physically updated? Do we try to remember a card indefinitely
after scanning it the first time?

We decided to process the equation on the first frame that an equation card's
four corners came into view. Since people tend to cover one of the corners when
they write something on the card, this was a very natural time to refresh
Gemini's view. It also meant that if Gemini did not correctly parse the output,
we could force it to try again by waving our hand in front of the equation.

For the longest time we were just parsing the equations and drawing a
placeholder image onto the graphs. Our coolest moment was the first time we
correctly drew a graph generated from an equation that we parsed.

![Three students look at a desk with a tripod holding a projector on it](big-three.jpg "Our project was quite novel to play with once it started graphing the equations it was given!")

This was very late in the night, and Renn started grinding out features. He
created add and multiply cards that could operate on an arbitrary number of
equations and then pipe that output to a graph card. He also made invalid
functions fail gracefully by making the projector color them red.

We also worked a lot on improving the reliability of our demo. We fixed several
bugs and addressed major performance issues.

## Morning

When the sun rose, we went back to the main area in preparation for opening
ceremonies. We were pretty relaxed because we felt good about our demo, and we
spent most of that time playing around with it to see what was impressive. This
time was really helpful because it wasn't clear what who should talk about what
when we started, but by the time we finished, each team member knew what they
were to discuss and what feature they would showcase.

![multiple cards laid out on a table with graphics projected on and between them](trig-identity.jpg "Here, the the multiplication card is used to prove a trigonometric identity. The product of the equations simplifies to cos(x).")

During this time, Oscar, whose name I hope I'm spelling correctly, stopped by
to check out our project. He was super cool and lent us his personal markers so
that we could give them to judges during our demos! These were tremendously
useful, as equations written in marker were significantly easier for Gemini to
parse than equations written with pencil or pen.

Strangely enough, we discovered that our project, written entirely in Python,
had a memory leak. After running for a few minutes, it would start to consume
tens of gigabytes of RAM. We solved one of the leaks by "closing" matplotlib
plots after grabbing their output, but it was clear there were more issues we
hadn't found, as the program still grabbed memory, just at a slower pace. This
didn't get in the way of our demos, however; we just restarted the application
occasionally as required.

Breakfast was fancy bagel halves with tomatoes and cheese and stuff.

Judging was delayed due to an issue in the software. I have been to seven
hackathons, and I don't think judging has been on time for even one of them.
During the extra time I mostly caught up on sleep. Danial and I took a walk
around the UW campus. It's huge compared to Mines's campus, and even though it
was founded just one decade earlier than Mines, its historic architecture is
much more impressive, probably because it's always been a bigger school.

## Judging

Judging went well. The judges liked to watch the papers move around, and they
were impressed when the equations they wrote were graphed in real time.
Everyone on our team did a great job of explaining our project enthusiastically
while also leaving time for other teammates to pitch in. We also got a lot of
questions about how the technical implementation worked.

One thing we overlooked was that we stored equations as a set object for fast
lookup times. At the time it did not occur to us that this prevented two equal
equations from being registered correctly. One of our judges worked in QA and
tried the equation 1+1, which obviously failed with this system and caused the
output graph to be 1. Oops!

When the last judge came, our equation parser just stopped working and marked
all equations as invalid. We blamed this on hitting a rate limit with the
Gemini API. Thankfully, we had recorded a video the night before, so we were
able to show the judge an earlier version of our working project. He seemed to
be quite understanding, and I'm grateful that he still found interesting
questions to ask based on what he saw.

After that judge left, we swapped out API keys and found that the equation
parsing still wasn't working, so something else must have been causing the
failure. We got pretty lucky with this one, as the inexplicable failure didn't
happen until judging was almost over.

I didn't see any other teams with a projector. Throughout the whole hackathon,
our project had been drawing eyes and questions, and that didn't stop during
judging. Many extra judges came by to evaluate our project. We felt fortunate
to see so many people because with the contingency judging plan in execution,
teams were only guaranteed two judges.

## Closing

After judging ended, there was some time before opening ceremonies so that the
judges could decide winners for each track. During this time, we mostly hung
out, and I once again caught up on sleep. We also spent some time finding Oscar
to return his markers to him.

Closing ceremonies did finally happen, though. Turns out we were first place in
the Invent track, one of two main tracks in the hackathon!

![Four students stand on a stage holding a banner that says 'Winner'](stage.jpg "We won first place! From left to right: Renn, Byron (me), Lukas, and Danial.")

This was pretty exciting because I'd never won a hackathon this large before.
That said, I think we really won before closing ceremonies. We won when we had
a great time making our project and when we met cool people like Oscar. I've
always liked to think that the actual creation part of a hackathon is what I
really come for, and the judging and awards are just meat on the cake. Now I
can finally assure myself that this stance isn't a coping mechanism for me not
winning awards often. It's just me being honest to myself. The thrill of
creating awesome software with awesome people is the reason I go. And it's 100%
worth it.
