import { SlashCommandBuilder } from '@discordjs/builders';

const listCommand = new SlashCommandBuilder()
        .setName('listuser')
        .setDescription('List')
        .addSubcommand( subcommand => 
            subcommand
                .setName('show') 
                .setDescription('Show current list')  
        ).addSubcommand( subcommand => 
            subcommand
                .setName('add') 
                .setDescription('Add user')
                .addStringOption((option) => 
                option
                    .setName('username')
                    .setDescription('username')
                    .setRequired(true)
            )
        ).addSubcommand( subcommand => 
            subcommand
                .setName('remove') 
                .setDescription('Remove from current list')
                .addIntegerOption((option) => 
                option
                    .setName('number')
                    .setDescription('Insert number from list')
                    .setRequired(true)
                )   
        ).addSubcommand( subcommand => 
            subcommand
                .setName('shuffle') 
                .setDescription('Shuffle current list') 
        ).addSubcommand( subcommand => 
            subcommand
                .setName('reset') 
                .setDescription('Reset list') 
        );

export default listCommand.toJSON();

