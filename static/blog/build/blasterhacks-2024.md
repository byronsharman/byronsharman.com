![a screenshot of our finished application's image feed page](blasterhacks_screenshot.png "The feed page of our finished app.")

I've been trying to find fun things to do more often in college, so when I heard my friends were signing up for a hackathon, I knew I had to try one. In the worst case, I'd lose a weekend, and it certainly sounded more fun than sitting in my dorm all day.

My teammates [Grant Lemons](https://grantlemons.com/), [Elijah Potter](https://elijahpotter.dev/), and [Lukas Werner](https://lukaswerner.com/)—who are also freshmen—joined me Friday night for the opening ceremony, at which I collected swag, LinkedIn connections, and pizza and demonstrated my phone's reverse wireless charging capability to a bewildered iPhone user. Then we were off to the brand new Labriola Innovation Hub to start coding. Among the ideas we had previously brainstormed, we had considered a competitive multiplayer game somewhat inspired by [Vim Snake](https://vimsnake.com/), but after learning that many of the judges weren't technically inclined and wouldn't even know what vim was, we decided on an app that encourages office workers to take brief exercise breaks by allowing them to post a picture of their workout afterward ("BeReal for exercise" was our most common way of explaining it).

We decided to make a progressive web app, a website that (ideally) functions as a native app once installed but takes advantage of the web's cross-platform nature. For our tech stack, we selected [Firebase](https://firebase.google.com/) for the backend and [SvelteKit](https://kit.svelte.dev/) for the frontend, along with [Tailwind](https://tailwindcss.com/) to save some time with CSS and [Flowbite](https://flowbite-svelte.com/) for component templates. Elijah and Grant worked on backend tasks like setting up Firebase and making a service worker to send notifications. Lukas embarked into SVG hell by trying to recreate the progress circles seen in the Apple Watch interface, animations and all.

I was first tasked with creating the UI to take a picture, which was much more difficult than I anticipated. There is no universally supported browser API for taking a still frame from a `<video>` element; the widely accepted alternative is to render to a hidden `<canvas>` and then use the Canvas API to output the image. Hopefully in a few years the [`ImageCapture` API](https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture) will gain greater support so that this hack is no longer necessary.

Since it was snowing heavily, we initiated a midnight snowball fight which I found very enjoyable. It was immensely satisfying to vent my frustration with the Canvas API on my friends by hurling snowballs at them. I stayed outside longer than my teammates, which probably wasn't wise, considering I was in shorts and a T-shirt.

I returned to find that Elijah and Grant had set up Firebase and also created a significant portion of the frontend. Meanwhile, Lukas had miraculously finished the SVG circles. I recharged on Red Bull and consulted our board to determine my next endeavor.

As we hopped between various tasks, we found that a [Kanban board](https://en.wikipedia.org/wiki/Kanban_board) was a highly effective project management system. It also had the benefit of intimidating other teams with the sheer amount of sticky notes in the "DONE" box, which Elijah had strategically made small, increasing the sticky note density and thereby our perceived progress.

![Kanban board with sticky notes denoting tasks for each group member](kanban.jpg "By the end of the hackathon, our Kanban board made us look extremely productive.")

Consistent and reliable notifications proved difficult and time-consuming; however, I mostly worked on the frontend while my teammates addressed that. I learned what [DataURLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs) are when writing the code that uploads images to the backend, and this was more rewarding than floundering through the image capture problem because DataURLs are an actual design solution rather than a rope made out of band-aids. Besides, I am more likely to use them in my career.

Until I started typing this, I didn't realize how much the Red Bull eroded my recollection. One memory I do retain from Saturday is the mini competitive programming competition. I already attend the Competitive Programming club, but these problems were exceptionally satisfying for my skill level; they were mostly two- or three-liners in Python, but still tricky enough to require thought. Even though I placed third, a series of technicalities caused me to win the first place prize, which was described to me as a plush ducky.

![plush duck pillow held in midair](duck.jpg "I was not expecting to win this.")

On Saturday, I also did tweaked a lot of the frontend, working extensively with Tailwind and Svelte. Overall, I like Svelte, and at the time of writing, I'm using it to generate my website. Because it elminates a lot of boilerplate, it makes the app-writing process relatively simple.

The fact that I don't remember much else from Saturday corroborates my teammates' assertion that I needed to sleep. By Saturday night, they basically coerced me into going to bed, and I reluctantly complied. In retrospect, it's probably good they did, given my steady decrease in productivity since Friday night. The next morning, I woke up to discover that push notifications were mostly working, and we finished writing our project description on DevPost just before the 08:00 ending time.

We probably should have prepared more for the presentation, but winging it served us well; we got second place in the general track!

![me and my team members accepting our second place prize at the closing ceremonies](secondplace.jpg "We all won bluetooth speakers! From left to right: me (Byron), Grant, Lukas, Elijah.")

## Retrospective

Overnight activities with friends are already fun, but writing code on top of that is even better. Besides, there's free food, prizes, and networking opportunities. I learned about technologies like Svelte and Tailwind that I'm now using in my own projects. Compared to other recreational programming projects, hackathons have the advantage of a predetermined timeframe, mitigating overcommitment concerns. They're also highly collaborative; I built skills that I can't build with solo projects. Simplest of all, making things is fun and fulfilling. The sophistication of our creative abilities is humanity's greatest distinction.

I've signed up for several more hackathons, and I can't wait to write about them here!
