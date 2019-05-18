const express = require("express"),
    router = express.Router(),
    yockoJack = require("./yockojack.js");

router.get('/getHand', async(req, res) => {
    let handAtPlay = yockoJack.logResults();
    console.log(handAtPlay)

    res.json({ ok: true, handAtPlay })

});

module.exports = router;
