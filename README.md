JSON Configuration Reference

Each invitation is controlled by a single JSON file inside the /data folder.
This file defines the layout, text, images, music, map behavior, RSVP settings, optional access protection, and more.

Minimal required structure

At minimum, an invitation JSON should include:

{
  "layout": "compact",
  "title": "My Event",
  "assetsPath": "assets/myInviteId",
  "heroImage": "hero.jpg"
}
Full example
{
  "layout": "compact",
  "layoutVariant": "compact-1",
  "eventTypeLabel": "Birthday",
  "title": "Sofi turns 5",
  "subtitle": "Join us for a magical afternoon full of fun.",
  "eventDateISO": "2026-07-18T16:00:00",
  "eventDateText": "July 18, 2026 · 4:00 PM",
  "place": "Salón Arcoíris, Puebla",
  "description": "There will be games, cake, surprises, and lots of fun.",
  "assetsPath": "assets/xyHd0aS",
  "heroImage": "hero.jpg",
  "hero": {
    "image": "hero.jpg",
    "position": "center center",
    "size": "cover",
    "repeat": "no-repeat",
    "height": "100svh"
  },
  "locationUrl": "https://maps.google.com",
  "mapDisplay": "embed",
  "mapEmbedUrl": "https://www.google.com/maps?q=Puebla&output=embed",
  "mapButtonLabel": "View Map",
  "mapTitle": "Event Location",
  "gallery": ["gallery-1.jpg", "gallery-2.jpg"],
  "music": {
    "enabled": true,
    "file": "music.mp3"
  },
  "countdown": {
    "enabled": true
  },
  "theme": {
    "bg": "#fff8ff",
    "surface": "#ffffff",
    "text": "#442b56",
    "muted": "#7c6791",
    "primary": "#ff5ca8",
    "primaryContrast": "#ffffff",
    "overlay": "rgba(88, 31, 87, 0.28)",
    "heroText": "#ffffff",
    "fontFamily": "'Trebuchet MS', Arial, sans-serif",
    "titleFontFamily": "'Trebuchet MS', Arial, sans-serif"
  },
  "schedule": [
    {
      "time": "4:00 PM",
      "title": "Welcome",
      "description": "Guest arrival and greetings."
    }
  ],
  "giftRegistry": {
    "liverpool": {
      "url": "https://www.liverpool.com.mx",
      "label": "Liverpool"
    }
  },
  "rsvp": {
    "phone": "522226763338",
    "messageTemplate": "Hello, this is {name}. {attendance} to {eventTitle}, on {eventDateText}."
  },
  "access": {
    "password": "1234",
    "title": "Private Invitation",
    "message": "Enter the password to view this invitation."
  },
  "openGate": {
    "title": "Open Invitation",
    "message": "Tap the button below to open the invitation and start the music."
  },
  "customScript": "custom.js"
}
Parameter reference
layout

Type: string
Required: yes

Defines the main invitation layout.

Allowed values
"classic"
"split"
"timeline"
"minimal"
"compact"
Notes
compact is designed for mobile-first, poster-style invitations.
All compact layouts follow the same compact logic, only the distribution changes.
layoutVariant

Type: string
Required: no
Used only when: layout = "compact"

Defines the internal compact distribution style.

Allowed values
"compact-1"
"compact-2"
"compact-3"
Notes

If omitted, the default is:

"layoutVariant": "compact-1"
eventTypeLabel

Type: string
Required: no

Small label shown above the title.

Example
"eventTypeLabel": "Birthday"
Typical values
"Wedding"
"Birthday"
"Baptism"
"Event"
"Baby Shower"
title

Type: string
Required: yes

Main title of the invitation.

Example
"title": "Sofi turns 5"
subtitle

Type: string
Required: no

Secondary text shown below the title.

Example
"subtitle": "Join us for a magical afternoon full of fun."
eventDateISO

Type: string
Required: no
Used for: countdown

Machine-readable date used for the countdown.

Format

ISO date-time format:

