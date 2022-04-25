<script>
	import SocMedButton from './SocMedButton.svelte';
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
		<li>
			<SocMedButton
				text="Share to WhatsApp Status"
				icon="whatsapp"
				background="bg-green-500"
				url="whatsapp://send?text=Share%20feedback%20about%20{username}%20anonymously.%20{username}%20will%20never%20know%20who%20sent%20the%20message.%0Ahttps://isimsiz.vercel.app/lobby/{lobbyID}"
			/>
		</li>
		<li>
			<SocMedButton
				text="Share as Facebook's Feed"
				icon="facebook"
				background="bg-blue-500"
				url="https://www.facebook.com/sharer/sharer.php?u=https://isimsiz.vercel.app/lobby/{lobbyID}"
			/>
		</li>
		<li>
			<SocMedButton
				text="Share as Twitter's Tweet"
				icon="twitter"
				background="bg-cyan-500"
				url="https://twitter.com/intent/tweet?text=Share%20feedback%20about%20{username}%20anonymously.%20{username}%20will%20never%20know%20who%20sent%20the%20message.%0Ahttps://isimsiz.vercel.app/lobby/{lobbyID}"
			/>
		</li>
		<li>
			<SocMedButton
				text="Share to Messanger"
				icon="facebook-messenger"
				background="bg-blue-700"
				url="fb-messenger://share?link=https://isimsiz.vercel.app/lobby/{lobbyID}"
			/>
		</li>
	</ul>
</div>

{#if hasCopied}
	<Toast text="Your lobby's url has been copied to clipboard." />
{/if}
