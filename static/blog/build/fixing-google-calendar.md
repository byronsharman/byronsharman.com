If you follow my blog, you know that I'm studying abroad at the University of Canterbury this semester. One of the things I appreciate about UC's IT tooling is that its class scheduling app allows you to export to `.ics` files, a feature that to the best of my knowledge is missing from Geode or SSB, the equivalents we have at Mines. This makes it easy to import your class schedule into apps like Outlook or Google Calendar.

## The Problem

I like to confine class events to their own calendar so that I can color-code and toggle them. Unfortunately, when importing the `.ics` file with over 200 class events into Google Calendar, I forgot to select the calendar dedicated to school, polluting my main calendar with class events. This made it difficult to distinguish personal events from school ones; often I would be surprised by an important event because it was the same color as my classes.

![screenshot of calendar with all events the same color, including an interview event that is easily missed because it is the same duration and color as the classes](messed_up_calendar.png "How long does it take you to find when my interview is?")

In order to save my time management skills from certain demise, I needed to delete all these rogue events. Doing it manually would be a very sad way to spend a weekend.

Thankfully, however, Google Calendar has an API.

## The Solution
Like most Google Workspace products, Calendar offers a REST API as well as language-specific bindings that abstract it. I chose to use the Python bindings because the language seemed like the natural choice for a quick script. I started by browsing the documentation and finding a template that prints the user's first 10 upcoming events. As this template contained all the boilerplate for authentication, error handling, etc., all I had to do was modify it to search for class events and delete them.

Here's what the relevant part of the template looked like before I modified it.
```py
service = build("calendar", "v3", credentials=creds)

now = datetime.datetime.utcnow().isoformat() + "Z"  # 'Z' indicates UTC time
print("Getting the upcoming 10 events")
events_result = (
    service.events()
    .list(
        calendarId="primary",
        timeMin=now,
        maxResults=10,
        singleEvents=True,
        orderBy="startTime",
    )
    .execute()
)
events = events_result.get("items", [])

# Logic that prints the events' names
# ...
```
Pretty self-explanatory. I changed `timeMin` to the date the semester started and deleted `maxResults`. This seemed to work; it printed a long list of all the events in my calendar.

Next, I needed to filter which events were to be deleted and which were to be kept. Luckily, all the class event names followed a pattern.
```
ENCE260 TutA
PHIL139 LecC
PHYS101 LabA
...
```
The regular expression `^[A-Z]{4}\d{3} `&nbsp;was enough to separate these from the other events.

Finally, I needed to figure out how to delete an event. This was very straightforward. Each event has an ID; to delete it, pass the ID to a method named `delete`.
```py
service.events().delete(calendarId="primary", eventId=event["id"]).execute()
```

After these modifications, my script now looked like this:
```py
import re

# events = [...]

classre = re.compile("^[A-Z]{4}[0-9]{3} ")
count = 0

for event in events:
    if classre.match(event["summary"]):
        print(event["summary"])
        service.events().delete(calendarId="primary", eventId=event["id"]).execute()
        count += 1

print(f"{count} events found")
```

I ran this code, pushed my chair back, crossed my legs, and watched the misplaced events disappear in the Google Calendar web app. Neat!

Neat, that is, until my program stopped before all the dates were deleted. It turns out that `maxResults`, the cap on the number of events returned by the API, defaults to 250, which was less than the combined number of personal and class events. This I fixed by changing the limit to 1000.

Finally, I re-imported the `.ics` file, this time making sure to select the correct calendar.

![screenshot of calendar with personal events in blue and class events in orange](fixed_calendar.png "Phew, that's much easier to read!")

This turned out to be the ideal scenario for automation. At the end of the day, most of the effort went into going from searching "google calendar api" to finding the template and creating an API key. After that, I basically only had to write a for loop and a regular expression (and a blog post).

And that's that!
