const Discord = require("discord.js");
const client = new Discord.Client();

var msgs = ["Maybe yes. Maybe no. Maybe go fuck yourself.",
            "Technically correct. The only kind of correct that matters.",
            "Yeetus that fetus.",
            "E",
            "*clattering background noise* (afk)",
            "Citation needed",
            "Big daddy pull!",
            "So, how bout that Trump?",
            "You out of the closet yet, Casey?"];

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity(`your mom like a goddamn fiddle`);
  client.guilds.forEach((guild) => {
    guild.defaultChannel.send("Skynet online, launching nukes", {tts: true}).catch(console.error);
    var prev_msg = null;
    setInterval (function () {
      var message = msgs[Math.floor(Math.random()*msgs.length)];
      if (prev_msg == null) {
        prev_msg = message;
      } else {
        while (message == prev_msg) {
          message = msgs[Math.floor(Math.random()*msgs.length)];
        }
      }
      console.log(message);
      guild.defaultChannel.send(message, {tts: true}).catch(console.error);
    }, 3600000);
  })
});

client.login(process.env.BOT_TOKEN);
