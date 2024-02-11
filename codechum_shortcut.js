// ==UserScript==
// @name         CodeChum Shortcuts
// @namespace    http://tampermonkey.net/
// @version      2024-02-03
// @description  Codechum shortcuts
// @author       weirdo olfu student
// @match        *://*.codechum.com/*
// @icon         https://underlinear.github.io/Paint/images/icons/pencil.png
// @grant        none
// ==/UserScript==

// Customize your codechum shortcuts on user_shortcuts_array!
// Add %CARET to determine where your text cursor will land after pasting.

'use strict';

const user_shortcuts_array =
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
    let keyPressed = ")!@#$%^&*(".indexOf(event.key) !== -1 ? ")!@#$%^&*(".indexOf(event.key) : !isNaN(Number(event.key)) ? Number(event.key) : -1;
    if(canAppend && ((event.altKey && event.shiftKey) || (event.ctrlKey && event.shiftKey)) && keyPressed !== -1 ) {
        pasteText(keyPressed);

        canAppend = false;
        setTimeout(() => {
            canAppend = true;
        }, 1000);
    }
}

function pasteText(keyPressed){
    const selectedText = user_shortcuts_array[Number(keyPressed)]
    const cursorPosition = getCursorPosition();
    const cmActiveLine = document.querySelector('.cm-activeLine');
    const appendedText = cmActiveLine.textContent.slice(0, cursorPosition)
                        + selectedText
                        + cmActiveLine.textContent.slice(cursorPosition);
    if(selectedText.includes("%CARET")){
        cmActiveLine.textContent = appendedText.replace("%CARET",'');
        setCaretPosition(cursorPosition + selectedText.indexOf("%CARET"));
    }
    else{
        cmActiveLine.textContent = appendedText;
        setCaretPosition(cursorPosition + selectedText.length);
    }
}


// Not familiar with handling contentEditable carets in HTML so I had to resort to code online lol

// Code from Soubriquet (https://stackoverflow.com/a/54333903)
function getCursorPosition() {
    var sel = document.getSelection();
    sel.modify("extend", "backward", "paragraphboundary");
    var pos = sel.toString().length;
    if(sel.anchorNode != undefined) sel.collapseToEnd();

    return pos;
}

// ChatGPT code below lol
function setCaretPosition(position) {
    const cmActiveLine = document.querySelector('.cm-activeLine');
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(cmActiveLine.firstChild, position);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}

