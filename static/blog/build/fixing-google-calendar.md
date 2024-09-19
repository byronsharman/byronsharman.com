If you follow my blog, you know that I'm studying abroad at the University of Canterbury this semester. One of the things I appreciate about UC's IT tooling is that its class scheduling app allows you to export to `.ics` files, a feature that to the best of my knowledge is missing from Geode or SSB at Mines. This makes it easy to add my classes to Google Calendar.

## The Problem

I like to confine my class events to their own calendar so that I can color-code them and toggle them. Unfortunately, when importing the `.ics` file with over 200 class events, I forgot to select the calendar dedicated to school, mixing my classes with my regular calendar. That meant that all my important stuff was polluted by the noise of these 200 class events, and I couldn't delete them all at once because Google Calendar doesn't provide an undo button for importing from a file. This made it very annoying to distinguish personal events from school ones; often I would be surprised by an important event because it was the same color as my classes.

![screenshot of calendar with all events the same color, including an interview event that is easily missed because it is the same duration and color as the classes](messed_up_calendar.png "How long does it take you to find when my interview is?")

In order to save my time management skills from certain demise, I needed to delete all these rogue events. Doing it manually would be a very sad way to spend a weekend.

Thankfully, however, Google Calendar has an API.

In fact, most Google Workspace products offer REST APIs as well as language-specific bindings that abstract over them. Python seemed like a natural choice for a quick script, and the documentation provides a handy template that displays the next 10 events in your calendar. This template contains all the boilerplate for authentication, error handling, etc.; all I had to do was modify it to search for events and delete them.

Luckily, all the class events follow the same naming scheme. They start with the name of the class, followed by the type of instance (lecture, lab, or tutorial), as shown in the examples below.
```
ENCE260 TutA
PHIL139 LecC
PHYS101 LabA
```
I started by writing a regular expression to filter them from my other events.
```regex
^[A-Z]{4}\d{3} 
```
Not exact, but it'll do the trick for a quick script like this.

## Writing the code
The relevant part of the quickstart template from the docs looks like this:
```py
service = build("calendar", "v3", credentials=creds)

# Call the Calendar API
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
```
Pretty self-explanatory. I changed `timeMin` to the date the semester started, deleted `maxResults`, pretty-printed the events, and filtered them with the regular expression. As expected, this printed the names of all my class events. Now, I just needed to figure out how to send deletion requests back to the server, which was pretty easy to find given the API documentation:
```py
service = build("calendar", "v3", credentials=creds)
# event = ...
service.events().delete(calendarId="primary", eventId=event["id"]).execute()
```

After incorporating the deletion line, my script now looked like this:
```py
# events = [...]

classre = re.compile("^[A-Z]{4}[0-9]{3} ")
count = 0

for event in events:
    if classre.match(event["summary"]):
        # print the name of the event about to be deleted
        print(f"{event["summary"]}")
        service.events().delete(calendarId="primary", eventId=event["id"]).execute()
        count += 1

print(f"{count} events found")
```

I ran this code, pushed my chair back, crossed my legs, and watched the rogue events disappear in the Google Calendar web app. Neat!

Neat, that is, until my program stopped before all the dates were deleted. It turns out that `maxResults`, the cap on the number of events returned by the API, defaults to 250, which was less than the combined number of personal and class events. After changing it to 1000, the rest of the events were deleted without issue.

Finally, I re-imported the `.ics` file, this time making sure to select the correct calendar.

![screenshot of calendar with personal events in blue and class events in orange](fixed_calendar.png "Phew, that's much easier to read!")

And that's that! At the end of the day, most of the effort went into creating an API key and finding the template. After that, I basically only had to write a for loop and a regular expression (and a blog post).
