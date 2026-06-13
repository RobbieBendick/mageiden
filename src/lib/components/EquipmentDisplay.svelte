<script lang="ts">
	import { onMount } from 'svelte';
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

	onMount(() => {
		refreshWowheadTooltips();
	});

	$effect(() => {
		character.equipment;
		queueMicrotask(() => refreshWowheadTooltips());
	});
</script>

<section class="equipment-panel">
	<header class="character-info">
		{#if character.avatarUrl}
			<img class="avatar" src={character.avatarUrl} alt="" />
		{/if}
		<div class="character-meta">
			<h1 style="color: {classColor(character.className)}">
				{character.name}-{character.realmName ?? character.realm}
			</h1>
			<p class="submeta">
				Level {character.level}
				{character.race}
				<span style="color: {classColor(character.className)}">{character.className}</span>
				{#if character.equippedItemLevel}
					<span class="dot">·</span>
					<span>{character.equippedItemLevel} ilvl</span>
				{/if}
			</p>
		</div>
	</header>

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
							<span class="item-name item-name--left" style="color: {qualityColor(item.quality)}">
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
							<span class="item-name item-name--right" style="color: {qualityColor(item.quality)}">
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
</section>

<style>
	.equipment-panel {
		margin-top: 2rem;
		border-radius: 0.75rem;
		overflow: hidden;
		background: rgba(12, 10, 20, 0.85);
		border: 1px solid rgba(255, 255, 255, 0.06);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	}

	.character-info {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.25rem;
		background: rgba(0, 0, 0, 0.15);
	}

	.avatar {
		width: 6.25rem;
		height: 6.25rem;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	.character-meta h1 {
		font-family: 'Syne', sans-serif;
		font-size: clamp(1.5rem, 4vw, 2rem);
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.submeta {
		margin-top: 0.35rem;
		font-size: 1rem;
		color: #9b97ad;
	}

	.dot {
		margin: 0 0.25rem;
	}

	.paper-doll {
		display: flex;
		justify-content: space-between;
		gap: 2rem;
		max-width: 50rem;
		margin: 0 auto;
		min-height: 36rem;
		padding: 1rem 1.25rem 1.25rem;
		background: rgba(0, 0, 0, 0.3);
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
		border-radius: 0.25rem;
		text-decoration: none;
		transition:
			transform 0.2s ease,
			border-color 0.2s ease,
			background 0.2s ease;
	}

	.item-link:hover {
		transform: scale(1.05);
		border-color: rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.08);
	}

	.item-icon {
		width: 100%;
		height: 100%;
		object-fit: contain;
		border-radius: 0.2rem;
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
