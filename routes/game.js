const express = require('express');
const router = express.Router();

const message = {
    win : "좀 치시는군요?",
    draw : "한판 더~",
    lose : "키킥 Ez~~~",
    error : "이상한거 내지 마세요 ㅡㅡ"
}

function getGameResult(res) {
    try {
        return rockScissorsPaper();
    } catch (e) {
        res.status(400).json({
            status: "오류",
            message: e.message
        });
    }
}

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

    getGameResult(res);
});

function makeBody(status, yours, ours, message) {
    return {
        status,
        yours,
        ours,
        message
    }
}

function rockScissorsPaper(users, servers) {
    switch (users - servers) {
        case 2:
        case -1:
            return message.win
        case 0:
            return message.draw
        case -2:
        case 1 :
            return message.lose
        default :
            throw Error(message.error)
    }
}
module.exports = router;