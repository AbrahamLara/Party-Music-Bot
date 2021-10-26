import { AudioResource } from '@discordjs/voice';

/**
 * This abstract class will allow us to support multiple audio sources.
 */
export default abstract class PartyTrack {
  /**
   * Returns an audio resource for an audio player to subscribe to in order to play audio through a bot.
   */
  abstract getAudioResource(): Promise<AudioResource>;
}
