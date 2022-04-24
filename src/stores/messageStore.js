import { writable } from "svelte/store";

export let comments = writable([]);

const getComments = async () => {
    const response = await fetch(`http://localhost:1337/api/comments`);
    const loadedComments = await response.json();
    comments.set(loadedComments.data);
}

getComments();