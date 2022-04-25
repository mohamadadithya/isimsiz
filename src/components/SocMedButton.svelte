<script>
	export let icon, background, url, text;
</script>

<a
	target="_blank"
	href={url}
	role="button"
	class="flex justify-center items-center {background} p-3 rounded-lg"
>
	<i class="fab fa-fw fa-{icon} mr-2 text-2xl" />
	{text}
</a>
