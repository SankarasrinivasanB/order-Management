var amqp = require('amqplib/callback_api')
const connUrl = "amqp://tevcfzni:QBnGiRQS2JcJJUOw2TJWZUTYYjMBwkHv@woodpecker.rmq.cloudamqp.com/tevcfzni"

let ch = null
amqp.connect(connUrl,(err,conn)=>{
    conn.createChannel((err,channel)=>{
        ch = channel;
    });
});

const publishToQueue = async (queueName,data)=>{
    ch.sendToQueue(queueName,new Buffer(data));
}

process.on('exit',(code)=>{
    ch.close();
    console.log(`Closing RabbitMq channel`);
})

module.exports = publishToQueue;