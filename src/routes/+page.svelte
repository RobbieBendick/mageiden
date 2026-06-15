<script lang="ts">
	import { base } from '$app/paths';
	import { DEFAULT_TITLE } from '$lib/site';

	const DISCORD_URL = 'https://discord.gg/XuJXf37WvE';

	const stats = [
		{
			value: '20×',
			label: 'Rank 1 titles',
			hint: 'Multiple metas, same result',
			accent: 'var(--purple-light)'
		},
		{
			value: '500+',
			label: 'Clients coached',
			hint: 'Every bracket, every skill level',
			accent: 'var(--purple)'
		},
		{
			value: 'R1',
			label: 'Peak bracket',
			hint: 'Still competing at the top',
			accent: '#fcd34d'
		}
	];

	const achievements = [
		{
			tag: 'Ladder',
			metric: '3,200+',
			metricLabel: 'rating peak',
			title: 'Rank 1 cutoff season',
			description: 'Peak rating, bracket played, and where you landed when cutoffs dropped.',
			accent: 'var(--purple-light)',
			wide: true
		},
		{
			tag: 'Tournament',
			metric: '1st',
			metricLabel: 'finals',
			title: 'Bracket win',
			description: 'Scoreline, path through the bracket, and teams you ran through.',
			accent: '#fcd34d',
			wide: false
		},
		{
			tag: 'Coaching',
			metric: '0 → R1',
			metricLabel: 'client arc',
			title: 'Rating turnaround',
			description: 'Starting bracket, timeline, and the gap you closed together.',
			accent: '#4ade80',
			wide: false
		},
		{
			tag: 'Titles',
			metric: '20×',
			metricLabel: 'rank one',
			title: 'Stacked seasons',
			description: 'Expansions, patches, and metas where the title actually landed.',
			accent: 'var(--purple)',
			wide: true
		}
	];
</script>

<svelte:head>
	<title>{DEFAULT_TITLE}</title>
</svelte:head>

