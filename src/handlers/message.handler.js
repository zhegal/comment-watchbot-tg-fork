import AdminGuard from '../guards/admin.guard.js';
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
        this.bot.on('message', this.onMessage.bind(this));
    }

    async onMessage(ctx) {
        const msg = ctx?.update?.message;
        if (!config.allowedChats.includes(msg.chat.id.toString())) {
            return;
        }
        if (msg.chat.type === "private") {
            return;
        }
        if (await AdminGuard.isAdmin(ctx) || this.whitelist.includes(ctx?.from?.id)) {
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
        if (msg?.new_chat_members) {
            await moderation.handleNewMembers();
        }
    }
}