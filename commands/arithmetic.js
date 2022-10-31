const { SlashCommandBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

const data = new SlashCommandBuilder()
    .setName('arithmetic')
    .setDescription('Do some arithmetic!')
    .addSubcommand(subcommand =>
		subcommand
            .setName('add')
            .setDescription('Add two numbers')
            .addNumberOption(option => option.setName('number1').setDescription('First number to be added').setRequired(true))
            .addNumberOption(option => option.setName('number2').setDescription('Second number to be added').setRequired(true)))
    .addSubcommand(subcommand => 
        subcommand
            .setName("subtract")
            .setDescription("Subtract two numbers")
            .addNumberOption(option => option.setName("number1").setDescription("First number to be subtracted").setRequired(true))
            .addNumberOption(option => option.setName("number2").setDescription("Second number to be subtracted").setRequired(true)))
    .addSubcommand(subcommand => 
        subcommand
            .setName("multiply")
            .setDescription("Multiply two numbers")
            .addNumberOption(option => option.setName("number1").setDescription("First number to be multiplied").setRequired(true))
            .addNumberOption(option => option.setName("number2").setDescription("Second number to be multiplied").setRequired(true)))
    .addSubcommand(subcommand => 
        subcommand
            .setName("divide")
            .setDescription("Divide two numbers")
            .addNumberOption(option => option.setName("number1").setDescription("First number to be divided").setRequired(true))
            .addNumberOption(option => option.setName("number2").setDescription("Second number to be divided").setRequired(true)))


module.exports = {
    data,
    async execute(interaction){
        
        interaction.deferReply({ephemeral : true});
        await wait(1000);

        const subcommand = interaction.options.getSubcommand();

        if(subcommand === "add"){
            const num1 = interaction.options.getNumber("number1");
            const num2 = interaction.options.getNumber("number2");

            await interaction.editReply(`${num1} + ${num2} = ${num1 + num2}`);

        } else if(subcommand === "subtract"){
            const num1 = interaction.options.getNumber("number1");
            const num2 = interaction.options.getNumber("number2");

            await interaction.editReply(`${num1} - ${num2} = ${num1 - num2}`);

        } else if(subcommand === "multiply"){
            const num1 = interaction.options.getNumber("number1");
            const num2 = interaction.options.getNumber("number2");

            await interaction.editReply(`${num1} X ${num2} = ${num1 * num2}`);

        } else if(subcommand === "divide"){
            const num1 = interaction.options.getNumber("number1");
            const num2 = interaction.options.getNumber("number2");

            await interaction.editReply(`${num1} / ${num2} = ${num1 / num2}`);

        }
    },
};
