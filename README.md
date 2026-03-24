# JSON Configuration Reference

Each invitation is controlled by a single JSON file inside the `/data` folder.
This file defines the layout, text, images, music, map behavior, RSVP settings, optional access protection, and more.

## Minimal required structure

At minimum, an invitation JSON should include:

```json
{
  "layout": "compact",
  "title": "My Event",
  "assetsPath": "assets/myInviteId",
  "heroImage": "hero.jpg"
}
```

---

## Full example

```json
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
```

---

## Parameter summary table

| Parameter        | Type             | Required | Allowed / Expected Values                            | Description                                                                |
| ---------------- | ---------------- | -------: | ---------------------------------------------------- | -------------------------------------------------------------------------- |
| `layout`         | string           |      Yes | `classic`, `split`, `timeline`, `minimal`, `compact` | Main invitation layout.                                                    |
| `layoutVariant`  | string           |       No | `compact-1`, `compact-2`, `compact-3`                | Compact layout distribution variant. Only used when `layout` is `compact`. |
| `eventTypeLabel` | string           |       No | Any short label                                      | Small label shown above the main title.                                    |
| `title`          | string           |      Yes | Any text                                             | Main invitation title.                                                     |
| `subtitle`       | string           |       No | Any text                                             | Secondary descriptive line below the title.                                |
| `eventDateISO`   | string           |       No | ISO datetime, e.g. `2026-07-18T16:00:00`             | Machine-readable date used by countdown.                                   |
| `eventDateText`  | string           |       No | Any readable date text                               | Human-readable date shown in the invitation.                               |
| `place`          | string           |       No | Any text                                             | Event location text.                                                       |
| `description`    | string           |       No | Any text                                             | Extra event description.                                                   |
| `assetsPath`     | string           |      Yes | Relative folder path, e.g. `assets/xyHd0aS`          | Folder containing all invite-specific assets.                              |
| `heroImage`      | string           |     Yes* | Any image filename                                   | Fallback hero background image. Required if `hero.image` is missing.       |
| `hero`           | object           |       No | See hero table below                                 | Advanced hero background configuration.                                    |
| `locationUrl`    | string           |       No | Any valid URL                                        | External map/location link.                                                |
| `mapDisplay`     | string           |       No | `button`, `embed`                                    | Controls whether the map is shown as a button or embedded map.             |
| `mapEmbedUrl`    | string           |       No | Any embeddable map URL                               | URL used by embedded map mode.                                             |
| `mapButtonLabel` | string           |       No | Any text                                             | Custom label for the map button.                                           |
| `mapTitle`       | string           |       No | Any text                                             | Title shown inside the map modal.                                          |
| `gallery`        | array of strings |       No | Image filenames                                      | List of gallery image files inside `assetsPath`.                           |
| `music`          | object           |       No | See music table below                                | Invitation music configuration.                                            |
| `countdown`      | object           |       No | See countdown table below                            | Countdown visibility settings.                                             |
| `theme`          | object           |       No | See theme table below                                | Color and font customization.                                              |
| `schedule`       | array of objects |       No | See schedule table below                             | Event timeline entries.                                                    |
| `giftRegistry`   | object           |       No | Store objects with `url` and `label`                 | Gift registry links.                                                       |
| `rsvp`           | object           |       No | See RSVP table below                                 | WhatsApp confirmation settings.                                            |
| `access`         | object           |       No | See access table below                               | Password protection for private invitations.                               |
| `openGate`       | object           |       No | See open gate table below                            | Custom text for the music/open-invitation gate screen.                     |
| `customScript`   | string           |       No | JavaScript filename, e.g. `custom.js`                | Optional invite-specific script loaded from `assetsPath`.                  |

> `heroImage` is required only when `hero.image` is not provided.

---

## `layout`

**Type:** `string`
**Required:** Yes

Defines the main invitation layout.

### Allowed values

* `"classic"`
* `"split"`
* `"timeline"`
* `"minimal"`
* `"compact"`

### Notes

* `compact` is designed for mobile-first, poster-style invitations.
* All compact layouts follow the same compact rules; only the internal distribution changes.

---

## `layoutVariant`

