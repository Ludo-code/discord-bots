const fetch = require("node-fetch");
const { RichEmbed } = require("discord.js");

module.exports = async (client, message) => {
  message
    .delete({ timeout: 3000 })
    .then(console.log("Un message a été supprimé !"));
  const meme = await fetch("https://meme-api.herokuapp.com/gimme")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new RichEmbed().setImage(meme);
  message.channel.send(embed);
};
