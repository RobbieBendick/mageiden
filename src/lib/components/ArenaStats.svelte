<script lang="ts">
	import type { ArenaBracketStats, BracketKey } from '$lib/armory';

	let {
		brackets,
		noTopMargin = false
	}: {
		brackets: Partial<Record<BracketKey, ArenaBracketStats>>;
		noTopMargin?: boolean;
	} = $props();
	const order: BracketKey[] = ['2v2', '3v3', '5v5'];
	const labels: Record<BracketKey, string> = {
		'2v2': '2v2',
		'3v3': '3v3',
		'5v5': '5v5'
	};
</script>

<div class="arena-stats" class:arena-stats--flush={noTopMargin}>
	<div class="section-header">
		<p class="section-eyebrow">PvP</p>
		<h2 class="section-title">Arena ratings</h2>
	</div>

	<div class="arena-grid">
		{#each order as key}
			{@const data = brackets[key]}
			{@const rating = data?.rating ?? 0}
			{@const season = data?.season_match_statistics ?? { played: 0, won: 0, lost: 0 }}
			{@const weekly = data?.weekly_match_statistics ?? { played: 0, won: 0, lost: 0 }}
			<article class="arena-card">
				<p class="arena-bracket">{labels[key]}</p>
				<p class="arena-rating">{rating}</p>
				<p class="arena-record">
					Season:
					<span class="won">{season.won}</span>-<span class="lost">{season.lost}</span>
					{#if season.played > 0}
						<span class="played"> ({season.played} played)</span>
					{/if}
				</p>
				<p class="arena-record">
					Last week:
					<span class="won">{weekly.won}</span>-<span class="lost">{weekly.lost}</span>
				</p>
			</article>
		{/each}
	</div>
</div>

<style>
	.arena-stats--flush {
		margin-top: 0;
	}

	.section-header {
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

	.arena-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
	}

	.arena-card {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding: 2rem 1.5rem;
		background: rgba(12, 10, 20, 0.7);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 1rem;
		backdrop-filter: blur(12px);
		font-family: 'DM Sans', system-ui, sans-serif;
		transition:
			border-color 0.2s ease,
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.arena-card:hover {
		border-color: var(--purple-border);
		transform: translateY(-3px);
		box-shadow: 0 8px 40px var(--purple-glow);
	}

	.arena-bracket {
		font-size: 0.8125rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #7a7589;
	}

	.arena-rating {
		font-size: clamp(2rem, 5vw, 2.5rem);
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		letter-spacing: -0.02em;
		line-height: 1.1;
		margin: 0.25rem 0 0.5rem;
		color: #9b97ad;
	}

	.arena-record {
		font-size: 0.875rem;
		font-weight: 500;
		color: #9b97ad;
		line-height: 1.55;
	}

	.won {
		color: #4ade80;
	}

	.lost {
		color: #f87171;
	}

	.played {
		color: #7a7589;
	}

	@media (max-width: 768px) {
		.arena-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (min-width: 769px) and (max-width: 960px) {
		.arena-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
