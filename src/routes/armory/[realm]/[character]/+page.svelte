<script lang="ts">
	import { base } from '$app/paths';
	import EquipmentDisplay from '$lib/components/EquipmentDisplay.svelte';
	import { pageTitle } from '$lib/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const character = $derived(data.character);
	const title = $derived(
		character ? pageTitle(character.name, 'Armory') : pageTitle('Armory')
	);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<main class="armory-page">
	<div class="page-glow page-glow--left"></div>
	<div class="page-glow page-glow--right"></div>
	<div class="page-grid"></div>
	<div class="page-noise"></div>

	<div class="container page-inner">
		<a href="{base}/" class="back-link">← Home</a>

		{#if !data.configured}
			<div class="notice notice--warn">
				<p>Add your Blizzard API credentials to <code>.env</code> to enable lookups.</p>
			</div>
		{:else if character}
			<EquipmentDisplay {character} />
		{/if}
	</div>
</main>

<style>
	.armory-page {
		position: relative;
		overflow: hidden;
		min-height: 100vh;
		padding: 5rem 0 6rem;
		background:
			radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124, 58, 237, 0.35), transparent),
			radial-gradient(ellipse 50% 40% at 90% 60%, var(--mage-muted), transparent),
			radial-gradient(ellipse 40% 35% at 5% 80%, var(--purple-muted), transparent),
			linear-gradient(180deg, #0c0a14 0%, #050508 100%);
	}

	.container {
		width: min(72rem, 100% - 3rem);
		margin-inline: auto;
	}

	.page-inner {
		position: relative;
	}

	.page-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
		background-size: 64px 64px;
		mask-image: radial-gradient(ellipse 80% 70% at 50% 20%, black, transparent);
		pointer-events: none;
	}

	.page-glow {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		pointer-events: none;
	}

	.page-glow--left {
		width: 28rem;
		height: 28rem;
		top: -4rem;
		left: -8rem;
		background: var(--purple-glow);
	}

	.page-glow--right {
		width: 22rem;
		height: 22rem;
		top: 30%;
		right: -6rem;
		background: var(--mage-muted);
	}

	.page-noise {
		position: absolute;
		inset: 0;
		opacity: 0.35;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
		pointer-events: none;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: #eceaf4;
		text-decoration: none;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 0.625rem;
		background: rgba(255, 255, 255, 0.04);
		backdrop-filter: blur(8px);
		transition:
			border-color 0.2s ease,
			background 0.2s ease,
			transform 0.2s ease;
	}

	.back-link:hover {
		border-color: var(--purple-border);
		background: var(--purple-muted);
		transform: translateY(-1px);
	}

	.notice {
		margin-top: 2rem;
		padding: 1.25rem 1.5rem;
		border-radius: 1rem;
		color: #fcd34d;
		background: rgba(252, 211, 77, 0.08);
		border: 1px solid rgba(252, 211, 77, 0.2);
		backdrop-filter: blur(12px);
	}

	code {
		font-family: ui-monospace, monospace;
	}

	@media (max-width: 720px) {
		.armory-page {
			padding: 4rem 0 5rem;
		}
	}
</style>
