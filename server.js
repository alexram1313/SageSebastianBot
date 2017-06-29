var express = require('express');
var app = express();
var Discordie = require('discordie');
var client    = new Discordie();

client.connect({token:"MzI5ODM0MzIyMDI0NDY0Mzg1.DDYNtg.RrOuxMSsdO_HSfg50sbWodkmfjg"});

client.Dispatcher.on("GATEWAY_READY", e => {
    console.log("Hi Sage! I'm connected as", client.User.username);
});

client.Dispatcher.on("GUILD_MEMBER_ADD", e => {
    console.log("test");
    var channels = e.guild.textChannels;
    console.log(e.guild.channels);
    for(var c of channels){
        if (c.name == 'annnouncements'){
            c.sendMessage("Please welcome "+e.member.mention+" to The Greyburg Manor!");
            break;
        }
    }
});


var server = app.listen(process.env.PORT || 8080, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("API listening at http://%s:%s", host, port)
});