import { addTaskToList } from './ProjectPage.js';

const createNewTask = (project_id, description) => {
    fetch(`http://localhost:5000/api/tasks/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'project_id': project_id,
            'description': description.value
        })
    }).then(response => response.json()).then(data => {
        console.log(data.task);
        addTaskToList(data.task, data.task.project_id);
        description.value = '';
    }).catch((error) => console.error('Error:', error));
}

export const TaskForm = {
    render : async () => {
        return `
            <form action="/api/tasks/new" method="POST" id="task_form">
                <input class="input" type="text" placeholder="Name" name="description" required>
                <button type="submit" id="submit_task_btn">Submit</button>
            </form>
        `;
    },
    addEvents : (project_id) => {
        const form = document.getElementById('task_form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            createNewTask(project_id, e.target.description);
        });
    }
}