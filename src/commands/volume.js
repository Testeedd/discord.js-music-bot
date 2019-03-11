const { Discord, RichEmbed } = require("discord.js");

module.exports = {
	name: 'volume',
	description: 'Volume command.',
	cooldown: 5,
	execute(message, args) {
		const { voiceChannel } = message.member;
		if (!voiceChannel) return err('I\'m sorry but you need to be in a voice channel to play music!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return send('There is nothing playing.');
		if (!args[0]) return send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[0]; // eslint-disable-line
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		return send(`I set the volume to: **${args[0]}**`)
    
    
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
