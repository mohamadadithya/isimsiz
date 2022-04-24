import { writable } from "svelte-local-storage-store";

export let lobbyIDStore = writable('lobbyID', null),
            hasLobby = writable('hasLobby', false)