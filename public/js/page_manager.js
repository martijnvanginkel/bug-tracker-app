import { ProjectPage } from './components/projectPage.js';
import { NavItem } from './components/navItem.js';
import { CreateProjectPage } from './components/createProjectPage.js';

const content = document.querySelector('main');

export const clearContent = () => {
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}

const manage_users_link = document.getElementById('manage_users_link');

manage_users_link.addEventListener('click', (e) => {

});

const create_project_link = document.getElementById('create_project_link');
create_project_link.addEventListener('click', (e) => {
    const el = document.createElement('create-project-page');
    clearContent();
    content.append(el);
});