"eventDateISO": "2026-07-18T16:00:00"
Notes
If omitted, countdown is automatically hidden.
Recommended when using countdown.enabled = true.
eventDateText

Type: string
Required: no

Human-readable event date shown in the invitation.

Example
"eventDateText": "July 18, 2026 · 4:00 PM"
place

Type: string
Required: no

Event location text.

Example
"place": "Salón Arcoíris, Puebla"
description

Type: string
Required: no

Additional event description.

Example
"description": "There will be games, cake, surprises, and lots of fun."
assetsPath

Type: string
Required: yes

Path to the folder containing the invitation assets.

Example
"assetsPath": "assets/xyHd0aS"
Notes

This folder may contain:

hero.jpg
gallery images
music.mp3
custom.js
heroImage

Type: string
Required: yes, unless hero.image is provided

Fallback hero background image filename.

Example
"heroImage": "hero.jpg"
hero

Type: object
Required: no

Optional advanced hero background configuration.

Properties
hero.image

Type: string
Overrides heroImage.

"image": "hero.jpg"
hero.position

Type: string
CSS background-position value.

Common values
"center center"
"center top"
"top center"
"left center"
"right center"
hero.size

Type: string
CSS background-size value.

Common values
"cover"
"contain"
hero.repeat

Type: string
CSS background-repeat value.

Common values
"no-repeat"
"repeat"
hero.height

Type: string
Height of the hero section.

Recommended values
"100svh" for compact mobile full-screen
"92vh" for standard layouts
Example
"hero": {
  "image": "hero.jpg",
  "position": "center center",
  "size": "cover",
  "repeat": "no-repeat",
  "height": "100svh"
}
locationUrl

Type: string
Required: no

External map or location URL.

Example
"locationUrl": "https://maps.google.com"
mapDisplay

Type: string
Required: no

Controls how the map behaves.

Allowed values
"button"
"embed"
Behavior
In non-compact layouts:
"button" → shows a button
"embed" → shows embedded map iframe
In compact layouts:
"button" → shows integrated button
"embed" → opens embedded map inside modal overlay
mapEmbedUrl

Type: string
Required: only when using mapDisplay = "embed"

URL for embedded map iframe.

Example
"mapEmbedUrl": "https://www.google.com/maps?q=Puebla&output=embed"
mapButtonLabel

Type: string
Required: no

Custom label for the map button.

Example
"mapButtonLabel": "View Map"
mapTitle

Type: string
Required: no

Title used in the map modal header.

Example
"mapTitle": "Event Location"
gallery

Type: array of strings
Required: no

List of gallery image filenames.

Example
"gallery": ["gallery-1.jpg", "gallery-2.jpg"]
Notes
If omitted or empty, gallery section is hidden automatically.
Files must exist inside assetsPath.
music

Type: object
Required: no

Controls invitation music.

Properties
music.enabled

Type: boolean

true → enables music
false → disables music
music.file

Type: string
Music filename inside assetsPath.

Example
"music": {
  "enabled": true,
  "file": "music.mp3"
}
Notes
When music exists and there is no password, the system shows an “Open Invitation” gate first.
When music exists and a password is required, the password interaction is used to attempt autoplay.
countdown

Type: object
Required: no

Controls countdown visibility.

Properties
countdown.enabled

Type: boolean

true → show countdown if eventDateISO exists
false → hide countdown
Example
"countdown": {
  "enabled": true
}
Notes

If eventDateISO is missing, countdown is hidden automatically even if enabled.

theme

Type: object
Required: no

Controls colors and fonts.

Properties
theme.bg

Page background color

theme.surface

Card/panel background color

theme.text

Primary text color

theme.muted

Secondary text color

theme.primary

Primary accent color

theme.primaryContrast

Text color used on primary buttons

theme.overlay

Hero overlay color

theme.heroText

Text color used on hero content

theme.fontFamily

Body font family

theme.titleFontFamily

Title font family

