---
title: The Unix philosophy applied to development environments
published: true
date: 1759423616
description: In which I argue that IDEs are a bad idea.
# image:
#   alt: >-
#     A green field on a college campus. In the background, South Table lies underneath a large cumulonimbus cloud.
#   path: south-table-cropped.jpg
---

Lately, I've been thinking about the ideal level of abstraction in a
development environment. Where is the best balance between editing all your
files with `cat` and pipes, versus these new-fangled agentic tools that take
natural language input and spit out an entire app? Let me start by listing the
first few tasks that come to mind when asked what a developer needs to do:

- write code
- use a build system to compile and link the code
- track files with version control
- run tests and display results
- debug code
- run everything in a container

All modern IDEs I know of are huge programs that handle all these tasks and
often tightly integrate them. For example, an IDE shows a nice UI for resolving
merge conflicts. It allows you to set debugger breakpoints from the code
editor. I suppose such integrations are why we call it an _integrated_
development environment.

Long before I was born, some talented and now famous programmers began
developing systems with what is called the _Unix philosophy_. I think [this
Harvard class](https://cscie2x.dce.harvard.edu/hw/ch01s06.html) explains it
well, but the philosophy can be summarized as:

<blockquote>Programs should do one thing and do it well.</blockquote>

If you think about the programs you used when first introduced to the command
line, these are quintessential Unix programs that follow that philosophy. `cat`
prints files to stdout. `ls` lists files. `sort` sorts them. They are all
small, well-defined programs that specialize in one thing and can be tied
together to perform powerful tasks.

But wait! The _de facto_ development program, the IDE, takes the opposite
approach. It is a huge program that does many things. You could argue that it
still does them well. But it has a large scope, and its systems are neither
independent nor separate. In fact, **by definition** they cannot be separate
because if they were, it wouldn't be an _integrated_ development environment.

Because IDEs abstract tasks for us, we don't learn what they're doing in the
background. What command is executed when I click the little triangle to run my
code? Is there a way to do *X* task in Git that doesn't have a button in my
interface?

Because IDEs try to do everything, they are bloated. They are slow to use and
slow to learn.

Because I cannot choose one program per task, I must perform all my tasks the
way my overarching program does them. I give up my ability to choose the best
tool for the given task.

Because Visual Studio Code, the most popular IDE, is an Electron app, I have to
launch an entire web browser before I can even start to load all the features.

My editor should not run Git commands. I run those from the command line.  
My debugger should not live in my editor. It should be a separate program.  
Running my code should not have side effects like spinning up containers. I
should perform those steps manually or write a script if there are several.  
I should compile, run, and test my code outside my editor.

For the past 6 or so years, I've used Neovim to write text files. I run my
language's compiler and debugger from the command line. If I want to commit my
changes, I type `git commit`. If I want to make a new directory called _foo_, I
type `mkdir foo`. I only install Neovim plugins that do not attempt to
introduce functionality outside of editing code.

This choice has made me better understand virtually every language I have
written code in, as well as making me very good at using the command line. I
don't know to what extent I can pull this off when I graduate and start to work
on larger projects, but I'm glad that I've done things this way until now.

Allow me to address some reactions I anticipate:

**IDEs allow plenty of choice through the widely adopted plugin model.**  
Plugins still must interface with the IDE's API and tie themselves to its
interface and conceptual models. A separate tool works with any codebase, but a
plugin only works for its specific IDE.

**How adorable! An undergrad student who's never worked on a real codebase
before!**  
Most of my readers are also students, a demographic for whom projects are small
and learning is the main goal. For these people it is exceptionally
counterproductive to have magic buttons that do everything for you.

**You said IDEs are hard to learn and then told me to switch to Neovim, an
editor famous for its steep learning curve.**  
Learning an IDE means learning the locations of buttons that in the background
are running commands you should be typing yourself. Conversely, learning Vim
means becoming almost bizarrely fast at modifying text, which is the most
common action in all of programming. The first is busywork; the second is an
investment.
