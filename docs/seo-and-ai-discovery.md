# Search and AI discovery

Production domain: https://mohitshah.com.np

## Implemented
- Build-time rendering of the actual portfolio and client guide, including text, links, and images. The same HTML is served to visitors and crawlers; React adds interactions after loading.
- Unique page titles/descriptions, canonical URLs, absolute social preview URLs, Person, WebSite, ProfilePage/WebPage structured data derived from existing public facts.
- XML sitemap generated from the same route configuration as metadata.
- Search crawler access for Google, OpenAI search, Anthropic search/user fetching, and Perplexity. Existing training crawler preferences are preserved; allowing training is not required for search discovery.
- Netlify build configuration and a real HTTP 404 for unknown pages rather than duplicate homepages.
- Automatic build checks for HTML content, schema, canonicals, metadata, robots, and sitemap.

## Live audit, October 9, 2026
The live domain responded HTTP 200 from Netlify but served an older 799-byte JavaScript shell. A direct text fetch exposed only “You need to enable JavaScript to run this app.” Live robots allowed crawling but had no sitemap. Local changes must be deployed before they affect that domain.

## Search Console activation after deployment
1. Open https://search.google.com/search-console and add the Domain property `mohitshah.com.np`.
2. Copy Google's exact TXT verification value to the domain's DNS provider. Keep existing DNS records. Verify in Search Console; the genuine Google HTML verification tag was obtained from the signed-in Search Console session and added to the homepage on October 9, 2026. A URL-prefix property is pending verification until deployment; DNS verification remains an optional later upgrade.
3. Submit `https://mohitshah.com.np/sitemap.xml` under Sitemaps.
4. Inspect the homepage and `/client-guide`, test the live URLs, confirm canonical URLs and rendered HTML, then request indexing.
5. Confirm HTTP 200 for those pages and sitemap, 404 for a made-up route, and accessible images. Check any Netlify/CDN bot protections don't challenge search crawlers.
6. Monitor indexing and Performance reports: queries, impressions, clicks, CTR, and position. Search Console is a reporting/diagnostic tool, not a way to buy or set rankings.

## Content priorities
Start with the accurate identity query “Mohit Shah” and relevant freelance web design/development searches. A geographic focus has not been confirmed, so no location claims have been added. Publish real project case studies with scope, role, screenshots, constraints, implementation choices, and verified results. Do not invent metrics, client testimonials, or awards. Link the portfolio from the owner's GitHub and LinkedIn; ask clients for legitimate attribution links where appropriate. More companies can be added to `src/data/clients.js` when confirmed.

There is no guaranteed first position or universal AI submission form. AI answers depend on query, retrieval, competing sources, and the product's own selection. Accessible HTML and trustworthy references support discovery; robots permission does not guarantee citations. No special AI schema or llms.txt file is required by Google for AI Overviews/AI Mode.

## Sources
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.openai.com/api/docs/bots
- https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler

## Deployment and activation, October 9, 2026
SEO source changes were committed to the existing GitHub main branch and deployed through Netlify. The Node 18 Lenis module import issue was repaired with an asynchronous import. Homepage and client guide return HTTP 200 with static HTML; sitemap returns application/xml; unknown pages return HTTP 404. Canonicals match Netlify’s trailing slash for the client guide. Search Console URL-prefix ownership verification succeeded using the HTML tag. Google confirms the homepage is indexed and accepted indexing requests for both pages. Sitemap submission succeeded, but the report initially showed Couldn’t fetch despite a valid HTTP 200 response; the refreshed sitemap was resubmitted once. This warning requires Google to fetch/process again; no claim of successful sitemap processing has been made. Netlify Lighthouse reported SEO 100, accessibility 98, best practices 100, performance 89 for the initial SEO deployment; these scores do not measure search rankings.
