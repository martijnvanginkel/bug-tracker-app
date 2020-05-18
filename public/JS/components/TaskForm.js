import { addTaskToList } from './ProjectPage.js';

export const TaskForm = {
    render : async () => {
        return `
            <form action="" id="task_form">
                <input class="input" type="text" placeholder="Name" name="description" required>
                <button type="submit" class="button is-primary submit_btn">Submit</button>
            </form>
        `;
    },
    addEvents : (project_id) => {
        const form = document.getElementById('task_form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            fetch(`http://localhost:5000/api/projects/${project_id}/task/new`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'description': e.target.description.value
                }),
            }).then(response => response.json()).then(data => {
                e.target.description.value = '';
                addTaskToList(document.querySelector('.to_do_list'), data)
            }).catch((error) => console.error('Error:', error));
        });
    }
}