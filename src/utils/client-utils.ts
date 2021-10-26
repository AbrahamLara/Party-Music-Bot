import { Client } from 'discord.js';

let globalClient: Client;

/**
 * Sets the provided client to a global variable that can later used in other commands.
 */
export function setClient(client: Client) {
  globalClient = client;
}

/**
 * Returns the global discord client.
 */
export function getClient() {
  return globalClient;
}
