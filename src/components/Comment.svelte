<script>
	import { API_TOKEN, API_URL } from '../config';

	export let messageID;
	export let filteredComments;

	let comment,
		isNull = true,
		isLoading = false;

	let loadedComments = filteredComments;

	const getComments = async () => {
		const response = await fetch(`${API_URL}/comments`, {
			headers: {
				Authorization: `Bearer ${API_TOKEN}`
			}
		});
		const comments = await response.json();
		loadedComments = comments.data.filter((comment) => comment.attributes.message_id == messageID);
	};

	const sendComment = async () => {
		if (comment) {
			try {
				isLoading = true;
				await fetch(`${API_URL}/comments`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${API_TOKEN}`,
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
				isLoading = false;
				getComments();
			}
		} else {
			comment = '';
		}
	};

	$: comment ? (isNull = false) : (isNull = true);
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
			class={isNull ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}
		>
			<i
				class="fas fa-fw {isLoading
					? 'fa-spin fa-spinner'
					: 'fa-paper-plane'} text-xl text-gray-400"
			/>
		</button>
	</div>
</form>
<div class="mt-4">
	{#each loadedComments as comment}
		<p class="bg-gray-300 px-4 py-2 rounded-lg mb-2.5 text-gray-500">
			{comment.attributes.comment}
		</p>
	{/each}
</div>
