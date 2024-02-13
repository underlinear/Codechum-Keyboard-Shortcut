## Keyboard shortcuts for CodeChum lol

Don't want to waste time writing 6 lines of Java boilerplate code every single activity? Find yourself writing the same for loop code 3 times in your code? Maybe you find built-in clipboards quite limiting for CodeChum due to being able to only store 1 at a time and having to manually set the caret or fix incorrect indentation once pasted?

WELL SAY NO MORE!1!!

Featuring keyboard shortcuts for CodeChum which allows you to save time by allowing you to paste code in which you could customize for 10 different texts with smart indentation and caret placement to desired location!

Imagine the possibilities! You can impress your friends by writing a million for loop code all nested within each other in 10 seconds or have every single possible imports, headers, defined by three pressed on your keyboard! or maybe not, just use it for Java/C/HTML/C# boilerplate lol.

**Windows**: `Alt` + `Shift` + `Number (0 - 9)` *UNTESTED*

**Mac**: `Ctrl` + `Shift` + `Number (0 - 9)`

Use tampermonkey or any Userscript extension for Chrome/Safari (Untested on other browsers but should work on most Chromium based ones). Alternatively you can just paste the code on the Javascript console but you'd have to do it almost every time you switch to a new page lol

### Add your custom texts to codechum_shortcut.js

Simply modify any of the strings on userShortcutsArray to create your new custom text! (Supports up to 10 shortcuts only)

To customize where the caret position would land after, just add "%CARET" to your string. "%CARET" will be ignored when pasting your text.

^Small project I made because of having to deal with Java boilerplate^

Feel free to fork.