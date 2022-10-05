export const data = new Discord.SlashCommandBuilder()
   .setName(`flooded-area-statistics`)
   .setDescription(`🌊 View current statistics for Flooded Area on Roblox.`);


import Discord from "discord.js";
import dayjs from "dayjs";

import pkg from "../../package.json" assert { type: "json" };

import { strip } from "@magicalbunny31/awesome-utility-stuff";

/**
 * @param {Discord.ChatInputCommandInteraction} interaction
 * @param {import("@google-cloud/firestore").Firestore} firestore
 */
export default async (interaction, firestore) => {
   // defer the interaction
   await interaction.deferReply({
      ephemeral: true
   });


   // flooded area's universe id
   // to fetch universeId, view this url: https://games.roblox.com/v1/games/multiget-place-details?placeIds=<placeId>
   const universeId = 1338193767;


   // get game icon from the roblox api
   // https://thumbnails.roblox.com/docs#!/Games/get_v1_games_icons
   const icon = await (async () => {
      const response = await fetch(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&size=512x512&format=Png&isCircular=false`, {
         headers: {
            "Accept": `application/json`,
            "User-Agent": `${pkg.name} (https://github.com/magicalbunny31/discord-flooded-area-bot)`
         }
      });

      if (response.ok)
         return (await response.json()).data[0].imageUrl;

      else
         return null;
   })();


   // get game votes from the roblox api
   // https://games.roblox.com/docs#!/Votes/get_v1_games_votes
   const votes = await (async () => {
      const response = await fetch(`https://games.roblox.com/v1/games/votes?universeIds=${universeId}`, {
         headers: {
            "Accept": `application/json`,
            "User-Agent": `${pkg.name} (https://github.com/magicalbunny31/discord-flooded-area-bot)`
         }
      });

      if (response.ok)
         return (await response.json()).data[0];

      else
         return null;
   })();


   // get game data from the roblox api
   // https://games.roblox.com/docs#!/Games/get_v1_games
   const data = await (async () => {
      const response = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`, {
         headers: {
            "Accept": `application/json`,
            "User-Agent": `${pkg.name} (https://github.com/magicalbunny31/discord-flooded-area-bot)`
         }
      });

      if (response.ok)
         return (await response.json()).data[0];

      else
         return null;
   })();


   // error!
   if (!(icon || votes || data))
      return await interaction.editReply({
         content: `an error occurred trying to fetch statistics! try again later~ ${emojis.rip}`
      });


   // embeds
   const embeds = [
      new Discord.EmbedBuilder()
         .setColor(0x4de94c)
         .setAuthor({
            name: data.name,
            iconURL: icon,
            url: `https://www.roblox.com/games/3976767347/Flooded-Area`
         })
         .setDescription(strip`
            👤 **current players**
            > \`${data.playing.toLocaleString()}\` in-game

            ⭐ **favourites**
            > \`${data.favoritedCount.toLocaleString()}\` favourites

            👥 **total visits**
            > \`${data.visits.toLocaleString()}\` total visits

            📈 **votes**
            > 👍 \`${votes.upVotes.toLocaleString()}\` - \`${votes.downVotes.toLocaleString()}\` 👎

            ⌚ **game last updated**
            > ${Discord.time(dayjs(data.updated).unix())} (${Discord.time(dayjs(data.updated).unix(), Discord.TimestampStyles.RelativeTime)})
         `)
         .setTimestamp(interaction.createdTimestamp)
   ];


   // edit the deferred interaction
   return await interaction.editReply({
      embeds
   });
};