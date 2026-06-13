<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Syne:wght@600;700;800&display=swap"
		rel="stylesheet"
	/>
	<title>Mageiden · 20x Rank 1 Arena Mage</title>
</svelte:head>

{@render children()}

<style>
	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(:root) {
		--purple: #a78bfa;
		--purple-light: #c4b5fd;
		--purple-pale: #e9d5ff;
		--purple-muted: rgba(124, 58, 237, 0.12);
		--purple-border: rgba(167, 139, 250, 0.28);
		--purple-glow: rgba(124, 58, 237, 0.25);
		--mage: #3fc7eb;
		--mage-light: #9ee5f7;
		--mage-muted: rgba(63, 199, 235, 0.12);
	}

	:global(body) {
		font-family: 'DM Sans', system-ui, sans-serif;
		background: #050508;
		color: #eceaf4;
		min-height: 100vh;
		-webkit-font-smoothing: antialiased;
	}
</style>
