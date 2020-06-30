import { listMap } from "./ProjectPage.js";
import { textIsOnlySpaces } from "./../auth/validation_utils.js";

const moveTask = (project_id, id, old_pos, new_pos) => {
    fetch(`http://localhost:5000/api/tasks/move/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'project_id': project_id,
            'old_pos': old_pos,
            'new_pos': new_pos
        }),
    }).then(response => response.json()).catch((error) => console.error('Error:', error));
}

const removeTask = (task) => {
    fetch(`http://localhost:5000/api/tasks/remove/${task.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'task': task
        }),
    }).then(response => response.json()).catch((error) => console.error('Error:', error));
}

const editTask = async (id, description) => {
    const task = await fetch(`http://localhost:5000/api/tasks/edit/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'description': description
        }),
    }).then(response => response.json()).catch((error) => console.error('Error:', error));
    return task;
}

const changeInputToText = (task, new_description) => {
    const description = task.querySelector('.task_description');
    const save_btn = task.querySelector('.save_btn');
    const input_field = task.querySelector('.task_input');
    const edit_btn = task.querySelector('.edit_btn');

    description.innerHTML = new_description;
    edit_btn.classList.remove('hide_element');
    description.classList.remove('hide_element');
    save_btn.classList.add('hide_element');
    input_field.classList.add('hide_element');
}

const changeTextToInput = (edit_btn) => {
    const task = edit_btn.parentElement;
    const description = task.querySelector('.task_description');
    const save_btn = task.querySelector('.save_btn');
    const input_field = task.querySelector('.task_input');

    input_field.innerHTML = description.innerHTML;
    edit_btn.classList.add('hide_element');
    description.classList.add('hide_element');
    save_btn.classList.remove('hide_element');
    input_field.classList.remove('hide_element');
}

export const Task = {
    render : async (task) => {
        return ` 
            <p class="task_description">${task.description}</p>
            <textarea class="task_input hide_element" max-length="140"></textarea>
            <button type="button" class="edit_btn">
                <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button type="submit" class="save_btn hide_element">Save</button>
        `;
    },
    addEvents : (element, task_data, project_id) => {
        element.addEventListener('dragstart', () => element.classList.add('dragging_task'));
        element.addEventListener('dragend', (e) => {
            element.classList.remove('dragging_task');
            const parent = e.target.parentElement;
            const children = parent.childNodes;
            for (let i = 0; i < children.length; i++) {
                if (children[i] === e.target) {
                    listMap.forEach((key, value) => {
                        if (key === parent) {
                            const old_pos = { state: task_data.state, priority: task_data.priority };
                            const new_pos = { state: value, priority: i };
                            if (old_pos.state == new_pos.state && old_pos.priority == new_pos.priority) return;
                            moveTask(project_id, task_data.id, old_pos, new_pos);
                            return;
                        }
                    });
                }           
            }
        });
  
        const edit_button = element.querySelector('.edit_btn');
        edit_button.addEventListener('click', (e) => {
            changeTextToInput(e.target);
            edit_button.id = 'hide';
        });

        const task_input = element.querySelector('.task_input');
        const saveOrDeleteTask = async () => {
            if (task_input.value.length <= 1 || textIsOnlySpaces(task_input.value)) {
                await removeTask(task_data);
                task_input.parentElement.remove();
                return ;
            }
            edit_button.id = '';
            await editTask(task_data.id, task_input.value);
            changeInputToText(element, task_input.value);
        }

        task_input.addEventListener('keydown', async (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                saveOrDeleteTask();
            }
        });

        const save_button = element.querySelector('.save_btn');
        save_button.addEventListener('click', async (e) => {
            e.preventDefault();
            saveOrDeleteTask();
        });
    }
}