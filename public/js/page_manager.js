import { ProjectPage } from './components/projectPage.js';
import { NavItem } from './components/navItem.js';
import { CreateProjectPage } from './components/createProjectPage.js';

const content = document.querySelector('main');

export const clearContent = () => {
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}

const loadPage = (...elements) => {
    clearContent();
    elements.forEach(element => content.append(document.createElement(element)));
}

const formatElement = (name, data) => {
    const pairs = [];
    const attributes = [];

    if (data != undefined) {
        pairs = Object.entries(data).map(([key, value]) => ({key, value}));
    }
    pairs.forEach(pair => {
        const obj = {};
        obj.key = pair.key;
        obj.value = pair.value;
        attributes.push(obj);
    });
    return {
        'name': name,
        'attributes': attributes
    }
}

const create_project_link = document.getElementById('create_project_link');
create_project_link.addEventListener('click', (e) => {
    // loadPage('create-project-page');

    const formattedElement = formatElement('create-project-page');

    console.log(formattedElement);


});


