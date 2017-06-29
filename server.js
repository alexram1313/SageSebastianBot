var Discordie = require('discordie');
var client    = new Discordie();

client.connect({token:"MzI5ODM0MzIyMDI0NDY0Mzg1.DDYNtg.RrOuxMSsdO_HSfg50sbWodkmfjg"});

client.Dispatcher.on("GATEWAY_READY", e => {
    console.log("Hi Sage! I'm connected as", client.User.username);
});

client.Dispatcher.on("GUILD_MEMBER_ADD", (g, m) => {
    var channels = g.textChannels;
    for(var c of channels){
        if (c.name == 'annnouncements'){
            c.sendMessage("Please welcome to the "+m.mention+" to The Greyburg Manor!");
            break;
        }
    }
});