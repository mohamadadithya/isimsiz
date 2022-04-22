import { writable } from "svelte-local-storage-store";

export let lobbyIDStore = writable('lobbyID', null);
export let hasLobby = writable('hasLobby', false);