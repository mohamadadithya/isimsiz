<script context="module">
	export async function load({ params }) {
		const lobbyID = params.id;
		return { props: { lobbyID } };
	}
</script>

<script>
	import { MetaTags } from 'svelte-meta-tags';

	export let lobbyID;
	let username = 'Joker';
</script>

<MetaTags title="{username}'s lobby | Isimsiz" />
