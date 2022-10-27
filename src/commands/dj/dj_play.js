import {generateDependencyReport, AudioPlayerStatus, joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus} from '@discordjs/voice';

function djplay(interaction, client){
    console.log("DJ PLAY");

    // Get the voice channel Id
    const guild = client.guilds.cache.get(interaction.guildId);
    const guildId = interaction.guildId;
    const member = guild.members.cache.get(interaction.member.user.id);
    const voiceChannelId = interaction.guild.members.cache.get(interaction.member.user.id).voice.channelId;
    const voiceChannel = member.voice.channel;
    const channelId = interaction.channel.id;
    console.log(channelId);
    console.log(guildId);
    console.log(voiceChannelId);

    // Create audio player
    const player = createAudioPlayer();

    player.on(AudioPlayerStatus.Playing, () => {
        console.log("The audio player has started playing!");
    });

    player.on('error', error => {
        console.error(`Errpr: ${error.message} with resource`);
    });

    //create and play audio
    const resource = createAudioResource(`D:\\=== Dekstop (D) ===\\Dekstop(Second)\\MP3\\Wavedash - Dummo Loop [Official Audio].mp3`);
    player.play(resource);

    // create the connection to the voice channel
    const connection = joinVoiceChannel({
        channelId: voiceChannelId,
        guildId: guildId,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator
    });

    /*
    connection.on(VoiceConnectionStatus.Ready, () => {
        console.log('The connection has entered the Ready state - ready to play audio!');
    });
    */

    // Subscribe the connection to the audio player (will play audio on the voice channel)
    const subscription = connection.subscribe(player);

    // subscription could be undefined if the connection is destroyed!
    if (subscription){
        // Unsubsribe after xx seconds (stop playing audio on the voice channel)
        setTimeout( ()=>subscription.unsubscribe(), 5_000);
    }
    else{
        console.log("error subscription");
    }

    console.log(generateDependencyReport());
}

export {djplay};