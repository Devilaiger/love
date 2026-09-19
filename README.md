# Birthday.exe // Retro Gamer Birthday Microsite

Updated design:
- Cleaner premium retro-gamer UI
- Multiple full-screen sections with navigation
- Space War arcade mini-game
- Cake section revealed as you scroll into it
- Custom knife cursor when hovering the cake
- Click/tap the cake to trigger the cut animation
- Synthesized retro Happy Birthday melody after the cut
- Confetti and secret message finale
- Responsive mobile layout
- Easy text customization in `script.js`

## Customize

Edit the CONFIG object near the top of `script.js`:

```js
const CONFIG = {
  name: "BIRTHDAY PLAYER",
  birthdayDay: 20,
  birthdayMonth: 8,
  message: "...",
  secretMessage: "..."
};
```

September is month `8` because JavaScript counts months from zero.

## Run

No build step:

```bash
python3 -m http.server 8080
```

Then visit:

http://localhost:8080

Or open `index.html` directly in a browser.

## Notes

The sound is generated with the browser Web Audio API, so the site has no external audio asset to preload.
