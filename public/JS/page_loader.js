import { SideBar } from './components/SideBar.js';
import { ProjectForm } from './components/ProjectForm.js';
import { ProjectPage } from './components/ProjectPage.js';

const routes = [
    { key: '/', value: null },
    { key: '/project/new', value: ProjectForm },
    { key: '/project/show/:id', value: ProjectPage },
    { key: '/extra', value: null }
]

const content = document.getElementById('main_content');

const clearContent = () => {
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}

const loadNewContent = async (route, url) => {
    if (route === null || route.value === null) return;
    clearContent();
    content.innerHTML = await route.value.render(url.id);
    route.value.addEvents(url.id);
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
    loadNewContent(route, url);
}

const loadSideBar = async () => {
    const body = document.querySelector('body');
    const side_bar = document.createElement('nav');
    side_bar.innerHTML = await SideBar.render();
    SideBar.addEvents();
    body.insertBefore(side_bar, content);
}

window.addEventListener('hashchange', hashChanged);
window.addEventListener('load', loadSideBar);