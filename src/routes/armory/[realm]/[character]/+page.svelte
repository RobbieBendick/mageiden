<script lang="ts">
	import EquipmentDisplay from '$lib/components/EquipmentDisplay.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const character = $derived(data.character);
</script>

<svelte:head>
	<title>
		{character ? `${character.name} · Armory` : 'Armory'} · Mageiden
	</title>
</svelte:head>

<main class="armory">
	<a href="/armory" class="back-link">← Armory</a>

	{#if !data.configured}
		<div class="notice notice--warn">
			<p>Add your Blizzard API credentials to <code>.env</code> to enable lookups.</p>
		</div>
	{:else if character}
		<EquipmentDisplay {character} />
	{/if}
</main>

<style>
	.armory {
		width: min(62rem, 100% - 3rem);
		margin: 0 auto;
		padding: 4rem 0 6rem;
	}

	.back-link {
		font-size: 0.875rem;
		color: #7a7589;
		text-decoration: none;
	}

	.back-link:hover {
		color: var(--purple-light);
	}

	.notice {
		margin-top: 2rem;
		padding: 1.25rem 1.5rem;
		border-radius: 0.75rem;
		color: #fcd34d;
		background: rgba(252, 211, 77, 0.08);
		border: 1px solid rgba(252, 211, 77, 0.2);
	}

	code {
		font-family: ui-monospace, monospace;
	}
</style>