**Type:** `string`
**Required:** No
**Used only when:** `layout = "compact"`

Defines the internal compact distribution style.

### Allowed values

* `"compact-1"`
* `"compact-2"`
* `"compact-3"`

### Default

```json
"layoutVariant": "compact-1"
```

---

## Hero configuration

### `hero` object

**Type:** `object`
**Required:** No

Optional advanced background configuration for the hero section.

| Parameter       | Type   | Required | Allowed / Expected Values                                                                                         | Description                  |
| --------------- | ------ | -------: | ----------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `hero.image`    | string |       No | Image filename                                                                                                    | Overrides `heroImage`.       |
| `hero.position` | string |       No | CSS background-position values such as `center center`, `center top`, `top center`, `left center`, `right center` | Controls image positioning.  |
| `hero.size`     | string |       No | `cover`, `contain`                                                                                                | Controls background scaling. |
| `hero.repeat`   | string |       No | `no-repeat`, `repeat`                                                                                             | Controls image repetition.   |
| `hero.height`   | string |       No | CSS height values such as `100svh`, `92vh`                                                                        | Controls hero height.        |

### Example

```json
"hero": {
  "image": "hero.jpg",
  "position": "center center",
  "size": "cover",
  "repeat": "no-repeat",
  "height": "100svh"
}
```

### Recommended values

* Use `100svh` for compact, full-screen mobile invites.
* Use `92vh` or similar for standard layouts.

---

## Map configuration

| Parameter        | Type   | Required | Allowed / Expected Values | Description                            |
| ---------------- | ------ | -------: | ------------------------- | -------------------------------------- |
| `locationUrl`    | string |       No | Any valid URL             | External location/map URL.             |
| `mapDisplay`     | string |       No | `button`, `embed`         | Defines map behavior.                  |
| `mapEmbedUrl`    | string |       No | Embeddable map URL        | Used when `mapDisplay` is `embed`.     |
| `mapButtonLabel` | string |       No | Any text                  | Custom button label.                   |
| `mapTitle`       | string |       No | Any text                  | Modal title for compact embedded maps. |

### Behavior by layout

#### Non-compact layouts

* `mapDisplay: "button"` → shows a button in the map section.
* `mapDisplay: "embed"` → shows an embedded map iframe in the map section.

#### Compact layouts

* `mapDisplay: "button"` → shows an integrated map button.
* `mapDisplay: "embed"` → opens the embedded map inside a modal overlay, keeping the invite in a single mobile screen.

---

## Gallery configuration

### `gallery`

**Type:** `array of strings`
**Required:** No

List of gallery image filenames.

### Example

```json
"gallery": ["gallery-1.jpg", "gallery-2.jpg"]
```

### Notes

* If omitted or empty, the gallery section is hidden automatically.
* Files must exist inside `assetsPath`.

---

## Music configuration

### `music` object

**Type:** `object`
**Required:** No

Controls invitation music.

| Parameter       | Type    | Required | Allowed / Expected Values        | Description                     |
| --------------- | ------- | -------: | -------------------------------- | ------------------------------- |
| `music.enabled` | boolean |       No | `true`, `false`                  | Enables or disables music.      |
| `music.file`    | string  |       No | Audio filename, e.g. `music.mp3` | Music file inside `assetsPath`. |

### Example

```json
"music": {
  "enabled": true,
  "file": "music.mp3"
}
```

### Notes

* When music exists and there is no password, the system shows an **Open Invitation** gate first.
* When music exists and a password is required, the password interaction is used to attempt autoplay.

---

## Countdown configuration

### `countdown` object

**Type:** `object`
**Required:** No

Controls countdown visibility.

| Parameter           | Type    | Required | Allowed / Expected Values | Description                   |
| ------------------- | ------- | -------: | ------------------------- | ----------------------------- |
| `countdown.enabled` | boolean |       No | `true`, `false`           | Shows or hides the countdown. |

### Example

```json
"countdown": {
  "enabled": true
}
```

### Notes

* If `eventDateISO` is missing, countdown is hidden automatically.
* If omitted entirely, countdown is hidden unless the implementation defaults it on and `eventDateISO` exists; recommended practice is to declare it explicitly.

