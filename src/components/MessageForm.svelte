<script>
	export let username;

	let message;
	let hasNull = false;

	const sendMessage = async () => {
		console.log('Ok');
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
		<button
			class="bg-primary {hasNull
				? 'opacity-80 disabled:cursor-not-allowed'
				: 'opacity-100'} w-full py-2 rounded-lg text-white"
			type="submit"
			disabled={hasNull}>Send</button
		>
	</form>
</div>
