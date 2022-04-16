const express = require('express');
const router = express.Router();

const message = {
    승리 : "좀 치시는군요?",
    무승부 : "한판 더~",
    패배 : "키킥 Ez~~~",
    에러 : "이상한거 내지 마세요 ㅡㅡ"
};

const hands = {
    묵: 0,
    찌: 1,
    빠: 2
};

router.get("/:yours", (req, res) => {
    const getRandom = () => Math.floor(Math.random() * 3)

    const yours = req.params['yours'];
    const ours = Object.keys(hands)[getRandom()];

    try{
        const result = getGameResult(hands[yours], hands[ours]);

        res.status(200).json({
                status: result,
                yours,
                ours,
                message: message[result]
        });
    } catch (e) {
        res.status(400).json({
            status: "오류",
            message: message.에러
        });
    }
});

function getGameResult(users, servers) {
    switch (users - servers) {
        case 2:
        case -1:
            return "승리"
        case 0:
            return "무승부"
        case -2:
        case 1 :
            return "패배"
        default :
            throw Error(message.에러)
    }
}

module.exports = router;