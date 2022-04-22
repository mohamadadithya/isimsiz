<script>
	export let LOBBY_ID;

	let comment;
	let hasNull = false;

	const sendComment = async () => {
		comment = '';
	};

	$: comment ? (hasNull = false) : (hasNull = true);
</script>

<form class="mt-6" on:submit|preventDefault={sendComment}>
	<div class="border px-4 py-3 border-gray-300 rounded-lg flex justify-between items-center">
		<input
			type="text"
			class="w-full outline-none mr-3"
			name="comment"
			id="comment"
			placeholder="Write a comment"
			autocomplete="off"
			bind:value={comment}
		/>
		<button
			type="submit"
			class={hasNull ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}
		>
			<i class="fas fa-fw fa-paper-plane text-xl text-gray-300" />
		</button>
	</div>
</form>
