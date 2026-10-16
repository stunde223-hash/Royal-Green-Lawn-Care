# Royal Green Lawn Care
Static site, ready for GitHub Pages. No dependency installation or build required.

## Local server
From `/workspace/breeze-mobility`:

```sh
python -m http.server 8000 --bind 0.0.0.0
```

## Photographs
Eight client-supplied photographs are included locally in `assets/`. `assets/photo-sources.json` maps each website image to the original ZIP filename. Source photos are 206 × 206 pixels and remain available in the viewer. Displayed images are high-resolution AI reconstructions, clearly labeled; they are not exact restorations or documentary proof. Images render without JavaScript and full-image links work without the interactive viewer.

Confirm photo rights, extra service availability, contact details, and legal copy before public launch.

## GitHub Pages
Publish the repository root from the selected branch through GitHub Settings > Pages. All internal paths are relative for project-site compatibility. No deployment has been performed.

Use the existing checkout. Cloud tasks are already isolated; do not create a worktree unless requested.

## Yard enquiry form
The single-page enquiry form validates required contact details and a service selection, then prepares a reviewable email draft. It does not deliver messages directly or store entries. Visitors send through their own email app or copy into webmail. Direct delivery requires a separately configured form endpoint.

## Enhanced imagery and image viewer
The eight site images are generated high-resolution reconstructions of supplied low-resolution photos. AI enhancements are labeled in the site and viewer; originals remain in assets/*.jpg and can be viewed using the original-photo toggle. The gallery and services support keyboard-accessible full-image viewing, with previous/next controls and Escape to close. Generated PNG sources are preserved outside the checkout in /workspace/generated_images; optimized WebP versions are shipped in assets/enhanced.

## SEO and mobile performance
See `docs/SEO-PERFORMANCE.md` for local audit measurements, checks, and public-host follow-up. Canonical URLs currently target the GitHub Pages project URL. Responsive images are pre-generated in `assets/responsive/`; no Node runtime or build step is needed to serve the site. Full-resolution images are loaded only through the viewer. Submit `sitemap.xml` in the verified Search Console property after the final public domain is confirmed.
