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

//Customize your codechum shortcuts on user_shortcuts_array!

(function() {
    const user_shortcuts_array =
[
// ALT + SHIFT + number in Windows, OPTION + SHIFT + number in MacOS

// 1:
`import java.util.Scanner;

public class Main{
    public static void main(String[] args){
        Scanner scan = new Scanner(System.in);
    }
}`
    ,
// 2:
`#include <stdio.h>

int main(){
    return 0;
}`
    ,
// 3:
'System.out.println("");'
// 4:
    ,
'printf("");'
    ];
        'use strict';
        let canAppend = true;
        window.addEventListener('keydown', (e) => {
            //Current selected line
            console.log(`e.key = ${e.key}`);
            const cm_content = document.addEventListener('.cm-content');
            const cm_activeLine = document.querySelector('.cm-activeLine');
            if(canAppend && ((e.altKey && e.shiftKey) || (e.ctrlKey && e.shiftKey)) && !isNaN(Number(e.key))) {
                cm_activeLine.textContent = cm_activeLine.textContent.slice(0,cursor_position()) + user_shortcuts_array[Number(e.key)] + cm_activeLine.textContent.slice(cursor_position());
                //Prevent pasting multiple times
                canAppend = false;
                /*
                var sel = window.getSelection();
                sel?.setPosition(cm_content.childNodes[0], 5);
                */

                setTimeout(() => {
                    canAppend = true;
                }, 1000);
            }
        })
    })();

function cursor_position() {
    var sel = document.getSelection();
    sel.modify("extend", "backward", "paragraphboundary");
    var pos = sel.toString().length;
    if(sel.anchorNode != undefined) sel.collapseToEnd();

    return pos;
}