const fetch = require("node-fetch");
const { RichEmbed } = require("discord.js");

module.exports = async (client, message) => {
  message
    .delete({ timeout: 3000 })
    .then(console.log("Un message a été supprimé !"));
  const tetee = await fetch("https://nekos.life/api/v2/img/tits")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new RichEmbed()
    .setImage(tetee)
    .setFooter(`Demandé par ${message.author.username}`);
  message.channel.send(embed);
};
