import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes} from 'discord.js';
import {REST} from '@discordjs/rest';

config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
// const GUILD_ID = process.env.GUILD_ID; --> Index 4

const client = new Client({ 
    intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    ],
});

const rest = new REST ({ version: '10'}).setToken(TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in!`);
});

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()){
        console.log('Hello World');
        console.log(interaction.options.get('food').value);
        interaction.reply({ content: 'Hey There!!!!'});
    }
});

async function main(){

    const commands = [
        {
            name: 'tutorialorder',
            description: 'Order Something',
            options: [
                {
                    name: 'food',
                    description: 'the type of food',
                    type: 3, // string
                    required: true,
                },
            ],
        }
    ];

    try{
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(CLIENT_ID /*, GUILD_ID*/), { // <-- index 4
            body: commands,
         });

        client.login(TOKEN);
    }
    catch (err) {
        console.log(err);
    }
}

main();

/*
client.on('messageCreate', (message) => {
    console.log(message.content);
    console.log(message.createdAt.toDateString());
    console.log(message.author.tag);
});
*/


