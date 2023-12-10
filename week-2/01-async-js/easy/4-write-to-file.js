var fs = require("fs");

function writeToFile(text, fileName){
    fs.writeFile(fileName, text, (err) => {
        if(err){
            console.log("Error writing the file. Try Again...");
        }
    })
}

var content = "Hey, this is the content for my new file";
writeToFile(content, "file.txt");