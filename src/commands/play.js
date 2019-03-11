const { Util } = require('discord.js');
const { Discord, RichEmbed } = require("discord.js");
const ytdl = require('ytdl-core');
const ytdlDiscord = require('ytdl-core-discord');

module.exports = {
	name: 'play',
	description: 'Play command.',
	usage: '[Video URL]',
	args: true,
	cooldown: 5,
	async execute(message, args) {
		const { voiceChannel } = message.member;
		if (!voiceChannel) return err('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return err('I cannot connect to your voice channel, make sure I have the proper permissions!');
		if (!permissions.has('SPEAK')) return err('I cannot speak in this voice channel, make sure I have the proper permissions!');

		const serverQueue = message.client.queue.get(message.guild.id);
		const songInfo = await ytdl.getInfo(args[0]).catch(error => err('Not a valid video URL or the video URL is invalid.'));
		const song = {
			id: songInfo.video_id,
			title: Util.escapeMarkdown(songInfo.title),
			url: songInfo.video_url
		};

		if (serverQueue) {
			serverQueue.songs.push(song);
			console.log(serverQueue.songs);
			return send(`✅ **${song.title}** has been added to the queue!`);
		}

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel,
			connection: null,
			songs: [],
			volume: 2,
			playing: true
		};
		message.client.queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.push(song);
    

		const play = async song => {
			const queue = message.client.queue.get(message.guild.id);
			if (!song) {
				queue.voiceChannel.leave();
				message.client.queue.delete(message.guild.id);
       await send('No songs were left in the queue. I left.')
				return;
			}

			const dispatcher = queue.connection.playOpusStream(await ytdlDiscord(song.url), { passes: 3 })
				.on('end', reason => {
					if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
					else console.log(reason);
					queue.songs.shift();
					play(queue.songs[0]);
				})
				.on('error', error => console.error(error));
			dispatcher.setVolumeLogarithmic(queue.volume / 5);
      const embed = new RichEmbed()
      .setColor('RANDOM')
      .setDescription(`🎶 Started playing: **${song.title}**`)
      queue.textChannel.send(embed);
		};

		try {
			const connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			message.client.queue.delete(message.guild.id);
			await voiceChannel.leave();
			return err(`I could not join the voice channel: ${error}`);
		}
    
    
    function send (text) { 
      const sendEmbed = new RichEmbed()
      .setDescription(text)
      .setColor('RANDOM') 
      return message.channel.send(sendEmbed)
    }
    
    function err (text) { 
      const errEmbed = new RichEmbed()
      .setTitle("Error!")
      .setDescription(text)
      .setColor(0xFF0000) 
      return message.channel.send(errEmbed)
    }
    
    
	}
  
};