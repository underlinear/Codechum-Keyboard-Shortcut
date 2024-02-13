let myString = 
`HI

HI`;

let separatedMyString = myString.split("\n");

console.log(separatedMyString);

separatedMyString[0] = separatedMyString[0] + "\n";

for(let i = 1; i < separatedMyString.length; i++){
    separatedMyString[i] = ' '.repeat(4) + separatedMyString[i] + "\n";
}

console.log(separatedMyString.join("") + "end");