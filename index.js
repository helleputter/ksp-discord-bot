import DiscordJS, { Intents } from 'discord.js'
import https from 'https'
import config from './config.json' assert { type:"json"};

let url = config.steam_users_url+config.steam_id+'&steamids='
for (let i= 0; i < config['collab-players'].length; i++) {
    url += config['collab-players'][i]['steamid']+',';
}

let OwnerIndex = config['collab-players'].findIndex(function(item, i){
    return item.name === 'helleputter'
  });




const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
})

client.on('ready', () => {
    console.log('bot is ready')
})


client.on('messageCreate', (message) => {
    if(message.content === 'ping' && '<@'+message.author.id+'>' === config['collab-players'][OwnerIndex]['discordid']){
        message.reply({
            content: 'pong'
        })
        
    }
})

client.login(config.discord_token)

let OnlyOnce = false;
let PreviousAmount = 0;
let LastPlaying = [];

const minutes = 0.1, the_interval = minutes * 60 * 1000;
setInterval(function() {
    
    const channel = client.channels.cache.get(config['ksp-channel']);
	console.log('I am doing my 1 minutes check');
    https.get(url,(res) => {
        let body = "";
    
        res.on("data", (chunk) => {
            body += chunk;
        });
    
        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                let DiscordIds = [];
                for (let a = 0; a < json['response']['players'].length; a++) {
                    if (json['response']['players'][a]['gameextrainfo'] === 'Kerbal Space Program') {
                        for (let b= 0; b < config['collab-players'].length; b++) {
                            if (json['response']['players'][a]['steamid'] === config['collab-players'][b]['steamid']){
                                DiscordIds.push(config['collab-players'][b]['discordid'])
                            } 
                        }
                    }
                }
                if (PreviousAmount != DiscordIds.length) {
                    OnlyOnce = false;
                }
                else if (LastPlaying.length === 0) {
                    OnlyOnce = true;
                }
                PreviousAmount =  DiscordIds.length;
                if (!OnlyOnce){
                    switch(DiscordIds.length) {
                        case 0:
                            OnlyOnce = true;
                            channel.send(LastPlaying.join()+' has stopped playing KSP')
                            break;
                        case 1:
                            channel.send(DiscordIds.join()+' is playing ksp')
                            LastPlaying = DiscordIds;
                            OnlyOnce = true;
                            break;
                        case 2:
                            OnlyOnce = true;
                            LastPlaying = DiscordIds;
                            channel.send('Watch out '+DiscordIds.join()+' you are both playing KSP')
                            break;
                        default:
                            OnlyOnce = true;
                            LastPlaying = DiscordIds;
                            channel.send('Watch out '+DiscordIds.join()+' all of you are playing KSP')
                            break;
                    }
                }
            } catch (error) {
                console.error(error.message);
            };
        });
    
    }).on("error", (error) => {
        console.error(error.message);
    });
}, the_interval);