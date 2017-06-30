var express = require('express');
var app = express();
var Discordie = require('discordie');
var client    = new Discordie();

client.connect({token:"MzI5ODM0MzIyMDI0NDY0Mzg1.DDYNtg.RrOuxMSsdO_HSfg50sbWodkmfjg"});

client.Dispatcher.on("GATEWAY_READY", e => {
    	console.log("Hi Sage! I'm connected as", client.User.username);
	for (var guild of e.data.guilds){
		//console.log(guild);
		var g = client.Guilds.find(g => g.id == guild.id);
		var channel = g.textChannels.find(c => c.name == "announcements");
		channel.sendMessage("@everyone "+client.User.username+" is now greeting users!");

	}
});

client.Dispatcher.on("GUILD_MEMBER_ADD", e => {
    var channels = e.guild.textChannels;
    channel = e.guild.textChannels.find(c => c.name == "announcements");
    channel.sendMessage("@everyone Please welcome "+e.member.mention+" to "+e.guild.name+"!");
});


app.get('/', function(req,res){
	res.status(200).json({message: "Successfully connected to Sebastian!"})
})

var server = app.listen(process.env.PORT || 8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("API listening at http://%s:%s", host, port)
});


function exitHandler(options, err) {
	console.log('derp');
	if (err) console.log(err.stack);
	var gLen = client.Guilds.length;
	if (gLen == 0 ) if (options.exit) process.exit();
	var i = 0;
	for (var g of client.Guilds){
		var channel = g.textChannels.find(c => c.name == "announcements");
		channel.sendMessage("@everyone "+client.User.username+" has finished his shift!");
		if (++i == gLen){
			setTimeout(function(){ if (options.exit) process.exit(); }, 3000);
		}
	}
	
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{exit:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));