# Telegram Channel-Assigned Chat Kicker

This bot automatically kicks users who join the chat, allowing them to only leave comments in reply to channel posts.

## Requirements

- Node.js
- npm

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/ZAZiOs/comment-watchbot-tg
    cd comment-watchbot-tg
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your bot token:
    ```env
    BOT_TOKEN=your-telegram-bot-token
    ```

## Running the Bot

- On Windows:
    ```sh
    npm run win
    ```

- On Unix-based systems:
    ```sh
    npm run unix
    ```

- For debugging:
    ```sh
    npm start
    ```

## License

This project is licensed under the MIT License.
