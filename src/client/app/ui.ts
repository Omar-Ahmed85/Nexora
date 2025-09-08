import { marked } from 'marked';
import { runChat, type ModelMessageClone, type Role } from './main.ts';

function updateTheme(theme: string) {
	if (theme === 'system') {
		theme = globalThis.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	}

	document.documentElement.classList.remove('light', 'dark');
	document.documentElement.classList.add(theme);
}

export function updateNotification(message: string, type?: 'success' | 'error') {
    const notificationElement = document.getElementById('notification') as HTMLElement;
    const notificationMessageElement = document.getElementById('notification-message') as HTMLElement;

    notificationElement.classList.toggle('translate-x-88');
    notificationMessageElement.textContent = message;

    if (type) {
        const icon = notificationElement.querySelector(`[data-icon="${type}"]`) as HTMLElement;
        icon.classList.toggle('hidden');
    }
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
    currentModelElement.setAttribute('data-model', localStorage.getItem('model-id') || 'gpt-5')

    const introElement = document.getElementById('intro') as HTMLElement;
    const chatElement = document.getElementById('chat') as HTMLElement;

    if (sessionStorage.getItem('messages')) {
        introElement.remove();

        chatElement.classList.remove('hidden');
        chatElement.classList.add('flex');

        const currentStorage: string | JSON = sessionStorage.getItem('messages')!;

        for (const message of JSON.parse(currentStorage) as ModelMessageClone[]) {
            await renderMessage(message.role, message.content);
        }
    }
});

async function renderMessage(role: Role, content: string) {
    const chatElement = document.getElementById('chat') as HTMLElement;
    const containerElement = document.createElement('div');
    
    if (role == 'user') {
        containerElement.classList.add('user-prompt');
    } else {
        containerElement.classList.add('model-response');
    }

    containerElement.innerHTML = await marked.parse(content, { async: true });
    chatElement.appendChild(containerElement);
}

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

modelsMenu.addEventListener('click', (e) => {
    const currentModelElement = document.getElementById('current-model') as HTMLElement;
    const target = e.target as HTMLElement;

    if (!target.getAttribute('data-model')) return;

    localStorage.setItem('model', target.getAttribute('data-model-name')!);
    localStorage.setItem('model-id', target.getAttribute('data-model')!);

    currentModelElement.textContent = localStorage.getItem('model');
    currentModelElement.setAttribute('data-model', localStorage.getItem('model-id')!)
});

globalThis.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    let result: string | null = null;

    if (!target.getAttribute('data-click')) {
        return;
    } else {
        switch (target.getAttribute('data-click')) {
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

    public timeout: unknown | null = null;

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

            this.timeout = setTimeout(requestAnimationFrame, isDeleting ? Math.floor(this.speed / 2) : this.speed, tick);
        }

        requestAnimationFrame(tick);

    }

    clear() {
        if (this.timeout) {
            clearTimeout(this.timeout as number);
        }
        this.timeout = null;
    }
}

const typewriterElement = document.getElementById('typewriter') as HTMLElement;
const typewriter = new Typewriter(typewriterElement, 125, ['Unify your AI stack.', 'Route prompts with intent.', 'Own the result.']);

typewriter.type();

const defaultPrompts = document.getElementById('default-prompts') as HTMLElement;

defaultPrompts.addEventListener('click', (e) => {
    const prompt = document.getElementById('prompt') as HTMLTextAreaElement;
    const target = e.target as HTMLElement;

    if (!target.classList.contains('default-prompt')) return;

    // @ts-ignore: Annoying with no solution.
    prompt.value = target.getAttribute('data-value')!;
});


const submitPromptElement = document.getElementById('submit-prompt') as HTMLElement;

submitPromptElement.addEventListener('click', submitPrompt);

document.addEventListener('keydown', async (e) => {
    if (!e.repeat && e.key == 'Enter') {
        await submitPrompt();
        
        const prompt = document.getElementById('prompt') as HTMLTextAreaElement;
        prompt.value = '';
    }
});

async function submitPrompt() {
    const prompt = document.getElementById('prompt') as HTMLTextAreaElement;
    const model = document.getElementById('current-model')?.getAttribute('data-model');
    const introElement = document.getElementById('intro') as HTMLElement;
    const chatElement = document.getElementById('chat') as HTMLElement;

    if (!model || !prompt.value.trim()) return;

    const promptValue = prompt.value.trim();

    if (introElement) {
        introElement.remove();
    }

    chatElement.classList.remove('hidden');
    chatElement.classList.add('flex');
    
    prompt.value = '';
    handleUserPrompt(promptValue);
    await runChat(model, promptValue);
}

function handleUserPrompt(prompt: string) {
    const chatElement = document.getElementById('chat') as HTMLElement;
    const userPromptContainer = document.createElement('div');
    const userPromptText = document.createElement('p');

    userPromptContainer.classList.add('user-prompt');
    userPromptText.textContent = prompt;

    userPromptContainer.appendChild(userPromptText);
    chatElement.appendChild(userPromptContainer);
}

function createModelMessage(container: string, child: string, ID: number) {
    const chatElement = document.getElementById('chat') as HTMLElement;
    const containerElement = document.createElement(container);
    const childElement = document.createElement(child);

    containerElement.classList.add('model-response');
    containerElement.setAttribute('data-response-id', `${ID}`);

    containerElement.appendChild(childElement);
    chatElement.appendChild(containerElement);

    return childElement;
}

export async function handleModelResponse(chunk: string = '', ID: number, done: boolean, fullResponse: string) {

    if (done) {
        const containerElement = document.querySelector(`[data-response-id="${ID}"]`) as HTMLElement;
        const readyHTML = await marked.parse(fullResponse, { async: true });

        containerElement.innerHTML = readyHTML;
        return;
    }

    if (!document.querySelector(`div[data-response-id="${ID}"]`)) {
        const childElement = createModelMessage('div', 'p', ID);
        childElement.textContent += chunk;
    } else {
        const childElement = document.querySelector(`[data-response-id="${ID}"]`)?.firstElementChild as HTMLElement;
        childElement.textContent += chunk;
    }
}