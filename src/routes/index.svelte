<script>
	import { MetaTags } from 'svelte-meta-tags';
	import Container from '../components/Container.svelte';
	import Navbar from '../components/Navbar.svelte';
</script>

<MetaTags
	title="Isimsiz"
	description="Isimsiz is a secret message book. Get anonymous message or feedback from your friends."
/>

<Container classes="grid place-content-center h-screen">
	<Navbar />
</Container>
