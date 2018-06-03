const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const PREFIX = "!";
const queue = new Map();
const EVERYONE = "@";

var client = new Discord.Client();

var bot = new Discord.Client();

var servers = {};

bot.on("ready", function () {
    bot.user.setActivity("CommunityBOT - " + PREFIX + "help")
    bot.user.setStatus("dnd")
    console.log("\nCommunityBOT - Connecté");
    console.log("\nInfos :\nNombre de serveurs : " + bot.guilds.size + "\nNombre d'utilisateurs : " + bot.users.size);
    var allservers = bot.guilds.array(); for (var i in allservers) {
        console.log("\nServeur numéro " + i + " :" + "\n- Nom du serveur : " + allservers[i].name + "\n- ID du serveur : " + allservers[i].id + "\n- Propriétaire du serveur : " + allservers[i].owner.displayName + " (" + allservers[i].owner.id + ")\n")
    }
});

bot.on("message", async function (message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    var args2 = message.content.split(" ").slice(1);

    var suffix = args2.join(" ");

    var reason = args2.slice(1).join(" ");

    var reasontimed = args2.slice(2).join(' ')

    var user = message.mentions.users.first();

    var guild = message.guild;

    var member = message.member;

    var roledev = member.guild.roles.find("name", "👨🏻‍💻Développeur👨🏻‍💻")

    var modlog = member.guild.channels.find("name", "🤖bot-logs🤖")

    var user = message.mentions.users.first();

    switch (args[0].toLowerCase()) {
    case "help":
        var help_embed = new Discord.RichEmbed()
            .addField(PREFIX + "rolelist", "Grâce à cette commande, tu pourras voir là liste des rôles !")
        .setColor("#0000ff")
        .setFooter("D'autre commandes arriverons bientôt !")
        .setAuthor("Panel d'Aide")
        .setDescription("Voici mes commandes !")
        .setTimestamp()
        message.delete()
        message.channel.send(message.author.toString() + " **Je t'ai envoye un menu d'aide en MP, verifie qu'ils sont actifs en provenance des membres du serveur.**")
        member.createDM().then(channel => {
            return channel.send(help_embed)
                }).catch(console.error)
        console.log(PREFIX + "help par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
        member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utiliser ``" + PREFIX + "help `` dans le salon " + message.channel + " !\nProvenance du message : ``" + message.guild.name + "``");
   break;

    case "rolelist":
    var rolelist_embed = new Discord.RichEmbed()
        .addField(PREFIX + "addroledev", "Grâce à cette commande, tu pourras avoir le rôle " + roledev + " !")
        .addField(PREFIX + "removeroledev", "Grâce à cette commande, tu pourras t'enlever le rôle " + roledev + " !")
    .setColor("#0000ff")
    .setFooter("Par Ilian !")
    .setAuthor("Panel des rôles")
    .setTimestamp()
    message.channel.send(member.toString() + " Voici la liste des rôles !")
    message.channel.send(rolelist_embed)
    console.log(PREFIX + "rolelist par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
    member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utiliser ``" + PREFIX + "rolelist `` dans le salon " + message.channel + " !\nProvenance du message : ``" + message.guild.name + "``");
    break;

    case "addroledev":
    var addroledev_embed = new Discord.RichEmbed()
    .setColor("#3333cc")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(member.toString() + " est désormais ``👨🏻‍💻Développeur👨🏻‍💻``")
    member.guild.channels.find("name", "🤖bot-logs🤖").send(addroledev_embed);
    member.addRole(roledev)
    message.channel.send(member.toString() + " est bien devenue Développeur :white_check_mark: !")
    console.log(PREFIX + "addroledev par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
    member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utiliser ``" + PREFIX + "addroledev `` dans le salon " + message.channel + " !\nProvenance du message : ``" + message.guild.name + "``");
    break;
    
    case "removeroledev":
    var rroledev_embed = new Discord.RichEmbed()
    .setColor("#3333cc")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(member.toString() + " n'est plus ``👨🏻‍💻Développeur👨🏻‍💻``")
    member.guild.channels.find("name", "🤖bot-logs🤖").send(rroledev_embed);
    member.removeRole(roledev)
    message.channel.send(member.toString() + " n'est Développeur :white_check_mark: !")
    console.log(PREFIX + "removeroledev par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
    member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utiliser ``" + PREFIX + "removeroledev `` dans le salon " + message.channel + " !\nProvenance du message : ``" + message.guild.name + "``");
    break;    
    }
});

bot.login(process.env.TOKEN);
