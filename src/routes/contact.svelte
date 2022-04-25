<script>
	import Container from '../components/Container.svelte';
	import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags title="Contact | Isimsiz" />

<section class="pt-24 pb-10">
	<Container classes="max-w-2xl">
		<h1 class="text-2xl font-bold mb-5 pb-2 border-b-2 border-gray-300">Contact</h1>
		<form>
			<div class="mb-4">
				<label for="username">Full Name</label>
				<input
					type="text"
					class="block outline-none px-3 py-2 mt-2 w-full border border-gray-300 rounded-lg"
					id="username"
					placeholder="Enter your name"
				/>
			</div>
			<div class="mb-3">
				<label for="message">Message</label>
				<textarea
					class="block outline-none p-3 w-full mt-2 border border-gray-300 rounded-lg"
					name="message"
					id="message"
					cols="30"
					rows="10"
					placeholder="Enter your message"
				/>
			</div>
			<button type="submit" class="bg-primary text-white px-3 py-2 rounded-lg"
				><i class="far fa-fw fa-paper-plane mr-1" /> Send</button
			>
		</form>
	</Container>
</section>
