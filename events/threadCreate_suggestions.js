export const name = Discord.Events.ThreadCreate;


import Discord from "discord.js";
import { strip, wait } from "@magicalbunny31/awesome-utility-stuff";

/**
 * @param {Discord.ThreadChannel} thread
 * @param {boolean} newlyCreated
 * @param {import("@google-cloud/firestore").Firestore} firestore
 */
export default async (thread, newlyCreated, firestore) => {
   // this post isn't from the suggestion channels
   if (![ process.env.FA_CHANNEL_GAME_SUGGESTIONS, process.env.FA_CHANNEL_SERVER_SUGGESTIONS, process.env.FA_CHANNEL_PART_SUGGESTIONS ].includes(thread.parent?.id))
      return;


   // this post isn't new, the bot was just added to it
   if (!newlyCreated)
      return;


   // wait a bit, because files may still be uploading so the starter message won't be available
   await wait(1000);


   // pin the starter message
   const starterMessage = await thread.fetchStarterMessage();
   await starterMessage.pin();


   // send typing to the post
   await thread.sendTyping();


   // information content
   const suggestionsInformation = strip`
      - Thanks for submitting to ${Discord.channelMention(thread.parent.id)}!
      - __Accept votes and discuss__ with the community to make ${thread} even more awesome.
      - __Edit the starter message ${starterMessage.url}__ so it's easier for others to read your edits.
      - Once this post reaches __10 reactions__, it'll receive the \`🎉 Popular\` tag.
      - Check the Pinned Messages to __scroll to this post's starter message__.
   `;


   // send the message to the post
   await thread.send({
      content: suggestionsInformation,
      flags: Discord.MessageFlags.SuppressEmbeds,
      allowedMentions: {
         parse: []
      }
   });
};