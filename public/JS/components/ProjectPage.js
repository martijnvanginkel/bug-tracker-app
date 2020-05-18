import { Task } from './Task.js';
import { TaskForm } from './TaskForm.js';

const getProjectByID = (id) => {
    if (id === undefined) return;
    const project = fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json()).then(data => {
        return data;
    }).catch((error) => console.error('Error:', error));
    return project;
}

export const addTaskToList = async (list, task) => {
    const temp = document.createElement('div');
    temp.className = 'task_box';
    list.append(temp);
    const task_object = Task;
    const render_info = await task_object.render(task);
    temp.innerHTML = render_info;
    await task_object.addEvents(temp, task);
}

export const ProjectPage = {
    render : async () => {
        return `
            <h1 class="project_title"></h1>
            <div class="task_container">
                <div class="task_list to_do_list"></div>
                <div class="task_list doing_list"></div>
                <div class="task_list done_list">qwe</div>
            </div>
        `;
    },
    addEvents : async (id) => {

        const project = await getProjectByID(id);
        const to_do_list = document.querySelector('.to_do_list');
        const doing_list = document.querySelector('.doing_list');
        const done_list = document.querySelector('.done_list');

        project.todo_tasks.forEach((task) => addTaskToList(to_do_list, task));
        project.doing_tasks.forEach((task) => addTaskToList(doing_list, task));
        project.done_tasks.forEach((task) => addTaskToList(done_list, task));

        /* Add task form */
        const element = document.createElement('div');
        to_do_list.append(element);
        element.outerHTML = await TaskForm.render();
        await TaskForm.addEvents(id);
    }
}