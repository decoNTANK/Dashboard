const express = require("express");

const app = express();

const PORT = 3000;


app.use(express.json());


let bugs = [
    {
        id: 1,
        title: "Login error",
        priority: "HIGH",
        status: "OPEN"
    },
    {
        id: 2,
        title: "Button not working",
        priority: "MEDIUM",
        status: "TESTING"
    }
];


// GET all bugs
app.get("/api/bugs", (req, res) => {

    res.json(bugs);

});


// GET bug by id
app.get("/api/bugs/:id", (req, res) => {

    const bug = bugs.find(
        b => b.id === Number(req.params.id)
    );


    if (!bug) {
        return res.status(404).json({
            message: "Bug not found"
        });
    }


    res.json(bug);

});


// POST create bug
app.post("/api/bugs", (req, res) => {

    if (!req.body.title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    const newBug = {
        id: bugs.length + 1,
        title: req.body.title,
        priority: req.body.priority,
        status: "OPEN"
    };

    bugs.push(newBug);

    res.status(201).json(newBug);

});

// PUT update bug
app.put("/api/bugs/:id", (req, res) => {

    const bug = bugs.find(
        b => b.id === Number(req.params.id)
    );


    if (!bug) {
        return res.status(404).json({
            message: "Bug not found"
        });
    }


    bug.title = req.body.title || bug.title;
    bug.priority = req.body.priority || bug.priority;


    res.json(bug);

});

// DELETE bug
app.delete("/api/bugs/:id", (req, res) => {

    const bugIndex = bugs.findIndex(
        b => b.id === Number(req.params.id)
    );


    if (bugIndex === -1) {
        return res.status(404).json({
            message: "Bug not found"
        });
    }


    const deletedBug = bugs.splice(bugIndex, 1);


    res.json(deletedBug[0]);

});

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});