<script>
	import Toast from './Toast.svelte';

	export let lobbyID, username;
	let urlText,
		hasCopied = false;

	const copyURL = () => {
		navigator.clipboard.writeText(urlText);
		hasCopied = true;
		setTimeout(() => {
			hasCopied = false;
		}, 3000);
	};
</script>

<div>
	<h1 class="text-2xl font-bold mb-5">Make this your social media status.</h1>
	<div class="text-center">
		<p
			class="break-words bg-gray-200 p-4 rounded-lg mb-4"
			contenteditable="false"
			bind:textContent={urlText}
		>
			https://isimsiz.vercel.app/lobby/{lobbyID}
		</p>
		<button
			class="px-5 py-3 bg-transparent hover:bg-primary border border-primary text-black hover:text-white rounded-lg"
			on:click={copyURL}
		>
			<i class="far fa-clipboard mr-2" /> Copy this link
		</button>
	</div>
	<ul class="mt-6 text-white grid md:grid-cols-2 gap-3 mb-10">
		<li class="bg-green-500 p-3 rounded-lg">
			<a
				target="_blank"
				href="whatsapp://send?text=Share%20feedback%20about%20{username}%20anonymously.%20{username}%20will%20never%20know%20who%20sent%20the%20message.%20%F0%9F%98%8D%20*SECRET%20BOOK*%20%F0%9F%98%8D%20%20https://isimsiz.vercel.app/{lobbyID}"
				role="button"
				class="flex justify-center items-center"
			>
				<i class="fab fa-fw fa-whatsapp mr-2 text-2xl" />
				Share to WhatsApp Status
			</a>
		</li>
		<li class="instagram-button p-3 rounded-lg">
			<a target="_blank" href="/" role="button" class="flex justify-center items-center">
				<i class="fab fa-fw fa-instagram mr-2 text-2xl" />
				Add to Instagram Bio
			</a>
		</li>
		<li class="bg-cyan-400 p-3 rounded-lg">
			<a
				target="_blank"
				href="https://twitter.com/intent/tweet?text=Share%20feedback%20about%20{username}%20anonymously.%20{username}%20will%20never%20know%20who%20sent%20the%20message.%20%F0%9F%98%8D%20*SECRET%20BOOK*%20%F0%9F%98%8D%20%0Ahttps://isimsiz.vercel.app/{lobbyID}"
				role="button"
				class="flex justify-center items-center"
			>
				<i class="fab fa-fw fa-twitter mr-2 text-2xl" />
				Add into Twitter's tweet
			</a>
		</li>
		<li class="bg-blue-500 p-3 rounded-lg">
			<a
				target="_blank"
				href="fb-messenger://share?link=https://isimsiz.vercel.app/{lobbyID}"
				role="button"
				class="flex justify-center items-center"
			>
				<i class="fab fa-fw fa-facebook-messenger mr-2 text-2xl" />
				Share to Messenger
			</a>
		</li>
	</ul>
</div>

{#if hasCopied}
	<Toast text="Your lobby's url has been copied to clipboard." />
{/if}

<style>
	.instagram-button {
		background: radial-gradient(
			circle at 30% 107%,
			#fdf497 0%,
			#fdf497 5%,
			#fd5949 45%,
			#d6249f 60%,
			#285aeb 90%
		);
	}
</style>