---

## Theme configuration

### `theme` object

**Type:** `object`
**Required:** No

Controls colors and fonts.

| Parameter               | Type   | Required | Allowed / Expected Values         | Description                         |
| ----------------------- | ------ | -------: | --------------------------------- | ----------------------------------- |
| `theme.bg`              | string |       No | Any valid CSS color               | Page background color.              |
| `theme.surface`         | string |       No | Any valid CSS color               | Card/panel background color.        |
| `theme.text`            | string |       No | Any valid CSS color               | Primary text color.                 |
| `theme.muted`           | string |       No | Any valid CSS color               | Secondary text color.               |
| `theme.primary`         | string |       No | Any valid CSS color               | Primary accent color.               |
| `theme.primaryContrast` | string |       No | Any valid CSS color               | Text color used on primary buttons. |
| `theme.overlay`         | string |       No | Any valid CSS color or rgba value | Hero overlay color.                 |
| `theme.heroText`        | string |       No | Any valid CSS color               | Text color used on hero content.    |
| `theme.fontFamily`      | string |       No | Any valid CSS font-family value   | Body font family.                   |
| `theme.titleFontFamily` | string |       No | Any valid CSS font-family value   | Title font family.                  |

### Example

```json
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
```

---

## Schedule configuration

### `schedule`

**Type:** `array of objects`
**Required:** No

Optional event timeline.

| Parameter                | Type   | Required | Allowed / Expected Values | Description                      |
| ------------------------ | ------ | -------: | ------------------------- | -------------------------------- |
| `schedule[].time`        | string |       No | Any text, e.g. `4:00 PM`  | Event time label.                |
| `schedule[].title`       | string |       No | Any text                  | Main schedule item title.        |
| `schedule[].description` | string |       No | Any text                  | Additional schedule description. |

### Example

```json
"schedule": [
  {
    "time": "4:00 PM",
    "title": "Welcome",
    "description": "Guest arrival and greetings."
  }
]
```

### Notes

If omitted or empty, the schedule section is hidden automatically.

---

## Gift registry configuration

### `giftRegistry`

**Type:** `object`
**Required:** No

Gift registry or store links.

| Parameter                    | Type   | Required | Allowed / Expected Values | Description            |
| ---------------------------- | ------ | -------: | ------------------------- | ---------------------- |
| `giftRegistry.<store>.url`   | string |      Yes | Any valid URL             | Store or registry URL. |
| `giftRegistry.<store>.label` | string |      Yes | Any text                  | Visible button label.  |

### Example

```json
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
```

### Notes

* The key names such as `liverpool` or `palacio` are internal identifiers only.
* Only `url` and `label` are required per item.
* If omitted, the section is hidden automatically.

---

## RSVP configuration

### `rsvp` object

**Type:** `object`
**Required:** No

WhatsApp confirmation settings.

| Parameter              | Type   | Required | Allowed / Expected Values                              | Description                  |
| ---------------------- | ------ | -------: | ------------------------------------------------------ | ---------------------------- |
| `rsvp.phone`           | string |      Yes | International-format phone string, e.g. `522226763338` | WhatsApp destination number. |
| `rsvp.messageTemplate` | string |       No | Any text with supported placeholders                   | WhatsApp message template.   |

### Supported placeholders

* `{name}`
* `{attendance}`
* `{eventTitle}`
* `{eventDateText}`
* `{place}`

### Example

```json
"rsvp": {
  "phone": "522226763338",
  "messageTemplate": "Hello, this is {name}. {attendance} to {eventTitle}, on {eventDateText}."
}
```

### Notes

If `rsvp` is omitted, the RSVP section is hidden automatically.

---

## Access protection

### `access` object

**Type:** `object`
**Required:** No

Optional password protection.

### Behavior

* If `access` exists, a password is required.
* If `access` does not exist, the invitation opens normally.

| Parameter         | Type   | Required | Allowed / Expected Values | Description        |
| ----------------- | ------ | -------: | ------------------------- | ------------------ |
| `access.password` | string |      Yes | Any string                | Required password. |
| `access.title`    | string |       No | Any text                  | Prompt title.      |
| `access.message`  | string |       No | Any text                  | Prompt message.    |

