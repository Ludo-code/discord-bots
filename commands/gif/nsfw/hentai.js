const fetch = require("node-fetch");
const { RichEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Oh du hentai mais en MP je suis pas d'accord ! :joy:");
  message
    .delete({ timeout: 3000 })
    .then(console.log(`La commande hentai a été exécuté par ${message.author.username} de l'id : ${message.author}`));
  if (!message.channel.nsfw) return message.channel.send(`Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`);
  const hentai = await fetch("https://nekos.life/api/v2/img/hentai")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new RichEmbed()
    .setImage(hentai)
    .setFooter(`Demandé par ${message.author.username}`);
  message.channel.send(embed);
};
