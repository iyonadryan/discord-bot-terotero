import { SlashCommandBuilder } from '@discordjs/builders';

const pixelCommand = new SlashCommandBuilder()
        .setName('pixel')
        .setDescription('Generate avatar')
        .addSubcommand( subcommand => 
            subcommand
                .setName('female') // 1_female
                .setDescription('Generate Female Pixel Character')
                .addStringOption((option) => 
                option
                    .setName('name')
                    .setDescription('Insert your name')
                    .setRequired(true)
                )   
        ).addSubcommand( subcommand => 
            subcommand
                .setName('male') // 0_male
                .setDescription('Generate Male Pixel Character')
                .addStringOption((option) => 
                option
                    .setName('name')
                    .setDescription('Insert your name')
                    .setRequired(true)
                )   
        ).addSubcommand( subcommand => 
            subcommand
                .setName('ghost') // 2_ghost
                .setDescription('Generate Ghost Pixel Character')
                .addStringOption((option) => 
                option
                    .setName('name')
                    .setDescription('Insert your name')
                    .setRequired(true)
                )   
        );

export default pixelCommand.toJSON();

