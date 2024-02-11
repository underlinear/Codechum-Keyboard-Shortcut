## Poorly implemented keyboard shortcuts for CodeChum lol

Windows: `Alt` + `Shift` + `Number (0 - 9)`

Mac: `CTRL` + `Shift` + `Number (0 - 9)`

Use tampermonkey or any Userscript extension for Chrome/Safari (Untested on different browsers). Alternatively you can just paste the code on the Javascript console but you'd have to do it almost every time lol.

### Add your custom texts to codechum_shortcut.js

Simply modify any of the strings on user_shortcuts_array to create your new custom text! (Supports up to 10 shortcuts only)

To customize where the caret position would land after, just add "%CARET" to your string. "%CARET" will be ignored when pasting your text.

^Small project I made because of having to deal with Java boilerplate^

Feel free to fork