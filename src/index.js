const moment = require('moment');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoClient = require('./mongoClient');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000 || process.env.port;
const router = express.Router();
router.get('/', function (req, res) {
    res.json({message: 'Hello'});
});

router.route('/highScore').get(
    async function (req, res) {
        const connection = await mongoClient();
        const highScores = await connection.collection('highScores').find().limit(10).toArray();
        return res.send(highScores);
    }
).post(async function (req, res) {
    console.log('saving high score');
    const connection = await mongoClient();
    connection.collection('highScores').insertOne({
        user: req.body.user,
        scoreValue: req.body.scoreValue,
        date: moment().toISOString(),
        states: req.body.states,
    }, {
        w: 'majority'
    }, function (err, r) {
        if (err != null) {
            console.log(err)
        }
    });
    res.sendStatus(200)
});

app.use('/api', router)

app.listen(port);
