import Logger from '../utils/logger.js';

export default class ModerationService {
    constructor(ctx) {
        this.ctx = ctx;
    }

    async handleLeftOrNoReply() {
        const msg = this.ctx?.update?.message;
        if (msg?.left_chat_member || !msg?.reply_to_message) {
            await this.ctx.deleteMessage(msg?.message_id).catch(Logger.error);
        }
    }

    async handleNewMembers() {
        const newMembers = this.ctx?.update?.message?.new_chat_members;

        for (let member of newMembers) {
            if (this.ctx.botInfo.id === member.id) continue;
            await this.ctx.banChatMember(member.id).catch(Logger.error);
            await this.ctx.unbanChatMember(member.id).catch(Logger.error);
        }
    }
}