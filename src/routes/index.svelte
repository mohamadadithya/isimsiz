<script>
	import Toast from './../components/Toast.svelte';
	import { hasLobby, lobbyIDStore } from './../stores/lobbyStore.js';
	import { MetaTags } from 'svelte-meta-tags';
	import Container from '../components/Container.svelte';
	import { nanoid } from 'nanoid';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { API_TOKEN, API_URL } from '../config.js';

	const LOBBY_ID = get(lobbyIDStore);
	const SLOGAN = 'Get anonymous message or feedback from your friends.';

	let username,
		isNull = true,
		hasError = false,
		isLoading = false,
		lobbyID;

	if (LOBBY_ID) {
		goto(`/lobby/${LOBBY_ID}`);
	}

	const createPage = async () => {
		if (username) {
			lobbyID = nanoid(9);
			// Send data to API
			try {
				isNull = true;
				isLoading = true;
				const request = await fetch(`${API_URL}/lobbies`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${API_TOKEN}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						data: {
							username,
							lobby_id: lobbyID
						}
					})
				});
				const response = await request.json();
				if (response.error) {
					hasError = true;
					setTimeout(() => {
						hasError = false;
					}, 3000);
					isNull = false;
				} else {
					lobbyIDStore.set(lobbyID);
					hasLobby.set(true);
					await goto(`/lobby/${lobbyID}`);
				}
				isLoading = false;
			} catch (error) {
				console.log(error.status);
			}
		} else {
			username = '';
		}
	};

	$: username ? (isNull = false) : (isNull = true);
</script>

<MetaTags
	title="Isimsiz"
	description="Isimsiz is a secret message book. Get anonymous message or feedback from your friends."
/>

<section class="pt-24 pb-20 md:pb-0 md:pt-0 md:grid place-items-center h-screen">
	<Container classes="max-w-2xl">
		<div class="flex flex-col justify-center p-8 shadow-lg bg-slate-100 rounded-xl mb-8">
			<h1 class="text-3xl md:text-4xl font-bold leading-relaxed mb-8">
				Get anonymous message or feedback from your friends.
			</h1>
			<form on:submit|preventDefault={createPage}>
				<input
					type="text"
					class="p-4 w-full border-2 mb-4 rounded-md border-primary outline-none"
					id="username"
					autocomplete="off"
					placeholder="Enter your name"
					bind:value={username}
				/>
				<button
					class="py-3 w-full bg-primary text-white rounded-md {isNull
						? 'opacity-80 disabled:cursor-not-allowed'
						: 'opacity-100'}"
					type="submit"
					disabled={isNull}
				>
					{#if isLoading}
						<i class="far fa-fw fa-spin fa-spinner" />
					{:else}
						Register
					{/if}
				</button>
			</form>
		</div>
		<div class="flex justify-center items-center flex-col">
			<h2 class="mb-6">Share this site to your friends</h2>
			<ul class="flex items-center">
				<li class="mr-5">
					<a
						target="_blank"
						href="https://www.facebook.com/sharer/sharer.php?u=https://isimsiz.vercel.app"
					>
						<img class="w-10" src="/images/facebook.svg" alt="Facebook" />
					</a>
				</li>
				<li class="mr-5">
					<a
						target="_blank"
						href="https://twitter.com/share?text={SLOGAN}&url=https://isimsiz.vercel.app"
					>
						<img class="w-10" src="/images/twitter.svg" alt="Twitter" />
					</a>
				</li>
				<li class="mr-5">
					<a
						target="_blank"
						href="whatsapp://send?text={SLOGAN}%0Ahttps://isimsiz.vercel.app"
						data-action="share/whatsapp/share"
					>
						<img class="w-10" src="/images/whatsapp.svg" alt="Whatsapp" />
					</a>
				</li>
			</ul>
		</div>
		<p class="text-center text-sm mt-8 text-gray-500">
			&copy; 2022 | Made with <i class="far fa-fw fa-heart" /> by
			<a href="https://www.m-adithya.my.id" class="font-bold">Mohamad Adithya</a>
		</p>
	</Container>
</section>
{#if hasError}
	<Toast text="This name already has a lobby, please enter another name or alias" />
{/if}
