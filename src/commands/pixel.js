import { SlashCommandBuilder } from '@discordjs/builders';

const pixelCommand = new SlashCommandBuilder()
        .setName('pixel')
        .setDescription('Generate avatar')
        .addStringOption((option) => 
        option
            .setName('name')
            .setDescription('Insert your name')
            .setRequired(true)
    ) ; 

export default pixelCommand.toJSON();