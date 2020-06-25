import { Task } from './Task.js';
import { removeProjectFromMenu } from './SideBar.js';
import { returnToHomePage } from './../page_loader.js';
import { TaskForm } from './TaskForm.js';
import { InviteForm } from './InviteForm.js';

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

const leaveProject = async (project_id) => {
    const project = await fetch(`http://localhost:5000/api/projects/leave/${project_id}?_method=DELETE`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json()).then(data => {
        return data;
    }).catch((error) => console.error('Error:', error));
    return project;
}

const createLeaveButton = (project) => {
    const leave_button = document.createElement('button');
    leave_button.type = 'button';
    leave_button.classList.add('cancel_button');
    leave_button.innerHTML = 'Leave';
    leave_button.addEventListener('click', async (e) => {
        e.preventDefault();
        const response = await leaveProject(project.data.id);
        if (response !== null && response !== undefined) {
            removeProjectFromMenu(response.project_id);
            returnToHomePage();
        }
    });
    return leave_button;
}

const insertLeaveOption = (project) => {
    const leave_button = createLeaveButton(project);
    const project_options = document.querySelector('.project_options');
    project_options.append(leave_button);
}

const insertTaskForm = async (id) => {
    const to_do_container = document.getElementById('to_do_container');
    const element = document.createElement('div');
    to_do_container.append(element);
    element.outerHTML = await TaskForm.render();
    await TaskForm.addEvents(id);
}

const insertInviteForm = async (id) => {
    const project_options = document.querySelector('.project_options');
    const element = document.createElement('div');
    project_options.append(element);
    element.outerHTML = await InviteForm.render(id);
    await InviteForm.addEvents(id);

}

export const ProjectPage = {
    render : async () => {
        return `
            <div class="project_header">
                <div class="project_info">
                    <h1 class="project_title"></h1>
                    <p class="project_description"></p>
                </div>
                <div class="project_options">
                 
                </div>
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
        // console.log(project)
        if (project.data === undefined || project.data === null) return;
        
        const title = document.querySelector('.project_title');
        const description = document.querySelector('.project_description');
        title.innerHTML = project.data.name;

        // Make title interactive



        description.innerHTML = project.data.description;

        
        
        initializeLists();
        
        
        // console.log(`project_data: ${project_data.name}`);
        
        project.data.tasks.forEach((task) => addTaskToList(task, id));
        
        insertTaskForm(id);
        insertInviteForm(id);
        insertLeaveOption(project);
    }
}