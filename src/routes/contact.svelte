<script>
	import Container from '../components/Container.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import Toast from '../components/Toast.svelte';

	let username,
		email,
		message,
		isNull = true,
		hasSent = false;

	const contactSend = async () => {
		if (isNull) {
			(username = ''), (email = ''), (message = '');
		} else {
			try {
				await fetch(`http://localhost:1337/api/contacts`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						data: {
							username,
							email,
							message
						}
					})
				});
			} catch (error) {
				console.log(error.message);
			} finally {
				hasSent = true;
				setTimeout(() => {
					hasSent = false;
				}, 3000);
				(username = ''), (email = ''), (message = '');
			}
		}
	};

	$: username && email && message ? (isNull = false) : (isNull = true);
</script>

<MetaTags title="Contact | Isimsiz" />

<section class="pt-24 pb-10">
	<Container classes="max-w-2xl">
		<h1 class="text-2xl font-bold mb-5 pb-2 border-b-2 border-gray-300">Contact</h1>
		<form on:submit|preventDefault={contactSend}>
			<div class="grid md:grid-cols-2 gap-5 mb-5">
				<div>
					<label for="username">Full Name</label>
					<input
						type="text"
						class="block outline-none px-3 py-2 mt-2 w-full border border-gray-300 rounded-lg"
						id="username"
						placeholder="Enter your name"
						bind:value={username}
					/>
				</div>
				<div>
					<label for="email">Email</label>
					<input
						type="email"
						class="block outline-none px-3 py-2 mt-2 w-full border border-gray-300 rounded-lg"
						id="email"
						placeholder="Enter your email"
						bind:value={email}
					/>
				</div>
			</div>
			<div class="mb-3">
				<label for="message">Message</label>
				<textarea
					class="block outline-none p-3 w-full mt-2 border border-gray-300 rounded-lg"
					name="message"
					id="message"
					cols="30"
					rows="10"
					placeholder="Enter your message"
					bind:value={message}
				/>
			</div>
			<button
				type="submit"
				class="bg-primary text-white px-3 py-2 rounded-lg disabled:opacity-80 disabled:cursor-not-allowed"
				disabled={isNull}><i class="far fa-fw fa-paper-plane mr-1" /> Send</button
			>
		</form>
	</Container>
</section>
{#if hasSent}
	<Toast text="Your message has been sent to Developer, thanks!" />
{/if}
