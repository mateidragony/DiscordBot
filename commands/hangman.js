const { SlashCommandBuilder, MessageCollector, EmbedBuilder, AttachmentBuilder, messageLink } = require("discord.js");
const { readFileSync } = require('fs');
const wait = require('node:timers/promises').setTimeout;
const wordLibrary = readFileSync("./assets/engmix.txt", { encoding: 'utf-8' }).split("\n");

module.exports = {
    data: new SlashCommandBuilder()
            .setName("hangman")
            .setDescription("Plays hangman!"),
    async execute(interaction){


        const images = ["https://i.imgur.com/BC1cAio.png", "https://i.imgur.com/wRf0lt3.png", "https://i.imgur.com/DxbltvX.png",
                        "https://i.imgur.com/EDVVC1p.png","https://i.imgur.com/jQeHSSb.png","https://i.imgur.com/dEKxF6S.png",
                        "https://i.imgur.com/A5nhZGA.png","https://i.imgur.com/wlO2gt4.png","https://i.imgur.com/BVWphbj.png",
                        "https://i.imgur.com/vmMcLT6.png","https://i.imgur.com/q4yNrkE.png","https://i.imgur.com/pOZU2Ju.png",
                        "https://i.imgur.com/7ZkHn9n.png","https://i.imgur.com/6AolERW.png","https://i.imgur.com/juB1UZF.png",
                        "https://i.imgur.com/8eoB1w3.png","https://i.imgur.com/MTOQIAI.png","https://i.imgur.com/HDRyBac.png",
                        "https://i.imgur.com/2Eaujmd.png","https://i.imgur.com/EcyLQbC.png"];
        let used = [];
        const secretWord = wordLibrary[Math.floor(Math.random() * wordLibrary.length)];
        var foundLetters = "`_` ".repeat(secretWord.length);
        var attempts = images.length-1;

        interaction.reply("Welcome to hangman!");
        await wait(1000);

        const hangmanEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Hangman')
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley')
            .setAuthor({ name: 'HomeSayYoung Hangman Master', iconURL: 'https://i.pinimg.com/564x/b8/d9/51/b8d95186fb712be99cef0d44cc7df09c.jpg'})
            .addFields(
                { name: 'attemps', value: `Attempts left: ${attempts}`},
                { name: 'prev-letter', value: `Enter a character`},
                { name: 'found-letters', value: foundLetters}
            )
            .setImage(images[0])
            .setTimestamp()
            .setFooter({ text: 'Have great fun!', iconURL: 'https://i.pinimg.com/564x/b8/d9/51/b8d95186fb712be99cef0d44cc7df09c.jpg' });

        interaction.editReply({ embeds: [hangmanEmbed]});

        const collector = new MessageCollector( interaction.channel, {
            filter : m => m.author.id === interaction.user.id,
            time: 1000000 
        });
        collector.on('collect', async msg => {

            const char = msg.content[0]?.toLowerCase();

            if (!/[a-z]/i.test(char)){
                return msg.reply("You have to **provide** a **letter**, **not** a **number/symbol**").then(
                    (m) => setTimeout(() => m.delete().catch(e => { }), 2000),
                    await wait(1000),
                    msg.delete().catch(e => { }))
            }
            if (used.includes(char)){ 
                return msg.reply("You aleady used this letter").then(
                    (m) => setTimeout(() => m.delete().catch(e => { }), 2000),
                    await wait(1000),
                    msg.delete().catch(e => { }));
            }

            msg.delete().catch(e => { });

            used.push(char);

            if(secretWord.includes(char)){
                for(let i=0; i<secretWord.length; i++){

                    const index = i*4+1;

                    if(secretWord.charAt(i) == char.charAt(0)){
                        foundLetters = foundLetters.substring(0, index) +
                        char +
                        foundLetters.substring(index + 1);
                    }
    
                }
            } else {
                attempts--;
            }

            hangmanEmbed.setFields(
                { name: '\u200B', value: '\u200B' },
                { name: 'Attemps', value: `Attempts left: ${attempts}`},
                { name: 'Letters Entered', value: `You entered: ${used.toString()}`},
                { name: 'Found Letters', value: foundLetters}
            ).setImage(images[images.length-attempts-1]);

            interaction.editReply({ embeds: [hangmanEmbed] });

            if(!foundLetters.includes("_") || attempts==0){
                collector.stop();
            }
        });

        collector.on('end', collected => {

            if(!foundLetters.includes("_"))
                interaction.followUp("You win!!");
            else
                interaction.followUp(`You lose. The word was ${secretWord}`);
        });

        
    },
};