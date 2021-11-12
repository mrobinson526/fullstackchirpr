const express = require('express');
const chirprdb = require('../db');
const db = require('../db');
const router = express.Router();

router.get('/', async(req, res, next) => {
    try{
        let results = await db.all();
        res.json(results);
    }
        catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
})

router.get('/:id', async(req, res, next) => {
    try{
        let results = await db.one(req.params.id);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post("/", (req, res) => {
    chirprdb.CreateChirp(req.body);

    res.send("success");
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const chirp = req.body;

    chirprdb.UpdateChirp(id, chirp);

    res.send("success");
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    chirprdb.DeleteChirp(id);

    res.send("success");
});

module.exports = router;