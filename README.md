# Telegram Channel Comments Moderation Bot (Refactor)

> This is a **fork and full refactor** of [ZAZiOs/comment-watchbot-tg](https://github.com/ZAZiOs/comment-watchbot-tg) project.  
> The original project author is [ZAZiOs](https://github.com/ZAZiOs).  
> Current version completely reworks the architecture for better extensibility, modularity, and production use.

---

## ✨ Key Features

- Fully modular architecture using ESModules.
- Restricts bot operation to selected chats only.
- Whitelist support.
- Administrator bypass.
- Subscription checking for channel comments.
- Optional removal of messages from unsubscribed users.
- Full control over moderation logic.
- Clean separation of services, guards, handlers, and configuration.

---

## Requirements

- Node.js >= 18
- npm

---

## Setup

### Manual

1. Clone the repository:

```bash
git clone https://github.com/zhegal/comment-watchbot-tg-fork
cd comment-watchbot-tg-fork
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
BOT_TOKEN=your-telegram-bot-token
WHITELIST=123456789,987654321
ALLOWED_CHATS=-1001234567890,-1009876543210
MAIN_CHANNEL=@your_channel_username
REMOVE_UNSUBSCRIBED=false
```

---

### Docker

1. Clone the repository as above.

2. Either use `.env` file (recommended) or configure environment variables directly in your Docker Compose file.

3. Start docker:

```bash
docker compose up -d
```

or

```bash
docker-compose up -d
```

---

## Additional Configuration Options

### REMOVE_UNSUBSCRIBED (optional)

- Controls whether to automatically delete messages from users who are not subscribed to the channel.
- Possible values: `true` or `false`.
- **Default:** `false` — unsubscribed users will not be automatically removed, but will receive a warning message.
- If set to `true` — messages from unsubscribed users will be deleted silently.

---

## Behavior Summary

| Scenario | Behavior |
| -------- | -------- |
| `REMOVE_UNSUBSCRIBED` not set | Warning message shown |
| `REMOVE_UNSUBSCRIBED=false` | Warning message shown |
| `REMOVE_UNSUBSCRIBED=true` | Messages from unsubscribed users deleted |

---

## Running the Bot

### On Windows:

```bash
npm run win
```

### On Unix-based systems:

```bash
npm run unix
```

### Development mode:

```bash
npm start
```

> As [`nodemon`](https://github.com/remy/nodemon) is included, files are automatically watched and restarts handled.

---

## License

This project remains under the MIT License, same as the original.

- Original repository: [ZAZiOs/comment-watchbot-tg](https://github.com/ZAZiOs/comment-watchbot-tg)

---

## Acknowledgements

- Thanks to [ZAZiOs](https://github.com/ZAZiOs) for the original project idea.
