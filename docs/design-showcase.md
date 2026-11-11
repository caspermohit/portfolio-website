# UX/UI, print, and motion showcase

The portfolio's #design section sits after Selected Work. It presents Exhibera as
an interactive design study, RelyUp print as a format gallery, and two delivered
RelyUp films through native video controls. All media is local; video is loaded
only when requested. The main player pauses when offscreen or the page is hidden.

## Sources found through existing chats

- Exhibera Figma: https://www.figma.com/design/Dsfu9yYndXkJnOk9lsSDt0?node-id=110-2914
- Exhibera screenshots: 2026-10-01/l/work/client-update-oct26. These are selected
  prototype previews; they are not asserted to capture every latest Figma change.
- RelyUp client-approved visual print artwork:
  /Users/mohitshah/RelyUP_VLT080/Working_Files/Uptown_Editable_Artwork_2026-10-28.
  Artwork_Notes.txt distinguishes visual approval from prepress approval. The
  SVGs are display assets here; no production print download is offered.
- RelyUp launch film: Working_Files/relyup-15s-4k-email.mp4, the smaller version of
  the delivered 4K film. The original 4K master is preserved outside this website.
- RelyUp trade-show film: Working_Files/Motion_v10/RelyUp_TradeShow_15s.mp4.
  The November 9 delivery chat confirms both videos were sent to the client.
- Posters were extracted from the actual video files at one second.

Earlier placeholder concepts were replaced and are not shipped in public/design.
Invoices, client correspondence, delivery photos, and private contact details are
not part of the website assets. Scope copy describes designs, not measured UX
outcomes or independently verified client product claims.

Data: src/data/designWork.js. Component: src/components/DesignShowcase.js.
Add further genuine work by extending that manifest and adding supplied media.
The new work is currently a local preview, not a live-domain deployment.

## Design refinement

Added work-discipline navigation, direct artist/jury view entry points, metadata, previous/next viewer controls, full-size image links, a centered mobile preview, and a main-player film selector. Scroll-linked surface movement uses GSAP matchMedia and is disabled on touch/small screens and reduced-motion settings. These are implementation and keyboard/reflow checks, not a full WCAG conformance audit.
