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
        //  we will going to get the message from publisher.js

        channel.assertQueue(queueName, {
            durable: false                      // optional object
        })

        channel.consume(queueName, (msg) => {
            console.log(`Received : ${msg.content.toString()}`)
            channel.ack(msg);
        })
        // here we received two messages that,s why we have to delete the message from the queue after received
        
    }) 
})