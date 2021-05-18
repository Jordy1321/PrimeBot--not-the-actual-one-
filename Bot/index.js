require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://PrimeBot:LPKYcu7zbIMGI9fQ@primebot.9arvb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('PrimeBot is online!');
    client.user.setActivity('[insert prime status here]')
        .catch(console.error);
});

client.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(process.env.PREFIX)) return;
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
        command.execute(message, args, client)
    } catch (error) {
        console.error(error);
        message.reply('error message here')
    }
});

client.login(process.env.BOT_TOKEN);