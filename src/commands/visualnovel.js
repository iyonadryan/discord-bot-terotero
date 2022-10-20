import { SlashCommandBuilder } from '@discordjs/builders';

const visualNovelCommand = new SlashCommandBuilder()
        .setName('visualnovel')
        .setDescription('Generate avatar')
        .addStringOption((option) => 
        option
            .setName('name')
            .setDescription('Insert your name')
            .setRequired(true)
    ) ; 

export default visualNovelCommand.toJSON();