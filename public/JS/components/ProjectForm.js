import { addProjectsToMenu } from './SideBar.js';

const createNewProject = async (name, description) => {
    const project = await fetch(`http://localhost:5000/api/projects/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'name': name,
            'description': description
        })
    }).then(response => response.json()).then(data => {
        return data;
    }).catch((error) => console.error('Error:', error));
    return project;
}

export const ProjectForm = {
    render : () => {
        return `
            <form action="/api/projects/new" method="POST" id="project_form">
                <h1>Create Project</h1>       
                <label for="name">Name</label>
                <input type="text" name="name" class="form_field big_field" id="project_name" maxlength="30" required>
                <label for="description">Description</label>
                <input type="text" name="description" class="form_field big_field" id="project_description">
                <div id="project_buttons">
                    <button type="submit" class="submit_button big_button">Submit</button>
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

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const description = e.target.description.value;
            const project = await createNewProject(name, description);
            addProjectsToMenu([project]);
            clearFields();
        });
        
    }
}