# ksp-discord-bot
The code for the Kerbal Space Program discord bot, a bot that helps organizing events on the discord server.

## Features

- Warns players that are collaborating for a shared single player file when they are playing Kerbal Space Program at the same time.


## Config.json buildup

- Discord token should be the one you get on creation of you discord bot on the [discord developer portal](https://discord.com/developers/applications)
- For the steam id you should visit [steamfinder](https://www.steamidfinder.com) and copy the steamID64 (Dec) for the desired collab-player
- The discord id and channel id can be easly found by doing the following:
  - go to user settings advanced and enable developer mode
  - Now you can right click and copy the wanted id
- steam_token is your api key you get from [steamcommunity web api portal](https://steamcommunity.com/dev/apikey)

```
{
    "collab-players" : [
        {  
            "name": "",
            "steamid": "",
            "discordid": "<@id_goes_here>"
        },
        {
            "name": "",
            "steamid": "",
            "discordid": "<@id_goes_here>"
        }
    ],
    "ksp-channel": "",
    "steam_users_url" : "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=",
    "steam_token" : "",
    "discord_token": ""
}
```
