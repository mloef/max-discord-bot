const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

var msgs = ["Maybe yes. Maybe no. Maybe go fuck yourself.",
            "Technically correct. The only kind of correct that matters.",
            "Yeetus that fetus.",
            "E",
            "*clattering background noise* (afk)",
            "Citation needed"];

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity(`the auction house`);
  client.guilds.forEach((guild) => {
    guild.defaultChannel.send("I am Max. beep boop beep").catch(console.error);
    setInterval (function () {
      var message = msgs[Math.floor(Math.random()*msgs.length)];
      console.log(message);
      guild.defaultChannel.send(message).catch(console.error);
    }, 3600000);
  })
});

client.login(process.env.BOT_TOKEN);
