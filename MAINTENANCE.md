# Maintaining this site

Everything on the site is plain HTML. Edit the file, commit, and push to
`master`; GitHub Pages redeploys automatically within a minute or two.

Quick reference:

| What | Where |
|------|-------|
| News | `index.html`, the `<ol class="news-list">` inside `<section id="news">` |
| Featured publication (home) | `index.html`, the `<section>` with eyebrow "Featured Publication" |
| Full publication list | `publications/index.html` |
| Research narrative | `research/index.html` |
| Courses, education, skills | `experience/index.html` |
| Projects | `projects/index.html` |
| Hackathons, sports, photos | `activities/index.html` |
| CV PDF | `files/CV_Muhid_Hassan_Risvy.pdf` |
| Sidebar (photo, title, links) | Repeated in every page; update all seven pages |

## Add a news item

News items live in `index.html` inside `<ol class="news-list">`. The newest
item goes first. Copy this block and edit the date, tag, and text:

```html
<li class="news-item reveal" style="--i: 0;">
  <p class="news-date">October 2026</p>
  <div class="news-body">
    <span class="tag tag-presentation">Presentation</span>
    <p>Item text goes here.</p>
  </div>
</li>
```

Notes:

- `--i` controls the entrance animation stagger. Renumber items from the top
  starting at 0 so the newest item animates first.
- Tag options: `tag-publication` (gold), `tag-milestone` (blue),
  `tag-presentation` (green). Pick whichever fits; the tag text is free-form.

## Add photos to a news item

1. Resize the photo first so the page stays fast. With Python and Pillow
   installed, run this once per photo (adjust the filenames):

   ```
   python -c "from PIL import Image, ImageOps; im = ImageOps.exif_transpose(Image.open('IMG_1234.jpg')).convert('RGB'); im.thumbnail((1200, 1200)); im.save('assets2026-porto-1.jpg', quality=82, optimize=True)"
   ```

2. Put the resized file in `images/news/` (create the folder if it does not
   exist yet).

3. Inside the item's `<div class="news-body">`, after the text paragraph, add:

   ```html
   <div class="news-photos">
     <figure class="photo photo-medium">
       <a class="lightbox-link" href="/images/news/assets2026-porto-1.jpg">
         <img src="/images/news/assets2026-porto-1.jpg" alt="Describe the photo" loading="lazy" width="1200" height="900">
       </a>
       <figcaption>Caption text.</figcaption>
     </figure>
   </div>
   ```

   Repeat the `<figure>` block for up to three photos per item. The June 2026
   news item in `index.html` contains this same block commented out as a
   template.

Photo size classes:

| Class | Rendered width |
|-------|----------------|
| `photo-small` | 160 px |
| `photo-medium` | 280 px |
| `photo-large` | full column width |

Set `width` and `height` attributes to the real pixel dimensions of the file
so the page does not shift while loading. The `figcaption` is optional;
delete the line if there is no caption. Clicking a photo opens it in a
lightbox automatically because of the `lightbox-link` class.

The same figure markup works anywhere else on the site, for example under an
award or inside an activity section.

## Add a publication

1. In `publications/index.html`, add a `<li>` to the list under the right
   year heading (`<p class="pub-year">`). Add a new year heading when needed:

   ```html
   <li>
     <p class="pub-cite"><strong>Muhid Hassan Risvy</strong>, Coauthor Name.
     (2027). Paper Title. In <em>Venue Name</em>. (Accepted)</p>
   </li>
   ```

   Keep your own name inside `<strong>`. Remove "(Accepted)" once the paper
   is published, and add links (PDF, DOI) at the end of the citation if
   available.

2. Update the featured publication card in `index.html` (the section with
   eyebrow "Featured Publication") with the same citation so the home page
   always shows the most recent paper.

3. Consider adding a matching news item.

## Replace the CV

Overwrite `files/CV_Muhid_Hassan_Risvy.pdf` with the new PDF under the exact
same filename. Update the "Updated ..." label in `cv/index.html` (look for
`cv-updated`).

## After any edit

- Update the "Last updated ..." line in the footer of the pages you touched
  (search for `Last updated`).
- If you added or removed a page, update `sitemap.xml`.
- Preview locally before pushing:

  ```
  python -m http.server 8080
  ```

  Then open http://localhost:8080/.
