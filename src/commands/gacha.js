import { SlashCommandBuilder } from '@discordjs/builders';

const gachaCommand = new SlashCommandBuilder()
        .setName('gacha')
        .setDescription('Gacha Life');

export default gachaCommand.toJSON();