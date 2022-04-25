<script>
	import Toast from './Toast.svelte';

	export let username, lobbyID;

	let message,
		hint,
		hasNull = false,
		hasSent = false;

	const sendMessage = async () => {
		if (message) {
			try {
				await fetch(`http://localhost:1337/api/messages`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						data: {
							message,
							hint,
							lobby_id: lobbyID
						}
					})
				});
				message = '';
				hint = '';
			} catch (error) {
				console.log(`Sorry, your message hasn't sent, something went wrong.`);
			} finally {
				hasSent = true;
				setTimeout(() => {
					hasSent = false;
				}, 3000);
			}
		} else {
			message = '';
		}
	};

	$: message ? (hasNull = false) : (hasNull = true);
</script>

<div>
	<h1 class="text-2xl font-bold mb-1">Send secret message to {username}</h1>
	<p class="text-gray-500 mb-5">{username} will never know who sent this message.</p>
	<form class="mb-10" on:submit|preventDefault={sendMessage}>
		<textarea
			class="border border-gray-300 rounded-lg p-4 w-full mb-2 h-32 outline-none"
			name="message"
			id="message"
			placeholder="Write a message"
			bind:value={message}
		/>
		<input
			type="text"
			class="border border-gray-300 rounded-lg px-4 py-2.5 w-full outline-none mb-3"
			placeholder="Write a short hint of who you're (optional)"
			bind:value={hint}
		/>
		<button
			class="bg-primary {hasNull
				? 'opacity-80 disabled:cursor-not-allowed'
				: 'opacity-100'} w-full py-2 rounded-lg text-white"
			type="submit"
			disabled={hasNull}>Send</button
		>
	</form>
</div>
{#if hasSent}
	<Toast text="Your message has been sent to {username}" />
{/if}
