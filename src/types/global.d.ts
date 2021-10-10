// TODO: Switch from json config to env variables.
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * Discord bot token.
       */
      BOT_TOKEN: string;

      /**
       * Discord application client id.
       */
      CLIENT_ID: string;

      /**
       * Discord server id.
       */
      GUILD_ID: string;
    }
  }
}
