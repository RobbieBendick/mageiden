<script lang="ts">
	import { base } from '$app/paths';
	import { DEFAULT_TITLE } from '$lib/site';

	const DISCORD_URL = 'https://discord.gg/XuJXf37WvE';

	const stats = [
		{ value: '20×', label: 'Rank 1 titles', accent: 'var(--purple-light)' },
		{ value: '500+', label: 'Clients served', accent: 'var(--mage)' },
		{ value: 'R1', label: 'Arena rank', accent: '#fcd34d' }
	];

	const achievements = [
		{
			tag: 'Arena',
			title: 'Your best season',
			description: 'Drop a rating peak, cutoff, or season highlight here.'
		},
		{
			tag: 'Tournament',
			title: 'Your biggest win',
			description: 'A tournament result, ladder push, or bracket run.'
		},
		{
			tag: 'Coaching',
			title: 'Client turnaround',
			description: 'A before/after story: stuck in rival range to gladiator contention.'
		},
		{
			tag: 'Legacy',
			title: 'Another R1 season',
			description: 'Stack another title onto the twenty.'
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
				20× Rank 1 <span class="mage-word">Mage</span>
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
				<a href="{base}/armory/alliance" class="cta cta--ghost cta--alliance">
					<span>Alliance</span>
					<span class="mage-word">Mage</span>
				</a>
				<a href="{base}/armory/horde" class="cta cta--ghost cta--horde">
					<span>Horde</span>
					<span class="mage-word">Mage</span>
				</a>
				<span class="cta-note">Create a ticket order on Discord</span>
			</div>
		</div>
	</section>

	<section class="stats">
		<div class="stats-bg"></div>
		<div class="container stats-inner">
			{#each stats as stat}
				<article class="stat-card">
					<span class="stat-value" style="--accent: {stat.accent}">{stat.value}</span>
					<span class="stat-label">{stat.label}</span>
				</article>
			{/each}
		</div>
	</section>

	<section class="achievements">
		<div class="achievements-noise"></div>
		<div class="container achievements-inner">
			<div class="section-header">
				<p class="section-eyebrow">Track record</p>
				<h2>Proof, not promises</h2>
				<p class="section-desc">
					Swap these in with your ratings, titles, and client wins. The layout stays. The
					bragging rights are yours.
				</p>
			</div>

			<div class="achievement-grid">
				{#each achievements as achievement, i}
					<article class="achievement-card" style="--delay: {i * 60}ms">
						<div class="card-top">
							<span class="card-index">0{i + 1}</span>
							<span class="card-tag">{achievement.tag}</span>
						</div>
						<h3>{achievement.title}</h3>
						<p>{achievement.description}</p>
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
			<h2>Need a <span class="mage-word">mage</span> that hits?</h2>
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

	:global(.mage-word) {
		color: var(--mage);
		font-weight: 600;
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
		background: var(--mage-muted);
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
		background: var(--mage);
		box-shadow: 0 0 10px var(--mage);
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
		background: linear-gradient(135deg, var(--purple-pale) 0%, var(--purple) 45%, var(--mage) 100%);
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
		padding: 0 0 5rem;
		margin-top: -2rem;
	}

	.stats-bg {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(90deg, transparent, var(--purple-muted) 50%, transparent),
			linear-gradient(180deg, transparent, #08060e 30%, #08060e 70%, transparent);
		border-block: 1px solid rgba(167, 139, 250, 0.1);
	}

	.stats-inner {
		position: relative;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
		padding-block: 3rem;
	}

	.stat-card {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding: 2rem 1.5rem;
		background: rgba(12, 10, 20, 0.7);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 1rem;
		backdrop-filter: blur(12px);
		transition:
			border-color 0.2s ease,
			transform 0.2s ease;
	}

	.stat-card:hover {
		border-color: var(--purple-border);
		transform: translateY(-3px);
	}

	.stat-value {
		font-family: 'Syne', sans-serif;
		font-size: clamp(2.25rem, 6vw, 3rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--accent);
	}

	.stat-label {
		font-size: 0.8125rem;
		font-weight: 500;
		color: #7a7589;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	/* ── Achievements ── */
	.achievements {
		position: relative;
		overflow: hidden;
		padding: 6rem 0;
		background:
			radial-gradient(ellipse 60% 50% at 80% 20%, var(--mage-muted), transparent),
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
		color: var(--mage);
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
		grid-template-columns: repeat(2, 1fr);
		gap: 1.25rem;
		margin-top: 3rem;
	}

	.achievement-card {
		position: relative;
		padding: 1.75rem;
		background: linear-gradient(145deg, rgba(20, 16, 32, 0.9), rgba(10, 8, 18, 0.95));
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 1rem;
		transition:
			border-color 0.25s ease,
			box-shadow 0.25s ease;
	}

	.achievement-card:hover {
		border-color: var(--purple-border);
		box-shadow: 0 8px 40px var(--purple-glow);
	}

	.card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.25rem;
	}

	.card-index {
		font-family: 'Syne', sans-serif;
		font-size: 0.75rem;
		font-weight: 700;
		color: #4a4558;
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

	.achievement-card h3 {
		font-family: 'Syne', sans-serif;
		font-size: 1.125rem;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.achievement-card p {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.6;
		color: #7a7589;
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

		.hero-actions {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
