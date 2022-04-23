<script>
	export let messageID, comments;

	let comment;
	let hasNull = false;

	let filteredComments = comments.data.filter(
		(comment) => comment.attributes.message_id == messageID
	);

	const getComments = async () => {
		const response = await fetch(`http://localhost:1337/api/comments`);
		const comments = await response.json();
		filteredComments = await comments.data.filter(
			(comment) => comment.attributes.message_id == messageID
		);
	};

	const sendComment = async () => {
		if (comment) {
			try {
				await fetch(`http://localhost:1337/api/comments`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						data: {
							comment,
							message_id: messageID
						}
					})
				});
			} catch (error) {
				console.log(error.message);
			} finally {
				comment = '';
				getComments();
			}
		} else {
			comment = '';
		}
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
			<i class="fas fa-fw fa-paper-plane text-xl text-gray-400" />
		</button>
	</div>
</form>
<div class="mt-4">
	{#each filteredComments as comment}
		<p class="bg-gray-300 px-4 py-2 rounded-lg mb-2.5 text-gray-500">
			{comment.attributes.comment}
		</p>
	{/each}
</div>
