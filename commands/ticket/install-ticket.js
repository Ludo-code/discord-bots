const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class installticketcommands extends Command {
  constructor() {
    super("ticket-install", {
      aliases: ["ticket-install"],
      split: "sticky",
      clientPermissions: [
        "SEND_MESSAGES",
        "EMBED_LINKS",
        "MANAGE_CHANNELS",
        "ADD_REACTIONS",
        "VIEW_CHANNEL",
      ],
    });
  }

  async exec(message) {
    const client = this.client;
    const member = message.member;

    if (message.channel.type === "dm")
      return message.reply("Les tickets en DM sont inutile !");

    if (!member.hasPermission("ADMINISTRATOR")) {
      message.channel.send(
        `${message.author}, désolé mais tu n'as pas les permissions requise.`
      );
      return;
    }

    let channel = message.mentions.channels.first();
    if (!channel)
      return message.reply("Utilisation : `m*ticket-install #salon`");

    let sent = await channel.send(
      new MessageEmbed()
        .setTitle("Ticket pour le support !")
        .setDescription("Réagis afin de crée ton ticket !")
        .setFooter("Ticket support")
        .setColor("00ff00")
    );
    client.connection.query(
      `DROP TABLE IF EXISTS ${message.guild.id}_id_message`
    );
    sent.react("🎫");
    client.connection.query(
      `CREATE TABLE ${message.guild.id}_id_message (
       idmessage VARCHAR(50) DEFAULT ${sent.id} NOT NULL PRIMARY KEY
     )`
    );

    message.channel.send("Salon de ticket bien installer.");
  }
}
module.exports = installticketcommands;
