const { error } = require('console');
const fs = require('fs');

function createAccess() {
    console.log("Writing acces.log file")
    if (!fs.existsSync("logs")) {
        fs.mkdir("logs", (err) => {
            if (err) return err;

            fs.writeFile("./logs/access.log", "Access log", (err) => {
                if (err) return err;

                console.log("File created and saved");
            })
        })
    }
};


module.exports = { createAccess }