# SEO, performance, and mobile review

Validated 16 October 2026 against a local HTTP server with Lighthouse mobile defaults and Chromium. These are lab measurements, not live-site field data or a search ranking guarantee.

| Metric | Before | After |
| --- | ---: | ---: |
| Performance | 74 | 96 |
| Accessibility | 97 | 100 |
| Best practices | 96 | 100 |
| SEO | 100 | 100 |
| Largest Contentful Paint | 11.4 s | 2.2 s |
| First Contentful Paint | 1.5 s | 1.4 s |
| Cumulative Layout Shift | 0.065 | 0 |

At a 390px viewport with device scale factor 3, initial resource transfers decreased from approximately 1.83 MB to 0.36 MB (about 80%). This excludes resources fetched after scrolling or opening the full-image viewer. Original enhanced images remain available on demand.

## Implemented

- Responsive 400/600/800px WebP thumbnails, a responsive AVIF hero with WebP fallback, and lazy-loaded lower-page imagery.
- Font preload for the two primary bold fonts; fonts remain hosted locally.
- Mobile form inputs at 16px to avoid iOS focus zoom, larger touch targets, skip navigation, and improved label contrast.
- Title and description targeting lawn care in Los Angeles; canonical URLs, social-sharing metadata, favicon, sitemap, and robots file.
- Structured data identifying the business, four established service categories, contact information, Facebook profile, and eleven service cities.
- No fabricated street address, opening hours, reviews, ratings, or prices in structured data.

## Validation

- Portrait viewport widths: 320, 360, 390, 412, 768, and 1440px. Landscape: 667x375, 844x390, and 1024x768.
- No horizontal overflow; touch menu, service accordion, full-image viewer, original-photo toggle, and email enquiry draft exercised.
- No browser runtime or asset-loading errors in the tested flows.
- No-JavaScript fallback retains photo links and direct email instructions; submit is disabled without JavaScript to prevent accidental query-string submission of contact details.
- Desktop and mobile screenshots reviewed.
- Direct file:// preview could not be tested because the managed browser blocks file navigation. HTTP testing passed.

## Public-site follow-up

Canonical and social URLs currently use https://stunde223-hash.github.io/Royal-Green-Lawn-Care/ because no alternative live URL was supplied. Update these URLs in all three HTML pages, sitemap.xml, and robots.txt if a custom or Cloudflare domain is the final home. Avoid competing canonical domains.

After deployment, verify the real public URL in Google Search Console and submit sitemap.xml. Account verification and sitemap submission have not been performed. An eligible Google Business Profile with accurate real-world service-area details is a separate step; no profile was created or edited.

A robots.txt file in a GitHub project subdirectory is not the host-root robots policy. The host-root file controls crawling; the sitemap may be submitted directly in Search Console. This project file also supports deployment at a custom-domain root.

Caching, compression, HTTPS, canonical redirects, indexability, and real-user Core Web Vitals still need verification on the final public host. The local test server does not emulate production caching. Local scores do not establish live publication, Google indexing, or rich-result eligibility.

The form prepares a message for the visitor to send through email. It does not silently submit enquiries to a server. Images remain clearly labeled AI-enhanced reconstructions.
