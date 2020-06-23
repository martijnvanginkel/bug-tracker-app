import { addProjectsToMenu } from './SideBar.js';

const createNewProject = () => {

}

export const ProjectForm = {
    render : () => {
        return `
            <form action="/api/projects/new" method="POST" id="project_form">
                <h1 id="create_project_title">Create Project</h1>       
                <label for="name">Name</label>
                <input type="text" name="name" class="form_field" id="project_name" required>
                <label for="description">Description</label>
                <input type="text" name="description" class="form_field" id="project_description">
                <div id="project_buttons">
                    <button type="submit" class="submit_button">Submit</button>
                    <button type="button" class="clear_button">Clear</button>
                </div>
            </form>
        `;
    },
    addEvents : () => {
        const form = document.getElementById('project_form');
        const name = document.getElementById('project_name');
        const description = document.getElementById('project_description');
        const clear_btn = document.querySelector('.clear_button');


        const clearFields = () => { 
            name.value = '';
            description.value = '';
        }

        clear_btn.addEventListener('click', (e) => {
            clearFields();
        });

        form.addEventListener('submit', (e) => {
            // e.preventDefault();
        })


        
    }
}