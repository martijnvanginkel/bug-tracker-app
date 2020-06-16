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
    const element = document.createElement('div');
    element.className = 'task_box';
    element.setAttribute('draggable', true);
    element.innerHTML = await Task.render(task);
    await Task.addEvents(element, task, project_id);
    // console.log(`task: ${task.priority}`);
    
    console.log(task)
    // console.log(listMap.get(task.state));


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
        initializeLists();
        const project_data = project.data[0];


        // console.log(`project_data: ${project_data}`);
        project_data.tasks.forEach((task) => addTaskToList(task, id));

        /* Add task form */
        // const element = document.createElement('div');
        // to_do_list.append(element);
        // element.outerHTML = await TaskForm.render();
        // await TaskForm.addEvents(id);
    }
}