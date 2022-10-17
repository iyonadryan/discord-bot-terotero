import { SlashCommandBuilder } from '@discordjs/builders';

const pixelCommand = new SlashCommandBuilder()
        .setName('pixel')
        .setDescription('Test image pixel')
        .addStringOption((option) => 
        option
            .setName('name')
            .setDescription('Insert your name')
            .setRequired(true)
    ) ; 

export default pixelCommand.toJSON();