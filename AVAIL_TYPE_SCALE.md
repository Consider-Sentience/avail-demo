# AVAIL type scale

Font: IBM Plex Sans (`wdth` 100). Caps = uppercase. Sizes are desktop / mobile.
Rule of thumb: **regular is the default; medium is only for emphasis words and small labels.** Headings are never bold.

| Role | Size | Weight | Case / tracking | Color | Used for | Why |
|---|---|---|---|---|---|---|
| Hero H1 | 40 / 32 / 24 | Regular (accent words Medium) | Caps, lh 1.4 | cloud, accent rust | Page headline | Largest thing on the page, so it needs no weight to lead |
| Hero body | 20 / 18 / 17 | Regular, lh 1.6 | none | cloud | Paragraph under the hero headline | |
| Wordmark | 24 / 17 | Semibold | Caps | cloud | AVAIL logo only; its subtitle is 16 / 11.33 Medium caps (same 3:2 ratio) | The only semibold on the page, so the brand is unmistakable |
| Section title | 28 / 20 | Regular (accent word Medium) | Caps, .56 / .4 | cloud, accent rust | "Exactly which MODELS we ask", "Why this MATTERS", "Not sure where to START?" | One accent word per title carries the emphasis |
| CTA title | 20 / 16 | Medium | Caps, .4 | white on rust | Orange call-to-action card | Sits on a color field, so a little more weight keeps it readable |
| Sub-head (dark page) | 20 / 16 | Regular | Caps, .4 | cloud | Tracker page: "By question", "Run history" | One step below section title |
| Stat number | 28 / 20 | Medium | none, .56 | rust | Percentages on tracker result cards | The number is the point; medium + rust makes it scan first |
| Finding stat / chart title | 18 / 16 | Medium | Caps, .36 | rust | "80% of answers", "It depends on the assistant" | Card text around it is 14 / 13 regular ink |
| Panel intro | 16 | Medium | none | slate | Sentence at the top of the form panel | |
| Form fields (dropdowns, inputs, text areas) | 15 | Regular | none | ink | Everything the user types or picks | One size across every form state |
| Body | 17 / 16 | Regular, lh 1.6 | none | cloud (dark) / ink (cards) | Paragraphs, table cell primary text | Comfortable reading size |
| Field label / table column header | 14 | Medium | Caps, .28 | rust | "Organization", "Questions", column headers, card labels | Same style everywhere a label appears, so tables and forms read as one system |
| Secondary text | 14 | Regular | none | ink / slate | Table cells, status text | |
| Small button | 11 | Regular | Caps, .22 | ink on cloud, rust icon | "Add sample", "Upload CSV", "Copy link", "Pause", "Delete tracker" | Same scale as the secondary toggle, so it ranks below Run check / Start tracking |
| Tabs | 14 / 12 | Active Medium, inactive Regular | Caps, .28 | active rust on cloud, inactive cloud | Tracker page: Report / Manage tracking | Folder tabs on the navy page |
| Secondary toggle | 11 | Active Medium, inactive Regular | Caps | white on slate gray / ink | How often: Once / Weekly / Monthly | Small and tight, so it ranks below the primary buttons |
| Buttons | 16 / 14 | Regular | Caps, .32 / .28 | white on rust / ink on cloud | Run check, Start tracking, See the open dataset | Rounded pills |
| Field helper text | 13 | Regular | none | slate (cloud on dark) | The description under each form field label | Readable at a glance, one step below body |
| Notes, captions, model IDs | 12 | Regular | none | slate 55% (emphasis Medium) | Notes, counters, helper text, model IDs | Smallest tier |
| Footer | 14 | Regular | none | cloud | Copyright line | |

## Form layout
Each field is a stack: **label → description → input**. Questions adds its action buttons (Add sample, Upload CSV) between the description and the box, and its counter (0 / 25) under the box, right-aligned.

| Space | px |
|---|---|
| Label to description | 4 |
| Description to input (or to the action buttons) | 12 |
| Action buttons to the box | 12 |
| Between fields | 32 |
| Panel intro to the first field | 40 |

- Field descriptions use the "Field helper text" style. On the dark tracker page they turn cloud.
- The questions box starts empty with the placeholder "Start typing…".
- **Add sample menu:** opens under the small button. White panel, 15 regular ink rows, a rust plus icon on each row, a rust/40 rule above "Add all" (medium). Picking a question adds it as a new line in the box and removes it from the menu; the menu stays open until you click outside it or press Escape.
- **Plain assistant names** (Claude, Perplexity, ChatGPT, Gemini) are used in the form intro and in table column headers. Exact model names and IDs appear in the models table and on the tracker's result cards.

## Surfaces
- Cards, tables and panels: cloud fill, 1px rust border, 8px radius.
- Table: rust column headers (14 medium caps) on a rust bottom rule, rows split by rust at 40% opacity, no zebra striping.
- Status dots: pass #7A9E7E, fail #A85C4A.

## Where this differs from BEARCLAW
All-caps headings and CTAs, pill buttons, rust-bordered cloud surfaces with rust column headers, and regular-weight headings. BEARCLAW uses semibold 11px caps headers and white cards.
