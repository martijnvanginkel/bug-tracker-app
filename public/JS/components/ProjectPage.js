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

export const addTaskToList = async (list, task_data, project_id) => {
    const element = document.createElement('div');
    element.className = 'task_box';
    element.setAttribute('draggable', true);
    element.innerHTML = await Task.render(task_data);
    await Task.addEvents(element, task_data, project_id);
    list.append(element);
}

const findElementDropPosition = (container, y) => {
    const task_boxes = Array.from(container.querySelectorAll('.task_box:not(.dragging_task)'));    
    return task_boxes.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        }
        else { 
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

const makeTaskListInteractive = (e, list) => {
    e.preventDefault();
    const after_element = findElementDropPosition(list, e.clientY);
    const draggable = document.querySelector('.dragging_task');

    if (after_element == null) {
        list.appendChild(draggable);
    }
    else {
        list.insertBefore(draggable, after_element);
    }
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

        console.log(project);

        return ;
        const to_do_list = document.querySelector('.to_do_list');
        const doing_list = document.querySelector('.doing_list');
        const done_list = document.querySelector('.done_list');
        
        project.todo_tasks.forEach((task) => addTaskToList(to_do_list, task, id));
        project.doing_tasks.forEach((task) => addTaskToList(doing_list, task, id));
        project.done_tasks.forEach((task) => addTaskToList(done_list, task, id));

        to_do_list.addEventListener('dragover', (e) => makeTaskListInteractive(e, to_do_list));
        doing_list.addEventListener('dragover', (e) => makeTaskListInteractive(e, doing_list));
        done_list.addEventListener('dragover', (e) => makeTaskListInteractive(e, done_list));

        /* Add task form */
        // const element = document.createElement('div');
        // to_do_list.append(element);
        // element.outerHTML = await TaskForm.render();
        // await TaskForm.addEvents(id);


    }
}