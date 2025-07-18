---
title: HackCU X
published: true
date: 1712017815
description: >-
  I summarize my experience at the 10th HackCU hackathon hosted by the
  University of Colorado Boulder.
image:
  alt: I code on my laptop behind a row of 3 Monsters and a Red Bull.
  name: caffeine
  ogExt: jpg
  optimizedExt: jpg
---
After having a blast at [Blasterhacks](/blog/blasterhacks-2024), it was a no-brainer to attend HackCU in Boulder, which is only a 45-minute drive from Mines. Seven Mines students attended in total, so we split into two Lyft rides. Because [Tyler](https://tbwright.dev/) and I had already agreed to be teammates, we started brainstorming in the car. Our driver was friendly, and our ride was pleasant but uneventful.

Upon arrival, we signed in and breakfasted on some Einstein's bagels. Then, during a continued brainstorming session, we came up with the idea of a productivity note-taking workspace in which various kinds of content—Markdown, images, videos, etc.—can be manipulated. These would be tied together by an LLM-powered chat that could read their contents. This idea sounded fun to [Addison](https://tgrcode.com/) and Ryan, also Mines students, who joined our team, growing it to the maximum size of four.

After the opening ceremony, we started sketching the UI and finalizing the tech stack. We decided to use React, hoping its maturity and large ecosystem would facilitate the implementation of certain features. When starting to lay out the frontend, we needed a name for the note containers, so we abbreviated *window object* to the irresistibly silly *wobject.*

I started by implementing the first kind of wobject: a Markdown editor and previewer with inline LaTeX math support via [`remark-math`](https://github.com/remarkjs/remark-math/) and [`react-mathjax`](https://github.com/SamyPesse/react-mathjax). This was fun to put together because it yielded a satisfying result despite being fairly easy. Tailwind's [typography plugin](https://tailwindcss.com/docs/plugins#typography) made it trivial to stylize the Markdown after it was converted to HTML. It's configurable with sensible defaults, and it also powers the styling for my blog. You should check it out!

Addison wrote code to make wobjects draggable and resizable. Wobjects needed to contain HTML, and since canvases require awkward hacks to render DOM elements, we decided to implement the functionality with just `<div>`s and CSS. Implementing this from scratch requires a lot of logic; it's a feature whose [actual complexity exceeds its perceived complexity](https://xkcd.com/1425/), especially when implemented with web technologies.

This is a good time to take a break to discuss the role of caffeine in hackathons. Caffeine and hackathons are made for each other. Caffeine is part of the hackathon experience. I was happy to see that the HackCU organizers blessed us with free Red Bull and Celsius, and I'd also brought my stash of Monsters from my dorm. There's something magical about drinking something sugary and feeling tiredness morph into determination. It's like [typing `import antigravity` and feeling yourself fly](https://xkcd.com/353/)! After just a few sips, I was ready to get back into action.

![I code on my laptop behind a row of 3 Monsters and a Red Bull.](caffeine.jpg "Fuel for the journey. Image credit: Andy Strong on LinkedIn.")

Ryan noticed a problem with the wobject creation menu: new wobjects wouldn't appear until the page was reloaded. This appeared to be related to how the fetch API was sending requests to the backend. We tried adding React Query to standardize fetch behavior and spent a long time trying different fixes without avail.

The rest of the team also started getting blocked. By 00:50, we collectively decided it was time for a break. Apparently, Mines students attending HackCU in the past have a tradition of going to Insomnia Cookies, a cookie shop whose brand revolves around being open from afternoon to morning. The walk there was fairly long, and it started hailing at the end! That didn't stop me from indulging in a monstrous vanilla ice cream sandwich with fresh, warm chocolate chip cookies serving as the "bread." Consuming this felt very pleasant after wrestling with React.

Although my teammates craved more dinner, I wasn't hungry, so while they found a restaurant, I headed back to campus to work on styling the UI. I am one of those strange people who enjoys fiddling with CSS. It gives me the same satisfaction as correcting punctuation on Wikipedia. Starting with the whiteboard selection sidebar, I tried to establish a design language that could be extended to the whole project. In retrospect, it would have been better to use [Flowbite](https://flowbite.com/) to automate this. It worked well at Blasterhacks, and had I spent less time on eye candy, I might have been able to accomplish something more impressive.

My teammates came back from dinner, and shortly afterward, the backend was ready for testing. I haven't mentioned Tyler's technical contributions yet because in addition to contributing to some important frontend features like the chat interface, he was writing the backend singlehandedly. It contained a database to store wobject state persistently over login, and it also stored wobject content to use as context for the LLM chat. This was powered by some cool [Qdrant](https://qdrant.tech/) vector database magic in combination with [Cohere](https://cohere.com/) that I don't understand. I do know that it was pretty cool when it started working, though!

![a screenshot of our final app showing several wobjects and the chat](multinotes.avif "The chat bases its response on the content of wobjects.")

However, although we'd already implemented most of the functionality we had planned, lots of polish was necessary. For example, wobjects loaded with sporadic reliability, and they jumped around when resizing. Seeing that several of these issues stemmed from our underlying approach, Addison aggressively refactored the frontend, hoping to fix the React problem Ryan and I were struggling with earlier. He refactored so much code that the rest of us were skeptical at first, but considering how many wobject issues it fixed, it was probably the best move. Even by the end of the hackathon, there were a lot of janky things, but that's what a hackathon is all about—a **proof of concept** showing off an idea.

Then, we discovered the cause of several of our issues: if a state change causes a React component to redraw itself, fetch requests originating from that component are killed. The fact that wobject volatility necessitated many changing states exacerbated the effects of this complication. Like many industry standards, React has some good points but also some annoyances. I lack the experience to fairly compare it with its alternatives, but I can say that I've enjoyed Svelte for smaller projects.

We were coding in a large lecture hall, and we started to notice a strange change in our environment. The room was gradually getting brighter, as if someone were cranking up the lights...oh, that's right. The sun! This harbinger of the end of hacking time invigorated us with a fresh spurt of energy.

Tyler wrote both the frontend and the backend (again) for a global search. We had a sidebar of *whiteboards* each containing their own wobjects—essentially the equivalent of workspaces and windows in the traditional desktop metaphor. Global search sorted whiteboards by topical relevance to the search parameter. This was pretty neat, as you could do something like write "Darth Vader" in a wobject, then search "Star Wars" and see the whiteboard containing that wobject appear first.

Addison took advantage of the fact that our architecture made it easy to add more wobjects by implementing three new types in just the last 30 or so minutes. He added iframe embeds, standalone images, and Tweets. (Are they still called Tweets?) We also had the Markdown previewer, the code editor, and the YouTube embedder.

Ryan wrote most of our DevPost entry and captured some great screenshots. I added some more frontend tweaks like making the wobject close button work and prettifying the whiteboard creation dialog.

Then we headed into lunch. The whole hackathon was a great networking opportunity; there were tons of other students and some corporate recruiters. The passion of the hackathon community was super contagious.

Judging started right after lunch. We were surprised to learn that we only had three minutes to present our project. Part of our achievement was the sheer amount of things we accomplished in 24 hours, and it was hard to advertise that to the judges in three minutes. We later learned that most of the judges were non-technical, so we should have considered selling our project differently, and in retrospect, perhaps we should have dedicated more time to practicing our presentation. We did the best we could, though, and were encouraged that the judges came to our table several times.

At the closing ceremonies, we didn't win anything, but we still had a great time, and the thrill of late-night collaborative coding lives on. I was happy with what my team had accomplished, and I also learned a lot about React and about hackathon techniques. Thanks to my teammates who were a pleasure to work with and also carried me a little. I'm inspired to keep working on projects so that each hackathon I can contribute a little more!

If you've gotten this far, thanks for reading! Keep an eye on this blog for more hackathon posts.
