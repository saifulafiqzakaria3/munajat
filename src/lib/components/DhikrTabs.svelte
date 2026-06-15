<script lang="ts">
	import { DHIKR_LIST, type DhikrItem } from '$lib/data/dhikr';

	interface Props {
		activeId: string;
		onSelect: (id: string) => void;
	}

	let { activeId, onSelect }: Props = $props();
</script>

<nav class="tabs-nav" aria-label="Dhikr selection">
	<ul class="tabs-list" role="tablist">
		{#each DHIKR_LIST as dhikr (dhikr.id)}
			<li role="presentation">
				<button
					role="tab"
					aria-selected={activeId === dhikr.id}
					class="tab-btn"
					class:active={activeId === dhikr.id}
					onclick={() => onSelect(dhikr.id)}
				>
					{dhikr.transliteration}
				</button>
			</li>
		{/each}
		<!-- Extension point: "+" button for adding custom dhikr will go here -->
	</ul>
</nav>

<style>
	.tabs-nav {
		width: 100%;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
	}

	.tabs-nav::-webkit-scrollbar {
		display: none;
	}

	.tabs-list {
		display: flex;
		gap: 0;
		list-style: none;
		margin: 0;
		padding: 0;
		border-bottom: 1px solid #1e2535;
	}

	.tab-btn {
		padding: 14px 20px;
		font-family: 'Inter', sans-serif;
		font-size: 0.875rem;
		font-weight: 500;
		color: #8b8fa8;
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		cursor: pointer;
		white-space: nowrap;
		transition:
			color 0.2s,
			border-color 0.2s;
		margin-bottom: -1px;
	}

	.tab-btn.active {
		color: #c9a84c;
		border-bottom-color: #c9a84c;
	}

	.tab-btn:not(.active):hover {
		color: #f5f0e8;
	}
</style>
