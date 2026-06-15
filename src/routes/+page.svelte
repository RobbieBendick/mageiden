<script lang="ts">
	import { base } from '$app/paths';
	import TournamentCarousel, {
		type TournamentSlide
	} from '$lib/components/TournamentCarousel.svelte';
	import { DEFAULT_TITLE } from '$lib/site';

	const DISCORD_URL = 'https://discord.gg/XuJXf37WvE';

	const tournamentSlides: TournamentSlide[] = [
		{
			src: `${base}/images/tournament-screenshot.png`,
			alt: 'Tournament results: Super Frogs 1st place with Mageiden on the roster',
			href: 'https://www.esportsearnings.com/tournaments/30588-spring-na-cup-1',
			label: 'Spring NA Cup 1'
		},
		{
			src: `${base}/images/tournament-screenshot-2.png`,
			alt: 'Tournament results: WOW NA Arena Cup 4',
			href: 'https://www.esportsearnings.com/tournaments/50632-wow-na-arena-cup-4',
			label: 'WOW NA Arena Cup 4'
		}
	];

	const stats = [
		{
			value: '20×',
			label: 'Rank 1 titles',
			hint: 'Across multiple expansions and metas, same result',
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

	const pridefulAchievement = `${base}/images/prideful-achievment.png`;

	const heroAchievementMarks = [
		{ x: '68%', y: '16%', r: '-14deg', s: 0.9, o: 0.22 },
		{ x: '84%', y: '30%', r: '11deg', s: 1.05, o: 0.19 },
		{ x: '72%', y: '48%', r: '-8deg', s: 0.95, o: 0.21 },
		{ x: '90%', y: '58%', r: '15deg', s: 0.88, o: 0.18 },
		{ x: '76%', y: '76%', r: '-11deg', s: 1, o: 0.2 }
	];
</script>

<svelte:head>
	<title>{DEFAULT_TITLE}</title>
</svelte:head>

<main>
	<section class="hero">
		<div class="hero-glow hero-glow--left"></div>
		<div class="hero-glow hero-glow--right"></div>
		<div class="hero-achievements" aria-hidden="true">
			{#each heroAchievementMarks as mark}
				<span
					class="hero-achievement"
					style="--x: {mark.x}; --y: {mark.y}; --r: {mark.r}; --s: {mark.s}; --o: {mark.o}"
				>
					<img src={pridefulAchievement} alt="" width="256" height="256" />
				</span>
			{/each}
		</div>
		<div class="hero-grid"></div>

		<div class="container hero-inner">
			<div class="badge">
				<span class="badge-dot"></span>
				20× Rank 1 Tournament Player
			</div>

			<h1>
				<span class="title-line">Not theory.</span>
				<span class="title-line title-line--accent">Rank 1 reps.</span>
			</h1>

			<p class="hero-copy">
				Twenty Rank 1 titles. Five hundred clients coached. I work with players at every
				level, from first steps in arena to partners chasing their own title. I know how bad the
				LFG grind can be. Same focus, every session.
			</p>

			<div class="hero-actions">
				<div class="hero-buttons">
					<a
						href={DISCORD_URL}
						class="cta cta--primary"
						target="_blank"
						rel="noopener noreferrer"
					>Work with me</a>
					<a href="{base}/armory/alliance" class="cta cta--ghost cta--alliance">Alliance Armory</a>
					<a href="{base}/armory/horde" class="cta cta--ghost cta--horde">Horde Armory</a>
				</div>
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
		<div class="container achievements-inner">
			<div class="section-header">
				<p class="section-eyebrow">Track record</p>
				<h2>Proof, not promises</h2>
				<p class="section-desc">
					Ratings climbed, brackets won, clients pushed. Swap in your numbers and keep the
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
				<div class="tournament-copy">
					<p class="section-eyebrow">Tournament wins</p>
					<h3>1st place on the biggest stage</h3>
					<p class="tournament-intro">
						Won with Super Frogs, beating Method Orange in the final and running through
						teams stacked with the most decorated names in arena.
					</p>
				</div>

				<div class="tournament-media">
					<TournamentCarousel slides={tournamentSlides} />
					<p class="tournament-caption">
						Competed with and against the best players in the game, including Cdew, Snutz, Pikaboo,
						and the rest of the Method roster. Same lobbies, same pressure, same level of
						play you see at the top of the ladder.
					</p>
				</div>
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
		z-index: 1;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
		background-size: 64px 64px;
		mask-image: radial-gradient(ellipse 70% 80% at 50% 30%, black, transparent);
		pointer-events: none;
	}

	.hero-glow {
		position: absolute;
		z-index: 1;
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

	.hero-achievements {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		mask-image: linear-gradient(90deg, transparent 38%, rgba(0, 0, 0, 0.45) 55%, black 75%);
		-webkit-mask-image: linear-gradient(
			90deg,
			transparent 38%,
			rgba(0, 0, 0, 0.45) 55%,
			black 75%
		);
	}

	.hero-achievement {
		position: absolute;
		left: var(--x);
		top: var(--y);
		display: block;
		width: clamp(10rem, 22vw, 18rem);
		opacity: var(--o);
		transform: translate(-50%, -50%) rotate(var(--r)) scale(var(--s));
	}

	.hero-achievement img {
		display: block;
		width: 100%;
		height: auto;
	}

	.hero-achievement::after {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--purple-light);
		opacity: 0.13;
		mix-blend-mode: hue;
		pointer-events: none;
	}

	.hero-inner {
		position: relative;
		z-index: 2;
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
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
		margin-top: 2.5rem;
	}

	.hero-buttons {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.25rem;
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
		isolation: isolate;
		overflow: hidden;
		padding: 6rem 0;
		background: #06050a;
		box-shadow: inset 0 1px 0 rgba(167, 139, 250, 0.1);
	}

	.achievements::before {
		content: '';
		position: absolute;
		inset: -35% -15% auto -15%;
		height: 75%;
		background: linear-gradient(
			128deg,
			rgba(124, 58, 237, 0.16) 0%,
			rgba(88, 28, 180, 0.07) 38%,
			transparent 68%
		);
		transform: skewY(-5deg);
		pointer-events: none;
	}

	.achievements::after {
		content: '';
		position: absolute;
		inset: auto 0 0;
		height: 45%;
		background: linear-gradient(180deg, transparent, rgba(5, 5, 8, 0.85) 72%, #050508);
		pointer-events: none;
	}

	.achievements-inner {
		position: relative;
		z-index: 1;
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
		display: grid;
		grid-template-columns: minmax(0, 20rem) minmax(0, 1fr);
		gap: 2.5rem 3rem;
		align-items: start;
		margin-top: 4rem;
		padding-top: 3.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	.tournament-copy h3 {
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

	.tournament-media {
		min-width: 0;
	}

	.tournament-caption {
		margin-top: 0.875rem;
		font-size: 0.875rem;
		line-height: 1.65;
		color: #7a7589;
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

		.hero-achievements {
			mask-image: linear-gradient(90deg, transparent 50%, black 88%);
			-webkit-mask-image: linear-gradient(90deg, transparent 50%, black 88%);
		}

		.hero-achievement {
			width: clamp(8rem, 34vw, 14rem);
		}

		h1 {
			font-size: clamp(2.25rem, 9vw, 3.25rem);
		}

		.title-line {
			white-space: normal;
		}

		.stats {
			margin-top: -2.5rem;
		}

		.stats-panel {
			grid-template-columns: 1fr;
			padding: 0.5rem;
		}

		.stat-cell:not(:last-child)::after {
			top: auto;
			right: 1.25rem;
			bottom: 0;
			left: 1.25rem;
			width: auto;
			height: 1px;
			background: linear-gradient(
				90deg,
				transparent,
				rgba(167, 139, 250, 0.18) 50%,
				transparent
			);
		}

		.stat-cell--featured .stat-value {
			font-size: clamp(2.5rem, 12vw, 3.25rem);
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

		.tournament-proof {
			grid-template-columns: 1fr;
			gap: 1.75rem;
		}
	}
</style>
