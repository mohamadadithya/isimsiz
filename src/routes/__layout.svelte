<script>
	import Navbar from '../components/Navbar.svelte';
	import '../../static/css/tailwind.css';
</script>

<svelte:head>
	<link
		href="https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro@4cac1a6/css/all.css"
		rel="stylesheet"
		type="text/css"
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="font-plus-jakarta text-primary">
	<Navbar />
	<slot />
</main>
