const template = document.createElement('template');
template.innerHTML = `
    <form action="" id="project_form">
        <h2>Create a project</h2>

        <label for="project_name"></label>
        <input type="text" placeholder="name" name="name">
        <label for="private"></label>
        <input type="checkbox" name="private" value="false">

        <button type="submit">Create</button>
    </form>
`;

class CreateProjectPage extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {

    }
}

window.customElements.define('create-project-page', CreateProjectPage);

export { CreateProjectPage }