Example
"theme": {
  "bg": "#fff8ff",
  "surface": "#ffffff",
  "text": "#442b56",
  "muted": "#7c6791",
  "primary": "#ff5ca8",
  "primaryContrast": "#ffffff",
  "overlay": "rgba(88, 31, 87, 0.28)",
  "heroText": "#ffffff",
  "fontFamily": "'Trebuchet MS', Arial, sans-serif",
  "titleFontFamily": "'Trebuchet MS', Arial, sans-serif"
}
schedule

Type: array of objects
Required: no

Optional event timeline.

Item structure
{
  "time": "4:00 PM",
  "title": "Welcome",
  "description": "Guest arrival and greetings."
}
Notes

If omitted or empty, the schedule section is hidden automatically.

giftRegistry

Type: object
Required: no

Gift registry or store links.

Example
"giftRegistry": {
  "liverpool": {
    "url": "https://www.liverpool.com.mx",
    "label": "Liverpool"
  },
  "palacio": {
    "url": "https://www.elpalaciodehierro.com",
    "label": "Palacio de Hierro"
  }
}
Notes
Keys such as liverpool or palacio are just internal labels.
Only url and label are required per item.
If omitted, the section is hidden automatically.
rsvp

Type: object
Required: no

WhatsApp confirmation settings.

Properties
rsvp.phone

Type: string
Phone number in international format without special characters recommended.

Example
"phone": "522226763338"
rsvp.messageTemplate

Type: string
WhatsApp message template.

Supported placeholders
{name}
{attendance}
{eventTitle}
{eventDateText}
{place}
Example
"messageTemplate": "Hello, this is {name}. {attendance} to {eventTitle}, on {eventDateText}."
Notes

If rsvp is omitted, RSVP section is hidden automatically.

access

Type: object
Required: no

Optional password protection.

Behavior
If access exists, password is required.
If access does not exist, invitation opens normally.
Properties
access.password

Type: string
Required password.

access.title

Type: string
Prompt title.

access.message

Type: string
Prompt message.

Example
"access": {
  "password": "1234",
  "title": "Private Invitation",
  "message": "Enter the password to view this invitation."
}
openGate

Type: object
Required: no

Optional text customization for the “Open Invitation” screen shown before music autoplay.

Properties
openGate.title

Type: string

openGate.message

Type: string

Example
"openGate": {
  "title": "Open Invitation",
  "message": "Tap the button below to open the invitation and start the music."
}
customScript

Type: string
Required: no

Optional custom JavaScript file inside assetsPath.

Example
"customScript": "custom.js"
Notes
This lets you add invitation-specific behavior without changing the shared HTML.
The script is loaded after the invitation is rendered.
window.InvitesConfig is available to the custom script.
Automatic hiding behavior

The system is designed to hide unused content automatically.

If a property is missing, its section is hidden

This applies to:

subtitle
eventDateText
place
description
gallery
schedule
giftRegistry
music
countdown
rsvp
locationUrl
mapEmbedUrl
Important exceptions

These fields are still required:

layout
title
assetsPath
heroImage or hero.image
Recommended compact usage

Compact layouts are meant to behave like mobile poster invitations.

Best compact setup

Recommended fields:

eventTypeLabel
title
subtitle
eventDateText
place
hero
music
rsvp
locationUrl or mapDisplay = "embed"
theme
Avoid overloading compact layouts

Using all of these at once may feel crowded:

gallery
schedule
giftRegistry
countdown
embedded map
RSVP
long descriptions

Compact works best when the content is minimal and visually focused.

Recommended asset structure
/assets/xyHd0aS/
  hero.jpg
  gallery-1.jpg
  gallery-2.jpg
  music.mp3
  custom.js

And the matching JSON:

"assetsPath": "assets/xyHd0aS"
Template workflow

Use master-template.json as a starting point.

Example workflow
Copy master-template.json
Rename it to a random invitation ID, for example:
data/xyHd0aS.json
Replace:
"assetsPath": "assets/REPLACE_ME"

with:

"assetsPath": "assets/xyHd0aS"
Create:
assets/xyHd0aS/
Add the required assets
