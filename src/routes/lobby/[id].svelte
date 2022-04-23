<script context="module">
	export async function load({ params }) {
		const lobbyID = params.id;
		return { props: { lobbyID } };
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

	export let lobbyID;
	let userHasLobby = get(hasLobby);
	let username = 'Joker';
</script>

<MetaTags title="{username}'s lobby | Isimsiz" />

<section class="pt-24 pb-10">
	<Container classes="max-w-2xl">
		{#if userHasLobby}
			<Share {username} {lobbyID} />
		{:else}
			<MessageForm {username} />
		{/if}
		<h2 class="text-xl font-bold border-b-2 border-gray-200 pb-3 mb-5">
			{userHasLobby ? 'My' : `${username}'s`} Messages
		</h2>
		<div>
			<!-- <p>No messages yet...</p> -->
			<Message />
		</div>
	</Container>
</section>
