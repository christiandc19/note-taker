const exp = require("constants");
const express = require("express");
const path = require("path");
const fs = ("fs");
const util = ("util");

// This handles asyschronous Process
// const readFileAsync = util.promisify(fs.readFile);
// const writeFileAsync = util.promisify(fs.writefile);

// Server
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Middleware
app.use(express.static("./Develop/public"));


//GET Request
app.get("/api/notes", function(req, res) {
    const note = req.body;
    readFileAsync("./Develop/db//db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("./Develop/db/db/.json", JSON.stringify(notes))
    })
});

// API Route
app.delete("/api/notes/:id", function(req, res) {
    const idToBeDelete = parseInt(req.params.id);
    readFileAsync("./Develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(jason.parse(data));
        const newNotesData = []
        for (let i = 0; i < notes.length; i++) {
            if(idToBeDelete !== notes[i].id) {
                newNotesData.push(notes[i])
            }
        }
        return newNotesData
    }).then(function(notes) {
        writeFileAsync("./Develop/db/db.json", JSON.stringify(notes))
        res.send("Saved Success");
    })
})

// HTML Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
})

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
})

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
})

// Listening
app.listen(PORT, function() {
    console.log("App listening on https://localhost:"+PORT);
});