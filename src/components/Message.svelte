<script>
	import Comment from './Comment.svelte';

	export let message;
	export let comments;

	let messageID = message.id;
	let hint = message.attributes.hint;
</script>

<div class="p-4 shadow-md rounded-lg mb-5">
	<div class="flex justify-between items-center mb-1">
		<p>{message.attributes.message}</p>
		<button>
			<i class="far fa-fw fa-times" />
		</button>
	</div>
	{#if hint}
		<p class="text-xs text-yellow-600">Hint: {message.attributes.hint}</p>
	{/if}
	<Comment {messageID} {comments} />
</div>
