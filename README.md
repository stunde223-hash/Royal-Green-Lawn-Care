# Royal Green Lawn Care
Static site, ready for GitHub Pages. No dependency installation or build required.

## Local server
From `/workspace/breeze-mobility`:

```sh
python -m http.server 8000 --bind 0.0.0.0
```

## Photographs
Eight client-supplied photographs are included locally in `assets/`. `assets/photo-sources.json` maps each website image to the original ZIP filename. Source files are 206 × 206 pixels; larger originals are recommended for final desktop image quality, especially the hero. The before/after comparison retains its original labels. Images render without JavaScript.

Confirm photo rights, extra service availability, contact details, and legal copy before public launch.

## GitHub Pages
Publish the repository root from the selected branch through GitHub Settings > Pages. All internal paths are relative for project-site compatibility. No deployment has been performed.

Use the existing checkout. Cloud tasks are already isolated; do not create a worktree unless requested.

## Yard enquiry form
The single-page enquiry form validates required contact details and a service selection, then prepares a reviewable email draft. It does not deliver messages directly or store entries. Visitors send through their own email app or copy into webmail. Direct delivery requires a separately configured form endpoint.
