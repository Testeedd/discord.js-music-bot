const { Discord, RichEmbed } = require("discord.js");

module.exports = {
	name: 'resume',
	description: 'Resume command.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return send('▶ Resumed the music for you!');
		}
		return send('There is nothing playing or paused.');
    
    function send (text) { 
      const sendEmbed = new RichEmbed()
      .setDescription(text)
      .setColor('RANDOM') 
      return message.channel.send(sendEmbed)
    }
    
	}
};
