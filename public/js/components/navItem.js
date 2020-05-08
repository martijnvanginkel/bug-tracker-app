import { clearContent } from './../page_manager.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        li {
            margin: 1px 0;
            padding: 5px;
            cursor: pointer;
            border-radius: 3px;
        }

        li:hover {
            background-color: #F6F6F6;
        }
    </style>
    <li></li>
`;

export class NavItem extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('li').innerText = this.getAttribute('name');
        this.project_id = this.getAttribute('project_id');
    }

    async getProject(id) {
        const response = await fetch(`http://127.0.0.1:8000/api/project/${id}`, {
            method: 'GET',
            headers:{
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(response) {
            return response.json();
        });
        return response;
    }

    async renderProject() {
        clearContent();

        const parent = document.querySelector('main');
        const project = await this.getProject(this.project_id);
        const project_page = document.createElement('project-page');
        project_page.setAttribute('name', project.name);

        parent.append(project_page);
    }

    connectedCallback() {
        this.shadowRoot.querySelector('li').addEventListener('click', () => this.renderProject());
    }

}

window.customElements.define('nav-item', NavItem);
