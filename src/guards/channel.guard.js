import config from '../config/config.js';

export default class ChannelGuard {
    static isOwnChannelMessage(ctx) {
        const msg = ctx?.update?.message;

        const channelUsername = config.subscriptionChannel.startsWith('@')
            ? config.subscriptionChannel.slice(1)
            : config.subscriptionChannel;

        const isSenderChat = msg?.sender_chat?.username === channelUsername;
        const isForwardFromChat = msg?.forward_from_chat?.username === channelUsername;
        const isForwardOrigin = msg?.forward_origin?.chat?.username === channelUsername;
        const isReplySenderChat = msg?.reply_to_message?.sender_chat?.username === channelUsername;

        return isSenderChat || isForwardFromChat || isForwardOrigin || isReplySenderChat;
    }
}