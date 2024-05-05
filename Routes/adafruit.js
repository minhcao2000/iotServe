const express = require('express')
const router = express.Router()
const Adafruit = require('../Controllers/adafruitController')

//connect adafruit
const connectAda = require('../configs/adafruit')
const client = connectAda()
Adafruit.handleReciveMessage(client)

router.get('/', (req, res) => {
    res.json({ success: true, data: Adafruit.data })
})


//topic: cambien1 | cambien2 | cambien3 | nutnhan1 | nutnhan2
//message: cambien: number, nutnhan: 0 | 1
router.post('/:topic/:message', async (req, res) => {
    await Adafruit.sendMessage(client, `minhcao2000/feeds/${req.params.topic}`, req.params.message)
    res.send('oke')
})

module.exports = router