<main>
	<section class="hero">
		<div class="hero-glow hero-glow--left"></div>
		<div class="hero-glow hero-glow--right"></div>
		<div class="hero-grid"></div>

		<div class="container hero-inner">
			<div class="badge">
				<span class="badge-dot"></span>
				20× Rank 1
			</div>

			<h1>
				<span class="title-line">Not theory.</span>
				<span class="title-line title-line--accent">Rank 1 reps.</span>
			</h1>

			<p class="hero-copy">
				I've achieved R1 twenty times. I coach players at every skill level,
				level, from players new to arenas to teammates pushing for their own Rank 1. You know the
				LFG grind. Hours looking for the right partner, and most of the time they're not a good
				match anyway. 500+ clients in. Same effort, every session.
			</p>

			<div class="hero-actions">
				<a
					href={DISCORD_URL}
					class="cta cta--primary"
					target="_blank"
					rel="noopener noreferrer"
				>Work with me</a>
				<a href="{base}/armory/alliance" class="cta cta--ghost cta--alliance">Alliance Armory</a>
				<a href="{base}/armory/horde" class="cta cta--ghost cta--horde">Horde Armory</a>
				<span class="cta-note">Create a ticket order on Discord</span>
			</div>
		</div>
	</section>

	<section class="stats">
		<div class="container stats-wrap">
			<div class="stats-panel">
				{#each stats as stat, i}
					<article
						class="stat-cell"
						class:stat-cell--featured={i === 0}
						style="--accent: {stat.accent}; --delay: {i * 70}ms"
					>
						<div class="stat-cell-glow" aria-hidden="true"></div>
						<span class="stat-value">{stat.value}</span>
						<span class="stat-label">{stat.label}</span>
						<span class="stat-hint">{stat.hint}</span>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="achievements">
		<div class="achievements-noise"></div>
		<div class="container achievements-inner">
			<div class="section-header">
				<p class="section-eyebrow">Track record</p>
				<h2>Proof, not promises</h2>
				<p class="section-desc">
					Ratings climbed, brackets won, clients pushed — swap in your numbers and keep the
					layout.
				</p>
			</div>

			<div class="achievement-grid">
				{#each achievements as achievement, i}
					<article
						class="achievement-card"
						class:achievement-card--wide={achievement.wide}
						style="--accent: {achievement.accent}; --delay: {i * 80}ms"
					>
						<div class="card-sheen" aria-hidden="true"></div>
						<div class="card-body">
							<div class="card-meta">
								<span class="card-tag">{achievement.tag}</span>
								<span class="card-line" aria-hidden="true"></span>
							</div>
							<h3>{achievement.title}</h3>
							<p>{achievement.description}</p>
						</div>
						<div class="card-metric" aria-label="{achievement.metric} {achievement.metricLabel}">
							<span class="card-metric-value">{achievement.metric}</span>
							<span class="card-metric-label">{achievement.metricLabel}</span>
						</div>
					</article>
				{/each}
			</div>

			<div class="tournament-proof">
				<div class="tournament-header">
					<p class="section-eyebrow">Tournament wins</p>
					<h3>1st place on the biggest stage</h3>
					<p class="tournament-intro">
						Won with Super Frogs — beating Method Orange in the final and running through
						teams stacked with the most decorated names in arena.
					</p>
				</div>

				<figure class="tournament-figure">
					<img
						src="{base}/images/tournament-screenshot.png"
						alt="Tournament results — Super Frogs 1st place with Mageiden on the roster"
						width="960"
						height="540"
						loading="lazy"
					/>
					<figcaption>
						Competed with and against the best players in the game — Cdew, Snutz, Pikaboo,
						and the rest of the Method roster. Same lobbies, same pressure, same level of
						play you see at the top of the ladder.
					</figcaption>
				</figure>
			</div>
		</div>
	</section>

	<section class="footer-cta">
		<div class="footer-glow"></div>
		<div class="container footer-inner">
			<h2>Need a player that hits?</h2>
			<p>Hours in LFG looking for a partner, wrong fit most of the time. Arena coaching for any skill level. One message away on Discord.</p>
			<a
				href={DISCORD_URL}
				class="cta cta--ghost"
				target="_blank"
				rel="noopener noreferrer"
			>Join Discord</a>
		</div>
	</section>
</main>

<style>
	.container {
		width: min(72rem, 100% - 3rem);
		margin-inline: auto;
	}

	/* ── Hero ── */
	.hero {
		position: relative;
		overflow: hidden;
		padding: 7rem 0 6rem;
		background:
			radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124, 58, 237, 0.35), transparent),
			linear-gradient(180deg, #0c0a14 0%, #050508 100%);
	}

	.hero-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
		background-size: 64px 64px;
		mask-image: radial-gradient(ellipse 70% 80% at 50% 30%, black, transparent);
		pointer-events: none;
	}

	.hero-glow {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		pointer-events: none;
	}

	.hero-glow--left {
		width: 28rem;
		height: 28rem;
		top: -6rem;
		left: -8rem;
		background: var(--purple-glow);
	}

	.hero-glow--right {
		width: 22rem;
		height: 22rem;
		top: 20%;
		right: -6rem;
		background: var(--purple-glow);
	}

	.hero-inner {
		position: relative;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.9rem 0.4rem 0.7rem;
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.04em;
		color: var(--purple-light);
		background: var(--purple-muted);
		border: 1px solid var(--purple-border);
		border-radius: 999px;
		backdrop-filter: blur(8px);
	}

	.badge-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--purple-light);
		box-shadow: 0 0 10px var(--purple-light);
		animation: pulse 2.5s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}

	h1 {
		margin-top: 1.75rem;
		font-family: 'Syne', sans-serif;
		font-size: clamp(2.75rem, 6vw, 4.25rem);
		font-weight: 800;
		line-height: 1.1;
		letter-spacing: -0.02em;
	}

	.title-line {
		display: block;
		white-space: nowrap;
	}

	.title-line--accent {
		background: linear-gradient(135deg, var(--purple-pale) 0%, var(--purple) 45%, var(--purple-light) 100%);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.hero-copy {
		margin-top: 1.5rem;
		font-size: 1.0625rem;
		line-height: 1.7;
		color: #9b97ad;
		max-width: 36ch;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.25rem;
		margin-top: 2.5rem;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 0.35em;
		font-size: 0.9375rem;
		font-weight: 600;
		text-decoration: none;
		border-radius: 0.625rem;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease,
			background 0.2s ease,
			border-color 0.2s ease;
	}

	.cta--primary {
		padding: 0.875rem 1.75rem;
		color: #0c0a14;
		background: linear-gradient(135deg, var(--purple-pale), var(--purple-light));
		box-shadow: 0 0 40px var(--purple-glow);
	}

	.cta--primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 0 50px rgba(167, 139, 250, 0.4);
	}

	.cta--ghost {
		padding: 0.875rem 1.5rem;
		color: #eceaf4;
		border: 1px solid rgba(255, 255, 255, 0.15);
		background: rgba(255, 255, 255, 0.04);
		backdrop-filter: blur(8px);
	}

	.cta--ghost:hover {
		border-color: var(--purple-border);
		background: var(--purple-muted);
	}

	.cta--alliance:hover {
		border-color: rgba(0, 112, 221, 0.5);
		background: rgba(0, 112, 221, 0.1);
	}

	.cta--horde:hover {
		border-color: rgba(196, 30, 58, 0.5);
		background: rgba(196, 30, 58, 0.1);
	}

	.cta-note {
		font-size: 0.8125rem;
		color: #6b6678;
	}

	/* ── Stats ── */
	.stats {
		position: relative;
		padding: 0 0 4.5rem;
		margin-top: -3.5rem;
		z-index: 2;
	}

	.stats-wrap {
		position: relative;
	}

	.stats-panel {
		display: grid;
		grid-template-columns: 1.15fr 1fr 1fr;
		gap: 0;
		padding: 0.35rem;
		border-radius: 1.35rem;
		border: 1px solid rgba(167, 139, 250, 0.14);
		background:
			linear-gradient(180deg, rgba(18, 14, 30, 0.95), rgba(8, 6, 14, 0.98)),
			radial-gradient(ellipse 80% 120% at 50% 0%, var(--purple-muted), transparent 60%);
		box-shadow:
			0 24px 60px rgba(0, 0, 0, 0.45),
			0 0 0 1px rgba(255, 255, 255, 0.03) inset;
		backdrop-filter: blur(20px);
	}

	.stat-cell {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding: 1.75rem 1.5rem 1.65rem;
		overflow: hidden;
		border-radius: 1.05rem;
		transition:
			background 0.3s ease,
			transform 0.3s ease;
		animation: card-in 0.55s ease backwards;
		animation-delay: var(--delay);
	}

	.stat-cell:not(:last-child)::after {
		content: '';
		position: absolute;
		top: 1.25rem;
		right: 0;
		bottom: 1.25rem;
		width: 1px;
		background: linear-gradient(
			180deg,
			transparent,
			rgba(167, 139, 250, 0.18) 50%,
			transparent
		);
	}

	.stat-cell--featured {
		padding: 2rem 1.75rem 1.85rem;
	}

	.stat-cell-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			ellipse 90% 80% at 50% 100%,
			color-mix(in srgb, var(--accent) 16%, transparent),
			transparent 70%
		);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	.stat-cell:hover {
		background: rgba(255, 255, 255, 0.02);
		transform: translateY(-2px);
	}

	.stat-cell:hover .stat-cell-glow {
		opacity: 1;
	}

	.stat-value {
		position: relative;
		z-index: 1;
		font-family: 'Syne', sans-serif;
		font-size: clamp(2.5rem, 6vw, 3.25rem);
		font-weight: 800;
		line-height: 1;
		letter-spacing: -0.04em;
		font-variant-numeric: tabular-nums;
		color: var(--accent);
		text-shadow: 0 0 48px color-mix(in srgb, var(--accent) 30%, transparent);
	}

	.stat-cell--featured .stat-value {
		font-size: clamp(2.75rem, 7vw, 3.75rem);
	}

	.stat-label {
		position: relative;
		z-index: 1;
		margin-top: 0.15rem;
		font-size: 0.8125rem;
		font-weight: 600;
		color: #eceaf4;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.stat-hint {
		position: relative;
		z-index: 1;
		font-size: 0.8125rem;
		line-height: 1.5;
		color: #6b6678;
	}

	/* ── Achievements ── */
	.achievements {
		position: relative;
		overflow: hidden;
		padding: 6rem 0;
		background:
			radial-gradient(ellipse 60% 50% at 80% 20%, var(--purple-glow), transparent),
			radial-gradient(ellipse 50% 40% at 10% 80%, var(--purple-muted), transparent),
			#06050a;
	}

	.achievements-noise {
		position: absolute;
		inset: 0;
		opacity: 0.4;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
		pointer-events: none;
	}

	.achievements-inner {
		position: relative;
	}

	.section-header {
		max-width: 32rem;
	}

	.section-eyebrow {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--purple-light);
	}

	.section-header h2 {
		margin-top: 0.75rem;
		font-family: 'Syne', sans-serif;
		font-size: clamp(1.75rem, 5vw, 2.5rem);
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.section-desc {
		margin-top: 0.75rem;
		font-size: 1rem;
		line-height: 1.65;
		color: #7a7589;
	}

	.achievement-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		margin-top: 3rem;
	}

	.achievement-card {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1.5rem;
		min-height: 11.5rem;
		padding: 1.5rem;
		overflow: hidden;
		border-radius: 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.07);
		background:
			radial-gradient(ellipse 120% 80% at 100% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 55%),
			linear-gradient(160deg, rgba(22, 18, 36, 0.92), rgba(8, 6, 14, 0.98));
		backdrop-filter: blur(16px);
		transition:
			border-color 0.3s ease,
			transform 0.3s ease,
			box-shadow 0.3s ease;
		animation: card-in 0.55s ease backwards;
		animation-delay: var(--delay);
	}

	@keyframes card-in {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
	}

	.achievement-card--wide {
		grid-column: span 2;
		flex-direction: row;
		align-items: flex-end;
		min-height: 10rem;
		padding: 1.75rem 2rem;
	}

	.achievement-card:hover {
		border-color: color-mix(in srgb, var(--accent) 45%, transparent);
		transform: translateY(-4px);
		box-shadow:
			0 20px 50px rgba(0, 0, 0, 0.35),
			0 0 0 1px color-mix(in srgb, var(--accent) 12%, transparent),
			0 0 48px color-mix(in srgb, var(--accent) 18%, transparent);
	}

	.card-sheen {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			125deg,
			color-mix(in srgb, var(--accent) 8%, transparent) 0%,
			transparent 42%,
			transparent 100%
		);
		pointer-events: none;
	}

	.card-body {
		position: relative;
		z-index: 1;
		flex: 1;
		min-width: 0;
	}

	.card-meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.card-tag {
		padding: 0.3rem 0.65rem;
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--accent);
		background: color-mix(in srgb, var(--accent) 12%, transparent);
		border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
		border-radius: 999px;
	}

	.card-line {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 35%, transparent), transparent);
	}

	.achievement-card h3 {
		font-family: 'Syne', sans-serif;
		font-size: clamp(1.125rem, 2.5vw, 1.375rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		line-height: 1.2;
	}

	.achievement-card p {
		margin-top: 0.6rem;
		max-width: 34ch;
		font-size: 0.875rem;
		line-height: 1.65;
		color: #8b8699;
	}

	.card-metric {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.2rem;
		flex-shrink: 0;
		text-align: right;
	}

	.achievement-card--wide .card-metric {
		padding-left: 1.5rem;
		border-left: 1px solid rgba(255, 255, 255, 0.06);
	}

	.card-metric-value {
		font-family: 'Syne', sans-serif;
		font-size: clamp(2rem, 5vw, 2.75rem);
		font-weight: 800;
		line-height: 1;
		letter-spacing: -0.04em;
		font-variant-numeric: tabular-nums;
		color: var(--accent);
		text-shadow: 0 0 40px color-mix(in srgb, var(--accent) 35%, transparent);
	}

	.card-metric-label {
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: #6b6678;
	}

	.tournament-proof {
		margin-top: 4rem;
		padding-top: 3.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	.tournament-header {
		max-width: 36rem;
	}

	.tournament-header h3 {
		margin-top: 0.75rem;
		font-family: 'Syne', sans-serif;
		font-size: clamp(1.375rem, 4vw, 1.875rem);
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.tournament-intro {
		margin-top: 0.75rem;
		font-size: 1rem;
		line-height: 1.65;
		color: #7a7589;
	}

	.tournament-figure {
		margin: 2rem 0 0;
		padding: 0.75rem;
		background: linear-gradient(145deg, rgba(20, 16, 32, 0.9), rgba(10, 8, 18, 0.95));
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 1rem;
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
	}

	.tournament-figure img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 0.625rem;
	}

	.tournament-figure figcaption {
		margin-top: 1.25rem;
		padding-inline: 0.5rem 0.75rem;
		font-size: 0.9375rem;
		line-height: 1.65;
		color: #9b97ad;
		text-align: center;
		max-width: 42rem;
		margin-inline: auto;
	}

	/* ── Footer CTA ── */
	.footer-cta {
		position: relative;
		overflow: hidden;
		padding: 5rem 0 6rem;
		text-align: center;
		background: linear-gradient(180deg, #06050a 0%, #0a0812 50%, #0f0c18 100%);
		border-top: 1px solid rgba(167, 139, 250, 0.1);
	}

	.footer-glow {
		position: absolute;
		bottom: -8rem;
		left: 50%;
		transform: translateX(-50%);
		width: 40rem;
		height: 20rem;
		background: radial-gradient(ellipse, var(--purple-glow), transparent 70%);
		pointer-events: none;
	}

	.footer-inner {
		position: relative;
	}

	.footer-inner h2 {
		font-family: 'Syne', sans-serif;
		font-size: clamp(1.5rem, 4vw, 2.25rem);
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.footer-inner p {
		margin-top: 0.75rem;
		color: #7a7589;
		font-size: 1rem;
	}

	.footer-inner .cta {
		margin-top: 2rem;
	}

	@media (max-width: 720px) {
		.hero {
			padding: 5rem 0 4rem;
		}

		h1 {
			font-size: clamp(2.25rem, 9vw, 3.25rem);
		}

		.title-line {
			white-space: normal;
		}

		.stats-inner {
			grid-template-columns: 1fr;
		}

		.achievement-grid {
			grid-template-columns: 1fr;
		}

		.achievement-card--wide {
			grid-column: span 1;
			flex-direction: column;
			align-items: stretch;
		}

		.achievement-card--wide .card-metric {
			flex-direction: row;
			align-items: baseline;
			justify-content: space-between;
			padding-left: 0;
			padding-top: 1rem;
			border-left: none;
			border-top: 1px solid rgba(255, 255, 255, 0.06);
			text-align: left;
		}

		.card-metric {
			align-items: flex-start;
			text-align: left;
		}

		.hero-actions {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
