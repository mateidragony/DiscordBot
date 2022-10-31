const { SlashCommandBuilder} = require("discord.js");
const wait = require('node:timers/promises').setTimeout;



const data = new SlashCommandBuilder()
    .setName("rock-paper-scissors")
    .setDescription("Plays Rock Paper Scissors")
    .addStringOption(option =>
        option.setName("choice")
            .setDescription("Choose between Rock, Paper, or Scissors")
            .setRequired(true)
            .addChoices(
                { name : "Rock" , value : "rock"},
                { name : "Paper", value : "paper"},
                { name : "Scissors", value : "scissors"}
            )
        );



module.exports = {
    data,
    async execute(interaction){

        const possibleChoices = ["rock", "paper", "scissors"];
        const choice = interaction.options.getString("choice");
        const myChoice = possibleChoices[Math.floor(Math.random() * possibleChoices.length)];

        let message = `I picked ${myChoice} and you picked ${choice}. `;

        if(myChoice === choice)
            message += `**We both chose ${choice}, so we tied!**`;

        if (myChoice === "paper" && choice === "rock") 
            message += `**I won!**`;
        else if (myChoice === "scissors" && choice === "rock")
            message += `**You win!**`;
    

        if (myChoice === "scissors" && choice === "paper") 
            message += `**I won!**`;
        else if (myChoice === "rock" && choice === "paper")
            message += `**You win!**`;    
    

        if (myChoice === "rock" && choice === "scissors")
            message += `**I won!**`;
        else if (myChoice === "paper" && choice === "scissors")
            message += `**You win!**`;


        await interaction.reply(message);
    },
};

