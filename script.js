const burger = document.querySelector('.header-burger');
const nav = document.querySelector('.nav');

function setMenu(isOpen) {
    nav.classList.toggle('is-open', isOpen);
    burger.classList.toggle('is-active', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
}

burger.addEventListener('click', () => {
    setMenu(!nav.classList.contains('is-open'));
});

nav.addEventListener('click', (event) => {
    if (event.target.closest('.nav-link')) {
        setMenu(false);
    }
});