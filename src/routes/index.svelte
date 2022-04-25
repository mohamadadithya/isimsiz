<script>
	import { hasLobby, lobbyIDStore } from './../stores/lobbyStore.js';
	import { MetaTags } from 'svelte-meta-tags';
	import Container from '../components/Container.svelte';
	import { nanoid } from 'nanoid';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';

	const LOBBY_ID = get(lobbyIDStore);
	const SLOGAN = 'Get anonymous message or feedback from your friends.';

	let username;
	let isNull = true;
	let lobbyID;

	if (LOBBY_ID) {
		goto(`/lobby/${LOBBY_ID}`);
	}

	const createPage = async () => {
		if (username) {
			lobbyID = nanoid();
			// Set data to lobbyStore
			lobbyIDStore.set(lobbyID);
			hasLobby.set(true);

			// Send data to API
			try {
				const request = await fetch(`http://localhost:1337/api/lobbies`, {
					method: 'POST',
					headers: {
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
				console.log(response);
			} catch (error) {
				console.log(error.message);
			} finally {
				console.log('Lobby created');
			}
			await goto(`/lobby/${lobbyID}`);
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

<section class="pt-24 md:pt-0 md:grid place-items-center h-screen">
	<Container classes="max-w-2xl">
		<div class="flex flex-col justify-center p-8 shadow-lg bg-slate-100 rounded-xl mb-8">
			<h1 class="text-4xl font-bold leading-relaxed mb-8">
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
					disabled={isNull}>Register</button
				>
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
	</Container>
</section>
