<script context="module">
	export async function load({ params }) {
		const lobbyID = params.id;
		try {
			const [lobbies, messages, comments] = await Promise.all([
				fetch(`http://localhost:1337/api/lobbies`).then((res) => res.json()),
				fetch(`http://localhost:1337/api/messages`).then((res) => res.json()),
				fetch(`http://localhost:1337/api/comments`).then((res) => res.json())
			]);
			return { props: { lobbyID, lobbies, messages, comments } };
		} catch (error) {
			console.log(error.message);
		}
	}
</script>

<script>
	import Container from '../../components/Container.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import Share from '../../components/Share.svelte';
	import { get } from 'svelte/store';
	import { hasLobby } from '../../stores/lobbyStore';
	import MessageForm from '../../components/MessageForm.svelte';
	import Message from './../../components/Message.svelte';

	export let lobbyID, lobbies, messages, comments;

	let userHasLobby = get(hasLobby);

	let filteredLobby = lobbies.data.filter((lobby) => lobby.attributes.lobby_id == lobbyID);
	let filteredMessages = messages.data.filter((message) => message.attributes.lobby_id == lobbyID);
	const lobby = filteredLobby[0];
	let username = lobby.attributes.username;
</script>

<MetaTags title="{username}'s lobby | Isimsiz" />

<section class="pt-24 pb-10">
	<Container classes="max-w-2xl">
		{#if userHasLobby}
			<Share {username} {lobbyID} />
		{:else}
			<MessageForm {username} {lobbyID} />
		{/if}
		<h2 class="text-xl font-bold border-b-2 border-gray-200 pb-3 mb-3">
			{userHasLobby ? 'My' : `${username}'s`} Messages
		</h2>
		<button type="button" class="w-full py-3 bg-primary text-white rounded-lg mb-4"
			><i class="far fa-fw fa-sync mr-2" /> Load New Messages</button
		>
		<div>
			<!-- <p>No messages yet...</p> -->
			{#each filteredMessages as message}
				<Message {message} {comments} />
			{/each}
		</div>
	</Container>
</section>
