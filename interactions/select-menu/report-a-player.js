export const name = "report-a-player";
export const guilds = [ process.env.GUILD_FLOODED_AREA ];

import Discord from "discord.js";
import { emojis, choice, strip } from "@magicalbunny31/awesome-utility-stuff";

/**
 * @param {Discord.StringSelectMenuInteraction} interaction
 * @param {import("@google-cloud/firestore").Firestore} firestore
 */
export default async (interaction, firestore) => {
   // select menu info
   const [ _selectMenu ] = interaction.customId.split(`:`);
   const [ value ] = interaction.values;


   // embeds
   const embeds = interaction.message.embeds
      .map(embed => new Discord.EmbedBuilder(embed.data));


   // change embeds
   switch (true) {


      case value === `false-votekicking`: {
         embeds[0]
            .setDescription(strip`
               ### ❓ False votekicking is...
               > - ...Starting a votekick for an invalid (being a furry) or false (griefing when you weren't actually griefing) reason.
               >  - You must have evidence to prove that you weren't doing what you were votekicked for if it's not clearly against the rules.
               > - ...Starting a votekick for something that happened in another server.
               > - ...Using multiple accounts to help votekicks pass.

               ### ✨ Final things
               > - It'll help us if provide a screenshot of the votekick modal for us to take action - we don't have in-game logs.
               > - By submitting this report, you confirm that it is truthful and made in good faith. Do not submit false or duplicate reports.
            `);

         break;
      };


      case value === `griefing`: {
         embeds[0]
            .setDescription(strip`
               ### ❓ Griefing is...
               > - ...When someone purposefully breaks your boat, through ungluing, bombs or any other destructive items.

               ### ❌ You cannot report someone for griefing
               > - Griefing is allowed in-game! Use votekicks to remove them from the server.
            `);

         break;
      };


      case [ `harassed-people`, `threatened-people`, `hate-speech`, `violence`, `swore-in-chat`, `sexual-in-chat` ].includes(value): {
         embeds[0]
            .setDescription(strip`
               ### ✨ Final things!
               > - You'll have to show us the chat that you're reporting - we don't have in-game logs.
               > - By submitting this report, you confirm that it is truthful and made in good faith. Do not submit false or duplicate reports.
            `);

         break;
      };


      case value === `inappropriate-avatar`: {
         embeds[0]
            .setDescription(strip`
               ### ✨ Final things!
               > - You'll have to show us the player's avatar that you're reporting - whether that be a screenshot or a link to their profile.
               > - By submitting this report, you confirm that it is truthful and made in good faith. Do not submit false or duplicate reports.
            `);

         break;
      };


      case value === `exploiting`: {
         embeds[0]
            .setDescription(strip`
               ### ✨ Final things!
               > - You'll have to show us a video of the player that's using exploits.
               > - By submitting this report, you confirm that it is truthful and made in good faith. Do not submit false or duplicate reports.
            `);

         break;
      };


      case value === `bug-abuse`: {
         embeds[0]
            .setDescription(strip`
               ### ❓ Abusing bugs is...
               > - ...Doing something that wasn't intended in-game to gain an unfair advantage over others.

               ### ✅ Examples of bugs which aren't allowed in-game and can be reported
               > - Infinite fly glitches
               > - Rope flinging

               ### ❌ Examples of bugs which are allowed in-game and can't be reported
               > - Prop flinging
               > - Tab glitching
               > - Other harmless bugs

               ### ✨ Final things!
               > - You'll have to show us a video of the player that's abusing the bug or glitch.
               >  - 
               > - By submitting this report, you confirm that it is truthful and made in good faith. Do not submit false or duplicate reports.
            `);

         break;
      };


      case value === `sexual-build`: {
         embeds[0]
            .setDescription(strip`
               ### ✨ Final things!
               > - You'll have to show us the build, as well as some form of proof that they were the one who built it.
               > - By submitting this report, you confirm that it is truthful and made in good faith. Do not submit false or duplicate reports.
            `);

         break;
      };


      case value === `being-sexual`: {
         embeds[0]
            .setDescription(strip`
               ### ✨ Final things!
               > - You'll have to show us how the player is being sexual.
               > - By submitting this report, you confirm that it is truthful and made in good faith. Do not submit false or duplicate reports.
            `);

         break;
      };


      case value === `ban-evasion`: {
         embeds[0]
            .setDescription(strip`
               ### ❓ Ban evasion is...
               > - ...Using another account to play ${Discord.hyperlink(`Flooded Area`, `https://www.roblox.com/games/3976767347/Flooded-Area`)} when you're already banned on another account.
               > - ...Using another account to join a server that another account you own was votekicked on.

               ### ✨ Final things!
               > - You'll have to show us how you found out this player is evading a ban.
               >  - It'd also help if you found out what their main account was too.
               > - By submitting this report, you confirm that it is truthful and made in good faith. Do not submit false or duplicate reports.
            `);

         break;
      };


      case value === `moderator-abuse`: {
         embeds[0]
            .setDescription(strip`
               ### ❓ Moderator abuse is...
               > - ...When a moderator uses their powers to make the game unenjoyable for others.
               >  - We have rules that all mods should follow - they are not above those rules.

               ### ✨ Final things!
               > - You'll have to show us a video of how this moderator was abusing their powers.
               > - By submitting this report, you confirm that it is truthful and made in good faith. Do not submit false or duplicate reports.
            `);

         break;
      };


      case value === `other`: {
         embeds[0]
            .setDescription(strip`
               ### ❓ Something else you'd like to report?
               > - That's completely fine! Just fill out the form to the best of your ability.
               > - We're open to questions if you're unsure about any details - we won't bite!

               ### ✨ Final things!
               > - You'll have to show us some form of proof to help us with your report.
               > - By submitting this report, you confirm that it is truthful and made in good faith. Do not submit false or duplicate reports.
            `);

         break;
      };


      default: {
         embeds[0]
            .setDescription(strip`
               ### ${emojis.bun_paw_wave} ${choice([ `Hello`, `Hi`, `Welcome` ])}, ${interaction.user}!
               > - If you find anyone who is breaking our ${Discord.channelMention(process.env.FA_CHANNEL_RULES_AND_INFO)} in ${Discord.hyperlink(`Flooded Area`, `https://www.roblox.com/games/3976767347/Flooded-Area`)}, you can report them to us here.
               > - You can also ${Discord.hyperlink(`report players to Roblox`, `https://en.help.roblox.com/hc/en-us/articles/203312410-How-to-Report-Rule-Violations`)} too, if you think it's necessary.
               > - Remember that you can always ${Discord.hyperlink(`block`, `https://en.help.roblox.com/hc/en-us/articles/203314270-How-to-Block-Another-User`)} or ${Discord.hyperlink(`mute`, `https://alvarotrigo.com/blog/mute-someone-roblox`)} any players that you don't want to interact with in chat.
            `);

         break;
      };


   };


   // components
   const components = interaction.message.components;

   const foundActionRowIndex = components.findIndex(component => component.components.some(component => component.customId === interaction.customId));
   const foundComponentIndex = components[foundActionRowIndex].components.findIndex(component => component.customId === interaction.customId);

   const options = components[foundActionRowIndex].components[foundComponentIndex].data.options;
   for (const option of options)
      if (value === option.value)
         option.default = true;
      else
         option.default = false;


   // change select menus
   switch (value) {


      // during a round
      case `during-round`: {
         components.splice(1, 4,
            new Discord.ActionRowBuilder()
               .setComponents(
                  new Discord.StringSelectMenuBuilder()
                     .setCustomId(`report-a-player:1`)
                     .setPlaceholder(`What happened during the round?`)
                     .setOptions(
                        new Discord.StringSelectMenuOptionBuilder()
                           .setLabel(`Started an invalid votekick`)
                           .setEmoji(`🥾`)
                           .setValue(`false-votekicking`),
                        new Discord.StringSelectMenuOptionBuilder()
                           .setLabel(`Griefed me or someone else`)
                           .setEmoji(`💣`)
                           .setValue(`griefing`)
                     )
               )
         );

         break;
      };


      // chat
      case `chat`: {
         components.splice(1, 4,
            new Discord.ActionRowBuilder()
               .setComponents(
                  new Discord.StringSelectMenuBuilder()
                     .setCustomId(`report-a-player:1`)
                     .setPlaceholder(`What did this player do in chat?`)
                     .setOptions(
                        new Discord.StringSelectMenuOptionBuilder()
                           .setLabel(`Verbally harassed me or someone else`)
                           .setEmoji(`💢`)
                           .setValue(`harassed-people`),
                        new Discord.StringSelectMenuOptionBuilder()
                           .setLabel(`Threatened violence or real world harm`)
                           .setEmoji(`💢`)
                           .setValue(`threatened-people`),
                        new Discord.StringSelectMenuOptionBuilder()
                           .setLabel(`Promoted hate based on identity or vulnerability`)
                           .setEmoji(`💢`)
                           .setValue(`hate-speech`),
                        new Discord.StringSelectMenuOptionBuilder()
                           .setLabel(`Celebrated or glorified acts of violence`)
                           .setEmoji(`💢`)
                           .setValue(`violence`),
                        new Discord.StringSelectMenuOptionBuilder()
                           .setLabel(`Used offensive language`)
                           .setEmoji(`🗯️`)
                           .setValue(`swore-in-chat`),
                        new Discord.StringSelectMenuOptionBuilder()
                           .setLabel(`Said something explicit or sexual`)
                           .setEmoji(`🗯️`)
                           .setValue(`sexual-in-chat`)
                     )
               )
         );

         break;
      };


      // player
      case `player`: {
         components.splice(1, 4,
            new Discord.ActionRowBuilder()
               .setComponents(
                  new Discord.StringSelectMenuBuilder()
                     .setCustomId(`report-a-player:1`)
                     .setPlaceholder(`Why is this player being reported?`)
                     .setOptions(
                        new Discord.StringSelectMenuOptionBuilder()
                           .setLabel(`Inappropriate avatar`)
                           .setEmoji(`🔞`)
                           .setValue(`inappropriate-avatar`),
                        new Discord.StringSelectMenuOptionBuilder()
                           .setLabel(`Using exploits, cheats, or hacks`)
                           .setEmoji(`💻`)
                           .setValue(`exploiting`),
                        new Discord.StringSelectMenuOptionBuilder()
                           .setLabel(`Abusing a bug or glitch to gain an unfair advantage`)
                           .setEmoji(`🐛`)
                           .setValue(`bug-abuse`),
                        new Discord.StringSelectMenuOptionBuilder()
                           .setLabel(`Built something explicit or sexual`)
                           .setEmoji(`🔞`)
                           .setValue(`sexual-build`),
                        new Discord.StringSelectMenuOptionBuilder()
                           .setLabel(`Being suggestive or sexual in-game`)
                           .setEmoji(`🔞`)
                           .setValue(`being-sexual`),
                        new Discord.StringSelectMenuOptionBuilder()
                           .setLabel(`Evading a ban with an alternate account`)
                           .setEmoji(`👥`)
                           .setValue(`ban-evasion`)
                     )
               )
         );

         break;
      };


      // something else
      case `something-else`: {
         components.splice(1, 4,
            new Discord.ActionRowBuilder()
               .setComponents(
                  new Discord.StringSelectMenuBuilder()
                     .setCustomId(`report-a-player:1`)
                     .setPlaceholder(`How can the Moderation Team help you?`)
                     .setOptions(
                        new Discord.StringSelectMenuOptionBuilder()
                           .setLabel(`Moderator abusing their powers`)
                           .setEmoji(`🚨`)
                           .setValue(`moderator-abuse`),
                        new Discord.StringSelectMenuOptionBuilder()
                           .setLabel(`Another reason...`)
                           .setEmoji(`❓`)
                           .setValue(`other`)
                     )
               )
         );

         break;
      };


      // an end option was set, show the button
      default: {
         const canMakeReport = ![ `griefing` ].includes(value);

         components.splice(2, 3,
            new Discord.ActionRowBuilder()
               .setComponents(
                  new Discord.ButtonBuilder()
                     .setCustomId(`create-report:${value}`)
                     .setLabel(`Create report`)
                     .setEmoji(`🗒️`)
                     .setStyle(Discord.ButtonStyle.Success)
                     .setDisabled(!canMakeReport)
               )
         );

         break;
      };


   };


   // description for this report type
   // const description = {
   //    "false-votekicking": strip`
   //       ### What's false votekicking?
   //       > - False votekicking is when someone starts a votekick for an __unfair or false reason__.
   //       >  - This reason must be __clearly against the rules__, see below for more information.
   //       >  - If you were votekicked for a reason you didn't do, you __must have evidence__ to prove that you weren't doing what you were votekicked for.
   //       > - People who use __multiple accounts__ to help __manipulate votes for a votekick__ can also be reported under this reason.

   //       ### What are examples of false votekicking?
   //       > - Starting a votekick with "being a furry" or "weird" as the reason.
   //       >  - These reasons are __clearly against the rules__, as you can be a furry or be as weird as you want (*with some exceptions*) in-game.

   //       ### What aren't examples of false votekicking?
   //       > - Starting a votekick with "griefing us" or "exploding my boat"
   //       >  - Griefing is allowed in-game, so __we can't ban someone for doing something they are allowed to do__.

   //       ### What punishments are there for false votekicking?
   //       > - People who false votekick will be __banned for up to day (1 day)__.
   //       > - If they are found to have sent many false votekicks, they may be __banned for up to a week (7 days)__.

   //       ### You don't need proof to submit a ticket for this reason, however we recommend you have some anyway.
   //    `,
   //    "griefing": strip`
   //       ### What's griefing?
   //       > - Griefing is when someone __purposefully breaks your boat__.
   //       >  - This can be done through __ungluing__, __using bombs__ or __any other destructive items__.

   //       ### Why can't I report someone for griefing?
   //       > - Griefing is __allowed__ in-game, meaning we can't ban someone for griefing you.
   //       >  - __Try votekicking griefers__ from your server - you can't get banned for that unless we find out they weren't actually griefing.
   //    `,
   //    "spamming": strip`
   //       ### What's spamming?
   //       > - We count spamming as someone who __floods the chat with nonsense__.

   //       ### What are examples of spamming?
   //       > - "🦊🦊🦊🦊🦊🦊🦊🦊🦊🦊"
   //       > - "🦊🦊🦊🦊🦊🦊🦊🦊🦊🦊"
   //       > - "🦊🦊🦊🦊🦊🦊🦊🦊🦊🦊"
   //       > - "🦊🦊🦊🦊🦊🦊🦊🦊🦊🦊"
   //       > - ...
   //       >  - This person is flooding the chat with __nonsense that nobody asked for__.

   //       ### What aren't examples of spamming?
   //       > - "hi bun! sorry i can't unmute rn but"
   //       > - "i had this rlly kewl thing happen earlier"
   //       > - "and i have just GOTS to tell y'all!!"
   //       > - "i won a trophy at a fishing tourney!"
   //       > - ...
   //       >  - This person is __talking to someone__: you can ignore these messages.

   //       ### What punishments are there for spamming?
   //       > - Players will be __warned a few times__ before further action is taken.
   //       > - If they don't listen to us, they may be __banned for up to a day (1 day)__.

   //       ### You'll need proof (such as a link, image or video) to submit a ticket for this reason.
   //    `,
   //    "bypassing": strip`
   //       ### What's bypassing/swearing?
   //       > - This is when someone tries circumvent the chat filter to __say something inappropriate__.
   //       >  - Inappropriate stuff here includes __swearing__, __saying slurs__, __explicit/suggestive content__, and __other generally bad stuff__.
   //       > - This report reason only includes chat messages. For inappropriate avatars, names or builds: __report them under the "Inappropriate player" reason__ instead.

   //       ### What are examples of bypassing/swearing?
   //       > - "F4CK U B1TCH"
   //       >  - This message is __obviously trying to say "FUCK U BITCH"__: you are not allowed to say this on Roblox.

   //       ### What punishments are there for bypassing/swearing?
   //       > - For less severe cases, like swearing, players will be __banned for a day (1 day)__.
   //       > - For more severe cases, like being racist or homophobic/transphobic/..., players may be __banned permanently__.

   //       ### You'll need proof (such as a link, image or video) to submit a ticket for this reason.
   //    `,
   //    "toxicity": strip`
   //       ### What's toxicity/harassment?
   //       > - This is when someone is __bullying__, __being toxic__, __subtly harming__ or just __generally being annoying towards others__.
   //       >  - This includes people who __intentionally try to start arguments__.

   //       ### What are examples of toxicity/harassment?
   //       > - Someone who is __being an asshole__ in-game: __making fun of everyone's avatars__ and __calling them names__ is an example of toxicity and harassment.

   //       ### What aren't examples of toxicity/harassment?
   //       > - __Regular trash talk__, such as "L", "noob" or "ez", aren't included in this report type.

   //       ### What punishments are there for toxicity/harassment?
   //       > - Players who are toxic or harass others may be __banned from a day (1 day) to three days (3 days)__.

   //       ### You'll need proof (such as a link, image or video) to submit a ticket for this reason.
   //    `,
   //    "bug-abuse": strip`
   //       ### What's bug abusing?
   //       > - This is when someone __intentionally uses an in-game bug__ to gain an __unfair advantage__ over others.
   //       > - Not all bugs can be reported - see below for more information.

   //       ### What are examples of bug abusing?
   //       > - Infinite flying glitches
   //       > - Rope flinging
   //       >  - These bugs create an unfair environment __for other players__ and shouldn't be used.

   //       ### What aren't examples of bug abusing?
   //       > - Prop flinging
   //       > - Tab glitching
   //       > - Other harmless bugs
   //       >  - These bugs __don't affect anyone__ and may be __used for fun__.
   //       >  - However, mods may kill/kick you if you use these to __delay rounds__.

   //       ### What punishments are there for bug abusing?
   //       > - Bans vary depending on the __type of bug used__ and __how severe it affected other players__.
   //       > - Players may only be __kicked__, or __banned from a day (1 day) to a week (7 days)__.

   //       ### You'll need proof (such as a link, image or video) to submit a ticket for this reason.
   //    `,
   //    "inappropriate-player": strip`
   //       ### What's an inappropriate player?
   //       > - These are players who have an __inappropriate username, display name or avatar__.
   //       >  - Inappropriate content includes __swears__, __slurs__, __explicit/suggestive content__ and __other generally bad stuff__.
   //       > - This also includes __building inappropriate content__ in-game.
   //       >  - People who say inappropriate things in chat should be __reported under the "Bypassing / Swearing" reason__ instead.

   //       ### What are examples of an inappropriate player?
   //       > - A player with a display name saying "I\\_HATE\\_GAY\\_PEOPLE"
   //       >  - This is __part of their character__: we __don't allow__ this type of content in-game.

   //       ### What punishments are there for being an inappropriate player?
   //       > - People with an inappropriate username will be __permanently banned__.
   //       >  - However, they can appeal __once they change their username__.
   //       > - People with an inappropriate display name will be __temporarily banned for up to a week, or permanently banned__ until they change it.
   //       > - People with an inappropriate avatar will be __kicked__, __temporarily banned for a day (1 day)__ or, __in more severe cases, permanently banned__.
   //       >  - They'll be __asked to change their avatar__ in order to be unbanned, either by waiting for their ban to expire or submitting an appeal.

   //       ### You'll need proof (such as a link, image or video) to submit a ticket for this reason.
   //    `,
   //    "bigotry": strip`
   //       ### What's bigotry?
   //       > - This is when someone isn't __being open to other people's opinions__.
   //       >  - In short, it's someone who is being __homophobic/transphobic/...__, __racist__, __sexist__ or __prejudiced against a group of people__.
   //       > - They may also __act as if their opinion and their opinion only is right__.

   //       ### What are examples of bigotry?
   //       > - Someone saying "oh, you're gay? i don't like you now"
   //       >  - We want everyone to __feel welcome and included__ in Flooded Area. They shouldn't hate on other people just because they are gay.

   //       ### What punishments are there for bigotry?
   //       > - Staff have zero tolerance for bigotry, players will be __banned from a week (7 days) to permanently banned__.

   //       ### You'll need proof (such as a link, image or video) to submit a ticket for this reason.
   //    `,
   //    "exploiting": strip`
   //       ### What's exploiting/hacking?
   //       > - This is when someone uses __another program on the Roblox client__ to __abuse the game__ we didn't intend it to.
   //       >  - This includes __flying__, __gaining extra health__, __spawning parts__ and other __hack-y features__.
   //       >  - These exploits can also be used to gain an __unfair advantage__ over other people.

   //       ### What are examples of exploiting/hacking?
   //       > - A player using a controller seat to make a boat fly through the air.
   //       >  - __This is not how controller seats normally work__. This could also help make surviving rounds easier: making it __unfair for others__.

   //       ### What aren't examples of exploiting/hacking?
   //       > - Using exploits or hacks in private servers.
   //       >  - __Your__ private server is __your__ private place. Other people there also agree to be included in this private place. __You're allowed to play around with the game as much as you like__.

   //       ### What punishments are there for exploiting/hacking?
   //       > - People caught using exploits or hacks will be __permanently banned__: even if it was used to help other people.

   //       ### You'll need proof (such as a link, image or video) to submit a ticket for this reason.
   //    `,
   //    "ban-evade": strip`
   //       ### What's ban evasion?
   //       > - This is when __another player who is already banned__ uses __another unbanned account to play__ the game.
   //       >  - This also __includes a server ban from being votekicked__.
   //       >  - This doesn't mean that alt accounts are banned - __you are allowed to use__ them in-game if they are playing the game normally.
   //       > - Clear alt/troll accounts that break the rules are also included

   //       ### What punishments are there for ban evasion?
   //       > - Any alt account caught evading a ban will be __permanently banned__.
   //       >  - For server bans from votekicks, your main account will be __banned for a day (1 day)__; with the __ban being extended if caught again__.
   //       >  - For temporary bans, your main account will be __permanently banned__, __regardless of the amount of time left on your ban__.
   //       >  - For permanent bans, you'll stay __permanently banned__. This may also affect your chances of appealing your ban.

   //       ### You'll need proof (such as a link, image or video) to submit a ticket for this reason.
   //    `,
   //    "mod-abuse": strip`
   //       ### What's moderator abuse?
   //       > - This is when a moderator __uses their powers__ to make the game __unenjoyable for others__.
   //       > - We have rules that all mods should follow - __they are not above those rules__.

   //       ### What are examples of moderator abuse?
   //       > - A moderator keeps spawning explosives and killing you with them, even if you've done nothing to annoy them.
   //       >  - They are there to keep the community safe and punish rule breakers. __This is not them doing just that__.

   //       ### What aren't examples of moderator abuse?
   //       > - A moderator spawned in a part to add to their boat.
   //       >  - In this case, this is allowed as this __doesn't greatly impact your gameplay__.

   //       ### What punishments are there for moderator abuse?
   //       > - Moderators caught may have their __powers removed__ or be __demoted__.

   //       ### You don't need proof to submit a ticket for this reason, however we recommend you have some anyway.
   //    `,
   //    "other": strip`
   //       ### Something else you'd like to report?
   //       > - That's completely fine! Just fill out the form __to the best of your ability__.
   //       > - We're __open to questions if you're unsure__ about any details - we won't bite!
   //       > - Remember that there are no wrong answers here and __we won't judge you__ for any silly queries too.

   //       ### You'll need proof (such as a link, image or video) to submit a ticket for this reason.
   //    `
   // }[type];


   // update the interaction
   return await interaction.update({
      embeds,
      components
   });
};