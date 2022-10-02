import { SlashCommandBuilder } from '@discordjs/builders';

const gifCommand = new SlashCommandBuilder()
        .setName('gif')
        .setDescription('Choose your option')
        .addStringOption((option) => 
            option
                .setName('animal')
                .setDescription('Select your favorite animal')
                .setRequired(true)
                .setChoices({
                    name: 'Cat',
                    value: 'cat'
                })
        ) ;  

export default gifCommand.toJSON();