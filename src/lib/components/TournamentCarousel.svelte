<script lang="ts">
	export type TournamentSlide = {
		src: string;
		alt: string;
		href?: string;
		label: string;
	};

	let { slides }: { slides: TournamentSlide[] } = $props();

	let active = $state(0);

	const hasMultiple = $derived(slides.length > 1);
	const current = $derived(slides[active]);

	function goTo(index: number) {
		if (index < 0 || index >= slides.length) return;
		active = index;
	}

	function prev() {
		goTo((active - 1 + slides.length) % slides.length);
	}

	function next() {
		goTo((active + 1) % slides.length);
	}

	function onKeydown(event: KeyboardEvent) {
		if (!hasMultiple) return;
		if (event.key === 'ArrowLeft') prev();
		if (event.key === 'ArrowRight') next();
	}
</script>

<svelte:window onkeydown={onKeydown} />

<div
	class="carousel"
	role="region"
	aria-label="Tournament results"
	aria-roledescription="carousel"
>
	<div class="carousel-viewport">
		<div class="carousel-track" style="--active: {active}">
			{#each slides as slide, i}
				<div
					class="carousel-slide"
					aria-hidden={i !== active}
					id="tournament-slide-{i}"
				>
					{#if slide.href}
						<a
							href={slide.href}
							class="carousel-slide-link"
							target="_blank"
							rel="noopener noreferrer"
							tabindex={i === active ? 0 : -1}
						>
							<img src={slide.src} alt={slide.alt} width="960" height="540" loading="lazy" />
						</a>
					{:else}
						<img src={slide.src} alt={slide.alt} width="960" height="540" loading="lazy" />
					{/if}
				</div>
			{/each}
		</div>

		{#if hasMultiple}
			<button
				type="button"
				class="carousel-btn carousel-btn--prev"
				aria-label="Previous tournament result"
				onclick={prev}
			>
				<span aria-hidden="true">‹</span>
			</button>
			<button
				type="button"
				class="carousel-btn carousel-btn--next"
				aria-label="Next tournament result"
				onclick={next}
			>
				<span aria-hidden="true">›</span>
			</button>
		{/if}

		<div class="carousel-footer">
			<p class="carousel-label">{current.label}</p>
			{#if hasMultiple}
				<p class="carousel-count" aria-live="polite">
					<span class="carousel-count-current">{active + 1}</span>
					<span class="carousel-count-sep">/</span>
					<span>{slides.length}</span>
				</p>
			{/if}
		</div>
	</div>

	{#if hasMultiple}
		<div class="carousel-dots" role="tablist" aria-label="Choose tournament result">
			{#each slides as slide, i}
				<button
					type="button"
					class="carousel-dot"
					class:carousel-dot--active={i === active}
					role="tab"
					aria-selected={i === active}
					aria-controls="tournament-slide-{i}"
					aria-label={slide.label}
					onclick={() => goTo(i)}
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.carousel {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
		min-width: 0;
	}

	.carousel-viewport {
		position: relative;
		overflow: hidden;
		border-radius: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: #0a0812;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
	}

	.carousel-track {
		display: flex;
		transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
		transform: translateX(calc(var(--active) * -100%));
	}

	@media (prefers-reduced-motion: reduce) {
		.carousel-track {
			transition: none;
		}
	}

	.carousel-slide {
		flex: 0 0 100%;
		min-width: 0;
	}

	.carousel-slide-link {
		display: block;
		transition: opacity 0.2s ease;
	}

	.carousel-slide-link:hover {
		opacity: 0.92;
	}

	.carousel-slide img {
		display: block;
		width: 100%;
		height: auto;
		vertical-align: middle;
	}

	.carousel-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.75rem 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		background: linear-gradient(180deg, rgba(12, 10, 20, 0.6), rgba(8, 6, 14, 0.9));
	}

	.carousel-label {
		font-size: 0.8125rem;
		font-weight: 600;
		color: #eceaf4;
		letter-spacing: 0.02em;
	}

	.carousel-count {
		display: flex;
		align-items: baseline;
		gap: 0.15rem;
		font-family: 'Syne', sans-serif;
		font-size: 0.8125rem;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		color: #6b6678;
	}

	.carousel-count-current {
		color: var(--purple-light);
	}

	.carousel-btn {
		position: absolute;
		top: 50%;
		z-index: 2;
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		padding: 0;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 999px;
		color: #eceaf4;
		background: rgba(8, 6, 14, 0.82);
		backdrop-filter: blur(10px);
		cursor: pointer;
		transform: translateY(-50%);
		transition:
			border-color 0.2s ease,
			background 0.2s ease,
			transform 0.2s ease;
	}

	.carousel-btn span {
		font-size: 1.35rem;
		line-height: 1;
		margin-top: -0.1rem;
	}

	.carousel-btn:hover {
		border-color: var(--purple-border);
		background: rgba(124, 58, 237, 0.2);
	}

	.carousel-btn--prev {
		left: 0.75rem;
	}

	.carousel-btn--next {
		right: 0.75rem;
	}

	.carousel-dots {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
	}

	.carousel-dot {
		width: 0.5rem;
		height: 0.5rem;
		padding: 0;
		border: none;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.18);
		cursor: pointer;
		transition:
			width 0.25s ease,
			background 0.25s ease;
	}

	.carousel-dot--active {
		width: 1.5rem;
		background: var(--purple-light);
	}

	.carousel-dot:hover:not(.carousel-dot--active) {
		background: rgba(167, 139, 250, 0.45);
	}
</style>
