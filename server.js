// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

app.use(express.static("public"));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf8", function(err, data){
        if(err) console.log(err);
        console.log(data);
        res.json(JSON.parse(data));
    })
})

app.post("/api/notes", function(req, res) {
    const newNote = req.body
    let listNotes;
    fs.readFile("./db/db.json", "utf8", function(err, data){
        if(err) console.log(err);
        listNotes = JSON.parse(data);
        listNotes.push(newNote);
        
        fs.writeFile("./db/db.json", JSON.stringify(listNotes), function(err){
            if(err) console.log(err);
            res.json(newNote);
        })
    })
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
