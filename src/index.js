import { config } from 'dotenv';
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, Client, GatewayIntentBits,Routes, SelectMenuBuilder} from 'discord.js';
import {REST} from '@discordjs/rest';

import OrderCommand from './commands/order.js';
import GachaCommand from './commands/gacha.js';
import GifCommand from './commands/getgif.js';
import RolesCommand from './commands/roles.js';
import UsersCommand from './commands/users.js';
import PixelCommand from './commands/pixel.js';

import { testCharaGenerate, startCharaGenerate } from './commands/pixel/chara_generate.js';

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

var currentRowComponent = new ActionRowBuilder();

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

            case 'gacha' :
                const actionRowComponent = new ActionRowBuilder().setComponents([
                    new ButtonBuilder().setCustomId('gacha_anime').setLabel('Anime').setStyle(ButtonStyle.Primary),
                    new ButtonBuilder().setCustomId('gacha_game').setLabel('Game').setStyle(ButtonStyle.Primary)    
                ]);
                    
                interaction.reply({ 
                    components: [actionRowComponent.toJSON()],
                });  
                currentRowComponent =  actionRowComponent;
                break;
            
            case 'gif' :
                interaction.reply({ 
                    content: `https://media.tenor.com/7r-BGEoIohkAAAAM/meme-cat.gif`,
                });
                break;

            case 'pixel' :
                const avatarName = interaction.options.get('name').value;
                startCharaGenerate(avatarName);
                setTimeout(getGenerate,2000); // Wait generate image 2sec    
                function getGenerate(){
                    try {
                        console.log("Get Generate");
                        const fileAttachment = `img/pixel/avatars/generate_result/${avatarName}_crop_1.png`;
                        interaction.reply({ 
                            files: [{
                                attachment: fileAttachment,
                                name: 'avatar.png'
                            }]
                        });
                    }
                    catch(error){
                        interaction.reply({ content: 'Error, please try again'});
                    }
                }   

                break;
            
            case 'addrole' :
                interaction.reply({ 
                    content: `On Progress`,
                });
                break;

            case 'users' :
                    interaction.reply({ 
                        content: `On Progress`,
                });
                break;
        }      
    }
    else if (interaction.isButton()){
        console.log("Select Button");
        if (interaction.customId === 'gacha_anime'){
            console.log(currentRowComponent.components[0]);
            /***** Try to disable button
            currentRowComponent.components[0].setDisabled(true); // button 0
            */

            interaction.message.delete(interaction.customId);

            const actionAnimeComponent = new ActionRowBuilder().setComponents(
                new SelectMenuBuilder().setCustomId('gacha_anime').setOptions([
                    {label: 'SpyXFamily', value: 'spyxfamily'},
                    {label: 'Overlord', value: 'overlord'},
                ])
                );
                
            interaction.reply({ 
                components: [actionAnimeComponent.toJSON()],
            });
        }
        else if (interaction.customId === 'gacha_game'){

            const actionGameComponent = new ActionRowBuilder().setComponents(
                new SelectMenuBuilder().setCustomId('gacha_game').setOptions([
                    {label: 'LOL', value: 'lol'},
                    {label: 'NieR', value: 'nier'},
                ])
                );
                
            interaction.reply({ 
                components: [actionGameComponent.toJSON()],
            });
        }
    }

    else if (interaction.isSelectMenu()){
        console.log('Select Menu');
        //console.log(interaction);
        console.log(interaction.customId);
        console.log(interaction.values.toString());

        // After gacha_options  
        if (interaction.customId === 'gacha_anime'){
            interaction.message.delete(interaction.customId);
            interaction.reply({ content: 'Gacha anime teroozz'});
        }    
        else if (interaction.customId === 'gacha_game'){
            interaction.message.delete(interaction.customId);
            interaction.reply({ content: 'Gacha game teroozz'});
        }     
    }
});


async function main(){

    const commands = [OrderCommand, 
        GachaCommand, 
        GifCommand, 
        RolesCommand, 
        UsersCommand,
        PixelCommand];

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


