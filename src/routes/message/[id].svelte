<script context="module">
	import { API_TOKEN, API_URL } from '../../config';
	export async function load({ params }) {
		let lobbyID = params.id;
		const headers = {
			Authorization: `Bearer ${API_TOKEN}`
		};
		try {
			const [messages, comments, lobbies] = await Promise.all([
				fetch(`${API_URL}/messages`, { headers }).then((res) => res.json()),
				fetch(`${API_URL}/comments`, { headers }).then((res) => res.json()),
				fetch(`${API_URL}/lobbies`, { headers }).then((res) => res.json())
			]);
			return { props: { lobbyID, lobbies, messages, comments } };
		} catch (error) {
			console.log(error.message);
		}
	}
</script>

<script>
	import { MetaTags } from 'svelte-meta-tags';
	import Container from '../../components/Container.svelte';
	import Message from '../../components/Message.svelte';
	import { hasLobby } from '../../stores/lobbyStore';
	import { get } from 'svelte/store';

	export let lobbyID, lobbies, messages, comments;

	let filteredMessages = messages.data
		.reverse()
		.filter((message) => message.attributes.lobby_id == lobbyID);

	let filteredLobby = lobbies.data
		.reverse()
		.filter((lobby) => lobby.attributes.lobby_id == lobbyID);

	const lobby = filteredLobby[0];
	let username = lobby.attributes.username;
	let userHasLobby = get(hasLobby);

	const getNewMessages = async () => {
		const response = await fetch(`${API_URL}/messages`, {
			headers: {
				Authorization: `Bearer ${API_TOKEN}`
			}
		});
		const messages = await response.json();
		filteredMessages = messages.data
			.reverse()
			.filter((message) => message.attributes.lobby_id == lobbyID);
	};

	let isLoading = false;

	const deleteMessage = async (messageID) => {
		try {
			isLoading = true;
			await fetch(`${API_URL}/messages/${messageID}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${API_TOKEN}`
				}
			});
			const selectedComments = await comments.data.filter(
				(comment) => comment.attributes.message_id == messageID
			);
			selectedComments.forEach(async (comment) => {
				let commentID = await comment.id;
				await fetch(`${API_URL}/comments/${commentID}`, {
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${API_TOKEN}`
					}
				});
			});
		} catch (error) {
			console.log(error.message);
		} finally {
			isLoading = false;
			getNewMessages();
		}
	};
</script>

<MetaTags title="{userHasLobby ? 'My' : `${username}'s`} messages | Isimsiz" />

<section class="pt-24 pb-10">
	<Container classes="max-w-2xl">
		<a href="/lobby/{lobbyID}" class="inline-block mb-6 text-gray-500"
			><i class="far fa-arrow-left mr-2" /> Back to {userHasLobby ? 'My' : `${username}'s`} lobby</a
		>
		<h2 class="text-xl font-bold border-b-2 border-gray-200 pb-3 mb-3">
			{userHasLobby ? 'My' : `${username}'s`} Messages
		</h2>
		<div>
			{#if filteredMessages.length > 0}
				{#each filteredMessages as message}
					<Message {message} {comments} {isLoading} on:click={() => deleteMessage(message.id)} />
				{/each}
			{:else}
				<p>No messages yet...</p>
			{/if}
		</div>
	</Container>
</section>
