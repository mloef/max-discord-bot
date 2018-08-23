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
            "You out of the closet yet, Casey?",
            "Good talk."];

function send_maxbot_msg (prev_msg, guild) {
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
}

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity("the auction house");
  
  client.guilds.forEach((guild) => {
    var prev_msg = null;
    var last_seen_msg = new Object();
    last_seen_msg.createdTimestamp = 0;
    var msg_count = 5; //to be changed to dynamic msg count
    var conv_flag = false;
    
    guild.defaultChannel.send("Skynet online, launching nukes", {tts: true}).catch(console.error);
    client.on ("message", curr_msg => {
      if (curr_msg.content == "!maxbot-reset") {
        prev_msg = null;
        last_seen_msg = new Object();
        last_seen_msg.createdTimestamp = 0;
        msg_count = 5; //to be changed to dynamic msg count
        conv_flag = false;
      }
      
      if (!curr_msg.author.bot) {
        if (conv_flag || (curr_msg.createdTimestamp - last_seen_msg.createdTimestamp > 3600)) {
          send_maxbot_msg (prev_msg, guild);
          conv_flag = true;
          --msg_count;
          if (msg_count == 0) {
            conv_flag = false;
            msg_count = 5; //to be changed to dynamic msg count
          }
        }
        
        last_seen_msg = curr_msg;
      }
    });
  })
});

client.login(process.env.BOT_TOKEN);
