import 'dotenv/config';

function parseEnvArray(value) {
    if (!value) return [];
    return value.split(',').map(v => v.trim());
}

function parseEnvBoolean(value, defaultValue = true) {
    if (value === undefined) return defaultValue;
    return value.toLowerCase() === 'true';
}

export default {
    botToken: process.env.BOT_TOKEN,
    subscriptionChannel: process.env.MAIN_CHANNEL,
    whitelist: parseEnvArray(process.env.WHITELIST).map(Number),
    allowedChats: parseEnvArray(process.env.ALLOWED_CHATS),
    startMessage: process.env.START_MESSAGE,
    removeUnsubscribed: parseEnvBoolean(process.env.REMOVE_UNSUBSCRIBED, false),
};
