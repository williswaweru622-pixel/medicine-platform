# Medicine demo data

The app loads its starter medicines from `db.json` and stores changes in the
browser's local storage. This lets the demo run as a static site without a
separate API server. Added, edited, and deleted medicines remain saved in the
browser where the changes were made; they are not shared with other visitors or
devices.

## Deploying the demo

The GitHub Actions workflow deploys the app to GitHub Pages whenever changes
are pushed to `main`. In the repository settings, open **Pages** and set the
source to **GitHub Actions**. After the workflow succeeds, the demo will be
available at:

https://williswaweru622-pixel.github.io/medicine-platform/

The workflow also publishes the app entry point as `404.html` so direct links
to app routes continue to work on GitHub Pages.