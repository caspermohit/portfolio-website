# Motion study and freelance clients

## Motion

Reference: [How do you communicate that — What Ships / Jordan Watkins](https://whatships.com/videos/how-do-you-communicate/), viewed October 9, 2026. The clip was inspected in a browser and uses animated typography and collage-like graphic objects. Its media is not embedded or redistributed in this site.

The portfolio now includes an original 16-second GSAP study: spark → shape → build → feeling. It combines text reveals, vector drawings, typographic objects, and a real project screenshot. It uses the portfolio palette, has no audio, and offers pause/play and replay. IntersectionObserver and document visibility pause playback when the section is offscreen or the browser is hidden. Reduced-motion mode presents a static first scene and disables playback controls.

## Freelance clients

The user identified Two Dudes One Couch, RelyUp, Leazsure, and LandLogic as freelance clients. These are separate from Guruinfosys and Green Computing in employment history. No services, deliverables, or testimonials are invented for the freelance relationships.

Official logo sources:

- [Two Dudes One Couch](https://twodudesonecouch.ca/): official WordPress logo asset.
- [RelyUp](https://relyup.ca/): official dark-background horizontal lockup.
- [LandLogic](https://landlogic.ai/): official reversed horizontal logo hosted by Squarespace.
- [LeazeSure](https://leazesure.com/): corrected domain supplied by the user; official shield logo paired with its brand name.

The client data is kept in `src/data/clients.js` so additional clients can be added in one place. Authentic client logos retain their colors within a neutral dark surface.

## Verification

- Production build passed.
- Browser playback progressed through the scene sequence; pause/play and replay updated their controls and visible frames.
- Logos loaded from local files.
- Document width matched viewport width at 320, 768, and 1440 pixels.
- Reduced-motion handling is implemented; browser emulation was not available in the in-app verification interface.
