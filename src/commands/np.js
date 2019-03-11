const { Discord, RichEmbed } = require("discord.js");

module.exports = {
	name: 'np',
	description: 'Now playing command.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return send('There is nothing playing.');
    
    return send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);

    function send (text) { 
      const sendEmbed = new RichEmbed()
      .setDescription(text)
      .setColor('RANDOM') 
      return message.channel.send(sendEmbed)
    }    
    
    
    
	}
  
  
};
