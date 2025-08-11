---
title: HackKU 2024
published: true
date: 1714663989
description: I narrate the happenings of my last hackathon of the 2023–2024 school year.
image:
  alt: Me and my two teammates posing for a photo during judging at HackKU
  path: judging.jpg
---
Well, well. There's only one more week left in my first year of college. It's a good time to look back on the year and also to cover my last hackathon as a first-year student. HackKU, hosted in Lawrence, Kansas, was my first official [Major League Hacking (MLH)](https://mlh.io/) event. I was accompanied by teammates [Tyler](https://tbwright.dev/) and Danial.

## Pre-hacking events

As with any hackathon, a major theme of my HackKU experience was disregard for sleep, starting from the very beginning, when I woke up at 03:40 in order to catch our flight to Kansas City. I met Danial on campus. He had arranged for another Mines student to drive us to the airport, which happened without event. We met Tyler at the airport. I looked for breakfast, but the lines were long, and many places weren't open, so I opted to eat in Kansas City instead.

Arriving in Kansas City several hours before needing to depart to Lawrence, we amused ourselves with too many activities to describe in detail. We satiated our hunger at Fritz's, a train-themed restaurant characterized by its unorthodox ordering system. Instead of the traditional waiter/waitress model, customers place orders through telephones at their tables, and food is delivered from the kitchen to customers via an automated rail system. This made it pretty fun to get food, and I'd imagine that people younger than us would enjoy it even more than we did.

The prices were very competitive, which I appreciated as a college student. This burger cost me $4.99 before tax:
![a half-eaten burger from Fritz's](burger.jpg "Not the best I've ever had, but quite reasonable considering the price.")

My experience blogging about the two previous hackathons of the semester led me to realize the value in logging brief updates in real time, as it usually takes me several weeks after a hackathon to write its blog post, by which time my memory is eroded. Additionally, this practice allows me to retain details that sleep deprivation would otherwise destroy. That's why you'll see some very precise timestamps in the rest of this post.

After an uneventful drive to Lawrence, there were still a few hours before hacking started, so we found a restaurant and grabbed some mac and cheese. Satisfied, we returned to the venue at 16:50, where we checked in, found a spot to work, and chatted with some of the employers recruiting at the event. Next, we went to opening ceremonies, and the organizers revealed the themed track to be social good. It was finally time to start!

![The organizers present us their slideshow at opening ceremonies. The current slide says "HackKU" and prominently displays the event's branding.](opening_ceremonies.jpg "Image credit: HackKU organizers")

## Hacking events

Unfortunately, we still didn't have an idea, so we spent the first two hours brainstorming. Eventually we held a ranked-choice voting session to select the best of our top ideas: a suite of puzzle games oriented towards fighting memory loss. Each individual player would see customized games created by family members or loved ones. We wanted to implement three games:
- **Matching:** the player matches family members' portraits to their names.
- **Flashcards:** the image–text pairs from the matching game are shown to the player in flashcard form.
- **Puzzle:** an image is automatically split into fragments from which the player must reassemble the original image.

This gave us a pretty good idea of our tech stack:
- a SvelteKit frontend, since I like SvelteKit and wanted to work on the frontend;
- a Postgres database to store per-user image blobs, strings, and configuration; and
- a FastAPI backend to serve data from the database to the frontend.

It took a while to gain momentum. Danial had to resolve issues related to his GitHub account. Tyler was fighting a headache, so he had to take a break to get some drugs. As for me, it took longer than I'd like to admit to set up a minimal SvelteKit template. It wasn't until 00:15 that we started setting up the database.

It occurred to me that there was some shared functionality between matching and flashcards; they both needed to render either text or an image, depending on the database contents. I resolved to wrap this functionality in a Svelte component which I called `Element`. Meanwhile, Danial started working on dragging and dropping for the matching game. Similar to our experience at [HackCU](/blog/hackcu-x), it seemed best to implement this via HTML and CSS rather than the Canvas API. If the draggable boxes couldn't contain HTML, then there wasn't much point in making an `Element`. Danial and I finished this pretty quickly, considering we were just a couple of freshmen at a hackathon with limited Svelte experience. It wasn't hard to integrate the results of our two tasks.

By 01:37, Danial and Tyler were fast asleep despite the unsuitability of our office-like space for rest. I felt awake enough to be productive, so I tried to implement the flashcards. Svelte has a concept called [slots](https://svelte.dev/docs/special-elements#slot) which allows a parent element to place arbitrary children. Flashcards had two slots, one for each side, and I wanted to put `Element`s in them, but I kept getting errors I didn't understand. I finally figured it out almost an hour later. To the best of my knowledge, components are exported from `.svelte` files under whatever name you choose, as the syntax for importing a component is just
```ts
import Element from 'elementComponent.svelte';
```
Well, it turns out I was writing this:
```ts
import Element from 'componentThatIsNotElement.svelte';
```
and my errors were resulting from the fact that I was treating some other component as an `Element`. This seems like a design oversight to me. Maybe there is a preventative technique I have not discovered.

I'd done a lot of stuff that day. I'd woken up at 03:40, explored too many places in Kansas City to talk about here, taken extensive walks in the beating Kansas sun, and racked my brain for any project idea worth pursuing. I felt dirty and sweaty and itchy, and I'd been awake for more than 24 hours. I tried very hard to keep making good progress in my code, but both my teammates were still asleep behind me, and despite my efforts, I kept drifting off. Between two of these micro-naps, I finally realized that I needed to spend the energy to find a place to properly sleep. The first floor of the building was very cold, but after lots of exploring, I finally found an unoccupied room on the warm upper level that hackers were allowed to use. I lay down on the floor with my jacket as a pillow and a travel blanket loaned to me by Tyler.

When I fell asleep at 05:40, I vainly expected to wake up refreshed and excited to attack another problem. I woke up to my phone alarm at 07:40, and (surprise!) two hours of sleep wasn't enough. I still felt emptiness in my head and undigested Red Bull in my stomach. No matter, though. Even if not fully recharged, I was recharged enough to write more code!

By 08:30, I had finished a working prototype of the flashcards and cleaned up the drag-and-drop code for matching. I didn't record in my notes what time my teammates woke up, but I think they were awake by then. The judging rubric listed a good README as part of the criteria, so Danial wrote that for us. A couple of hours later, I finished a menu for selecting from multiple options, intending to use it both for user selection and game selection. It seemed like it was time to start integrating the backend with the frontend. Tyler had been busy wrapping everything in Docker containers so that the app could entirely run on Google Cloud Platform (GCP), where our changes were deployed as soon as we pushed them thanks to some CD he wrote.

At the time, the flashcards only showed placeholder data rather than fetching data from the backend, so Danial set about integrating the two. Meanwhile, I needed to make a Typescript type to represent a text–image pair from the backend, which for two hours stumped me with errors I didn't understand. I wasn't sure whether to use a type or an interface, so I tried both, and neither worked. After Tyler did it for me, I realized that I'd put commas instead of semicolons between the attributes. Oh, Typescript...

Meanwhile, a runny nose which I had attributed to spring allergies was accompanied by a sore throat, forcing me to accept the fact that I had a cold, and even worse, preventing me from consuming heavily caffeinated beverages.

Tying the matching game to the backend required considerable refactoring. Previously, it was sufficient to only check DOM elements for collisions, but detecting if two elements matched required coupling the DOM with database information. I accomplished this by creating another component and binding it with [`bind:this`](https://svelte.dev/docs/component-directives#bind-this). In Svelte, you can bind elements generated by a for loop by assigning them to the elements of an array. Since there were two elements for every pair, I had to do [a little index calculation](https://github.com/tbwrigh/HackKU24/blob/main/frontend/src/routes/patient/%5Bslug%5D/matching/%2Bpage.svelte#L67-L68) to pull this off. I'd be interested to know if there is a better way to accomplish this. I haven't looked much at Svelte&nbsp;5; maybe it provides a mechanism that facilitates this pattern.

Textual elements had already been integrated with the database, but image elements still weren't. I resolved this without much difficulty. Then, I polished the dragging and collision algorithms for the matching game, making the collisions a little more accurate. Another problem I faced with the matching game was preventing cards from spawning off screen. This was more difficult than I anticipated because images change size very late, always after the first paint, and I was having trouble precomputing their size. Eventually, I gave up and put a giant margin around the border of the window in which cards aren't allowed to spawn. This decision stemmed from learning in HackCU that some problems do not merit the time required to solve them. It's one of the differences between hackathon coding and real-life coding.

Danial had tied the flash cards to the database all by himself, and with his job well done, he went to sleep. I took a moment to slap some more CSS on them and fixed a bug in which the carousel was unable to switch to the last flashcard.

By 03:55, I had been awake for 48 hours with the exception of the two-hour nap the night before. This combined with my cold made me very tired. My sense of surroundings and my internal model of the room around me were inaccessible. It was just me and the code. Just a few more hours until daylight!

![XKCD comic 776, "Still No Sleep"](still_no_sleep.png "https://xkcd.com/776/")

Tyler had implemented the backend aspect of the puzzle game and now was trying to implement the frontend, which was the trickier part. He'd decided to use a canvas, and the coordinates he was getting for mouse position were not only inaccurate but also did not appear to follow a pattern. We knew this was because canvases use a different coordinate system than CSS, but we weren't sure why our translation code was behaving unexpectedly. Eventually we copied and pasted enough lines of code from StackOverflow to make it work. This happened at about 05:00.

Everything in our design was very white and business-like and boring—entirely inadequate for the target audience. I experimented with the design language, adding a background image and transparent UI. Although this still didn't look as nice as I'd hoped, it was significantly better than what we had before, so we rolled with it.

I'd been working for a while. The sun was about to rise, and hacking time was about to end. It was time for a break. Tyler had recommended bringing a clean change of clothes, which was a marvelous idea. The HackKU organizers had arranged a shower system, but I'd missed the time window for that, so clean clothes were the next best thing. I mean, that's basically the same as a shower, right?

It was difficult to navigate away from some pages, so in the last few minutes, I added a back button. At first, it routed the user to the previous page, resulting in the quintessential back button problem: Once you've gone to the previous page, the new previous page is the original page, creating a cycle. I changed the button to parse the URL and navigate to the parent of the current route. Meanwhile, my teammates wrote our Devpost entry. As usual, we finished just in the nick of time.

## Post-hacking events

Somehow we managed to stay awake for judging. There were some people from another team who were assigned to the same table, and it was super enjoyable to chat with them.

Closing ceremonies were fine. Although we weren't awarded a prize, we still had a great time hanging out and writing code. Besides, I don't travel out of state very often, so that was fun as well.

![Danial, Me, and Tyler posing for a picture in front of our finished project at the judging table](judging.jpg "Image credit: HackKU organizers")

There was a long ride home, but I was asleep for most of it. It felt amazing to finally take a long, warm shower and climb into a real bed.

## Retrospective

I am very glad I discovered hackathons this semester and took the initiative to attend three of them. Hopefully I'll take advantage of the next few years to increase my average hackathon per semester rate. Until then, I'll do my best to post something interesting here from time to time.

Thanks for reading!
