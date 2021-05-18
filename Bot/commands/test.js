module.exports = {
    name: 'test',
    description: "This displays all of my commands!",
    async execute(message, args) {
        message.channel.send("test")
    }
}