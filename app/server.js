const express = require('express');
const app = express();
const port = 8080;
const game = require(`../routes/game`);

app.set('port', 8080);
app.listen(port, () => {
    console.log(`서버 on~`);
});

app.use('/game', game);

app.all(`/*`, (req, res) => {
    res.send({
        status: "오류",
        message: "잘못된 요청입니다."
    });
});