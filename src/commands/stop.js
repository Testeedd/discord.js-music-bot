const { Discord, RichEmbed } = require("discord.js");

module.exports = {
	name: 'stop',
	description: 'Stop command.',
	cooldown: 5,
	execute(message) {
		const { voiceChannel } = message.member;
		if (!voiceChannel) return err('I\'m sorry but you need to be in a voice channel to play music!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!')
    send('Stopped the music and left the channel.');
    
    
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
