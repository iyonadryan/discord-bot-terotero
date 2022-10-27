import { SlashCommandBuilder } from '@discordjs/builders';

const djCommand = new SlashCommandBuilder()
        .setName('dj')
        .setDescription('DJ on the spot')
        .addSubcommand( subcommand => 
            subcommand
                .setName('play') 
                .setDescription('Start music from DJ')  
        );

export default djCommand.toJSON();