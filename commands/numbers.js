const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName("numbers")
            .setDescription("Prints numbers 1-100. (Hopefully)"),
    async execute(interaction){
        var str = "";

        for(let i=1; i<=100; i++){
            str += i+",";
        }
        str = str.substring(0,str.length-1);

        await interaction.reply({content : str, ephemeral : true});
    },
};
