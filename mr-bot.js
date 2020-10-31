const { TOKEN, PREFIX } = require("./config");
const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require("discord-akairo");

class MyClient extends AkairoClient {
  constructor() {
    super({
      ownerID: "268432158262165504"
    }, {
      disableEveryone: true
    });

    this.commandHandler = new CommandHandler(this, {
      directory: "./commands/",
      prefix: ["m*", "@", "M*"],
      ignoreCooldown: ["268432158262165504"],
      defaultCooldown: 10000
    });
    this.listenerHandler = new ListenerHandler(this, {
      directory: "./listeners/"
    });

    this.commandHandler.loadAll();
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler
    });
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();
  }
}

const client = new MyClient();
module.exports = client;

client.PREFIX = PREFIX;

client.login(TOKEN);
client.on("error", console.error);
client.on("warn", console.warn);
