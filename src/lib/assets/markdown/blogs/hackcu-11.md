---
title: HackCU 11
published: true
date: 1745599436
description: My first hackathon of the Spring 2025 semester.
image:
  alt: a selfie with three students looking up from their laptops
  path: team.jpg
---
Another year, another hackathon season! This time, I'm recounting the 11th
iteration of HackCU, which I attended with
[Megan](https://github.com/megankulshekar) and
[Renn](https://github.com/kylo33).

Leaving the Mines campus on a sunny Friday morning, we rolled into one of
CU&nbsp;Boulder's many parking lots with plenty of time to spare. We checked
in, acquired shirts, and contemplated what to create. The prevailing idea was
to make something with the [Congress.gov API](https://api.congress.gov/). We
wanted to visualize the data in a creative way and provide an interface similar
to Congress's official website but simplified for ease of use.

Once hacking time began, Renn started working on a [sankey
plot](https://en.wikipedia.org/wiki/Sankey_diagram) showing the bills move
through the various stages of Congress. Megan, who'd recently studied machine
learning in class, wanted to apply this knowledge to our app, so she researched
how to train a model that predicted the probability of a bill passing. I
figured searching would be an important functionality, so I set up a simple
fuzzy search with [Fuse.js](https://www.fusejs.io/). This worked great for
congresspeople, but for bills, a much larger dataset, it was too slow to
execute every keypress.

At this point, there existed three tasks requiring the bill data: making a
visualization, training an ML model, and generating a search index. For all of
these, local access was preferable to remote access, so Renn decided to
download all bills available through the API. Unfortunately, bills were only
available as XML files with inconsistent formatting and fields. Eventually,
however, he wrote a Bash script that downloaded all 156,669 bills, concatenated
the resulting paginations, removed the inconsistencies, and inserted the
results into a SQLite database. This allowed us to implement a performant
exact-match search with the
[`LIKE`](https://www.sqlite.org/optoverview.html#like_opt) SQL keyword. We
probably would've wanted a more sophisticated search for a production-intent
app, but this worked well given our time constraints.

After searching was functional, the next step was to make it approachable. I
put the results in equal-width boxes, added summaries underneath the titles,
included dates, highlighted the portions of the titles matching the search
text, and more.

![a screenshot showing bill search results with titles highlighted to match the search query](search_screenshot.png "The finished search page.")

Lots of these features came with small sub-problems. For example, since
summaries were not part of the locally available data, each bill incurred a
network call to fetch its summary—and bills changed every keypress. This made
searching feel unresponsive. We solved the issue by making each result an
expandable card that didn't load the summary until clicked on. Thanks to
Svelte's [`transition:`](https://svelte.dev/docs/svelte/transition), expanding
and collapsing the cards was delightfully easy to animate.

Highlighting matches presented another problem. At first, I used
[`String.prototype.replaceAll()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)
to wrap every occurrence of the search text in a `<span>` element with a yellow
background color. Unfortunately, this made all highlighted text lowercase
because I first converted the title to lowercase for case insensitivity. After
perusing the documentation awhile, I learned two things about `replaceAll`.
Firstly, the pattern to be replaced can be a regular expression instead of a
string, and in JavaScript, regular expressions can easily be made
case-insensitive by adding a flag. Secondly, the replacement argument doesn't
have to be a string. It can be a function that receives the matched pattern
(with case preserved) as an argument and returns the desired `<span>...</span>`
string. Aided by these two discoveries, I was able to preserve the case of
highlighted text. (I didn't realize until writing this that result highlighting
could be thrown off by searching for a valid regular expression. Although this
edge case never affected our demos, it could be easily solved with the upcoming
[`RegExp.escape()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/escape)
function.)

Around this time, Renn finished the sankey plot, giving me the opportunity to
refresh the look and feel of the homepage with the plot emphasized.

By this time, it was past midnight, so we took a break to observe Mines
students' tradition of visiting Insomnia Cookies every HackCU. Despite the
strange hour and distant location, [Tyler](https://tbwright.dev/) was happy to
join us. I purchased the same thing as last time: a scoop of vanilla ice cream
sandwiched between two warm cookies. Given how good it tasted, it must have
contained exactly the nutrients my body needed! My takeaway was that I should
eat cookies and ice cream more often.

After this break, I reviewed my new design. It was my first foray into
gradients, interface elements I've seen used sparingly but effectively in
modern websites. I can't say spewing one all over the header is something I
would brag about to a potential employer, but at the time its appearance
pleased me. In fact, our UI looked quite nice for a hackathon project. This was
important because a main motivation was overcoming the dated and technical UI
of the first-party Congress website.

![a screenshot showing a bill with information like the status, probability it passes, summary, and history](bill_screenshot.png "The bill overview page, one of several we implemented.")

Seeing the "Actions" timeline at the bottom reminds me of another little
adventure. Megan had added the timeline using a third-party timeline library.
Although it looked a lot better than what we had before, it was designed for
the line to be vertically centered with text elements on alternating sides. It
was easy to move all elements to the right, but that didn't remove the
now-empty left half, nor was there an option to do so. Fishing around in the
DOM inspector, I found that the undesirable `div` had a class attribute
`opposite-block`. Unfortunately, it was nested under quite a few other
elements. How could I add `display: none` to it? I did so by writing a selector
for all direct and non-direct child elements of the timeline with that class
attribute. Turns out the Tailwind syntax for this is
`**:[&.opposite-block]:hidden`.

> No, I did not use AI to figure this out. I read the documentation! (Whoa!)
> This was important because at the time there was a new backwards-incompatible
> release of Tailwind for which AI had little training data.

As the end drew near, most of my commits were minor things like [`text-wrap:
pretty`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap), showing
`<1%` instead of `0%` when the chance of a bill passing was between 0 and 1
percent, and other little details. Megan and Renn both took a moment to sleep.
I didn't, but given how rapidly my productivity declined, I probably would've
accomplished more in the long run if I had!

I really enjoyed working with my teammates. Megan's ML model was an extremely
cool feature that added a lot of value to the project; besides the
visualization, it was the only functionality not implemented by Congress's
website. Even though it was his first hackathon, Renn did a lot of the heavy
lifting, writing most of the backend as well as designing our architecture and
processing a big dataset. Overall, the hackathon was a great way to spend a
weekend, and I hope to go again next year! Thanks very much to all the
organizers, volunteers, and sponsors who made it possible.

![a selfie with three students looking up from their laptops](team.jpg "From left to right: Megan, me (Byron), and Renn.")
