const fs = require('fs');

fs.mkdirSync("newFolder")

fs.unlinkSync("Chirag.js");
fs.rmdirSync("newFolder");

fs.writeFileSync("newFile.js", "message", function (err)
{
    if (err)
    {
        console.log(err);
    }
});