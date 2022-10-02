import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes} from 'discord.js';
import {REST} from '@discordjs/rest';

import OrderCommand from './commands/order.js';
import RolesCommand from './commands/roles.js';
import GachaCommand from './commands/gacha.js';

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
        console.log('Hello Command');

        switch (interaction.commandName.toString()){
            case 'order':
                const food = interaction.options.get('food').value;
                const drink = interaction.options.get('drink').value;

                console.log(`${food} and ${drink}`);
                interaction.reply({ 
                    content: `You ordered ${food} and ${drink}`,
                });
                break;
            case 'addrole' :
                interaction.reply({ 
                    content: `On Progress`,
                });
            case 'gacha' :
                interaction.reply({ 
                    content: `Gacha teroozzzz`,
                });
        }      
    }
});

async function main(){

    const commands = [OrderCommand, RolesCommand, GachaCommand];

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


