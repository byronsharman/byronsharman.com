---
title: A pretty good summer
published: false
date: 1758858100
description: I summarize what I did during the summer of 2025.
# image:
#   alt: >-
#     A concrete path leads down a hill. There is snow on either side, and
#     mountains are in the background.
#  path: path.jpg
---

This semester has been very busy, which has made me think of the last time I
wasn't busy: this summer, when most of my days were spent strolling under the
giant maple trees in Kafadar Commons. I've since reflected that this was likely
the last summer off I'll have until I retire, so maybe it's worth writing
about.

## Field session

Field session, or Advanced Software Engineering, is a special class in Mines's
computer science curriculum which pairs groups of students with projects
proposed by companies and individuals. Students can either choose the group
they work with or the project they'll develop. Based on advice from students
who had previously taken the class, I decided to build a team, reasoning that a
good team would be critical regardless of the project, and a bad team would be
worse than a bad project. So I chose [Grant Lemons](https://grantlemons.com/)
and [Nathan George](https://www.whimsicalcode.com/), two friends who proved to
be talented, hardworking, and fun to spend time with.

Summer field session is very different from other classes because it's only 5
weeks long, but a time commitment of 40 hours per week is expected. I greatly
enjoyed this format because it allowed me to treat school more like a full-time
job. When I came home, I was done with work. None of the working-after-dinner
nonsense of a regular semester!

The class improved my technical skills significantly. Our entire project lived
in AWS, and I had to think about how to factor the processing pipeline into
pieces and translate each piece into a cloud resource provisioned with
OpenTofu, our infrastructure as code tool. Grant recommended the IaC route, and
it was an excellent choice because it allowed each team member to experiment
with their own copy of the architecture, and since many more lines of code were
dedicated to infrastructure than actual business logic, our development
velocity significantly improved. Additionally, for the same reason, being able
to track our infrastructure changes under version control proved crucial to our
development process. Finally, this choice allowed us to transition from our
personal cloud accounts to our client's account very easily—with just one
command.

Though I've dabbled with Nix for a while, this was really my first time fully
embracing a declarative configuration, and I grew to appreciate their power and
convenience. Additionally, writing our CI/CD pipeline helped me understand
DevOps a lot better and realize why deployment strategy is something to which
large companies dedicate entire teams.

For both write-ups and presentation slides throughout the class, we used
[Typst](https://typst.app/) to typeset and generate PDFs programatically. We
greatly appreciated its speed, language design, and ease of use. I have since
adopted Typst both for other classes and for personal use. I highly recommend
it. Frequently it gives me that "Vim feeling": it's so powerful that it feels
unfair, as if I shouldn't have been allowed to do that complicated 20-minute
task in 15 seconds with two lines of code. Besides, the near-instant
compilation times and the fact that it is a full Turing-complete language makes
it a clear winner over LaTeX. I'm excited to continue using it throughout my
career.

Our client, [Swim Tech](https://swimtechsport.com/), was pleased with our work.
All the teams had a final presentation, and we took ours seriously, practicing
it extensively. This effort resulted in us earning a students' choice award for
Best Technical Presentation!

## Fourteeners

I climbed my first three fourteeners this summer: Grays Peak, Torries Peak, and
Mount Bierstadt. Though I've lived in Colorado my entire life, my time in the
mountains previously has been mostly high mountain lakes or scenic trails not
involving a summit. Previously, I've gone to the mountains to be alone with my
thoughts in nature. However, my roommate Jose has been getting into fourteeners
and was gracious enough to invite me to several! I found them to be a fun way
to experience the mountains, albeit for completely different reasons than the
sort of outdoorsmanship I am used to. Climbing a fourteener feels like a social
event where everyone has the same goal and is encouraging each other to get
there. That said, the three mountains I summited are probably the three most
crowded in Colorado, so I don't know what the experience is like at
lower-traffic mountains.

Overall, I enjoyed trying this new form of getting outdoors, but I think I
prefer the other way better. There's nothing quite like finding a remote lake
and being all alone with a friend or family member for the weekend.

## Chasing hobbies

Field Session ended pretty early, and my only other commitment was TAing for
Data Structures and Algorithms, so I had plenty of time. Ever since Mines
stopped forcing me to buy their meal plan, I've been keen to learn how to cook,
and this summer afforded me a great opportunity to hone my skills. I iterated
on recipes for grilled cheese, mac and cheese, stir fries, hashed browns, beef
stew, steak, spaghetti, etc., etc. I was surprised by how much overlap there is
between the techniques used to make these dishes and how an understanding of
heat and seasoning applies to all of them. I am now at the point where I can
make some dishes well and others OK, and I can improvise something reasonably
tasty with whatever is in the fridge and pantry, which was one of my main goals
when I started. Considering I have only been cooking in earnest for a year, I
am quite content with this progress. It's really satisfying to make something
really tasty! The only downside is that I have gone from being willing to eat
anything to being fairly picky, probably because I've spent so much time
thinking about how my own cooking can be improved. Next, I hope to broaden my
repertoire and cuisine familiarity so that there is a wide array of dishes that
I would feel comfortable serving to someone else.

Really ever since my first week at Mines, I've been struggling with how to
balance piano with everything else I want to do in college. I love playing the
piano, but I simply don't have the time to get good at it or the capital to
afford an instructor. However, the first constraint no longer applied during
the summer, and I really enjoyed learning some new pieces and listening to
repertoire with which I was not previously familiar. I've been following [Ben
Laude](https://www.youtube.com/@benlawdy)'s Chopin podcast as well as letting
YouTube recommend obscure yet highly underrated works by Liszt and others. I'm
listening to the infamously massive Busoni Piano Concerto as I write this.

I spent a lot of time [refreshing my
website](https://byronsharman.com/blog/website-takeaways), but I already
blogged about that, so I won't elaborate here. Suffice it to say that I did a
much better job of improving my software engineering skills this summer than
the last, and I made sure there was plenty of green on my GitHub profile.

## Summary

The relaxing part of summer ended a few weeks before school started because the
first few weeks of school are some of the busiest for an ACM president. Aside
from the activities described above, I spent a lot of time traveling with and
to family, seeing friends from high school, and attending various events. All
of these made for a quite enjoyable few months.

There's quite a few months left before next summer, so it remains to be seen
what that one will be like. For now, it's time to focus on school!
