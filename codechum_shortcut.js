// ==UserScript==
// @name         CodeChum Shortcuts
// @namespace    http://tampermonkey.net/
// @version      2024-02-13
// @description  Codechum Shortcuts to save time
// @author       weirdo olfu student
// @match        *://*.codechum.com/*
// @icon         https://underlinear.github.io/Paint/images/icons/pencil.png
// @grant        none
// ==/UserScript==

// Customize your codechum shortcuts on userShortcutsArray!
// Add %CARET to determine where your text cursor will land after pasting.

'use strict';

const userShortcutsArray =
[
// 0 )
`import java.util.Scanner;

public class Main{
    public static void main(String[] args){
        Scanner scan = new Scanner(System.in);
        %CARET
    }
}`
// 1 !
    ,
`#include <stdio.h>

int main(){
    %CARET
    return 0;
}`
    ,
// 2 @
`System.out.println("%CARET");`
    ,
// 3 #
`printf("%CARET");`
    ,
// 4 $
`for(int i = 0; i < n; i++){
    %CARET
} `
    ,
// 5 %
`Custom text not set! `
    ,
// 6 ^
`Custom text not set! `
    ,
// 7 &
`Custom text not set! `
    ,
// 8 *
'Custom text not set! '
    ,
// 9 (
'Custom text not set! '
];


let canAppend = true;

window.addEventListener('keydown', (e) => {
    handleKeyDown(e);
})

function handleKeyDown(event){
    // For some reason, Safari immediately converts 'Shift' + 'Number' into its special symbol
    // Unlike Chrome, which treats number presses as its actual number regardless of the 'Shift' pressed on Mac
    let keyPressed = ")!@#$%^&*(".indexOf(event.key) !== -1 ? ")!@#$%^&*(".indexOf(event.key) : !isNaN(Number(event.key)) ? Number(event.key) : -1;

    // Detect for Alt + Shift or Control + Shift and a number, canAppend to delay pasting for 0.4s
    if(canAppend && ((event.altKey && event.shiftKey) || (event.ctrlKey && event.shiftKey)) && keyPressed !== -1 ) {
        pasteText(keyPressed);

        canAppend = false;
        setTimeout(() => {
            canAppend = true;
        }, 400);
    }
}

function pasteText(keyPressed){
    // CodeChum's class for the line where the caret/text cursor is
    const cmActiveLine = document.querySelector('.cm-activeLine');

    // Get caret position to slice text accordingly later
    const cursorPosition = getCaretPosition();

    // Check for indentation(tabs/spaces) at the start of line and use that as context
    const matchedSpaces = cmActiveLine.textContent.match(/^(\s*)/);

    // Determine how many spaces there are at the front on the current active line
    const spacesCount = matchedSpaces[1].length;

    let selectedText = userShortcutsArray[Number(keyPressed)];

    // Add indentation if spaces were found at the current active line
    if(spacesCount > 0){
        selectedText = addIndentation(selectedText, spacesCount);
    }

    // Add preceding text if any + text to paste + succeeding text if any
    const appendedText = cmActiveLine.textContent.slice(0, cursorPosition)
                        + selectedText
                        + cmActiveLine.textContent.slice(cursorPosition);

    // cHeck for custom caret and sets caret to where "%CARET" was found
    // Else, set caret to the end of text pasted
    if(selectedText.includes("%CARET")){
        cmActiveLine.textContent = appendedText.replace("%CARET",'');
        setCaretPosition(cursorPosition + selectedText.indexOf("%CARET"));
    }
    else{
        cmActiveLine.textContent = appendedText;
        setCaretPosition(cursorPosition + selectedText.length);
    }
}

// Add spaces to each line if necessary
function addIndentation(selectedText, spacesCount){
    let lineSeparatedText = selectedText.split("\n");
    lineSeparatedText[0] = lineSeparatedText[0] + "\n";
    for(let i = 1; i < lineSeparatedText.length; i++){
        lineSeparatedText[i] = ' '.repeat(spacesCount) + lineSeparatedText[i] + (i !== lineSeparatedText.length - 1 ? "\n" : '');
    }
    return lineSeparatedText.join("");
}

// Not familiar with handling contentEditable carets in HTML and wasn't able to learn it myself so I had to resort to code online (╥ ᴗ ╥)

// Code from Soubriquet (https://stackoverflow.com/a/54333903)
function getCaretPosition() {
    let sel = document.getSelection();
    sel.modify("extend", "backward", "paragraphboundary");
    let pos = sel.toString().length;
    if(sel.anchorNode != undefined) sel.collapseToEnd();

    return pos;
}

// ChatGPT code lol
function setCaretPosition(position) {
    const cmActiveLine = document.querySelector('.cm-activeLine');
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(cmActiveLine.firstChild, position);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}

//TODO: Add HTML GUI