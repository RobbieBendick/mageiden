export type ScrollRevealVariant = 'rise' | 'scale' | 'soft' | 'left' | 'right';

const SCROLL_REVEAL_VARIANTS: ScrollRevealVariant[] = ['rise', 'scale', 'soft', 'left', 'right'];

export type ScrollRevealOptions = {
	delay?: number;
	variant?: ScrollRevealVariant;
	threshold?: number;
	rootMargin?: string;
	once?: boolean;
};

const REVEAL_DURATION_MS = 1200;

function prefersReducedMotion(): boolean {
	return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function scrollReveal(node: HTMLElement, options: ScrollRevealOptions = {}) {
	let {
		delay = 0,
		variant = 'rise',
		threshold = 0.14,
		rootMargin = '0px 0px -4% 0px',
		once = true
	} = options;

	node.classList.add('scroll-reveal', `scroll-reveal--${variant}`);

	function applyDelay(value: number) {
		if (value > 0) {
			node.style.setProperty('--reveal-delay', `${value}ms`);
		} else {
			node.style.removeProperty('--reveal-delay');
		}
	}

	function reveal() {
		node.classList.add('scroll-reveal--visible');
		window.setTimeout(() => {
			node.classList.add('scroll-reveal--done');
		}, REVEAL_DURATION_MS + delay);
	}

	applyDelay(delay);

	if (prefersReducedMotion()) {
		node.classList.add('scroll-reveal--visible', 'scroll-reveal--done');
		return { update: () => {}, destroy: () => {} };
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				reveal();
				if (once) observer.unobserve(node);
			}
		},
		{ threshold, rootMargin }
	);

	observer.observe(node);

	return {
		update(newOptions: ScrollRevealOptions = {}) {
			({
				delay = 0,
				variant = 'rise',
				threshold = 0.14,
				rootMargin = '0px 0px -4% 0px',
				once = true
			} = newOptions);
			applyDelay(delay);
			for (const name of SCROLL_REVEAL_VARIANTS) {
				node.classList.remove(`scroll-reveal--${name}`);
			}
			node.classList.add(`scroll-reveal--${variant}`);
		},
		destroy() {
			observer.disconnect();
		}
	};
}
