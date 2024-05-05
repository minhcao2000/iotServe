require('dotenv').config()
const hehe2 = Buffer.from("YWlvX3RKenM4MnRhVjBSMVVFdWhhUFFySDNSZTNJRG4=", 'base64').toString('ascii')

const mqtt = require('mqtt')
const TOPICS = require('../constants')

const connectAda = () => {
    const topics = [TOPICS.CAMBIEN1, TOPICS.CAMBIEN2, TOPICS.CAMBIEN3, TOPICS.NUTNHAN1, TOPICS.NUTNHAN2]
    const client = mqtt.connect("mqtt://io.adafruit.com", {
        clean: true,
        port: 1883,
        connectTimeout: 4000,
        username: "minhcao2000",
        password: hehe2,
        reconnectPeriod: 1000,
    })

    client.on('connect', () => {
        console.log("Successfully connected to adafruit");
        client.subscribe(topics, () => {
            console.log(`Subscribe to all topic`)
        });
    });
    return client;
}

module.exports = connectAda;
