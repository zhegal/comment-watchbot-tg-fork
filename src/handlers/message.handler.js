import AdminGuard from '../guards/admin.guard.js';
import ChannelGuard from '../guards/channel.guard.js';
import SubscriptionGuard from '../guards/subscription.guard.js';
import ModerationService from '../services/moderation.service.js';
import Logger from '../utils/logger.js';
import config from '../config/config.js';

export default class MessageHandler {
    constructor(bot, whitelist) {
        this.bot = bot;
        this.whitelist = whitelist;
    }

    register() {
        this.bot.on('new_chat_members', this.onNewMembers.bind(this));
        this.bot.on('message', this.onMessage.bind(this));
    }

    async onNewMembers(ctx) {
        const msg = ctx?.update?.message;
        if (!config.allowedChats.includes(msg.chat.id.toString())) {
            return;
        }

        const newMembers = msg?.new_chat_members;
        if (!newMembers) return;

        for (let member of newMembers) {
            if (ctx.botInfo.id === member.id) continue;
            await ctx.banChatMember(member.id).catch(Logger.error);
            await ctx.unbanChatMember(member.id).catch(Logger.error);
        }
    }

    async onMessage(ctx) {
        const msg = ctx?.update?.message;
        if (msg?.left_chat_member || msg?.new_chat_members) {
            await ctx.deleteMessage(msg.message_id).catch(Logger.error);
            return;
        }
        if (!config.allowedChats.includes(msg.chat.id.toString())) {
            return;
        }
        if (msg.chat.type === "private") {
            return;
        }
        if (await AdminGuard.isAdmin(ctx) || this.whitelist.includes(ctx?.from?.id)) {
            return;
        }
        if (ChannelGuard.isOwnChannelMessage(ctx)) {
            return;
        }
        const subscribed = await SubscriptionGuard.isSubscribed(
            this.bot,
            config.subscriptionChannel,
            ctx.from.id
        );
        if (!subscribed) {
            if (config.removeUnsubscribed) {
                await ctx.deleteMessage(msg.message_id).catch(Logger.error);
            }
            return;
        }
        const moderation = new ModerationService(ctx);
        await moderation.handleLeftOrNoReply();
    }
}