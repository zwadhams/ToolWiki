# Bundled fonts

The wiki uses Inter for body text and Departure Mono for headings, following
[Zach's personal website](https://zwadhams.github.io/).

Downloaded unchanged on 2026-10-29:

- [Departure Mono Regular](https://zwadhams.github.io/assets/fonts/DepartureMono-Regular.woff2), with the reference site's [license notice](https://zwadhams.github.io/assets/fonts/DepartureMono-LICENSE.txt).
- [Inter variable upright](https://raw.githubusercontent.com/rsms/inter/master/docs/font-files/InterVariable.woff2) and [italic](https://raw.githubusercontent.com/rsms/inter/master/docs/font-files/InterVariable-Italic.woff2), with the [upstream license](https://github.com/rsms/inter/blob/master/LICENSE.txt).

Both use the SIL Open Font License 1.1. Keep the adjacent license notices with
these files. Copies in `public/licenses/` are included in the built site.
The stylesheet uses relative asset URLs so Astro emits fonts under the site's
configured base path. No external font requests are required.
