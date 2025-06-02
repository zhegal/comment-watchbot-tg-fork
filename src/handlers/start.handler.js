export default class StartHandler {
    constructor(bot, startMessage) {
        this.bot = bot;
        this.startMessage = startMessage;
    }

    register() {
        this.bot.start(this.onStart.bind(this));
    }

    async onStart(ctx) {
        if (ctx.message.chat.type != "private") return;
        return ctx.replyWithHTML(this.startMessage);
    }
}