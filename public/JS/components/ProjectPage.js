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
    const element = document.createElement('div');
    element.className = 'task_box';
    element.setAttribute('draggable', true);
    element.innerHTML = await Task.render(task);
    await Task.addEvents(element);
    list.append(element);
    console.log(element);
}

export const ProjectPage = {
    render : async () => {
        return `
            <h1 class="project_title"></h1>
            <div class="task_container">
                <div class="task_list to_do_list"></div>
                <div class="task_list doing_list"></div>
                <div class="task_list done_list"></div>
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

        // const draggables = document.querySelectorAll('.task_box');
        const containers = document.querySelectorAll('.task_list');

        containers.forEach((container) => {
            container.addEventListener('dragover', (e) => {
                e.preventDefault();
                const afterElement = getDragAfterElement(container, e.clientY);
                const draggable = document.querySelector('.dragging');
                if (afterElement == null) {
                    container.appendChild(draggable);
                } else {
                    container.insertBefore(draggable, afterElement);
                }

            })
        })

        function getDragAfterElement(container, y) {
            const draggableElements = [...container.querySelectorAll('.task_box:not(.dragging)')];

            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child }
                }
                else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element
        }

        // draggables.forEach((draggable) => {
        //     draggable.addEventListener()
        // })

        /* Add task form */
        // const element = document.createElement('div');
        // to_do_list.append(element);
        // element.outerHTML = await TaskForm.render();
        // await TaskForm.addEvents(id);
    }
}