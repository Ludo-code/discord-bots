const {
  TOKEN,
  ipdb,
  portdb,
  nomdb,
  nomutilisateur,
  motdepasse,
} = require("./config");
const {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} = require("discord-akairo");
const mysql = require("mysql2");

class MyClient extends AkairoClient {
  constructor() {
    super(
      {
        ownerID: "268432158262165504",
      },
      {
        disableMentions: "everyone",
        partials: ["MESSAGE", "CHANNEL", "REACTION", "USER", "GUILD_MEMBER"],
      }
    );

    this.commandHandler = new CommandHandler(this, {
      directory: "./commands/",
      prefix: ["m*", "M*"],
      ignoreCooldown: ["268432158262165504"],
      defaultCooldown: 10000,
    });
    this.listenerHandler = new ListenerHandler(this, {
      directory: "./listeners/",
    });

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
    });
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();
    this.commandHandler.loadAll();
  }
}

const client = new MyClient({
  ws: {
    intents: [
      "GUILDS",
      "GUILD_MEMBERS",
      "GUILD_EMOJIS",
      "GUILD_PRESENCES",
      "GUILD_MESSAGES",
      "GUILD_MESSAGE_REACTIONS",
      "DIRECT_MESSAGES",
      "DIRECT_MESSAGE_REACTIONS",
    ],
  },
});

const connection = mysql.createConnection({
  host: ipdb,
  port: portdb,
  user: nomutilisateur,
  password: motdepasse,
  database: nomdb,
});

module.exports = client;

client.login(TOKEN);
client.on("error", console.error);
client.on("warn", console.warn);
