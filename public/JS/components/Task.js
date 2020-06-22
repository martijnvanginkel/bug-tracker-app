import { listMap } from "./ProjectPage.js";

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

    input_field.value = description.innerHTML;
    edit_btn.classList.add('hide_element');
    description.classList.add('hide_element');
    save_btn.classList.remove('hide_element');
    input_field.classList.remove('hide_element');
}

export const Task = {
    render : async (task) => {
        return `
            <form action="/api/tasks/edit/${task.id}" method="PUT" class="edit_task_form">
                <p class="task_description">${task.description}</p>
                <input type="text" class="task_input hide_element"/>
                <button type="submit" class="save_btn hide_element">Save</button>
                <button type="button" class="edit_btn">Edit</button>
            </form> 
            <form action="/api/tasks/remove/${task.id}?_method=DELETE" method="POST" class="remove_task">
                <button type="submit">X</button>
            </form> 
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
        });

        const edit_task_form = element.querySelector('.edit_task_form');
        edit_task_form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const description = e.target.querySelector('.task_input').value;
            const response = await editTask(task_data.id, description);
            if (response === null || response === undefined) return;
            changeInputToText(e.target.parentElement, response.new_description);
        })
        
        const remove_task = element.querySelector('.remove_task');
        remove_task.addEventListener('submit', async (e) => {
            e.preventDefault();
            await removeTask(task_data);
            e.target.parentElement.remove();
        });
    }
}