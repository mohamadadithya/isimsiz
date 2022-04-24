<script>
	import { hasLobby } from '../stores/lobbyStore';
	import { get } from 'svelte/store';
	import Comment from './Comment.svelte';

	export let comments;
	export let message;

	let messageID = message.id;
	let hint = message.attributes.hint;
	const userHasLobby = get(hasLobby);

	let filteredComments = $comments.filter((comment) => comment.attributes.message_id == messageID);

	const deleteMessage = async () => {
		try {
			const request = await fetch(`http://localhost:1337/api/messages/${messageID}`, {
				method: 'DELETE'
			});
			const response = await request.json();
			console.log(response);
		} catch (error) {
			console.log(error.message);
		}
	};
</script>

<div class="p-4 shadow-md rounded-lg mb-5">
	<div class="flex justify-between items-center mb-1">
		<p>{message.attributes.message}</p>
		{#if userHasLobby}
			<button on:click={deleteMessage}>
				<i class="far fa-fw fa-times" />
			</button>
		{/if}
	</div>
	{#if hint}
		<p class="text-xs text-yellow-600">Hint: {message.attributes.hint}</p>
	{/if}
	<Comment {messageID} {filteredComments} />
</div>
