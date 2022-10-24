import { SlashCommandBuilder } from '@discordjs/builders';

const visualNovelCommand = new SlashCommandBuilder()
        .setName('visualnovel')
        .setDescription('Generate avatar')
        .addSubcommand( subcommand => 
            subcommand
                .setName('female')
                .setDescription('Generate Female Visual Novel Character')
                .addStringOption((option) => 
                option
                    .setName('name')
                    .setDescription('Insert your name')
                    .setRequired(true)
                )  
        ).addSubcommand( subcommand => 
            subcommand
                .setName('male')
                .setDescription('Generate Male Visual Novel Character')
                .addStringOption((option) => 
                option
                    .setName('name')
                    .setDescription('Insert your name')
                    .setRequired(true)
                )   
        );

export default visualNovelCommand.toJSON();