<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Armory · Mageiden</title>
</svelte:head>

<main class="armory">
	<a href="/" class="back-link">← Back</a>

	<header class="armory-header">
		<p class="eyebrow">TBC Anniversary</p>
		<h1>Armory</h1>
		<p class="subtitle">My mages on Anniversary realms.</p>
	</header>

	{#if !data.configured}
		<div class="notice notice--warn">
			<p>Add your Blizzard API credentials to <code>.env</code> to load armory data.</p>
		</div>
	{/if}

	<div class="mage-links">
		<a
			href={data.mages.alliance?.href ?? '/armory/alliance'}
			class="mage-link mage-link--alliance"
			class:mage-link--disabled={!data.mages.alliance}
		>
			<span class="mage-link-label">Alliance <span class="mage-word">Mage</span></span>
			{#if data.mages.alliance}
				<span class="mage-link-meta"
					>{data.mages.alliance.character} · {data.mages.alliance.realm}</span
				>
			{:else}
				<span class="mage-link-meta">Set ALLIANCE_MAGE_REALM and ALLIANCE_MAGE_NAME in .env</span>
			{/if}
		</a>

		<a
			href={data.mages.horde?.href ?? '/armory/horde'}
			class="mage-link mage-link--horde"
			class:mage-link--disabled={!data.mages.horde}
		>
			<span class="mage-link-label">Horde <span class="mage-word">Mage</span></span>
			{#if data.mages.horde}
				<span class="mage-link-meta">{data.mages.horde.character} · {data.mages.horde.realm}</span>
			{:else}
				<span class="mage-link-meta">Set HORDE_MAGE_REALM and HORDE_MAGE_NAME in .env</span>
			{/if}
		</a>
	</div>
</main>

<style>
	.armory {
		width: min(40rem, 100% - 3rem);
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

	.armory-header {
		margin-top: 2rem;
	}

	.eyebrow {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--mage);
	}

	h1 {
		margin-top: 0.75rem;
		font-family: 'Syne', sans-serif;
		font-size: clamp(2rem, 6vw, 3rem);
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.subtitle {
		margin-top: 0.5rem;
		color: #7a7589;
	}

	.mage-links {
		display: grid;
		gap: 1rem;
		margin-top: 2.5rem;
	}

	.mage-link {
		display: grid;
		gap: 0.35rem;
		padding: 1.5rem 1.75rem;
		text-decoration: none;
		border-radius: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: rgba(12, 10, 20, 0.7);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease,
			border-color 0.2s ease;
	}

	.mage-link:hover {
		transform: translateY(-2px);
	}

	.mage-link--alliance {
		border-color: rgba(0, 112, 221, 0.35);
	}

	.mage-link--alliance:hover {
		box-shadow: 0 8px 40px rgba(0, 112, 221, 0.15);
	}

	.mage-link--horde {
		border-color: rgba(196, 30, 58, 0.35);
	}

	.mage-link--horde:hover {
		box-shadow: 0 8px 40px rgba(196, 30, 58, 0.15);
	}

	.mage-link--disabled {
		opacity: 0.55;
		pointer-events: none;
	}

	.mage-link-label {
		font-family: 'Syne', sans-serif;
		font-size: 1.25rem;
		font-weight: 600;
		color: #eceaf4;
	}

	.mage-link-meta {
		font-size: 0.875rem;
		color: #7a7589;
	}

	:global(.mage-word) {
		color: var(--mage);
		font-weight: 600;
	}

	.notice {
		margin-top: 1.5rem;
		padding: 1.25rem 1.5rem;
		border-radius: 0.75rem;
		font-size: 0.9375rem;
		color: #fcd34d;
		background: rgba(252, 211, 77, 0.08);
		border: 1px solid rgba(252, 211, 77, 0.2);
	}

	code {
		font-family: ui-monospace, monospace;
	}
</style>
