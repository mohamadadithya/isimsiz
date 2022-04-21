<script>
	import Container from './Container.svelte';

	let hasOpen = false;
</script>

<nav class="bg-white fixed top-0 w-full py-3">
	<Container classes="md:flex items-center justify-between">
		<header class="flex items-center justify-between">
			<a
				href="/"
				class="flex items-center font-bold text-2xl font-bebas-neue tracking-widest"
				aria-label="Isimsiz"
			>
				<img class="w-10 mr-2.5" src="/images/logo.webp" alt="Isimsiz" />
				Isimsiz
			</a>
			<button class="text-2xl md:hidden" on:click={() => (hasOpen = !hasOpen)}>
				<i class="far fa-fw {hasOpen ? 'fa-times' : 'fa-bars'}" />
			</button>
		</header>
		<ul class="md:flex {hasOpen ? 'block' : 'hidden'} text-gray-500 pt-5 md:pt-0">
			<li class="py-2 md:mr-6">
				<a class="hover:text-black" href="/about">About</a>
			</li>
			<li class="py-2 md:mr-6">
				<a class="hover:text-black" href="/contact">Contact</a>
			</li>
			<li class="py-2">
				<a class="hover:text-black" href="/privacy-policy">Privacy Policy</a>
			</li>
		</ul>
	</Container>
</nav>
