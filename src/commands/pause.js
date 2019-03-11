const { Discord, RichEmbed } = require("discord.js");

module.exports = {
	name: 'pause',
	description: 'Pause command.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return send('⏸ Paused the music for you!')
		}
		return send('There is nothing playing.');
    
    function send (text) { 
      const sendEmbed = new RichEmbed()
      .setDescription(text)
      .setColor('RANDOM') 
      return message.channel.send(sendEmbed)
    }
    
    
	}
};
