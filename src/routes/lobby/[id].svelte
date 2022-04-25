<script context="module">
	import { API_TOKEN } from '../../config';
	export async function load({ params }) {
		const lobbyID = params.id;
		try {
			const response = await fetch(`http://localhost:1337/api/lobbies`, {
				headers: {
					Authorization: `Bearer ${API_TOKEN}`
				}
			});
			const lobbies = await response.json();
			return { props: { lobbyID, lobbies } };
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

	export let lobbyID, lobbies;

	let userHasLobby = get(hasLobby);

	const lobby = lobbies.data.find((lobby) => lobby.attributes.lobby_id == lobbyID);
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
		<a
			href="/message/{lobbyID}"
			class="w-full block py-3 bg-transparent hover:bg-primary border border-primary text-black hover:text-white rounded-lg text-center"
			role="button"
			><i class="far fa-fw fa-envelope mr-1.5" /> See {userHasLobby ? 'my' : `${username}'s`} messages</a
		>
	</Container>
</section>
