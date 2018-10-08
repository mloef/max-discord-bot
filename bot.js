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
        console.log
        for (var channel in guild.channels.values()) {
          if (channel.type == "voice") {
            for (var user in channel.members.values()) {
              console.log(user.displayName)
              if (Math.random()*2 > 1) {
                team2.append(user.displayName);
              }
              else {
                team1.append(user.displayName);
              }
            }
          }
        }
        while (Math.abs(team1.length - team2.length) > 1) {
          if (team1.length > team2.length) {
            var element = team1.pop()
            team2.push(element)
          }
          else {
            var element = team2.pop()
            team1.push(element)
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
        console.log(team1)
        console.log(team2)
        curr_msg.channel.send(message, {tts: true}).catch(console.error);
      }
    });
  })
});

client.login(process.env.BOT_TOKEN);
