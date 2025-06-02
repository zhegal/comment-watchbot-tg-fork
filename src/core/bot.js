import { Telegraf } from 'telegraf';
import config from '../config/config.js';
import StartHandler from '../handlers/start.handler.js';
import MessageHandler from '../handlers/message.handler.js';
import Logger from '../utils/logger.js';

export default class BotApp {
    constructor() {
        this.bot = new Telegraf(config.botToken);
    }

    run() {
        new StartHandler(this.bot, config.startMessage).register();
        new MessageHandler(this.bot, config.whitelist).register();

        this.bot.launch()
            .then(() => Logger.log("Bot started successfully"))
            .catch(Logger.error);
    }
}