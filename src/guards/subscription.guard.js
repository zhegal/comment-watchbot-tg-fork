import Logger from '../utils/logger.js';

export default class SubscriptionGuard {
    static async isSubscribed(bot, channelId, userId) {
        try {
            const member = await bot.telegram.getChatMember(channelId, userId);
            const status = member.status;
            return ['member', 'administrator', 'creator'].includes(status);
        } catch (err) {
            Logger.error(err);
            return false;
        }
    }
}