const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity("saving a lot of time");
  
  client.guilds.forEach((guild) => {
    client.on ("message", curr_msg => {
      if (curr_msg.content == "bot-assign-teams") {
        var team1 = []
        var team2 = []
        for (var user in guild.members.values()) {
          if (Math.random()*2 > 1) {
            team2.append(user.displayName);
          }
          else {
            team1.append(user.displayName);
          }
        }
        var message = "Team 1: ";
        for (var name in team1) {
            message = message + name + ", ";
        }
        message += "\nTeam 2: ";
        for (var name in team2) {
            message = message + name + ", ";
        }
        curr_msg.channel.send(message, {tts: true}).catch(console.error);
      }
    });
  })
});

client.login(process.env.BOT_TOKEN);
