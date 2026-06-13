<script lang="ts">
	import { tick } from 'svelte';
	import {
		MAX_TALENT_POINTS,
		type TalentNodeData
	} from '$lib/talents';
	import {
		PREREQ_LINE_STROKE_WIDTH,
		TREE_BACKGROUND_IMAGES
	} from '$lib/data/tbc-talent-layouts';

	let {
		tree,
		specIndex,
		specName,
		nodes,
		accentColor = 'rgba(167, 139, 250, 0.95)',
		className = 'Mage'
	}: {
		tree: { spent_points?: number };
		specIndex: number;
		specName: string;
		nodes: TalentNodeData[];
		accentColor?: string;
		className?: string;
	} = $props();

	const TALENT_NODE_SIZE = 42;
	const TALENT_GAP_COL = 14;
	const TALENT_GAP_ROW = 14;

	const maxRow = $derived(nodes.length ? Math.max(...nodes.map((n) => n.row)) : 0);
	const maxCol = $derived(nodes.length ? Math.max(...nodes.map((n) => n.col)) : 0);
	const gridW = $derived(
		maxCol > 0 ? maxCol * TALENT_NODE_SIZE + (maxCol - 1) * TALENT_GAP_COL : 0
	);
	const gridH = $derived(
		maxRow > 0 ? maxRow * TALENT_NODE_SIZE + (maxRow - 1) * TALENT_GAP_ROW : 0
	);
	/** Small nudge so the tree sits visually centered in the spec panel. */
	const GRID_CENTER_NUDGE = 4;
	const bgImage = $derived(TREE_BACKGROUND_IMAGES[className]?.[specName]);

	let containerEl: HTMLDivElement | undefined = $state();
	let arrowPaths = $state<Array<{ d: string; toHasPoints: boolean }>>([]);

	const arrowheadId = `arrow-${specIndex}`;
	const arrowheadGreyId = `arrow-grey-${specIndex}`;
	const greyStroke = 'rgba(120,120,120,0.55)';

	function edgeMidpoint(
		rect: DOMRect,
		containerRect: DOMRect,
		targetX: number,
		targetY: number
	): { x: number; y: number } {
		const left = rect.left - containerRect.left;
		const right = rect.right - containerRect.left;
		const top = rect.top - containerRect.top;
		const bottom = rect.bottom - containerRect.top;
		const cx = left + rect.width / 2;
		const cy = top + rect.height / 2;
		const edges = [
			{ x: left, y: cy },
			{ x: right, y: cy },
			{ x: cx, y: top },
			{ x: cx, y: bottom }
		];
		let best = edges[0];
		let bestDist = (targetX - best.x) ** 2 + (targetY - best.y) ** 2;
		for (let i = 1; i < edges.length; i++) {
			const d = (targetX - edges[i].x) ** 2 + (targetY - edges[i].y) ** 2;
			if (d < bestDist) {
				bestDist = d;
				best = edges[i];
			}
		}
		return best;
	}

	async function measureArrows() {
		await tick();
		const container = containerEl;
		if (!container) return;

		const endpoints: Array<{
			from: { row: number; col: number };
			to: { row: number; col: number };
			toHasPoints: boolean;
		}> = [];

		for (const node of nodes) {
			for (const prereq of node.prerequisites ?? []) {
				endpoints.push({
					from: prereq,
					to: { row: node.row, col: node.col },
					toHasPoints: (node.rank ?? 0) > 0
				});
			}
		}

		if (endpoints.length === 0) {
			arrowPaths = [];
			return;
		}

		const containerRect = container.getBoundingClientRect();
		const paths: Array<{ d: string; toHasPoints: boolean }> = [];

		for (const { from, to, toHasPoints } of endpoints) {
			const fromEl = container.querySelector(
				`[data-cell="${from.row},${from.col}"]`
			) as HTMLElement | null;
			const toEl = container.querySelector(
				`[data-cell="${to.row},${to.col}"]`
			) as HTMLElement | null;
			if (!fromEl || !toEl) continue;

			const fromRect = fromEl.getBoundingClientRect();
			const toRect = toEl.getBoundingClientRect();
			const toCenterX = toRect.left - containerRect.left + toRect.width / 2;
			const toCenterY = toRect.top - containerRect.top + toRect.height / 2;
			const fromCenterX = fromRect.left - containerRect.left + fromRect.width / 2;
			const fromCenterY = fromRect.top - containerRect.top + fromRect.height / 2;
			const start = edgeMidpoint(fromRect, containerRect, toCenterX, toCenterY);
			const end = edgeMidpoint(toRect, containerRect, fromCenterX, fromCenterY);

			if (
				!Number.isFinite(start.x) ||
				!Number.isFinite(start.y) ||
				!Number.isFinite(end.x) ||
				!Number.isFinite(end.y)
			) {
				continue;
			}

			const hasLength =
				Math.abs(end.x - start.x) > 0.5 || Math.abs(end.y - start.y) > 0.5;
			if (!hasLength) continue;

			paths.push({ d: `M ${start.x} ${start.y} L ${end.x} ${end.y}`, toHasPoints });
		}

		arrowPaths = paths;
	}

	$effect(() => {
		nodes;
		requestAnimationFrame(() => {
			measureArrows();
		});
	});
</script>

<div
	class="talent-tree"
	style:min-width="{Math.max(gridW + 56, 300)}px"
	style:background={bgImage
		? `linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url(${bgImage})`
		: undefined}
