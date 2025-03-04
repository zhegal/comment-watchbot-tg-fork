import { Telegraf } from 'telegraf'
import 'dotenv/config'

const bot = new Telegraf(process.env.BOT_TOKEN)
const ctch = (err) => console.log(err)

const isAdmin = async (ctx) => {
    let admins = await ctx.getChatAdministrators()
    admins = admins.map(admin => admin.user.id);
    return admins.includes(msg?.from?.id)
}

const isChannel = (ctx) => {
    let msg = ctx?.update?.message
    return msg?.forward_from_chat?.type == "channel"
        || msg?.forward_origin?.type    == "channel"
        || msg?.sender_chat?.type       == "channel"
        || msg?.is_automatic_forward
        || (msg?.reply_to_message && msg?.reply_to_message?.sender_chat?.type == 'channel')
}

bot.on('message', async (ctx) => {
    if (isChannel(ctx) || await isAdmin(ctx)) return;

    let newmemb = ctx?.update?.message?.new_chat_members    
    let msg = ctx?.update?.message

    if (msg?.left_chat_member || !msg?.reply_to_message)
        await ctx.deleteMessage(ctx?.update?.message?.message_id).catch(ctch)

    if (!newmemb) return
    for await (let memb of newmemb) {
        if (ctx.botInfo.id == memb.id) continue;
        await ctx.banChatMember(memb.id).catch(ctch)
        await ctx.unbanChatMember(memb.id).catch(ctch)
    }
    return
})

bot.launch()


// I really tried to make this code look not so shit, but it looks like it's impossible, so...