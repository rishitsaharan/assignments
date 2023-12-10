var fs = require("fs");

function readFile(fileName){
    fs.readFile(fileName, "utf-8", function(err, data){
        if(err){
            console.log("Error in File-reading...");
        }
        else{
            console.log(data);
        }
    })
}
readFile("1-counter.md");
let sum = 0;
for (let i = 0; i < 10000000; i++) {
    sum += i;
}
console.log('Expensive operation completed '+sum);