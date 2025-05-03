import { Telegraf } from 'telegraf'
import 'dotenv/config'

const bot = new Telegraf(process.env.BOT_TOKEN)
const ctch = (err) => console.log(err)

const whitelist = [1010473369, 5436194611];
const start_msg = `<b>МЯУ-МЯУ-МЯУ! НИЗЯ ЭТУ КОМАНДУ ТЫКАТЬ, НИЗЯЯ!</b>\n\n<i>Если вы хотите такого же бота-вахтёра, то исходный код вы можете найти тут:</i>\nhttps://github.com/ZAZiOs/comment-watchbot-tg/`;
                  // ^^^ HTML acceptable

const isAdmin = async (ctx) => {
    let msg = ctx?.update?.message
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

bot.start(async (ctx) => {
    if (ctx.message.chat.type != "private") return
    return ctx.replyWithHTML(start_msg)
})

bot.on('message', async (ctx) => {
    if (ctx.message.chat.type == "private" || isChannel(ctx) || await isAdmin(ctx) || whitelist.includes(ctx?.from?.id)) return;

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
