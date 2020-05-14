import { ContactPage } from './components/ContactPage.js';

const routes = [
    { key: '#/', value: null },
    { key: '#/project/new', value: ContactPage },
    { key: '#/extra', value: null }
]

const content = document.getElementById('main_content');

const clearContent = () => {
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}

const loadNewContent = (route) => {
    if (route === null) return;
    clearContent();
    content.innerHTML = route.value.render();
    route.value.addEvents();
}

const returnNewRoute = (hash) => {
    let new_route = null;

    routes.forEach(route => {
        if (route.key === hash) {
            new_route = route;
        }
    })
    return new_route;
}

const hashChanged = () => {
    const route = returnNewRoute(location.hash);
    if (route === null) return;
    loadNewContent(route);
}

window.addEventListener('hashchange', hashChanged);