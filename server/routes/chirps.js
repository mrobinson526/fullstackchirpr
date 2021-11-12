const router = require('express').Router();
const chirpStore = require('../chirpstore');

router.get("/:id?", (req, res) => {
    if (req.params.id) {
        const chirp = chirpStore.GetChirp(req.params.id);
        res.send(chirp);
    } else {
        const chirps = chirpStore.GetChirps();
        delete chirps.nextid
        const tempArr = Object.entries(chirps);
        const chirpArr = tempArr.map(chirp => {
            const newChirp = {
                id: chirp[0],
                username: chirp[1].username,
                message: chirp[1].message
            }
            return newChirp
        });
        chirpArr.reverse();
        res.status(200).send(chirpArr);
    }
});

router.post("/", (req, res) => {
    chirpStore.CreateChirp(req.body);

    res.send("success");
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const chirp = req.body;

    chirpStore.UpdateChirp(id, chirp);

    res.send("success");
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    chirpStore.DeleteChirp(id);

    res.send("success");
});

module.exports = router;