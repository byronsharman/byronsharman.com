Another year, another hackathon season! This time, I'm here to tell you about
the 11th iteration of HackCU, CU&nbsp;Boulder's flagship hackathon, which I
attendend with teammates [Megan](https://github.com/megankulshekar) and
[Renn](https://github.com/kylo33). Leaving the Mines campus Friday morning with
plenty of time to spare, we spent some time brainstorming ideas and decided to
do something with the [Congress.gov&nbsp;API](https://api.congress.gov/). We
knew we wanted to make this data more accessible than Congress's website does,
but otherwise, our goal wasn't very clearly defined by the time we started
coding.

In the beginning, I toyed around with different things one might do with the
data, like searching through members of Congress or showcasing a list of recent
bills. Knowing npm, I figured there would be plenty of fuzzy search JavaScript
libraries, and I was right. However, after deciding to move the search
functionality to searching bills instead of members, I realized that this
method would no longer be fast enough to update on every keypress.

In the spirit of a true data collector, Renn decided to download all available
bills so we could search quickly through a local copy. This was pretty
difficult, as they were only available through paginated XML files with
inconsistent formatting and fields. Eventually, however, he wrote a Bash script
that inserted all 156,669 bills into a SQLite database, allowing us to
implement a crude search very easily with the `LIKE` SQL keyword. This was
quite performant.

Meanwhile, Megan, who'd recently covered machine learning in some of her
classes, wanted to apply this knowledge to our app by creating a model that
predicts whether a bill will pass by analyzing other bills with similar
characteristics.

Though search was functional, there was a lot of CSS to write to make the
search results look nice. I put them in nice boxes, added summaries underneath
the titles, included dates, highlighted the portions of the titles matching the
search text, and more.

Lots of these tasks came with small sub-problems. Since summaries were not part
of the locally available data, each bill matching the search results incurred a
network call to fetch its summary, and every time a key was pressed, the search
results changed and the whole thing had to be done again. We solved this issue
by making each result an expandable card that didn't load the summary until the
user clicked on it. This was a good place to incorporate animation, which was
delightfully easy with Svelte's
[`transition:`](https://svelte.dev/docs/svelte/transition).

At first, I highlighted search matches by wrapping matching substrings in
`<span>` elements. Since I wanted search to be case-insensitive, I had to
convert the titles to lowercase before finding substrings, but of course, this
made all the highlighted text lowercase, which looked really bad. Eventually, I
discovered that when the second argument of
[`String.prototype.replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
is a function instead of a string, that function can take an argument which is
the matched pattern (with case preserved). Phew!

Renn finished a [sankey plot](https://en.wikipedia.org/wiki/Sankey_diagram) of
the bills that showed them moving through the various stages of Congress. There
was a lot of that went into this, too, but the telling of that story is best
left to him. What it meant for me was refreshing the look and feel of the
homepage with the plot emphasized.

Somewhere in here, we took a break to continue the tradition of visiting
Insomnia Cookies every time we go to HackCU. Despite the strange hour and
distant location, [Tyler](https://tbwright.dev/) was happy to join us for this.
I got the same thing as last time—a scoop of vanilla ice cream sandwiched
between two cookies. Given how good it tasted, it must have contained exactly
the nutrients my body needed!

When this break ended, I reviewed my new design. It was my first foray into an
interface with a gradient, an element I've seen used sparingly but effectively
across a variety of modern website designs. Though of course there was room for
improvement, our UI looked quite nice for a hackathon project by the time we
were done. This was important because one of the project's main motivations was
overcoming the dated and technical UI offered by the first-party Congress
website.

![a screenshot showing a bill with information like the status, probability it passes, summary, and history](bill_screenshot.avif "The bill overview page, one of many we implemented.")

Seeing the "Action" timeline at the bottom reminds me of another little
adventure. Megan had added the timeline using a third-party timeline library.
It looked a lot better than what we had before, but it was designed for the
line to be vertically centered with text elements on alternating sides. It
wasn't too hard to make all the elements appear on the right side, but that
didn't remove the now-empty space on the left side, nor was there an option to
remove it. Fishing around in the DOM inspector, I found that the undesirable
`div` had a class attribute `opposite-block`. Unfortunately, it was nested
under quite a few other elements. How could I add `display: none` to it? I did
so by writing a selector for all direct and non-direct child elements of the
list with that class attribute. Turns out the Tailwind syntax for this is
`**:[&.opposite-block]:hidden`.

<small> (No, I did not use AI to figure this out. I read the documentation!
    (Whoa!) Which is a very good thing, since AI has been trained on the
    previous version of Tailwind, which has multiple incompatibilities with the
    new v4.) </small>

As we got closer to wrapping up, most of the commits were minor things like
[`text-wrap:
pretty`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap), showing
`<1%` instead of `0%` when the chance of a bill passing was between 0 and 1
percent, and all the other little details which cumulatively make a good
design. Megan and Renn both took a moment to sleep. I didn't, but given how
rapidly my productivity declined, I probably would've accomplished more in the
long run if I had.

I really enjoyed working with my teammates. Megan's ML model was an extremely
cool feature that added a lot of value to the project because besides the
visualization, it is the only functionality that isn't implemented by
Congress's website. Even though it was his first hackathon, Renn did a lot of
the heavy lifting, writing most of the backend as well as designing our
architecture and processing a big dataset. Overall, the hackathon was a great
way to spend a weekend, and I'm excited to attend it again next year! Thanks
very much to all the organizers, volunteers, and sponsors who made it possible.

![a selfie with three students looking up from their laptops](teamphoto.avif "From left to right: Megan, me (Byron), and Renn.")
