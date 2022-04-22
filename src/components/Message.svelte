<script>
	import { lobbyIDStore } from '../stores/lobbyStore';
	import { get } from 'svelte/store';
	import Comment from './Comment.svelte';

	export let message = `What's your favorite color?`;

	const LOBBY_ID = get(lobbyIDStore);
</script>

<div class="p-4 shadow-md rounded-lg mb-5">
	<div class="flex justify-between items-center">
		<p>{message}</p>
		<button>
			<i class="far fa-fw fa-times" />
		</button>
	</div>
	<Comment {LOBBY_ID} />
	<p class="bg-gray-300 px-4 py-2 rounded-lg mb-2 mt-4 text-gray-500">Black</p>
</div>
