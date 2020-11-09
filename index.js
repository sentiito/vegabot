const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')
const logo = 'https://i.ibb.co/4Nnb7dk/V2.png'

// LE BOT S'ALLUME
client.on('ready', () => {
    //
    console.log('Le bot est allumé')
    
    const etatServ = client.channels.cache.find(channel => channel.id === "775025509339103233")
    const botChan = "774646735142125568"
    const idCitoyen = '<@&747833614686748682>'
    var statusServ = '.'

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

    command(client, 'status', (message) => {
        //Verification si le Serv est on

        // Commande = !status
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
            value: 'cfx.re/join/vb4eee'
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