<script context="module">
	export function load({ status }) {
		return {
			props: {
				status
			}
		};
	}
</script>

<script>
	import Container from '../components/Container.svelte';
	import Error from '../components/Error.svelte';

	export let status;
</script>

<section class="grid place-items-center h-screen">
	<Container classes="text-center">
		<i class="fas fa-fw fa-exclamation-triangle text-6xl mb-6" />
		{#if status == 500}
			<Error errorTitle="Something went wrong..." errorMessage="Lobby not found" />
		{:else}
			<Error errorTitle="Something went wrong..." errorMessage="Page not found" />
		{/if}
	</Container>
</section>
