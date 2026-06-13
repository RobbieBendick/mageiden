<script lang="ts">
	import TalentSpecTree from '$lib/components/TalentSpecTree.svelte';
	import type { ArmorySpecializations } from '$lib/armory';
	import {
		buildTalentNodesFromLayout,
		hasSecondaryLoadoutWithTalents,
		parseLoadouts,
		sortSpecs
	} from '$lib/talents';

	let {
		specializations,
		className
	}: {
		specializations: ArmorySpecializations;
		className: string;
	} = $props();

	const accentColor = 'rgba(167, 139, 250, 0.95)';
	const loadouts = $derived(parseLoadouts(specializations));
	const activeIndex = $derived(loadouts.findIndex((l) => l.is_active));
	const defaultLoadoutIndex = $derived(activeIndex >= 0 ? activeIndex : 0);

	let selectedLoadoutIndex = $state(0);

	$effect(() => {
		selectedLoadoutIndex = activeIndex >= 0 ? activeIndex : 0;
	});

	const activeLoadout = $derived(loadouts[selectedLoadoutIndex] ?? loadouts[0]);
	const apiSpecs = $derived((activeLoadout?.specializations ?? []) as Parameters<
		typeof sortSpecs
	>[1]);
	const sortedSpecs = $derived(sortSpecs(className, apiSpecs));
	const pointsStr = $derived(sortedSpecs.map((t) => t.spent_points ?? 0).join('/'));
	const showLoadoutSwitcher = $derived(
		hasSecondaryLoadoutWithTalents(loadouts, defaultLoadoutIndex)
	);

	const orderedLoadoutIndices = $derived(
		loadouts
			.map((_, i) => i)
			.sort(
				(i, j) =>
					(loadouts[i].is_active ? 0 : 1) - (loadouts[j].is_active ? 0 : 1)
			)
	);

	function loadoutLabel(idx: number): string {
		const loadout = loadouts[idx];
		if (loadout?.is_active) return 'Active';
		if (loadouts.length === 2) return 'Secondary';
		return `Loadout ${idx + 1}`;
	}
</script>

{#if !activeLoadout?.specializations?.length}
	<div class="talent-section-header">
		<p class="section-eyebrow">Build</p>
		<h2 class="section-title">Talents</h2>
	</div>
	<article class="talent-panel">
		<p class="talent-empty">Talent data not available.</p>
	</article>
{:else}
	<div class="talent-section-header">
		<p class="section-eyebrow">Build</p>
		<h2 class="section-title">Talents</h2>
	</div>

	<article class="talent-panel">
		<header class="talent-header">
			<div class="talent-header-left">
				<p class="talent-summary">
					<span class="card-tag">{className}</span>
					<span class="talent-points">{pointsStr}</span>
				</p>

				{#if showLoadoutSwitcher}
					<div class="loadout-switcher">
						{#each orderedLoadoutIndices as idx (idx)}
							<button
								type="button"
								class="loadout-btn"
								class:loadout-btn--active={selectedLoadoutIndex === idx}
								onclick={() => (selectedLoadoutIndex = idx)}
							>
								{loadoutLabel(idx)}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</header>

		<div class="talent-trees">
			{#each sortedSpecs as tree, i (tree.specialization_name ?? i)}
				<TalentSpecTree
					{tree}
					specIndex={i}
					specName={tree.specialization_name ?? 'Spec'}
					nodes={buildTalentNodesFromLayout(
						className,
						tree.specialization_name ?? 'Spec',
						tree.talents ?? []
					)}
					{accentColor}
					{className}
				/>
			{/each}
		</div>
	</article>
{/if}

<style>
	.talent-section-header {
		margin-bottom: 1.25rem;
	}

	.section-eyebrow {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--mage);
	}

	.section-title {
		margin-top: 0.5rem;
		font-family: 'Syne', sans-serif;
		font-size: clamp(1.5rem, 4vw, 2rem);
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.talent-panel {
		padding: 1.75rem;
		background: linear-gradient(145deg, rgba(20, 16, 32, 0.9), rgba(10, 8, 18, 0.95));
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 1rem;
		backdrop-filter: blur(12px);
		transition:
			border-color 0.25s ease,
			box-shadow 0.25s ease;
	}

	.talent-panel:hover {
		border-color: var(--purple-border);
		box-shadow: 0 8px 40px var(--purple-glow);
	}

	.talent-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 1.25rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.talent-header-left {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.talent-summary {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.card-tag {
		padding: 0.25rem 0.6rem;
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--purple-light);
		background: var(--purple-muted);
		border-radius: 0.25rem;
	}

	.talent-points {
		font-family: 'Syne', sans-serif;
		font-size: 0.9375rem;
		font-weight: 700;
		color: #9b97ad;
		letter-spacing: -0.02em;
	}

	.talent-empty {
		font-size: 0.875rem;
		color: #7a7589;
	}

	.loadout-switcher {
		display: inline-flex;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 0.625rem;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.04);
	}

	.loadout-btn {
		padding: 0.4rem 0.875rem;
		font-size: 0.8125rem;
		font-weight: 600;
		font-family: inherit;
		color: #eceaf4;
		background: transparent;
		border: none;
		border-right: 1px solid rgba(255, 255, 255, 0.15);
		cursor: pointer;
		transition:
			background 0.15s ease,
			color 0.15s ease;
	}

	.loadout-btn:last-child {
		border-right: none;
	}

	.loadout-btn:hover {
		background: var(--purple-muted);
	}

	.loadout-btn--active {
		background: linear-gradient(135deg, var(--purple-pale), var(--purple-light));
		color: #0c0a14;
	}

	.talent-trees {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}
</style>
