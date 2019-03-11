const { Discord, RichEmbed } = require("discord.js");

module.exports = {
	name: 'skip',
	description: 'Skip command.',
	cooldown: 5,
	execute(message) {
		const { voiceChannel } = message.member;
		if (!voiceChannel) return err('I\'m sorry but you need to be in a voice channel to play music!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return err('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!')
    send('Skipped the music.')
    
    
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
