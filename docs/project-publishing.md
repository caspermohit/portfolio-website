# Automatic GitHub work collection

New public repositories owned by `caspermohit` appear on the next portfolio page
load. The portfolio reads GitHub's public API without tokens or private access.
It fetches up to 1,000 repositories, excludes forks, archived/disabled repos and
the profile repository, and doesn't duplicate curated projects or their API repos.
To hide an automatically imported repository, add the `portfolio-hidden` topic.

The repository name, description, primary language, updated date, and Website
field supply the card. Set the Website field in GitHub to provide its live link.
No deployment URL is guessed. Projects without a cover get typographic artwork.
The gallery shows screenshot-led projects first, then a compact index of the remaining work. The index starts with eight entries and offers Discover more, filters, and search.

`src/data/catalog.json` preserves existing creative work, verified deployment
links, and selected screenshots. It can override automatic details for a matching
repository. This is one shared source for existing project details. Featured
projects are deliberately curated separately; imports enter the full collection.

If GitHub is unavailable or rate limited, the saved catalog stays visible. New
imports need a network connection; changes appear on reload. The API is public
and per-visitor rate limits apply. No account setup or posting editor is required.

Ownership correction: E-commerce links to caspermohit/production-project and the
verified ecommerce-web7.netlify.app deployment. That deployment returned 404, so
its unrelated screenshot was removed; the card shows deployment unavailable and
offers the source link. Expense Tracker takes its place in Selected Work.

Changes are local and have not been deployed to mohitshah.com.np.