>
	<p class="tree-title">{specName} {tree.spent_points ?? 0}/{MAX_TALENT_POINTS}</p>

	<div
		class="tree-grid-wrap"
		bind:this={containerEl}
		style:width="{gridW}px"
		style:min-height="{gridH}px"
		style:transform="translateX({GRID_CENTER_NUDGE}px)"
	>
		<svg
			class="tree-arrows"
			width={gridW}
			height={gridH}
			aria-hidden="true"
		>
			<defs>
				<marker
					id={arrowheadId}
					markerUnits="userSpaceOnUse"
					markerWidth="5"
					markerHeight="5"
					refX="4"
					refY="2.5"
					orient="auto"
				>
					<path d="M0,0 L4,2.5 L0,5 Z" fill={accentColor} />
				</marker>
				<marker
					id={arrowheadGreyId}
					markerUnits="userSpaceOnUse"
					markerWidth="5"
					markerHeight="5"
					refX="4"
					refY="2.5"
					orient="auto"
				>
					<path d="M0,0 L4,2.5 L0,5 Z" fill={greyStroke} />
				</marker>
			</defs>
			{#each arrowPaths as path, k (k)}
				<path
					d={path.d}
					fill="none"
					stroke={path.toHasPoints ? accentColor : greyStroke}
					stroke-width={PREREQ_LINE_STROKE_WIDTH}
					stroke-linecap="round"
					stroke-linejoin="round"
					marker-end={`url(#${path.toHasPoints ? arrowheadId : arrowheadGreyId})`}
				/>
			{/each}
		</svg>

		<div
			class="tree-grid"
			style:grid-template-columns="repeat({maxCol}, {TALENT_NODE_SIZE}px)"
			style:grid-template-rows="repeat({maxRow}, {TALENT_NODE_SIZE}px)"
			style:column-gap="{TALENT_GAP_COL}px"
			style:row-gap="{TALENT_GAP_ROW}px"
			style:width="{gridW}px"
			style:min-height="{gridH}px"
		>
			{#each nodes as node, j (j)}
				<div
					class="tree-cell"
					data-cell="{node.row},{node.col}"
					style:grid-column={node.col}
					style:grid-row={node.row}
				>
					{#if node.blank}
						<div class="talent-spacer"></div>
					{:else if node.spellId != null}
						<a
							class="talent-node talent-node--link"
							class:talent-node--filled={node.rank > 0}
							href="https://www.wowhead.com/tbc/spell={node.spellId}"
							target="_blank"
							rel="noopener noreferrer"
							style:--talent-accent={accentColor}
							style:background-image={node.iconUrl ? `url("${node.iconUrl}")` : undefined}
						>
							<span class="talent-rank">{node.rank}/{node.maxRank}</span>
							<span class="talent-name">{node.name}</span>
						</a>
					{:else}
						<div
							class="talent-node"
							class:talent-node--filled={node.rank > 0}
							title={[node.name, node.description].filter(Boolean).join('\n\n')}
							style:--talent-accent={accentColor}
							style:background-image={node.iconUrl ? `url("${node.iconUrl}")` : undefined}
						>
							<span class="talent-rank">{node.rank}/{node.maxRank}</span>
							<span class="talent-name">{node.name}</span>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.talent-tree {
		flex: 0 1 auto;
		margin-inline: auto;
		padding: 1rem 2.25rem;
		border-radius: 0.25rem;
		background-size: cover;
		background-position: center;
		box-shadow:
			inset 0 0 40px rgba(0, 0, 0, 0.4),
			0 2px 8px rgba(0, 0, 0, 0.15);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tree-title {
		font-size: 0.8125rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		color: #9b97ad;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.tree-grid-wrap {
		position: relative;
		padding: 0;
		margin-inline: auto;
		box-sizing: border-box;
	}

	.tree-arrows {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
		pointer-events: none;
		overflow: visible;
		display: block;
	}

	.tree-grid {
		display: grid;
		justify-items: center;
		align-items: center;
		position: relative;
		z-index: 1;
		padding: 0;
		margin-inline: auto;
		box-sizing: border-box;
	}

	.tree-cell {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.talent-spacer {
		width: 42px;
		height: 42px;
	}

	.talent-node {
		position: relative;
		width: 42px;
		height: 42px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		flex-shrink: 0;
		overflow: hidden;
		background-color: rgba(25, 22, 18, 0.95);
		border: 1px solid rgba(120, 120, 120, 1);
		box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.6);
		filter: grayscale(100%);
		opacity: 0.88;
		transition:
			opacity 0.2s ease,
			filter 0.2s ease,
			box-shadow 0.2s ease;
		background-size: cover;
		background-position: center;
		text-decoration: none;
		color: inherit;
	}

	.talent-node--link {
		cursor: pointer;
	}

	.talent-node--filled {
		background-color: rgba(70, 55, 25, 0.85);
		border: 2px solid var(--talent-accent, rgba(167, 139, 250, 0.95));
		box-shadow:
			inset 0 0 14px rgba(0, 0, 0, 0.25),
			0 0 10px rgba(0, 0, 0, 0.5);
		filter: none;
		opacity: 1;
	}

	.talent-node:not(.talent-node--filled):hover {
		opacity: 1;
		box-shadow:
			inset 0 0 12px rgba(0, 0, 0, 0.4),
			0 0 8px rgba(140, 140, 140, 0.25);
	}

	.talent-rank {
		position: absolute;
		bottom: 0;
		right: -3px;
		font-size: 0.7rem;
		font-weight: 700;
		line-height: 1;
		color: rgba(255, 235, 200, 0.98);
		text-shadow: 0 0 2px rgba(0, 0, 0, 0.9);
		background: rgba(0, 0, 0, 0.65);
		padding: 3px 5px;
		border-radius: 2px;
	}

	.talent-name {
		display: none;
	}
</style>
