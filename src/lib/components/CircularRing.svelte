<script lang="ts">
	interface Props {
		progress: number; // 0–1
		count: number;
		target: number;
		done: boolean;
	}

	let { progress, count, target, done }: Props = $props();

	const SIZE = 240;
	const STROKE = 12;
	const R = (SIZE - STROKE) / 2;
	const CIRCUMFERENCE = 2 * Math.PI * R;

	let dashOffset = $derived(CIRCUMFERENCE * (1 - progress));
	let ringColor = $derived(done ? '#22c55e' : '#C9A84C');
</script>

<div class="ring-wrapper" aria-label="{count} out of {target}">
	<svg width={SIZE} height={SIZE} viewBox="0 0 {SIZE} {SIZE}" class="ring-svg">
		<!-- Track -->
		<circle
			cx={SIZE / 2}
			cy={SIZE / 2}
			r={R}
			fill="none"
			stroke="#1E2535"
			stroke-width={STROKE}
		/>
		<!-- Progress arc -->
		<circle
			cx={SIZE / 2}
			cy={SIZE / 2}
			r={R}
			fill="none"
			stroke={ringColor}
			stroke-width={STROKE}
			stroke-linecap="round"
			stroke-dasharray={CIRCUMFERENCE}
			stroke-dashoffset={dashOffset}
			transform="rotate(-90 {SIZE / 2} {SIZE / 2})"
			class="ring-arc"
		/>
	</svg>
	<div class="ring-center">
		<span class="count-number" class:done>{count}</span>
		<span class="count-target">/ {target}</span>
	</div>
</div>

<style>
	.ring-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 240px;
		height: 240px;
	}

	.ring-svg {
		position: absolute;
		inset: 0;
	}

	.ring-arc {
		transition:
			stroke-dashoffset 0.3s ease,
			stroke 0.4s ease;
	}

	.ring-center {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		z-index: 1;
	}

	.count-number {
		font-family: 'Inter', sans-serif;
		font-size: 3.5rem;
		font-weight: 700;
		color: #f5f0e8;
		line-height: 1;
		transition: color 0.4s ease;
	}

	.count-number.done {
		color: #22c55e;
	}

	.count-target {
		font-family: 'Inter', sans-serif;
		font-size: 0.9rem;
		color: #8b8fa8;
	}
</style>
