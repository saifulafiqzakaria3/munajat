<script lang="ts">
	import { DHIKR_LIST } from '$lib/data/dhikr';
	import { counter } from '$lib/stores/counter.svelte';
	import DhikrTabs from '$lib/components/DhikrTabs.svelte';
	import CircularRing from '$lib/components/CircularRing.svelte';
	import TapZone from '$lib/components/TapZone.svelte';

	let activeId = $state(DHIKR_LIST[0].id);

	let activeDhikr = $derived(DHIKR_LIST.find((d) => d.id === activeId) ?? DHIKR_LIST[0]);
	let activeState = $derived(counter.getState(activeId));

	function handleTap() {
		counter.increment(activeId);
	}

	function handleReset() {
		counter.reset(activeId);
	}
</script>

<svelte:head>
	<title>Munajat</title>
	<meta name="description" content="Intimate remembrance of Allah" />
</svelte:head>

<div class="screen">
	<header class="app-header">
		<span class="app-name">منـاجـات</span>
		<!-- Extension point: settings icon button goes here -->
	</header>

	<DhikrTabs {activeId} onSelect={(id) => (activeId = id)} />

	<TapZone onTap={handleTap} done={activeState.done}>
		<CircularRing
			progress={activeState.progress}
			count={activeState.count}
			target={activeState.target}
			done={activeState.done}
		/>

		<div class="dhikr-text" dir="rtl">
			<p class="arabic">{activeDhikr.arabic}</p>
		</div>

		<div class="dhikr-meta">
			<p class="transliteration">{activeDhikr.transliteration}</p>
			<p class="translation">{activeDhikr.translation}</p>
			{#if activeDhikr.source}
				<span class="source-badge">{activeDhikr.source}</span>
			{/if}
		</div>
	</TapZone>

	<footer class="action-bar">
		{#if activeState.done}
			<p class="done-msg">Alhamdulillah ✓</p>
		{:else}
			<p class="remaining">{activeState.target - activeState.count} remaining</p>
		{/if}
		<button class="reset-btn" onclick={handleReset} aria-label="Reset count">
			Reset
		</button>
	</footer>
</div>

<style>
	.screen {
		display: flex;
		flex-direction: column;
		height: 100dvh;
		background: #0b0f1a;
		color: #f5f0e8;
		max-width: 480px;
		margin: 0 auto;
		overflow: hidden;
	}

	.app-header {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px 20px;
		padding-top: max(16px, env(safe-area-inset-top));
	}

	.app-name {
		font-family: 'Amiri', serif;
		font-size: 1.5rem;
		color: #c9a84c;
		letter-spacing: 0.05em;
	}

	.dhikr-text {
		text-align: center;
	}

	.arabic {
		font-family: 'Amiri', serif;
		font-size: 2.25rem;
		line-height: 1.4;
		color: #f5f0e8;
		margin: 0;
	}

	.dhikr-meta {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.transliteration {
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		font-weight: 500;
		color: #f5f0e8;
		margin: 0;
	}

	.translation {
		font-family: 'Inter', sans-serif;
		font-size: 0.8rem;
		color: #8b8fa8;
		margin: 0;
	}

	.source-badge {
		font-family: 'Inter', sans-serif;
		font-size: 0.7rem;
		color: #c9a84c;
		border: 1px solid #c9a84c44;
		border-radius: 99px;
		padding: 2px 10px;
		margin-top: 4px;
	}

	.action-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 24px;
		padding-bottom: max(16px, env(safe-area-inset-bottom));
		border-top: 1px solid #1e2535;
	}

	.remaining {
		font-family: 'Inter', sans-serif;
		font-size: 0.85rem;
		color: #8b8fa8;
		margin: 0;
	}

	.done-msg {
		font-family: 'Inter', sans-serif;
		font-size: 0.9rem;
		color: #22c55e;
		font-weight: 500;
		margin: 0;
	}

	.reset-btn {
		font-family: 'Inter', sans-serif;
		font-size: 0.85rem;
		font-weight: 500;
		color: #8b8fa8;
		background: none;
		border: 1px solid #1e2535;
		border-radius: 8px;
		padding: 8px 18px;
		cursor: pointer;
		transition: color 0.2s, border-color 0.2s;
	}

	.reset-btn:hover {
		color: #f5f0e8;
		border-color: #8b8fa8;
	}
</style>
