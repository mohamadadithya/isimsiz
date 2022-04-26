<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				status
			}
		};
	}
</script>

<script>
	import Error from '../components/Error.svelte';

	export let status;
</script>

<section class="grid place-items-center h-screen">
	{#if status == 500}
		<Error errorTitle="Something went wrong..." errorMessage="Lobby not found" />
	{:else}
		<Error errorTitle="Something went wrong..." errorMessage="Page not found" />
	{/if}
</section>
