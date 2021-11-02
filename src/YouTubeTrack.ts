import { raw as ytdl } from 'youtube-dl-exec';
import {
  AudioResource,
  createAudioResource,
  demuxProbe,
} from '@discordjs/voice';
import PartyTrack from './PartyTrack';

export default class YouTubeTrack extends PartyTrack {
  /**
   * The youtube video url.
   */
  url: string;

  constructor(url: string) {
    super();

    this.url = url;
  }

  getAudioResource(): Promise<AudioResource<any>> {
    return new Promise((resolve, reject) => {
      // This function is running the youtube-dl cli underneath which then returns its child process.
      const process = ytdl(
        this.url,
        {
          o: '-',
          q: '',
          f: 'bestaudio[ext=webm+acodec=opus+asr=48000]/bestaudio',
          r: '100K',
        },
        { stdio: ['ignore', 'pipe', 'ignore'] },
      );
      // Throw an error if there is no standard output stream;
      if (!process.stdout) {
        reject(new Error('No stdout'));
        return;
      }
      const stream = process.stdout;
      const onError = (error: Error) => {
        console.log(error);
        if (!process.killed) process.kill();
        stream.resume();
        reject(error);
      };
      // Once the child process has spawned, resolve the promise with the created audio source from the given readable
      // stream.
      process
        .once('spawn', () => {
          demuxProbe(stream)
            .then(probe => {
              resolve(
                createAudioResource(probe.stream, {
                  inputType: probe.type,
                }),
              );
            })
            .catch(onError);
        })
        .catch(onError);
    });
  }
}
