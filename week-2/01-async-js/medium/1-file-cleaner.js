var fs = require("fs");

function removeSpace(data){
    data = data.replace(/\s+/g, ' ').trim();
    return data;
}

fs.readFile("1-file-cleaner.md", "utf-8", (err, data) => {
    if(err){
        console.log("Error while reading the content of file");
    }
    else{
        data = removeSpace(data);
        fs.writeFile("file.txt", data, (err) => {
            if(err){
                console.log("Error while writing to file...");
            }
        })
    }
})