// Dependencies
const { AsyncLocalStorage } = require("async_hooks");
const { table } = require("console");
const express = require("express");
const fs = require("fs");
const path = require("path");
const { connected } = require("process");
const database = require("./public/db/db.json")


// Initialize express
var app = express();

// Assign PORT to 3000
var PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Notes html 
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

// GET, POST, DELETE API Endpoints.
app.route("/api/notes")
    .get(function (req, res) {
        res.json(database);
    })

    // Add a new note to the json db file.
    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "./public/db/db.json");
        let newNote = req.body;

        let highestId = 99;
        for (let i = 0; i < database.length; i++) {
            let individualNote = database[i];

            if (individualNote.id > highestId) {
                highestId = individualNote.id;
            }
        }

        // Assigns an ID to newNote. 
        newNote.id = highestId + 1;
        database.push(newNote)

        // Write the db.json file
        fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("Your note was saved!");
        });
        res.json(newNote);
    });


app.delete("/api/notes/:id", function (req, res) {
    let jsonFilePath = path.join(__dirname, "./public/db/db.json");
    // request to delete note by id.
    for (let i = 0; i < database.length; i++) {

        if (database[i].id == req.params.id) {
            // Splice, deletes a note.
            database.splice(i, 1);
            break;
        }
    }
    // Write the db.json
    fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {

        if (err) {
            return console.log(err);
        } else {
            console.log("Your note was deleted!");
        }
    });
    res.json(database);
});

// APP.listen
app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
});

