<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onTap: () => void;
		done: boolean;
		children: Snippet;
	}

	let { onTap, done, children }: Props = $props();

	let tapping = $state(false);

	function handleTap(e: Event) {
		// Ignore if the tap originated from a button or interactive child
		const target = e.target as HTMLElement;
		if (target.closest('button, a, input')) return;
		if (done) return;

		tapping = true;
		onTap();

		if (navigator.vibrate) {
			navigator.vibrate(30);
		}

		setTimeout(() => (tapping = false), 150);
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="tap-zone"
	class:tapping
	class:done
	onclick={handleTap}
	role="button"
	tabindex="0"
	aria-label="Tap to count"
	onkeydown={(e) => e.key === ' ' || e.key === 'Enter' ? handleTap(e) : null}
>
	{@render children()}
</div>

<style>
	.tap-zone {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 24px;
		width: 100%;
		cursor: pointer;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		transition: opacity 0.15s;
	}

	.tap-zone.tapping {
		opacity: 0.85;
	}

	.tap-zone.done {
		cursor: default;
	}
</style>
