const sendMessage = (client, topic, message) => {
    client.publish(topic, message, { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
        console.log('Send Message: ', message, topic)
    })
    return
}

var data = {
    cambien1: 0,
    cambien2: 0,
    cambien3: 0,
    nutnhan1: 0,
    nutnhan2: 0
}

const { io } = require('../configs/socket')

io.on('connection', (socket) => {
    console.log('a user connected');
});
io.timeout(10000).emit("disconect", (err, responses) => {
    if (err) {
        io.disconnectSockets()
    } else {
        console.log(responses); // one response per client
    }
});



const handleReciveMessage = async (client) => {

    await client.on('message', (topic, message) => {

        const temp = parseInt(message)
        const deviceName = topic.split('/')[2]

        switch (deviceName) {
            case "cambien1":
                data.cambien1 = temp
                break;

            case "cambien2":
                data.cambien2 = temp
                break;

            case "cambien3":
                data.cambien3 = temp
                break;

            case "nutnhan1":
                data.nutnhan1 = temp
                break;

            case "nutnhan2":
                data.nutnhan2 = temp
                if (temp == 1) {
                    sendMessage(client, 'minhcao2000/feeds/nutnhan1', "1")
                }
                break;

            default:
                console.log('deviceName does not exit')
                break;
        }

        io.emit("getData", data)
    })
}

module.exports = { sendMessage, handleReciveMessage, data }