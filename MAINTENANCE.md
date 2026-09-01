# Maintaining this site

Everything on the site is plain HTML. Edit the file, commit, and push to
`master`; GitHub Pages redeploys automatically within a minute or two.

Quick reference:

| What | Where |
|------|-------|
| Opening statement, About, Research, News, Recognition, Service, Contact | `index.html` |
| Full publication list, abstract, BibTeX | `publications/index.html` (the featured paper is repeated in `index.html`) |
| Projects | `projects/index.html` |
| Courses, education, skills | `experience/index.html` |
| Hackathons, sports, photos | `activities/index.html` |
| CV PDF | `files/CV_Muhid_Hassan_Risvy.pdf` |
| Header navigation and footer | Repeated in every page; update all six pages |
| Styles and behaviour | `assets/css/main.css`, `assets/js/main.js` |

## Layout vocabulary

Each section is a three-column grid: a narrow margin column for the running
head (the small label such as "News"), a reading column, and a wide aside.
Items in a list (news, publications, projects) are `<li class="row">` blocks
whose margin column holds the date, year, or technology, and whose main
column holds the text. Below 720 px the margin stacks above the text.

## Add a news item

News items live in `index.html` inside `<ol class="list">` under the
`<section id="news">`. The newest item goes first. Copy this block:

```html
<li class="row">
  <p class="margin meta"><time datetime="2026-10">October 2026</time></p>
  <div class="main">
    <p>Item text goes here.</p>
  </div>
</li>
```

## Add photos to a news item

1. Resize the photo first so the page stays fast. With Python and Pillow
   installed, run this once per photo (adjust the filenames):

   ```
   python -c "from PIL import Image, ImageOps; im = ImageOps.exif_transpose(Image.open('IMG_1234.jpg')).convert('RGB'); im.thumbnail((1200, 1200)); im.save('assets2026-porto-1.jpg', quality=82, optimize=True)"
   ```

2. Put the resized file in `images/news/` (create the folder if it does not
   exist yet).

3. Inside the item's `<div class="main">`, after the text paragraph, add:

   ```html
   <figure class="plate narrow" data-reveal>
     <a class="lightbox-link" href="/images/news/assets2026-porto-1.jpg">
       <img src="/images/news/assets2026-porto-1.jpg" alt="Describe the photo" loading="lazy" width="1200" height="900">
     </a>
     <figcaption class="note">Caption text.</figcaption>
   </figure>
   ```

   Drop `narrow` for a full-column photo. `data-reveal` gives the photo a
   gentle entrance as it scrolls into view. Set `width` and `height` to the
   real pixel dimensions so the page does not shift while loading. Clicking a
   photo opens it in a lightbox automatically because of the `lightbox-link`
   class. The June 2026 news item contains this block commented out as a
   template.

The same figure markup works anywhere else on the site, for example under an
award or inside an activity section.

## Add a publication

1. In `publications/index.html`, add a `<li class="row">` to the list under
   the right section. Put the year in the margin column:

   ```html
   <li class="row">
     <p class="margin meta">2027</p>
     <div class="main">
       <article>
         <h3 class="paper-title">Paper Title</h3>
         <p class="paper-authors"><span class="me">Muhid Hassan Risvy</span>, Coauthor Name</p>
         <p class="paper-venue">Venue Name (Year). Accepted.</p>
         <p class="actions"><a href="https://arxiv.org/abs/...">arXiv preprint</a></p>
       </article>
     </div>
   </li>
   ```

   To add an expandable abstract or BibTeX, copy the `Abstract` and `BibTeX`
   buttons and the two `<div class="disclosure">` blocks from the existing
   paper and give them a new id prefix (for example `pub2-abstract`,
   `pub2-bibtex`, `pub2-bibtex-text`).

2. Update the featured paper in `index.html` (the `<article class="paper">`
   inside the Research section) so the home page shows the most recent
   paper.

3. Consider adding a matching news item.

## Update the research sketches

The three line drawings in the Research section are inline SVG inside
`<figure class="sketchboard">` in `index.html`. Each `<figure class="sketch">`
pairs with one `<li class="step">` in the same order. Lines with the class
`stroke` draw themselves when their step becomes active; elements with
`data-late` fade in after the lines. Keep the `viewBox` at `0 0 320 130`.

## Replace the CV

Overwrite `files/CV_Muhid_Hassan_Risvy.pdf` with the new PDF under the exact
same filename. Update the "Updated ..." label in `cv/index.html` (look for
`cv-updated`).

## After any edit

- Update the "Last updated ..." line in the footer of every page (search for
  `Last updated`).
- If you added or removed a page, update `sitemap.xml`.
- Preview locally before pushing:

  ```
  python -m http.server 8080
  ```

  Then open http://localhost:8080/.
