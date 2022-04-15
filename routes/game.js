const express = require('express');
const router = express.Router();

router.get("/:users", (req, res, next) => {
    const hands = {
        묵: 0,
        찌: 1,
        빠: 2,
        ROCK: 0,
        SCISSORS: 1,
        PAPER: 2
    };

    let users = req.params['users'].toUpperCase();
    let servers = Object.keys(hands)[Math.floor(Math.random() * 8) % 3];

    switch (hands[users] - hands[servers]) {
        case 2:
        case -1:
            res.send(
                makeBody("승리", users, servers, "좀 치시는군요!")
            );
            break;
        case 0:
            res.send(
                makeBody("무승부", users, servers, "한판더~")
            )
            break;
        case -2:
        case 1 :
            res.send(
                makeBody("패배", users, servers, "키킥 EAzy~")
            )
            break;
        default :
            next();
    }

}, (req, res) => {
    res.statusCode = 400;
    res.send({
        status: "오류",
        message: "잘못된 승부수입니다."
    });
});

function makeBody(status, yours, ours, message) {
    return {
        status: status,
        yours: yours,
        ours: ours,
        message: message
    }
}

module.exports = router;