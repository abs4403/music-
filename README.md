# Raasta — mood cassettes

A playlist site with a themed "cassette tape" page for each mood: truck driver,
saloon, gym, romantic, and pop/party. Songs play through the real YouTube
IFrame API — no audio files are hosted, so there's nothing to license.

## Structure

```
index.html      the page shell — rarely needs editing
css/style.css   all visual styling and per-genre colors
js/genres.js    the songs and genre config — edit this most often
js/app.js       the logic that renders pages and drives the player
README.md       this file
```

## Adding or changing songs

Open `js/genres.js`. Each genre is one object in the `GENRES` array. To add
a song:

1. Find the song on YouTube and copy its ID from the URL —
   `youtube.com/watch?v=THIS_PART`.
2. Add that ID to the genre's `videoIds` array.
3. Add a matching `"Song name — Singers"` string to `songTitles`, in the
   same position.

## Adding a whole new genre

Copy one of the existing objects in `js/genres.js`, change every field
(`id` must be unique and lowercase), and add it to the array. It shows up
in the nav automatically — no other file needs to change. If you want a
distinct color for it, add a `#your-id { ... }` block at the bottom of
`css/style.css` following the pattern of the existing genres.

## Running it locally

YouTube's player won't load over a plain `file://` link. From this folder,
run:

```
python3 -m http.server 8000
```

then open `http://localhost:8000` in a browser.

## Publishing it live

**GitHub Pages (free, simplest for updates)**

1. Create a GitHub repo and upload this folder's contents.
2. In the repo, go to *Settings → Pages*, set the source to your main
   branch and `/ (root)`, and save.
3. Your site is live at `yourname.github.io/repo-name` within a minute.
4. To update later, edit files directly on github.com (pencil icon) or
   push new commits — the live site redeploys automatically.

**Netlify or Vercel (also free)**

Drag this folder into Netlify's dashboard, or connect the GitHub repo to
either service. Both auto-redeploy on every change, and let you attach a
custom domain later.

## Notes on copyright

Every song plays from YouTube's own servers through the official IFrame
API — nothing is downloaded or rehosted, so YouTube's monetization and
Content ID stay intact. Don't replace this with downloaded/self-hosted
audio files; that would need a license from the rights holders.
