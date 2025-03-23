# Avenir Font Integration

This directory is where you should place your licensed Avenir font files if you own a license.

## Using Licensed Avenir Fonts

1. Purchase a license for Avenir from [Linotype](https://www.linotype.com/) or another authorized distributor.
2. Place the following font files in this directory:
   - `Avenir-Roman.woff2` and `Avenir-Roman.woff` (normal weight)
   - `Avenir-Medium.woff2` and `Avenir-Medium.woff` (medium weight)
   - `Avenir-Heavy.woff2` and `Avenir-Heavy.woff` (bold weight)
3. Uncomment the `@font-face` declarations in `src/styles/fonts.css`

## Current Configuration

The site is currently configured to use:
1. Avenir (if available locally)
2. Nunito (from Google Fonts as a fallback)
3. Inter or Helvetica Neue as additional fallbacks

## Avenir Alternatives

If you don't have licensed Avenir files, the site will automatically use Nunito from Google Fonts, which has been chosen as a good open-source alternative with similar geometric properties. 