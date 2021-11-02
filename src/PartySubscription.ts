import {
  AudioPlayerStatus,
  createAudioPlayer,
  VoiceConnection,
} from '@discordjs/voice';
import PartyTrack from './PartyTrack';

/**
 * This class handles a subscription to an audio player for a given voice connection so that the bot can stream audio
 * in multiple channels.
 */
export default class PartySubscription {
  /**
   * The audio player a voice connection is subscribed to in order to play audio through the bot.
   */
  audioPlayer = createAudioPlayer();

  /**
   * This queue holds the audio tracks for the party to play audio from.
   */
  private audioTracks = new Set<PartyTrack>();

  /**
   * The voice connection that bot will stream audio through.
   */
  private voiceConnection: VoiceConnection;

  /**
   * Determines if we should prevent the processing a newly added track. This is so that adding multiple tracks at a
   * given time allows for safe access to the tracks set.
   */
  private lockTrackProcessing = false;

  constructor(voiceConnection: VoiceConnection) {
    this.voiceConnection = voiceConnection;

    this.audioPlayer.on('stateChange', (prevState, newState) => {
      // If the audio player was not previously in an idle state and has entered it in the new state, it means the
      // audio track has finished playing.
      if (
        prevState.status !== AudioPlayerStatus.Idle &&
        newState.status === AudioPlayerStatus.Idle
      ) {
        this.processTrack();
      } else if (newState.status === AudioPlayerStatus.Playing) {
        // Let the channel know that a track has started playing.
      }
    });
    // Have the voice connection subscribe to the audio player to begin streaming audio.
    voiceConnection.subscribe(this.audioPlayer);
  }

  /**
   * Adds a track to the audio set and begins to process it.
   *
   * @param track The audio track to add.
   */
  addTrack(track: PartyTrack) {
    this.audioTracks.add(track);
    this.processTrack();
  }

  /**
   * Clears all the tracks in the audio set and stops the current track.
   */
  clearTracks() {
    this.lockTrackProcessing = false;
    this.audioTracks.clear();
    this.audioPlayer.stop(true);
  }

  /**
   * Attempts to precess the audio track to begin streaming through the bot.
   */
  private async processTrack() {
    // If track processing has been locked, the audio player is idle, or there are no tracks in the set, do nothing.
    if (
      this.lockTrackProcessing ||
      this.audioPlayer.state.status !== AudioPlayerStatus.Idle ||
      !this.audioTracks.size
    ) {
      return;
    }

    // Prevent processing of tracks until this process has finished.
    this.lockTrackProcessing = true;

    // Get the current track track to play and remove it from the set.
    const nextTrack = this.audioTracks.values().next().value;
    this.audioTracks.delete(nextTrack);

    try {
      // Get the track's audio resource and start playing it.
      const resource = await nextTrack.getAudioResource();
      this.audioPlayer.play(resource);
      // Unlock track processing since this process has finished.
      this.lockTrackProcessing = false;
    } catch (error) {
      // Unlock track processing since this process has finished.
      this.lockTrackProcessing = false;
      // Process the next track on the list.
      this.processTrack();
    }
  }
}
