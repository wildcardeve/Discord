const { SlashCommandBuilder } = require("@discordjs/builders");
const logger = require("../utils/logger");

const options = [
  "Chair is a big dumb idiot",
  "Sleipnir",
  "Nighthawk",
  "Retribution",
  "Oracle",
  "Orthrus",
  "Hurricane",
  "Hurricane Fleet Issue",
  "Drake Navy Issue",
  "Caracal",
  "Nightmare",
  "Interceptor",
  "Phantasm",
  "Loki",
  "Vedmak",
  "Draugur",
  "Drekavak",
  "Deez Nuts",
  "Svipul",
  "Stabber",
  "Vagabond",
  "Omen Navy Issue",
  "Osprey Navy Issue",
  "Vargur",
  "Typhoon",
  "Typhoon Fleet Issue",
  "Tempest",
  "Legion",
  "Zealot",
  "Harm Egg",
  "Machariel",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ship")
    .setDescription("Choose a ship to fly."),
  async execute(interaction) {
    await interaction.reply(
      `You should fly: ${options[Math.floor(Math.random() * options.length)]}`
    );
  },
};
