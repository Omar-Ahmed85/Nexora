import { getModel } from './main.ts';

function updateTheme(theme: string) {
	if (theme === 'system') {
		theme = globalThis.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	}

	document.documentElement.classList.remove('light', 'dark');
	document.documentElement.classList.add(theme);
}

globalThis.addEventListener('DOMContentLoaded', async () => {
	const currentThemeElement = document.getElementById(
		'current-theme',
	) as HTMLElement;
	const currentTheme = localStorage.getItem('theme') || 'system';

	// @ts-ignore: Annoying with no solution
	currentThemeElement.innerHTML = document.querySelector(
		`[data-theme="${currentTheme}"]`,
	)?.innerHTML;

    const currentModelElement = document.getElementById('current-model') as HTMLElement;
    const currentModel = localStorage.getItem('model') || 'GPT-5';

    currentModelElement.textContent = currentModel;
    await getModel(localStorage.getItem('model-id')!);
});

globalThis.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === 'system') {
        updateTheme(e.matches ? 'dark': 'light');
    }
});

const themesMenu = document.getElementById('themes-menu') as HTMLElement;

themesMenu.addEventListener('click', (e) => {
	const currentThemeElement = document.getElementById(
		'current-theme',
	) as HTMLElement;
	const theme = (e.target as HTMLElement).getAttribute('data-theme');

	if (!theme || theme === localStorage.getItem('theme')) return;

	localStorage.setItem('theme', theme);

	currentThemeElement.innerHTML = (e.target as HTMLElement).innerHTML;

	if (!document.startViewTransition) {
		updateTheme(theme);
		return;
	}

	document.startViewTransition(() => {
		updateTheme(theme);
	});
});

const modelsMenu = document.getElementById('models-menu') as HTMLElement;

modelsMenu.addEventListener('click', async (e) => {
    const currentModelElement = document.getElementById('current-model') as HTMLElement;
    const target = e.target as HTMLElement;

    if (!target.dataset.model) return;

    localStorage.setItem('model', target.getAttribute('data-model-name')!);
    localStorage.setItem('model-id', target.dataset.model!);

    currentModelElement.textContent = localStorage.getItem('model');

    await getModel(localStorage.getItem('model-id')!);
});

globalThis.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    let result: string | null = null;

    if (!target.dataset.click) {
        return;
    } else {
        switch (target.dataset.click) {
            case 'themes':
                toggleThemesMenu();
                result = 'themes';
                break;
            case 'models':
                toggleModelsMenu();
                result = 'models';
                break;
        }

        globalThis.addEventListener('click', (e) => {
            if (e.target !== target) {
                if (result === 'themes') {
                    toggleThemesMenu();
                } else if (result === 'models') {
                    toggleModelsMenu();
                }
            }
        }, { once: true });
    }

});

function toggleThemesMenu() {
    const themesMenu = document.getElementById('themes-menu') as HTMLElement;

    themesMenu.classList.toggle('hidden');
    themesMenu.classList.toggle('flex');
}

function toggleModelsMenu() {
    const modelsMenu = document.getElementById('models-menu') as HTMLElement;

    modelsMenu.classList.toggle('hidden');
    modelsMenu.classList.toggle('flex');

}

function wait(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class Typewriter {

    public timeout: number | null = null;

    constructor(private element: HTMLElement, private speed: number, private sentences: string[]) {}

    type() {

        const content = document.createElement('span');
        const blinkerElement = document.createElement('span');
        blinkerElement.classList.add('absolute','-z-1', 'inline-block', 'align-middle', 'ml-0.5', 'h-lh', 'bg-light-text', 'dark:bg-dark-text', 'w-1', 'animate-[blink_600ms_infinite_ease-in-out]', '[animation-play-state:_paused]', 'rounded-full');

        let isDeleting = false;
        let sentenceIndex = 0;
        let charIndex = 0;
        let currentSentence = this.sentences[sentenceIndex];

        const tick = async () => {

            if (!isDeleting) {

                if (charIndex <= currentSentence.length - 1) {
                    content.textContent = currentSentence.substring(0, ++charIndex);
                    this.element.appendChild(content);
                } else if (charIndex === currentSentence.length) {
                    blinkerElement.classList.toggle('[animation-play-state:_paused]');
                    await wait(1500);
                    blinkerElement.classList.toggle('[animation-play-state:_paused]');
                    isDeleting = true;
                }

            } else {

                if (charIndex > 0) {
                    content.textContent = currentSentence.substring(0, --charIndex);
                    this.element.appendChild(content);
                } else if (charIndex === 0) {
                    isDeleting = false;
                    sentenceIndex = (sentenceIndex + 1) % this.sentences.length;
                    currentSentence = this.sentences[sentenceIndex];
                }

            }

            content.appendChild(blinkerElement);

            this.timeout = setTimeout(tick, isDeleting ? this.speed / 2 : this.speed);
        }

        tick();

    }

    clear() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = null;
    }
}

const typewriterElement = document.getElementById('typewriter') as HTMLElement;
const typewriter = new Typewriter(typewriterElement, 150, ['Unify your AI stack.', 'Route prompts with intent.', 'Own the result.']);

typewriter.type();

const defaultPrompts = document.getElementById('default-prompts') as HTMLElement;

defaultPrompts.addEventListener('click', (e) => {
    const prompt = document.getElementById('prompt') as HTMLTextAreaElement;
    const target = e.target as HTMLElement;

    if (!target.classList.contains('default-prompt')) return;

    // @ts-ignore: Annoying with no solution.
    prompt.value = target.dataset.value;
});