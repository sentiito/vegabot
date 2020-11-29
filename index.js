const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')
const { link } = require('fs')
const logo = 'https://i.ibb.co/4Nnb7dk/V2.png'
const ipValue = 'connect 45.156.84.97:38125'
const voteValue = 'https://top-serveurs.net/gta/vegaworld-rp-v2'
const ipLaunch = '<fivem://connect/45.156.84.97:38125>'
const localhost = '<fivem://connect/localhost>'

const request = require('request')
const cheerio = require('cheerio')
let IGplayer

// LE BOT S'ALLUME
client.on('ready', () => {
    console.log('Le bot est allumé')
    
    const etatServ = client.channels.cache.find(channel => channel.id === "754724334785921124")
    const botChan = "749078187681644594"
    const idCitoyen = '<@&729022711833034763>'
    var statusServ = 'Le serveur est ON'

    // Commande STAFF
    client.on('message', message => {
        if(message.channel.id === botChan) {
            if(message.content.startsWith(config.prefix + 'reboot')) {
                let heure = message.content.substr(-5);
                statusServ = " Reboot à" + heure;
                etatServ.send(idCitoyen + ' Reboot prévu à  ' + heure)

                console.log(heure)
            } else if(message.content.startsWith(config.prefix + 'off')) {
                const msgOff = idCitoyen + ' Le serveur est OFF'
                statusServ = "le serveur est OFF"
                etatServ.send(msgOff)

            } else if(message.content.startsWith(config.prefix + 'on')) {
                const msgOn = idCitoyen + ' Le serveur est ON'
                const ipOn = new Discord.MessageEmbed()

                .setAuthor('VegaWorld V2', logo)
                .setColor('#ed00f3')
                .addFields(
                    {
                    name: 'Direct connect :',
                    value: ipLaunch
                    },
                    {
                    name: 'IP :',
                    value: ipValue
                    }
                )
                statusServ = "Le serveur est ON"

                etatServ.send(msgOn)
                etatServ.send(ipOn)
            }
        }
    })

    // Joueurs ingame
    client.on('message', message => {
        if(message.channel.id === botChan) {
            if(message.content.startsWith(config.prefix + 'ig')) {

                request('https://top-serveurs.net/gta/vegaworld-rp-v2', (error, response, html) => {
                    if(!error || response.statusCode == 200) {
                        const $ = cheerio.load(html)
                        const playersIG = $('.label.label-success.label-players')

                        IGplayer = playersIG.html()
                        console.log(IGplayer)

                        // Commande = !ig
                        const ig = new Discord.MessageEmbed()

                        .setAuthor('VegaWorld V2', logo)
                        .setColor('#ed00f3')
                        .addFields(
                            {
                            name: 'Joueurs IG :',
                            value: IGplayer
                            }
                        )
                        message.channel.send(ig)

                    }
                });

            }
        }
    })

    command(client, 'ip', (message) => {

        // Commande = !ip
        const ip = new Discord.MessageEmbed()

        .setAuthor('VegaWorld V2', logo)
        .setColor('#ed00f3')
        .addFields(
            {
            name: 'Direct connect :',
            value: ipLaunch
            },
            {
            name: 'IP :',
            value: ipValue
            }
        )
        
        message.channel.send(ip)
    })

    command(client, 'local', (message) => {

        // Commande = !local
        if(message.channel.id === botChan || message.channel.id === '747542137867993119') {
            const local = new Discord.MessageEmbed()

            .setAuthor('VegaWorld V2', logo)
            .setColor('#ed00f3')
            .addFields(
                {
                name: 'Connexion Localhost :',
                value: localhost
                }
            )
            
            message.channel.send(local)
        }
    })
    
    command(client, 'vote', (message) => {

        // Commande = !vote
        const vote = new Discord.MessageEmbed()

        .setAuthor('VegaWorld V2', logo)
        .setColor('#ed00f3')
        .addFields(
            {
            name: 'Vote serveur :',
            value: voteValue
            }
        )
        
        message.channel.send(vote)
    })
    
    command(client, 'vega', (message) => {
        // Commande !vega
        request('https://top-serveurs.net/gta/vegaworld-rp-v2', (error, response, html) => {
            if(!error || response.statusCode == 200) {
                const $ = cheerio.load(html)
                const playersIG = $('.label.label-success.label-players')

                IGplayer = playersIG.html()
                console.log(IGplayer)

                const embed = new Discord.MessageEmbed()

                .setAuthor('VegaWorld V2', logo)
                .setThumbnail(logo)
                .setColor('#ed00f3')
                .addFields(
                    {
                    name: '**Statut de Vegaworld :**',
                    value: statusServ
                    },
                    {
                    name: 'Direct connect :',
                    value: ipLaunch
                    },
                    {
                    name: 'IP :',
                    value: ipValue
                    },
                    {
                    name: 'Vote serveur',
                    value: voteValue
                    },
                    {
                    name: 'VegaLife',
                    value: 'https://vegalife.fr/'
                    },
                    {
                    name: 'Site Vegaworld',
                    value: 'https://vegaworld.fr/'
                    }
                )
                
                message.channel.send(embed)

            }
        });

    })
})


client.login(config.token)
