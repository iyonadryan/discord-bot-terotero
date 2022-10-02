import { SlashCommandBuilder } from '@discordjs/builders';

const gachaCommand = new SlashCommandBuilder()
        .setName('gacha')
        .setDescription('Choose your option')
        .addStringOption((option) => 
            option
                .setName('anime')
                .setDescription('Select your favorite anime')
                .setRequired(true)
                .setChoices({
                    name: 'SpyXFamily',
                    value: 'spyxfamiliy'
                },
                {
                    name: 'Overlord',
                    value: 'overlord'
                })
        );

export default gachaCommand.toJSON();