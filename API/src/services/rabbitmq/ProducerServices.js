const amqp = require('amqplib')
const { config } = require('../../utils/config')

exports.ProducerServices = {
  sendMessage: async (queue, message) => {
    const connection = await amqp.connect(config.rabbitmq.host)
    const channel = await connection.createChannel()

    await channel.assertQueue(queue, { durable: true })
    await channel.sendToQueue(queue, Buffer.from(message))

    setTimeout(() => {
      connection.close()
    }, 1000)
  }
}
