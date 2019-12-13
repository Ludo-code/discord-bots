module.exports = async (client, message, args, then) => {
  if (![268432158262165504].includes(message.author.id)) then;
  try {
    await message.delete();
    const msgToDelete = args[0]
      ? `**${args[0]} messages supprimés.**`
      : "Salon nettoyé (100 messages maximum par commande)";
    message.channel.fetchMessages({ limit: args[0] }).then(messages => {
      message.channel.bulkDelete(messages);
      message.channel.send(msgToDelete).then(msg => msg.delete(3000));
    });
  } catch (e) {
    console.log(e);
  }
};
