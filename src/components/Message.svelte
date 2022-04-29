<script>
	import { hasLobby } from '../stores/lobbyStore';
	import { get } from 'svelte/store';
	import Comment from './Comment.svelte';
	import moment from 'moment';

	export let comments, message, isLoading;

	let messageID = message.id;
	let hint = message.attributes.hint;
	const userHasLobby = get(hasLobby);

	let filteredComments = comments.data.filter(
		(comment) => comment.attributes.message_id == messageID
	);
</script>

<div class="p-4 shadow-md rounded-lg mb-5">
	<div class="flex justify-between items-center mb-1.5">
		<p>{message.attributes.message}</p>
		{#if userHasLobby}
			<button on:click>
				<i class="far fa-fw {isLoading ? 'fa-spin fa-spinner' : 'fa-times'}" />
			</button>
		{/if}
	</div>
	{#if hint}
		<p class="text-xs text-yellow-600 mb-2">
			<span class="font-bold">Hint:</span>
			{message.attributes.hint}
		</p>
	{/if}
	<p class="text-xs text-gray-500">{moment(message.attributes.createdAt).fromNow()}</p>
	<Comment {messageID} {filteredComments} />
</div>
