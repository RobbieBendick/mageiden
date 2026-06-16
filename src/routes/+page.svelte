<script lang="ts">
	import { base } from '$app/paths';
	import { CLASS_COLORS } from '$lib/armory';
	import { englishCount } from '$lib/number-words';
	import {
		RANK_ONE_CLASS_LEGEND,
		RANK_ONE_ERA_LEGEND,
		RANK_ONE_SEASONS,
		RANK_ONE_TITLE_COUNT,
		eraColor,
		eraLabel,
		formatSeasonNumber,
		groupSeasonsByEra,
		rankOneClassColor,
		totalRankOneCount
	} from '$lib/rank-one-seasons';
	import TournamentCarousel, {
		type TournamentSlide
	} from '$lib/components/TournamentCarousel.svelte';
	import { DEFAULT_TITLE } from '$lib/site';
	import { scrollReveal } from '$lib/scroll-reveal';

	const DISCORD_URL = 'https://discord.gg/XuJXf37WvE';

	const rankOneMetric = `${RANK_ONE_TITLE_COUNT}×`;
	const rankOneWord = englishCount(RANK_ONE_TITLE_COUNT);
	const rankOneWordCap = englishCount(RANK_ONE_TITLE_COUNT, true);

	const tournamentSlides: TournamentSlide[] = [
		{
			label: 'Spring NA Cup 1',
			href: 'https://www.esportsearnings.com/tournaments/30588-spring-na-cup-1',
			images: [
				{
					src: `${base}/images/tournament-screenshot.png`,
					alt: 'Tournament results: Super Frogs 1st place with Mageiden on the roster'
				}
			]
		},
		{
			label: 'WOW NA Arena Cup 4',
			href: 'https://www.esportsearnings.com/tournaments/50632-wow-na-arena-cup-4',
			images: [
				{
					src: `${base}/images/tournament-screenshot-2.png`,
					alt: 'Tournament results: WOW NA Arena Cup 4'
				}
			]
		},
		{
			label: 'NA Cataclysm Classic Arena Finals',
			href: 'https://raider.io/events/cataclysm-classic-tournament/brackets/na-cataclysm-classic-arena-finals',
			images: [
				{
					src: `${base}/images/tournament-screenshot-3-1.png`,
					alt: 'Tournament bracket',
					caption: 'Bracket'
				},
				{
					src: `${base}/images/tournament-screenshot-3-2.png`,
					alt: 'Tournament team screenshot with Mageiden on the roster',
					caption: 'Team'
				}
			]
		}
	];

	const stats = [
		{
			value: rankOneMetric,
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
			value: String(RANK_ONE_CLASS_LEGEND.length),
			label: 'Classes with R1',
			hint: 'Mage, Rogue, Warlock, and Ele Shaman',
			accent: '#fcd34d'
		}
	];

	const achievements = [
		{
			tag: 'Ladder',
			metric: '3,200+',
			metricLabel: '#1 ranked on ladder',
			title: 'Peak rating',
			description:
				'Season after season at the top of the ladder.',
			accent: 'var(--purple-light)',
			wide: true
		},
		{
			tag: 'Tournament',
			metric: '1st',
			metricLabel: 'AWC cups',
			title: 'Tournament wins',
			description:
				'Multiple cup wins and deep bracket runs with Super Frogs, Union, and other teams, including a finals win over Method Orange.',
			accent: '#fcd34d',
			wide: false
		},
		{
			tag: 'Coaching',
			metric: '1,500 → Glad',
			metricLabel: 'client climb',
			title: 'Rating turnaround',
			description:
				'Helped countless players reach gladiator & R1 across every expansion. Learn win conditions, positioning, and the strats vs every specific matchup.',
			accent: '#4ade80',
			wide: false
		},
		{
			tag: 'Titles',
			metric: rankOneMetric,
			metricLabel: 'rank one',
			title: 'Stacked seasons',
			description: `${rankOneWordCap} titles across expansions and metas. Rank 1 on four classes, with Mage as the main.`,
			accent: 'var(--purple)',
			wide: true,
			classes: [
				{ name: 'Mage', color: CLASS_COLORS.Mage, main: true },
				{ name: 'Rogue', color: CLASS_COLORS.Rogue },
				{ name: 'Warlock', color: CLASS_COLORS.Warlock },
				{ name: 'Ele Shaman', color: CLASS_COLORS.Shaman }
			]
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
			<div class="badge" use:scrollReveal={{ delay: 0, variant: 'soft' }}>
				<span class="badge-dot"></span>
				{rankOneMetric} Rank 1 Tournament Player
			</div>

			<h1 use:scrollReveal={{ delay: 90, variant: 'rise' }}>
				<span class="title-line">Not theory.</span>
				<span class="title-line title-line--accent">Rank 1 reps.</span>
			</h1>

			<p class="hero-copy" use:scrollReveal={{ delay: 180, variant: 'soft' }}>
				With {rankOneWord} Rank 1 titles and over five hundred clients coached, I work with players
				at every level, from first steps in arena to partners chasing a title of their own. I know
				how bad the LFG grind can be, so skip the headache and start improving today.
			</p>

			<div class="hero-actions" use:scrollReveal={{ delay: 270, variant: 'scale' }}>
				<div class="hero-cta-primary">
					<a
						href={DISCORD_URL}
						class="cta cta--primary"
						target="_blank"
						rel="noopener noreferrer"
					>Work with me</a>
					<span class="cta-note">Create a ticket order on Discord</span>
				</div>
				<div class="hero-armory-buttons">
					<a href="{base}/armory/alliance" class="cta cta--ghost cta--alliance">Alliance Armory</a>
					<a href="{base}/armory/horde" class="cta cta--ghost cta--horde">Horde Armory</a>
				</div>
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
						style="--accent: {stat.accent}"
						use:scrollReveal={{
							delay: i * 90,
							variant: i === 0 ? 'left' : i === 2 ? 'right' : 'scale'
						}}
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
			<div class="section-header" use:scrollReveal={{ variant: 'left' }}>
				<p class="section-eyebrow">Track record</p>
				<h2>Proof, not promises</h2>
				<p class="section-desc">
					{rankOneWordCap} rank 1 titles, AWC cup wins, and five hundred clients coached. Ladder,
					tournaments, and coaching, laid out below.
				</p>
			</div>

			<div class="achievement-grid">
				{#each achievements as achievement, i}
					<article
						class="achievement-card"
						class:achievement-card--wide={achievement.wide}
						class:achievement-card--titles={achievement.tag === 'Titles'}
						style="--accent: {achievement.accent}"
						use:scrollReveal={{
							delay: i * 100,
							variant: i % 2 === 0 ? 'left' : 'right'
						}}
					>
						<div class="card-sheen" aria-hidden="true"></div>
						<div class="titles-row">
							<div class="card-body">
								<div class="card-meta">
									<span class="card-tag">{achievement.tag}</span>
									<span class="card-line" aria-hidden="true"></span>
								</div>
								<h3>{achievement.title}</h3>
								<p>{achievement.description}</p>
							</div>
							{#if achievement.classes}
								<div class="title-classes">
									{#each achievement.classes as spec}
										<span
											class="title-class"
											class:title-class--main={spec.main}
											style="--class-color: {spec.color}"
										>
											<span class="title-class-dot" aria-hidden="true"></span>
											<span class="title-class-name">{spec.name}</span>
											{#if spec.main}
												<span class="title-class-badge">Main</span>
											{/if}
										</span>
									{/each}
								</div>
							{/if}
							<div class="card-metric" aria-label="{achievement.metric} {achievement.metricLabel}">
								<span class="card-metric-value">{achievement.metric}</span>
								<span class="card-metric-label">{achievement.metricLabel}</span>
							</div>
						</div>
						{#if achievement.tag === 'Titles'}
							<div class="title-seasons" use:scrollReveal={{ delay: 220, variant: 'rise' }}>
								<div class="title-seasons-header">
									<div class="title-seasons-heading">
										<p class="title-seasons-label">Rank 1 seasons</p>
										<span class="title-seasons-count"
											>{totalRankOneCount(RANK_ONE_SEASONS)} total</span
										>
									</div>
									<div class="title-seasons-legends">
										<div class="title-seasons-legend" aria-label="Eras">
											{#each RANK_ONE_ERA_LEGEND as item}
												<span
													class="title-seasons-legend-item"
													style="--legend-color: {item.color}"
												>
													<span class="title-seasons-legend-dot" aria-hidden="true"></span>
													{item.label}
												</span>
											{/each}
										</div>
										<div class="title-seasons-legend" aria-label="Classes">
											{#each RANK_ONE_CLASS_LEGEND as item}
												<span
													class="title-seasons-legend-item"
													style="--legend-color: {item.color}"
												>
													<span class="title-seasons-legend-dot" aria-hidden="true"></span>
													{item.name}
												</span>
											{/each}
										</div>
									</div>
								</div>
								{#each groupSeasonsByEra(RANK_ONE_SEASONS) as group, groupIndex}
									<section
										class="title-seasons-era title-seasons-era--{group.era}"
										style="--era-color: {eraColor(group.era)}"
										use:scrollReveal={{
											delay: 320 + groupIndex * 120,
											variant: groupIndex % 2 === 0 ? 'left' : 'right'
										}}
									>
										<h4 class="title-seasons-era-label">
											<span class="title-seasons-era-chip">{eraLabel(group.era)}</span>
											<span class="title-seasons-era-count"
												>{totalRankOneCount(group.seasons)} title{totalRankOneCount(
													group.seasons
												) === 1
													? ''
													: 's'}</span
											>
										</h4>
										<ol class="title-seasons-grid">
											{#each group.seasons as season}
												<li class="title-season">
													<span class="title-season-tag">{formatSeasonNumber(season.season)}</span>
													<span class="title-season-name">{season.name}</span>
													<span class="title-season-classes">
														{#each season.classes as cls}
															<span
																class="title-season-class"
																style="--class-color: {rankOneClassColor(cls.className)}"
															>
																{cls.className}
																{#if (cls.count ?? 1) > 1}
																	<span
																		class="title-season-mult"
																		aria-label="{cls.count} rank 1 titles on {cls.className}"
																		>{cls.count}×</span
																	>
																{/if}
															</span>
														{/each}
													</span>
												</li>
											{/each}
										</ol>
									</section>
								{/each}
							</div>
						{/if}
					</article>
				{/each}
			</div>

			<article class="network-panel" style="--accent: #6ee7b7" use:scrollReveal={{ delay: 80, variant: 'rise' }}>
				<div class="network-panel-sheen" aria-hidden="true"></div>
				<div class="network-panel-body">
					<div class="network-panel-copy">
						<div class="card-meta">
							<span class="card-tag">Roster</span>
							<span class="card-line" aria-hidden="true"></span>
						</div>
						<h3>Pull from a deep player network</h3>
						<p>
							Need partners for 2s, 3s, or 5s? If my class isn't the right fit, or you want help
							from another class, I pull from an extensive roster of top tier players I trust.
						</p>
					</div>
					<ul class="network-panel-features">
						{#each [
							{ label: '2v2', text: "A partner when my class isn't the right fit" },
							{ label: '3v3', text: 'Arena partners when you need a third' },
							{ label: '5v5', text: 'Full teams for larger brackets' },
							{ label: 'Fill', text: 'Coaching or play from another class' }
						] as feature, featureIndex}
							<li
								class="network-feature"
								use:scrollReveal={{
									delay: 140 + featureIndex * 110,
									variant: featureIndex % 2 === 0 ? 'left' : 'right'
								}}
							>
								<span class="network-feature-label">{feature.label}</span>
								<span class="network-feature-text">{feature.text}</span>
							</li>
						{/each}
					</ul>
				</div>
			</article>

			<div class="tournament-proof">
				<div class="tournament-copy" use:scrollReveal={{ variant: 'left' }}>
					<p class="section-eyebrow">Tournament wins</p>
					<h3>1st place on the biggest stage</h3>
					<p class="tournament-intro">
						Won one of many AWC cups with Super Frogs, Union, and other teams as well, beating Method
						Orange in the final and running through teams stacked with the most decorated names
						in arena.
					</p>
				</div>

				<div class="tournament-media" use:scrollReveal={{ delay: 120, variant: 'right' }}>
					<TournamentCarousel slides={tournamentSlides} />
					<p class="tournament-caption" use:scrollReveal={{ delay: 220, variant: 'soft' }}>
						Brackets stacked with Chan, Wealthyman, Snutz, Kubzy, Pikaboo, Wizk, Paypay, Cdew, and the rest of Method.
						No easy paths, no weak finals. That's where my coaching comes from.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="footer-cta">
		<div class="footer-glow"></div>
		<div class="container footer-inner">
			<h2 use:scrollReveal={{ variant: 'rise' }}>Need a player that hits?</h2>
			<p use:scrollReveal={{ delay: 90, variant: 'soft' }}>
				You've spent enough time in LFG with the wrong fit. Skip the headache and start improving today. One message away on Discord.
			</p>
			<a
				href={DISCORD_URL}
				class="cta cta--ghost"
				target="_blank"
				rel="noopener noreferrer"
				use:scrollReveal={{ delay: 180, variant: 'scale' }}
			>Join Discord</a>
		</div>
	</section>
</main>

<style>
	:global(.scroll-reveal) {
		opacity: 0;
	}

	:global(.scroll-reveal:not(.scroll-reveal--done)) {
		--reveal-duration: 1.2s;
		transition:
			opacity var(--reveal-duration) cubic-bezier(0.16, 1, 0.3, 1),
			transform var(--reveal-duration) cubic-bezier(0.16, 1, 0.3, 1),
			filter var(--reveal-duration) cubic-bezier(0.16, 1, 0.3, 1);
		transition-delay: var(--reveal-delay, 0ms);
		will-change: opacity, transform, filter;
	}

	.stat-cell:global(.scroll-reveal:not(.scroll-reveal--done)),
	.achievement-card:global(.scroll-reveal:not(.scroll-reveal--done)),
	.network-panel:global(.scroll-reveal:not(.scroll-reveal--done)),
	.network-feature:global(.scroll-reveal:not(.scroll-reveal--done)),
	.title-seasons:global(.scroll-reveal:not(.scroll-reveal--done)),
	.title-seasons-era:global(.scroll-reveal:not(.scroll-reveal--done)) {
		transition:
			opacity var(--reveal-duration, 1.2s) cubic-bezier(0.16, 1, 0.3, 1),
			transform var(--reveal-duration, 1.2s) cubic-bezier(0.16, 1, 0.3, 1),
			filter var(--reveal-duration, 1.2s) cubic-bezier(0.16, 1, 0.3, 1);
		transition-delay: var(--reveal-delay, 0ms);
	}

	:global(.scroll-reveal--soft) {
		transform: translate3d(0, 0.75rem, 0);
		filter: blur(4px);
	}

	:global(.scroll-reveal--rise) {
		transform: translate3d(0, 1.5rem, 0);
		filter: blur(8px);
	}

	:global(.scroll-reveal--scale) {
		transform: translate3d(0, 1.25rem, 0) scale(0.96);
		filter: blur(6px);
		transform-origin: 50% 100%;
	}

	:global(.scroll-reveal--left) {
		transform: translate3d(-2.75rem, 0.65rem, 0) scale(0.98);
		filter: blur(8px);
	}

	:global(.scroll-reveal--right) {
		transform: translate3d(2.75rem, 0.65rem, 0) scale(0.98);
		filter: blur(8px);
	}

	:global(.scroll-reveal.scroll-reveal--visible) {
		opacity: 1;
		transform: translate3d(0, 0, 0) scale(1);
		filter: blur(0);
	}

	:global(.scroll-reveal.scroll-reveal--done) {
		will-change: auto;
		transition: none;
	}

	.stat-cell.scroll-reveal--done,
	.achievement-card.scroll-reveal--done,
	.network-panel.scroll-reveal--done,
	.title-seasons.scroll-reveal--done,
	.title-seasons-era.scroll-reveal--done,
	.network-feature.scroll-reveal--done {
		transition:
			border-color 0.3s ease,
			transform 0.3s ease,
			box-shadow 0.3s ease,
			background 0.3s ease,
			opacity 0.3s ease,
			filter 0.3s ease;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.scroll-reveal) {
			opacity: 1;
			transform: none;
			filter: none;
			transition: none;
			will-change: auto;
		}
	}

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
		gap: 1.25rem;
		margin-top: 2.5rem;
	}

	.hero-cta-primary {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.65rem;
	}

	.hero-armory-buttons {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.85rem;
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

	.network-panel {
		position: relative;
		margin-top: 1rem;
		padding: 1.75rem 2rem;
		overflow: hidden;
		border-radius: 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.07);
		background:
			radial-gradient(ellipse 90% 100% at 0% 50%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 55%),
			linear-gradient(160deg, rgba(22, 18, 36, 0.92), rgba(8, 6, 14, 0.98));
		backdrop-filter: blur(16px);
	}

	.network-panel:hover {
		border-color: color-mix(in srgb, var(--accent) 40%, transparent);
		transform: translateY(-3px);
		box-shadow:
			0 20px 50px rgba(0, 0, 0, 0.35),
			0 0 48px color-mix(in srgb, var(--accent) 14%, transparent);
	}

	.network-panel-sheen {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			125deg,
			color-mix(in srgb, var(--accent) 10%, transparent) 0%,
			transparent 45%,
			transparent 100%
		);
		pointer-events: none;
	}

	.network-panel-body {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
		gap: 2rem 2.5rem;
		align-items: center;
	}

	.network-panel-copy h3 {
		font-family: 'Syne', sans-serif;
		font-size: clamp(1.25rem, 3vw, 1.5rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: #eceaf4;
	}

	.network-panel-copy p {
		margin-top: 0.65rem;
		max-width: 42ch;
		font-size: 0.9375rem;
		line-height: 1.65;
		color: #7a7589;
	}

	.network-panel-features {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		list-style: none;
	}

	.network-feature {
		display: grid;
		grid-template-columns: 3.25rem minmax(0, 1fr);
		align-items: center;
		gap: 0.85rem;
		padding: 0.75rem 0.9rem;
		border-radius: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.06);
		background: rgba(255, 255, 255, 0.03);
	}

	.network-panel:hover .network-feature {
		border-color: color-mix(in srgb, var(--accent) 22%, transparent);
	}

	.network-feature-label {
		display: grid;
		place-items: center;
		height: 2rem;
		border-radius: 0.5rem;
		font-family: 'Syne', sans-serif;
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: var(--accent);
		background: color-mix(in srgb, var(--accent) 14%, transparent);
		border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
	}

	.network-feature-text {
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 1.4;
		color: #b8b4c4;
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
	}

	.achievement-card--wide {
		grid-column: span 2;
		flex-direction: row;
		align-items: flex-end;
		min-height: 10rem;
		padding: 1.75rem 2rem;
	}

	.achievement-card--wide.achievement-card--titles {
		flex-direction: column;
		align-items: stretch;
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

	.achievement-card--titles {
		flex-direction: column;
		align-items: stretch;
		gap: 0;
	}

	.titles-row {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 1.5rem;
		width: 100%;
		flex: 1;
	}

	.achievement-card--wide .titles-row {
		flex-direction: row;
		align-items: center;
		gap: 1.75rem 2rem;
	}

	.title-classes {
		position: relative;
		z-index: 1;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		flex-shrink: 0;
		max-width: 15rem;
		padding: 0.75rem;
		border-radius: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.06);
		background: rgba(255, 255, 255, 0.02);
	}

	.title-class {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.45rem 0.7rem;
		font-size: 0.8125rem;
		font-weight: 600;
		color: #eceaf4;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: rgba(8, 6, 14, 0.45);
		transition:
			border-color 0.25s ease,
			background 0.25s ease;
	}

	.title-class--main {
		border-color: color-mix(in srgb, var(--class-color) 45%, transparent);
		background: color-mix(in srgb, var(--class-color) 10%, rgba(8, 6, 14, 0.55));
	}

	.achievement-card--titles:hover .title-class {
		border-color: color-mix(in srgb, var(--class-color) 35%, transparent);
	}

	.title-class-dot {
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 50%;
		background: var(--class-color);
		box-shadow: 0 0 8px color-mix(in srgb, var(--class-color) 55%, transparent);
		flex-shrink: 0;
	}

	.title-class-badge {
		padding: 0.15rem 0.4rem;
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--class-color);
		background: color-mix(in srgb, var(--class-color) 14%, transparent);
		border-radius: 0.25rem;
	}

	.title-seasons {
		position: relative;
		z-index: 1;
		margin-top: 1.5rem;
		padding: 1.1rem 1.15rem 1.15rem;
		border-radius: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.06);
		background: rgba(255, 255, 255, 0.02);
	}

	.title-seasons-header {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 0.85rem 1.5rem;
		margin-bottom: 1rem;
		padding-bottom: 0.85rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.title-seasons-heading {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.title-seasons-label {
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: #6b6678;
	}

	.title-seasons-count {
		font-family: 'Syne', sans-serif;
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--purple-light);
	}

	.title-seasons-legends {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.45rem;
	}

	.title-seasons-legend {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 0.5rem 0.85rem;
	}

	.title-seasons-legend-item {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.6875rem;
		font-weight: 500;
		color: #8b8699;
	}

	.title-seasons-legend-dot {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		background: var(--legend-color);
		flex-shrink: 0;
	}

	.title-seasons-era + .title-seasons-era {
		margin-top: 1.1rem;
		padding-top: 1.1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	.title-seasons-era-label {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		margin: 0 0 0.7rem;
	}

	.title-seasons-era-chip {
		display: inline-flex;
		align-items: center;
		padding: 0.2rem 0.55rem;
		border-radius: 999px;
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--era-color);
		background: color-mix(in srgb, var(--era-color) 14%, transparent);
		border: 1px solid color-mix(in srgb, var(--era-color) 32%, transparent);
	}

	.title-seasons-era-count {
		font-size: 0.6875rem;
		font-weight: 500;
		color: #6b6678;
	}

	.title-seasons-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(13.5rem, 1fr));
		gap: 0.5rem 1rem;
		list-style: none;
		counter-reset: none;
	}

	.title-season {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		grid-template-rows: auto auto;
		align-items: start;
		gap: 0.35rem 0.6rem;
		min-width: 0;
		padding: 0.5rem 0.55rem;
		border-radius: 0.5rem;
		transition: background 0.2s ease;
	}

	.title-season:hover {
		background: rgba(255, 255, 255, 0.035);
	}

	.title-season-tag {
		grid-column: 1;
		grid-row: 1;
		padding-top: 0.1rem;
		font-family: 'Syne', sans-serif;
		font-size: 0.625rem;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		color: #6b6678;
		letter-spacing: 0.02em;
	}

	.title-season-name {
		grid-column: 2;
		grid-row: 1;
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 1.4;
		color: #eceaf4;
		letter-spacing: -0.01em;
		min-width: 0;
	}

	.title-season-classes {
		grid-column: 1 / -1;
		grid-row: 2;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		gap: 0.3rem;
	}

	.title-season-class {
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
		flex-shrink: 0;
		font-size: 0.625rem;
		font-weight: 600;
		color: var(--class-color);
		white-space: nowrap;
	}

	.title-season-mult {
		padding: 0.05rem 0.3rem;
		border-radius: 999px;
		font-family: 'Syne', sans-serif;
		font-size: 0.5625rem;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		line-height: 1.2;
		color: var(--class-color);
		background: color-mix(in srgb, var(--class-color) 18%, transparent);
		border: 1px solid color-mix(in srgb, var(--class-color) 35%, transparent);
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

		.network-panel {
			padding: 1.35rem 1.25rem;
		}

		.network-panel-body {
			grid-template-columns: 1fr;
			gap: 1.35rem;
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

		.achievement-card--wide .titles-row {
			flex-direction: column;
			align-items: stretch;
		}

		.achievement-card--titles .title-classes {
			max-width: none;
			width: 100%;
		}

		.title-seasons-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.title-seasons-legends {
			align-items: flex-start;
		}

		.title-seasons-legend {
			justify-content: flex-start;
		}

		.title-seasons-grid {
			grid-template-columns: 1fr;
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
