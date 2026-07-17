# risvy.github.io

Personal academic website of Muhid Hassan Risvy, served by GitHub Pages at
[risvy.github.io](https://risvy.github.io/).

Hand-written static HTML, CSS, and vanilla JavaScript. No build step, no
framework, no Jekyll (`.nojekyll` is present).

## Preview locally

```
python -m http.server 8080
```

Then open http://localhost:8080/. A local server is required because the site
uses root-relative paths (`/assets/...`).

## Updating content

See [MAINTENANCE.md](MAINTENANCE.md) for how to add news items (with photos),
add publications, and replace the CV.
