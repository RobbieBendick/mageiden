<script lang="ts">
	import { onMount } from 'svelte';
	import ArenaStats from '$lib/components/ArenaStats.svelte';
	import TBCTalentDisplay from '$lib/components/TBCTalentDisplay.svelte';
	import {
		LEFT_SLOTS,
		RIGHT_SLOTS,
		buildWowheadAttrs,
		classColor,
		getItemForSlot,
		qualityColor,
		refreshWowheadTooltips,
		type ArmoryCharacter
	} from '$lib/armory';

	let { character }: { character: ArmoryCharacter } = $props();

	const allItems = $derived(character.equipment);
	const hasArena = $derived(
		character.arenaBrackets != null && Object.keys(character.arenaBrackets).length > 0
	);
	const factionLabel = $derived(
		character.faction === 'ALLIANCE' ? 'Alliance' : 'Horde'
	);

	onMount(() => {
		refreshWowheadTooltips();
	});

	$effect(() => {
		character.equipment;
		queueMicrotask(() => refreshWowheadTooltips());
	});
</script>

<div class="armory-content">
	<header class="character-hero">
		<div class="badge">
			<span class="badge-dot"></span>
			{factionLabel} · Armory
		</div>

		<div class="hero-row">
			{#if character.avatarUrl}
				<img class="avatar" src={character.avatarUrl} alt="" />
			{/if}
			<div class="character-meta">
				<h1 style="color: {classColor(character.className)}">
					{character.name}
					<span class="realm">· {character.realmName ?? character.realm}</span>
				</h1>
				<p class="submeta">
					Level {character.level}
					{character.race}
					<span style="color: {classColor(character.className)}">{character.className}</span>
					{#if character.spec}
						<span class="dot">·</span>
						<span>{character.spec}</span>
					{/if}
					{#if character.equippedItemLevel}
						<span class="dot">·</span>
						<span class="ilvl">{character.equippedItemLevel} ilvl</span>
					{/if}
				</p>
				{#if character.guild}
					<p class="guild">&lt;{character.guild}&gt;</p>
				{/if}
			</div>
		</div>
	</header>

	<section class="gear-section">
		<div class="section-header">
			<p class="section-eyebrow">Equipment</p>
			<h2>Gear</h2>
		</div>

		<article class="gear-card">
			<div class="paper-doll">
				<div class="slot-column slot-column--left">
					{#each LEFT_SLOTS as slotType}
						{@const item = getItemForSlot(allItems, slotType)}
						<div class="equipment-slot">
							{#if item}
								<a
									href="https://www.wowhead.com/tbc/item={item.itemId}"
									data-wowhead={buildWowheadAttrs(item, allItems)}
									data-wh-icon-size="large"
									data-wh-rename-link="true"
									data-wh-color-link="true"
									class="item-link"
									style="color: {qualityColor(item.quality)}"
								>
									{#if item.iconUrl}
										<img class="item-icon" src={item.iconUrl} alt="" />
									{/if}
									<span
										class="item-name item-name--left"
										style="color: {qualityColor(item.quality)}"
									>
										{item.itemName}
									</span>
								</a>
							{:else}
								<div class="empty-slot"></div>
							{/if}
						</div>
					{/each}
				</div>

				<div class="slot-column slot-column--right">
					{#each RIGHT_SLOTS as slotType}
						{@const item = getItemForSlot(allItems, slotType)}
						<div class="equipment-slot">
							{#if item}
								<a
									href="https://www.wowhead.com/tbc/item={item.itemId}"
									data-wowhead={buildWowheadAttrs(item, allItems)}
									data-wh-icon-size="large"
									data-wh-rename-link="true"
									data-wh-color-link="true"
									class="item-link item-link--right"
									style="color: {qualityColor(item.quality)}"
								>
									{#if item.iconUrl}
										<img class="item-icon" src={item.iconUrl} alt="" />
									{/if}
									<span
										class="item-name item-name--right"
										style="color: {qualityColor(item.quality)}"
									>
										{item.itemName}
									</span>
								</a>
							{:else}
								<div class="empty-slot"></div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</article>
	</section>

	{#if hasArena && character.arenaBrackets}
		<section class="arena-section">
			<ArenaStats brackets={character.arenaBrackets} />
		</section>
	{/if}

	{#if character.specializations}
		<section class="talent-section">
			<TBCTalentDisplay
				specializations={character.specializations}
				className={character.className}
			/>
		</section>
	{/if}
</div>

<style>
	.armory-content {
		margin-top: 2rem;
	}

	.character-hero {
		margin-bottom: 3rem;
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

	.hero-row {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-top: 1.5rem;
	}

	.avatar {
		width: 7rem;
		height: 7rem;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid var(--purple-border);
		box-shadow:
			0 0 40px var(--purple-glow),
			0 4px 16px rgba(0, 0, 0, 0.35);
		flex-shrink: 0;
	}

	.character-meta h1 {
		font-family: 'Syne', sans-serif;
		font-size: clamp(1.75rem, 5vw, 2.75rem);
		font-weight: 800;
		line-height: 1.1;
		letter-spacing: -0.02em;
	}

	.realm {
		color: #9b97ad;
		font-weight: 700;
	}

	.submeta {
		margin-top: 0.6rem;
		font-size: 1rem;
		line-height: 1.6;
		color: #9b97ad;
	}

	.guild {
		margin-top: 0.35rem;
		font-size: 0.875rem;
		color: #7a7589;
	}

	.dot {
		margin: 0 0.25rem;
	}

	.ilvl {
		color: var(--purple-light);
		font-weight: 500;
	}

	.gear-section,
	.arena-section,
	.talent-section {
		margin-top: 3.5rem;
	}

	.section-header {
		margin-bottom: 1.25rem;
	}

	.section-eyebrow {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--purple-light);
	}

	.section-header h2 {
		margin-top: 0.5rem;
		font-family: 'Syne', sans-serif;
		font-size: clamp(1.5rem, 4vw, 2rem);
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.gear-card {
		padding: 1.5rem 1.25rem 1.75rem;
		background: linear-gradient(145deg, rgba(20, 16, 32, 0.9), rgba(10, 8, 18, 0.95));
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 1rem;
		backdrop-filter: blur(12px);
	}

	.paper-doll {
		display: flex;
		justify-content: space-between;
		gap: 2rem;
		max-width: 50rem;
		margin: 0 auto;
		padding: 0.5rem 0.75rem;
	}

	.slot-column {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 4rem;
		flex-shrink: 0;
	}

	.slot-column--right {
		align-items: flex-end;
	}

	.equipment-slot {
		position: relative;
		width: 4rem;
		height: 4rem;
	}

	.item-link {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.375rem;
		text-decoration: none;
		background: rgba(0, 0, 0, 0.25);
		transition:
			transform 0.2s ease,
			border-color 0.2s ease,
			background 0.2s ease,
			box-shadow 0.2s ease;
	}

	.item-link:hover {
		transform: scale(1.05);
		border-color: var(--purple-border);
		background: rgba(255, 255, 255, 0.06);
		box-shadow: 0 0 20px var(--purple-glow);
	}

	.item-icon {
		width: 100%;
		height: 100%;
		object-fit: contain;
		border-radius: 0.25rem;
	}

	.item-name {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		font-size: 0.8rem;
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 16rem;
		pointer-events: none;
	}

	.item-name--left {
		left: calc(100% + 0.5rem);
		text-align: left;
	}

	.item-name--right {
		right: calc(100% + 0.5rem);
		text-align: right;
	}

	.item-link--right {
		margin-left: auto;
	}

	.empty-slot {
		width: 100%;
		height: 100%;
	}

	@media (max-width: 900px) {
		.paper-doll {
			gap: 1rem;
		}

		.slot-column,
		.equipment-slot {
			width: 3.5rem;
			height: 3.5rem;
		}

		.item-name {
			font-size: 0.72rem;
			max-width: 10rem;
		}
	}

	@media (max-width: 640px) {
		.hero-row {
			flex-direction: column;
			align-items: flex-start;
		}

		.paper-doll {
			flex-direction: column;
			align-items: center;
		}

		.slot-column {
			width: min(100%, 20rem);
		}

		.equipment-slot {
			width: 3rem;
			height: 3rem;
		}

		.item-name {
			max-width: 8rem;
		}
	}
</style>
