const express = require('express');
const router = express.Router();

const message = {
    승리 : "좀 치시는군요?",
    무승부 : "한판 더~",
    패배 : "키킥 Ez~~~",
    에러 : "이상한거 내지 마세요 ㅡㅡ"
};

router.get("/:playerHand", (req, res) => {
    const playerHand = req.params['playerHand'];
    if(!validateHand(playerHand)) {
        return sendError(res, message.에러);
    }

    const serverHand = getRandomHand();
    const result = getGameResult(playerHand, serverHand);

    res.status(200).json({
        result,
        playerHand,
        serverHand,
        message: message[result]
    });
});

function getGameResult(playerHand, serverHand) {
    if(playerHand === serverHand) return "무승부"

    if(playerHand === "묵" && serverHand === "찌"
        || playerHand === "찌" && serverHand === "빠"
        || playerHand === "빠" && serverHand === "묵") return "승리"

    return "패배"
}

function getRandomHand() {
    switch (getRandom(3)) {
        case 0: return "묵"
        case 1: return "찌"
        case 2: return "빠"
    }
}

function getRandom(maxNum) {
    return Math.floor(Math.random() * maxNum)
}

function validateHand(playerHand) {
    if(playerHand !== undefined && (playerHand === "묵"
        || playerHand === "찌" || playerHand === "빠")) return true;

    return false;
}

function sendError(res, errorMessage) {
    return res.status(400).json({
        status: "에러",
        errorMessage
    });
}

module.exports = router;