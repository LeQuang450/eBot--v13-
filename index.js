const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const dotenv = require("dotenv")
const path = require ("path")

dotenv.config()

const client = new Discord.Client({
    intents: 32767 });

    client.on('ready',async () =>{
    console.log("Beta Bot is Online!")

    client.user.setActivity(`/help for more info`, { type: "LISTENING"})
    
    client.on("messageCreate", (message) => {
        const prefix = "a"
        if (!message.content.startsWith(prefix)) return;
    
        const messageArray = message.content.split(" ");
        const cmd = messageArray[0];
        const args = messageArray.slice(1);
        
        if (cmd.toLowerCase() === `${prefix}membercount`){
            message.channel.send(`Your server has ${message.guild.memberCount} members!`)
        } else if (cmd.toLowerCase() === `${prefix}help`) {
            message.channel.send(`List of abavable commands: https://sites.google.com/view/l3quang-botsite/help`)
        } else if (cmd.toLowerCase() === `${prefix}warn`) {
            if (!args[0]) return message.reply("You need to mention someone in this command!")
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
            if (!member) return message.reply("Did you warn the wrong user?")
            if (message.member.id === member.id) return message.reply("Why you warn yourself?");
    
            let reason = args.slice(1).join(" ") || "No reason"
    
            message.channel.send(`${member} just got warned.\nReason: ${reason}`)
        } else if (cmd.toLowerCase() === `${prefix}kick`) {
            if (!args[0]) return message.reply("You need to put someone in this command!")
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
        if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Where you put your permission?");
        if(!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply("Did you throw my permission to the trash?");
        if (message.member.id === member.id) return message.reply("Why you kick yourself?");
        if (!member) return message.reply("Did you kick the wrong user?")
        if(!member.kickable) return message.reply("Who did I just kick (that user has perms over me)?")
    
        let reason = args.slice(1).join(" ") || "No reason"
    
            message.channel.send(`${member} just got warned.\nReason: ${reason}`)
        
        } else if (cmd.toLowerCase() === `${prefix}ban`) {
            if (!args[0]) return message.reply("You need to put someone in this command!")
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
            if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply("Where you put your permission?");
            if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply("Did you throw my permission to the trash?");
            if (message.member.id === member.id) return message.reply("Why you kick yourself?");
            if (!member) return message.reply("Did you ban the wrong user?")
            if(!member.banable) return message.reply("Who did I just ban (that user has perms over me)?")
    
            let reason = args.slice(1).join(" ") || "No reason"
    
            member.ban({ reason:reason })
            message.channel.send(`${member} just got banned.\nReason: ${reason}`)
        } else if (cmd.toLowerCase() === `${prefix}mute`) {
            const muteRole = message.guild.roles.cache.find(role => role.name.toLowerCase().includes("muted"));
            const muteReason = args.slice(1).join(" ") || "No reason given."
            const muteUser = message.mentions.members.first();

            if (!args[0]) return message.reply("Where is the user you want to mute?");
            if (!message.member.permissions.has("MANAGE_ROLES")) return message.reply("Where you put your permission?");
            if(!message.guild.me.permissions.has("MANAGE_ROLES")) return message.reply("Did you throw my permission to the trash?");
            if (!muteUser) return message.reply("Did you mute the wrong user?")
            if (!muteRole) return message.reply("Where is the **muted** role?")
            muteUser.roles.add(muteRole)

            const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(' :white_check_mark: That user was **muted** ')
            .setDescription('If that User can chat, please put the mute role above that user highest role and untick **Send Messages and Create Posts** and **Send Messages in Theards and Posts')
 
            message.reply({ embeds: [embed] })
        } else if (cmd.toLowerCase() === `${prefix}nickname`) {
            const nnUser = message.mentions.members.first();
            const nnName = args.slice(1).join(" ") || `No Nickname`
            if (!message.member.permissions.has("MANAGE_NICKNAMES")) return message.reply("Where you put your permission?");
            if (!message.guild.me.permissions.has("MANAGE_NICKNAMES")) return message.reply("Did you throw my permission to the trash?");
            if (!nnUser) return message.reply("Did you change nickname the wrong user?");
            if(!nnUser.kickable) return message.reply("Who did I just change their nickname (that user has perms over me)?")

            const nnEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(` :white_check_mark: Changed ${message.mentions.members.first()}'s nickname to **${nnName}** `)
            message.reply({ embeds: [nnEmbed] })

            nnUser.setNickname(nnName).catch(err => {message.reply(" :x: There was an error when change their nickname!")});
            nnUser.setNickname(nnName).catch(err => {console.log("There was an error with nickname command!")})
        }
    })

    const guildID = process.env['guild']
    const guild = client.guilds.cache.get(guildID)
    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'Replies with Pong.'
    })

    commands?.create({
        name: 'help',
        description: 'Display a link to the list of abavable commands.'
    })

    commands?.create({
        name: 'plus',
        description: 'Plus two numbers.',
        options: [
            {
                name: 'num1',
                description: 'The first numbers.',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: 'num2',
                description: 'The second numbers.',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
            },
        ]
    })

    commands?.create({
        name: 'minus',
        description: 'Minus two numbers.',
        options: [
            {
                name: 'num1',
                description: 'The first numbers.',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: 'num2',
                description: 'The second numbers.',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
            },
        ]
    })

    commands?.create({
        name: 'multiply',
        description: 'multiply two numbers.',
        options: [
            {
                name: 'num1',
                description: 'The first numbers.',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: 'num2',
                description: 'The second numbers.',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
            },
        ]
    })

    commands?.create({
        name: 'divide',
        description: 'divide two numbers.',
        options: [
            {
                name: 'num1',
                description: 'The first numbers.',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: 'num2',
                description: 'The second numbers.',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
            },
        ]
    })
    });

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) {
            return
        }
        
        const { commandName, options } = interaction

        if (commandName === 'ping') {
            interaction.reply({
                content: 'Pong',
                ephemeral: false,
            })
        } else if (commandName === 'plus') {
            const num1 = options.getNumber('num1')
            const num2 = options.getNumber('num2')

            interaction.reply({
                content: `The answer is ${num1 + num2}`,
                ephemeral: true,
            })
        } else if (commandName === 'minus') {
            const num1 = options.getNumber('num1')
            const num2 = options.getNumber('num2')

            interaction.reply({
                content: `The answer is ${num1 - num2}`,
                ephemeral: true,
            })
        } else if (commandName === 'multiply') {
            const num1 = options.getNumber('num1')
            const num2 = options.getNumber('num2')

            interaction.reply({
                content: `The answer is ${num1 * num2}`,
                ephemeral: true,
            })
        } else if (commandName === 'divide') {
            const num1 = options.getNumber('num1')
            const num2 = options.getNumber('num2')

            interaction.reply({
                content: `The answer is ${num1 / num2}`,
                ephemeral: true,
            })
        } else if (commandName === 'help') {
            interaction.reply({
                content: 'List of abavable commands: https://sites.google.com/view/l3quang-botsite/help',
                ephemeral: false,
            })
        }
    })

client.login(process.env.TOKEN)