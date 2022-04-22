<script context="module">
	import Message from './../../components/Message.svelte';
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

	export let lobbyID;
	let userHasLobby = get(hasLobby);

	let username = 'Joker';
</script>

<MetaTags title="{username}'s lobby | Isimsiz" />

<section class="pt-24 pb-10">
	<Container classes="max-w-2xl">
		{#if userHasLobby}
			<Share {lobbyID} />
		{:else}
			<h1 class="text-2xl font-bold mb-1">Send secret message to {username}</h1>
			<p class="text-gray-500 mb-5">{username} will never know who sent this message.</p>
			<form class="mb-10">
				<textarea
					class="border border-gray-300 rounded-lg p-4 w-full mb-2 h-32 outline-none"
					name="message"
					id="message"
					placeholder="Write a message"
				/>
				<button class="bg-primary w-full py-2 rounded-lg text-white" type="submit">Send</button>
			</form>
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
