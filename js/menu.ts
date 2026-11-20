function getElement<T extends HTMLElement>(selector: string): T {
    const element = document.querySelector<T>(selector);
    if (!element) throw new Error(`Required element not found: ${selector}`);
    return element;
}

export function initMenu(): void {
    const burger = getElement<HTMLButtonElement>('.header-burger');
    const nav = getElement<HTMLElement>('.nav');

    function setMenu(isOpen: boolean): void {
        nav.classList.toggle('is-open', isOpen);
        burger.classList.toggle('is-active', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
    }

    burger.addEventListener('click', (): void => setMenu(!nav.classList.contains('is-open')));
    nav.addEventListener('click', (event: MouseEvent): void => {
        const target = event.target;
        if (target instanceof Element && target.closest('.nav-link')) setMenu(false);
    });
}
