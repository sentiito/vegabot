const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')
const logo = 'https://i.ibb.co/4Nnb7dk/V2.png'
const ipValue = 'connect cfx.re/join/vb4eee'
const voteValue = 'https://top-serveurs.net/gta/vegaworld-rp-v2'

// LE BOT S'ALLUME
client.on('ready', () => {
    //
    console.log('Le bot est allumé')
    
    const etatServ = client.channels.cache.find(channel => channel.id === "754724334785921124")
    const botChan = "749078187681644594"
    const idCitoyen = '<@&729022711833034763>'
    var statusServ = 'Le serveur est ON'

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
                statusServ = "Le serveur est ON"
                etatServ.send(msgOn)
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
            name: 'IP :',
            value: ipValue
            }
        )
        
        message.channel.send(ip)
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
        //Verification si le Serv est on

        // Commande = !vega
        const embed = new Discord.MessageEmbed()

        .setAuthor('VegaWorld V2', logo)
        .setThumbnail(logo)
        // .setTitle('VegaWorld V2')
        .setColor('#ed00f3')
        .addFields(
            {
            name: '**Statut de Vegaworld :**',
            value: statusServ
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
    })
})

client.login(process.env.TOKEN)
