// TODO: Switch from json config to env variables.
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * Discord bot token.
       */
      BOT_TOKEN: string;
    }
  }
}
