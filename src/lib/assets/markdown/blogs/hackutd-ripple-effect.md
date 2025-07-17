---
title: 'HackUTD 2024: Ripple Effect'
published: true
date: 1734208091
description: I enjoy an action-packed return to the United States.
image:
  alt: my team poses in front of a HackUTD banner
  name: big_four
  ogExt: jpg
  optimizedExt: webp
---
After a few months of troglodytism (at least from the greater internet's
perspective), I've found the time to publicize my travels again. This blog
relates how I experienced November 15–17, my first weekend back in the US after
[studying abroad in New Zealand](/blog/nz0) for a semester.

When booking flights home, I faintly hoped circumstances might align just right
for me to attend a hackathon on the way. I waited quite a while before booking
a flight to maximize my flexibility and was elated to discover that [HackUTD:
"Ripple Effect"]() conveniently met all my criteria. This gave me a busy
itinerary:

**Friday:** flying from Auckland to Dallas, sightseeing in Dallas, eating
dinner with [Addison](https://tgrcode.com/)  
**Saturday and Sunday:** attending HackUTD with Addison,
[Megan](https://github.com/megankulshekar), and [Tyler](https://tbwright.dev)  
**Sunday night:** flying home to Denver  

## A Friday of Considerable Duration

Friday morning found me watching the streets of Auckland slide past the train
window for the last time as I made my way to the airport, where my flight
departed directly to Dallas at its scheduled time in the early afternoon. I
happened to sit next to a lovely couple from Whanganui who helped me pass the
time with friendly chatter.

As someone who seldom travels globally, I was excited to experience a novel
phenomenon. Thanks to crossing the International Date Line, my flight arrived
in Dallas around 07:00 Friday, several hours *before* takeoff. That left me an
entire day to explore Dallas.

After I landed, it took me a while to find the train to downtown Dallas. One
would think I'd have gotten pretty good at travelling after doing it for five
months, but apparently I still have room for improvement—it was about forty
minutes after boarding the train that I realized I didn't know where to get
off, nor was I able to find out, as I hadn't yet renewed my US phone plan. I
resolved this problem by arbitrarily picking a stop and navigating downtown
with offline maps. This experience reminded me that being prepared is an
important aspect of travelling (and life in general).

After walking around downtown, I resolved to visit the [Perot Museum of Nature
and Science](https://www.perotmuseum.org/) because I heard they have dinosaur
fossils, and I've been going through a "dinosaur phase" recently. I wasn't
disappointed. Not only did I see several dinosaurs, I was pleasantly surprised
by a [*Quetzalcoatlus*](https://en.wikipedia.org/wiki/Quetzalcoatlus) skeleton
hanging from the ceiling.

Next, I took another train to Fort Worth to rendezvous with Addison, who'd also
arrived a day before the hackathon. Even though he wasn't coming from another
country, he and I were eager to try Texas barbecue, which proved to be a highly
enjoyable experience. Afterward, we took the train back to UTD, where our hotel
and the hackathon were located. It was a long late-night ride, but I
appreciated the chance to chat for a while.

At this time of year, Dallas is 19 hours behind Auckland, so my Friday lasted
43 hours. Although staying awake for so long is unsustainable, it's interesting
to imagine how our productivity could change if days were [longer than 24
hours](https://xkcd.com/320). I was able to accomplish a lot with the extra
time.

## The Hackathon

![glass-walled university building with large HackUTD banner suspended over vestibule](waiting.webp "Waiting in line to check in.")

Monday morning, Addison and I checked out of our hotel, took a bus to the
university, and joined the check-in line. Tyler and Megan soon joined us.
Coding officially started at noon, but we didn't know what to make. Lunch,
talkative proclivities, and indecision delayed us for about three hours.
Eventually, we resolved to create an app for sharing nearby destinations, ideal
for the spontaneous adventurer. The main pillars of functionality were:
* Users can view nearby destinations either as thumbnails on a grid or as pins
on a map. These destinations expire by a certain date.
* Users can visit destinations, take a selfie of themselves there, and add the
selfie to a gallery of images other users have taken at the same location.
* After a destination expires, users can no longer upload selfies, but they can
browse the gallery.
* Users can create destinations of their own.

Like previous hackathons, my greatest contribution was a frontend based on
Svelte. Since my last hackathon, [Svelte&nbsp;5 has become
stable](https://svelte.dev/blog/svelte-5-is-alive), so I got to use it for the
first time. Surprisingly, not only did I learn the major changes quickly, I
also approved of all of them. Before, users of the framework had to familiarize
themselves with Svelte-specific JavaScript magic, like `let` automatically
making variables "props" and `$:` cryptically indicating reactive state. Now,
runes are an intuitive syntax once the names are memorized. Being a student, I
can't assess Svelte's viability for large-scale projects, but for hackathons
and personal projects, I think it's so good that it would be preposterous to
use any other framework. I look forward to migrating my website from
Svelte&nbsp;4 to Svelte&nbsp;5.

We used the Google Maps API to embed a map showing the destination locations.
For a while, I was perplexed by the existence of the map in DOM but the absence
of the map in the viewport. At first, I blamed this behavior on
misconfiguration, but later, Addison helped me discover that the height of the
map was 0&nbsp;pixels by default. No wonder it didn't appear!

My mind was focussed on enjoying the first opportunity in several months to see
US-based friends in person, rather than fastidiously chronicling everything
that might merit inclusion in a blog post, so I don't remember enough to
provide as much detail as usual. However, I'm pleased to report that I
succeeded in my focus area; I can't imagine a more enjoyable way to return to
my home country. I was honored to be a part of what will likely be the last
hackathon (at least as a participant) for Tyler and Addison, who are both
graduating this semester. I also was glad to work with Megan, the only frequent
hackathon attendee at Mines with whom I hadn't partnered before. To these
three, who flew to Dallas to spend time coding and hanging out: Thank you!

![My team poses in front of a HackUTD banner. I discretely hold an energy drink in my right hand.](big_four.webp "I definitely didn't forget to put my energy drink down before posing for this photo. From left to right: Megan, Tyler, me (Byron), and Addison.")
