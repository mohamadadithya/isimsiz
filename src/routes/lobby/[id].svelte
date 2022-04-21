<script context="module">
	export async function load({ params }) {
		const lobbyID = params.id;
		return { props: { lobbyID } };
	}
</script>

<script>
	export let lobbyID;
	console.log(lobbyID);
</script>
