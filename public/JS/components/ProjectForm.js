import { addProjectsToMenu } from './SideBar.js';

export const ProjectForm = {
    render : () => {
        return `
            <form action="" id="project_form">
                <h1 class="title is-4">Create project</h1>
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input class="input" id="project_name" type="text" placeholder="Name" required>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                        <textarea class="textarea" id="project_description" placeholder="Description"></textarea>
                    </div>
                </div>
                <div class="field"> 
                    <label class="checkbox">
                    <input type="checkbox" id="project_privacy" checked>
                        Public
                    </label>
                </div>
                <div class="field is-grouped">
                    <div class="control">
                        <button type="submit" class="button is-primary submit_btn">Submit</button>
                    </div>
                    <div class="control">
                        <button class="button is-link is-light clear_btn">Clear</button>
                    </div>
                </div>
            </form>
        `;
    },
    addEvents : () => {
        const form = document.getElementById('project_form');
        const name = document.getElementById('project_name');
        const description = document.getElementById('project_description');
        const non_public = document.getElementById('project_privacy');

        const clearFields = () => { 
            name.value = '';
            description.value = '';
            non_public.checked = true;
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            fetch('http://localhost:5000/api/projects/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'name': name.value,
                    'description': description.value,
                    'non_public': non_public.checked
                }),
            }).then(response => response.json()).then(data => {
                clearFields();
                addProjectsToMenu([data]);
            }).catch((error) => console.error('Error:', error));
        });

        const clear_btn = document.querySelector('.clear_btn');
        clear_btn.addEventListener('click', (e) => {
            e.preventDefault();
            clearFields();
        })
    }
}