### Example

```json
"access": {
  "password": "1234",
  "title": "Private Invitation",
  "message": "Enter the password to view this invitation."
}
```

---

## Open gate configuration

### `openGate` object

**Type:** `object`
**Required:** No

Optional custom text for the **Open Invitation** screen shown before music autoplay.

| Parameter          | Type   | Required | Allowed / Expected Values | Description   |
| ------------------ | ------ | -------: | ------------------------- | ------------- |
| `openGate.title`   | string |       No | Any text                  | Gate title.   |
| `openGate.message` | string |       No | Any text                  | Gate message. |

### Example

```json
"openGate": {
  "title": "Open Invitation",
  "message": "Tap the button below to open the invitation and start the music."
}
```

---

## Custom JavaScript

### `customScript`

**Type:** `string`
**Required:** No

Optional invitation-specific JavaScript file inside `assetsPath`.

### Example

```json
"customScript": "custom.js"
```

### Notes

* This allows invitation-specific behavior without changing the shared HTML.
* The script is loaded after the invitation is rendered.
* `window.InvitesConfig` is available to the custom script.

---

## Automatic hiding behavior

The system hides unused content automatically.

### If a property is missing, its section is hidden

This applies to:

* `subtitle`
* `eventDateText`
* `place`
* `description`
* `gallery`
* `schedule`
* `giftRegistry`
* `music`
* `countdown`
* `rsvp`
* `locationUrl`
* `mapEmbedUrl`

### Important exceptions

These fields are still required:

* `layout`
* `title`
* `assetsPath`
* `heroImage` **or** `hero.image`

---

## Recommended compact usage

Compact layouts are meant to behave like **mobile poster invitations**.

### Best compact setup

Recommended fields:

* `eventTypeLabel`
* `title`
* `subtitle`
* `eventDateText`
* `place`
* `hero`
* `music`
* `rsvp`
* `locationUrl` or `mapDisplay = "embed"`
* `theme`

### Optional compact fields

Use sparingly:

* `description`
* `countdown`

### Avoid overloading compact layouts

Using all of these at once may feel crowded:

* `gallery`
* `schedule`
* `giftRegistry`
* `countdown`
* embedded map
* RSVP
* long descriptions

Compact works best when the content is minimal and visually focused.

---

## Recommended asset structure

```plaintext
/assets/xyHd0aS/
  hero.jpg
  gallery-1.jpg
  gallery-2.jpg
  music.mp3
  custom.js
```

And the matching JSON:

```json
"assetsPath": "assets/xyHd0aS"
```

---

## Template workflow

Use `master-template.json` as a starting point.

### Example workflow

1. Copy `master-template.json`
2. Rename it to a random invitation ID, for example:

```plaintext
data/xyHd0aS.json
```

3. Replace:

```json
"assetsPath": "assets/REPLACE_ME"
```

with:

```json
"assetsPath": "assets/xyHd0aS"
```

4. Create:

```plaintext
assets/xyHd0aS/
```

5. Add the required assets

---

## Practical examples

### Standard non-compact map button

```json
{
  "layout": "classic",
  "title": "Ana & Luis",
  "assetsPath": "assets/wed123",
  "heroImage": "hero.jpg",
  "locationUrl": "https://maps.google.com",
  "mapDisplay": "button"
}
```

### Compact layout with embedded map modal

```json
{
  "layout": "compact",
  "layoutVariant": "compact-1",
  "title": "Sofi turns 5",
  "assetsPath": "assets/abc123",
  "heroImage": "hero.jpg",
  "mapDisplay": "embed",
  "mapEmbedUrl": "https://www.google.com/maps?q=Puebla&output=embed"
}
```

### Private invitation with music

```json
{
  "layout": "compact",
  "title": "Private Event",
  "assetsPath": "assets/private01",
  "heroImage": "hero.jpg",
  "music": {
    "enabled": true,
    "file": "music.mp3"
  },
  "access": {
    "password": "1234",
    "title": "Private Invitation",
    "message": "Enter the password to continue."
  }
}
```
