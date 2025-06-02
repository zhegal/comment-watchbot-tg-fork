import config from '../config/config.js';

export default class ChannelGuard {
    static isOwnChannelMessage(ctx) {
        const msg = ctx?.update?.message;

        const channelUsername = config.subscriptionChannel.startsWith('@')
            ? config.subscriptionChannel.slice(1)
            : config.subscriptionChannel;

        const isSenderChat = msg?.sender_chat?.username === channelUsername;

        return isSenderChat;
    }
}