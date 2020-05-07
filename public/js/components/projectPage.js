const template = document.createElement('template');
template.innerHTML = `
    <h1></h1>

    <p>Lorem ipsum</p>
`;

class ProjectPage extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h1').innerText =
    }
}

window.customElements.define('project-page', ProjectPage);

export { ProjectPage }
