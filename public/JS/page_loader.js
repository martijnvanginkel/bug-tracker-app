import { SideBar } from './components/SideBar.js';
import { HomePage } from './components/HomePage.js';
import { ProjectForm } from './components/ProjectForm.js';
import { ProjectPage } from './components/ProjectPage.js';

const routes = [
    { key: '/', value: HomePage },
    { key: '/project/new', value: ProjectForm },
    { key: '/project/show/:id', value: ProjectPage }
]

const content = document.getElementById('main_content');

const clearPage = () => {
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}

const loadNewPage = async (route, url) => {
    if (route === null || route.value === null) return;
    clearPage();
    content.innerHTML = await route.value.render(url.id);
    await route.value.addEvents(url.id);
}

const returnNewRoute = (url) => {
    let new_route = null;
    routes.forEach(route => {
        if (route.key === url.path) {
            new_route = route;
        }
    });
    return new_route;
}

const getParsedURL = () => {
    const path = location.hash.split('/');
    const resource = path[1];
    const add_on = path[2];
    const id = path[3];
    return URL = {
        'resource': resource,
        'add_on': add_on,
        'id': id,
        path: `${resource === undefined ? '' : "/" + resource}${add_on === undefined ? '' : "/" + add_on}${id === undefined ? '' : "/:id"}`
    }
}

const hashChanged = () => {
    const url = getParsedURL();
    const route = returnNewRoute(url);
    if (route === null) return;
    loadNewPage(route, url);
}

export const returnToHomePage = () => {
    location.hash = '/';
    hashChanged();
}

const loadSideBar = async () => {
    const body = document.querySelector('body');
    const side_bar = document.createElement('nav');
    side_bar.innerHTML = await SideBar.render();
    await SideBar.addEvents();
    body.insertBefore(side_bar, content);
}

window.addEventListener('hashchange', hashChanged);
window.addEventListener('load', loadSideBar);
window.addEventListener('load', hashChanged);