const fetch = require("node-fetch");
const { RichEmbed } = require("discord.js");

module.exports = async (client, message) => {
  message
    .delete({ timeout: 3000 })
    .then(console.log("Un message a été supprimé !"));
  const neko = await fetch("https://neko-love.xyz/api/v1/neko")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new RichEmbed()
    .setImage(neko)
    .setFooter(`Demandé par ${message.author.username}`);
  message.channel.send(embed);
};