import { Task } from './Task.js';
import { TaskForm } from './TaskForm.js';
import { InviteForm } from './InviteForm.js';
import { LeaveButton } from './LeaveButton.js';

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

export const listMap = new Map();

export const addTaskToList = async (task, project_id) => {
    if (!listMap.has(task.state)) return;
    const element = document.createElement('div');
    element.className = 'task_box';
    element.setAttribute('draggable', true);
    element.innerHTML = await Task.render(task);
    await Task.addEvents(element, task, project_id);

    listMap.get(task.state).append(element);
}

const initializeLists = () => {
    listMap.set('TODO', document.querySelector('.to_do_list'));
    listMap.set('DOING', document.querySelector('.doing_list'));
    listMap.set('DONE', document.querySelector('.done_list'));
    listMap.forEach((key, value) => { 
       key.addEventListener('dragover', (e) => {
            e.preventDefault();
            const after_element = findElementDropPosition(key, e.clientY);
            const draggable = document.querySelector('.dragging_task');   
            if (after_element == null) {
                key.appendChild(draggable);
            }
            else {
                key.insertBefore(draggable, after_element);
            }
        });
    });
}

const appendComponent = async (Component, parent_name, id) => {
    const parent = document.querySelector(parent_name);
    const element = document.createElement('div');
    parent.append(element);
    element.outerHTML = await Component.render();
    await Component.addEvents(id);
}

const insertTitleAndDescription = (name, description) => {
    const name_element = document.querySelector('.project_name');
    const description_element = document.querySelector('.project_description');
    name_element.innerHTML = name;
    description_element.innerHTML = description
}

export const ProjectPage = {
    render : async () => {
        return `
            <div class="project_header">
                <div class="project_info">
                    <h1 class="project_name"></h1>
                    <p class="project_description"></p>
                </div>
                <div class="project_options"></div>
            </div>
            <div class="task_container">
                <div class="task_list_container" id="to_do_container">
                    <h2 class="task_list_title">TODO</h2>
                    <div class="task_list to_do_list"></div>
                </div>
                <div class="task_list_container">
                    <h2 class="task_list_title">DOING</h2>
                    <div class="task_list doing_list"></div>
                </div>
                <div class="task_list_container">
                    <h2 class="task_list_title">DONE</h2>
                    <div class="task_list done_list"></div>
                </div>
            </div>
        `;
    },
    addEvents : async (id) => {
        const project = await getProjectByID(id);
        if (project.data === undefined || project.data === null) return;
        initializeLists();
        project.data.tasks.forEach((task) => addTaskToList(task, id));  
        insertTitleAndDescription(project.data.name, project.data.description);
        appendComponent(InviteForm, '.project_options', id);
        appendComponent(LeaveButton, '.project_options', id);
        appendComponent(TaskForm, '#to_do_container', id);
    }
}