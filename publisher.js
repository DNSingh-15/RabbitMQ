var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((err1, channel) => {
        if (err1) {
            throw err1;
        }
        let queueName = 'queue1'
        let msg = 'welcome this is queue1'

        channel.assertQueue(queueName, {
            durable: false                      // optional object
        })

        // passed message as a buffer
        channel.sendToQueue(queueName, Buffer.from(msg));
        console.log(`message : ${msg}`)
        
        // now closing the connection -- after passing message there is no connection require 
        setTimeout(() => {
            connection.close();
        },1000)
    }) 
})

