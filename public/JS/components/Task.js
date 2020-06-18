import { listMap } from "./ProjectPage.js";

const moveTask = (project_id, task_id, old_pos, new_pos) => {
    console.log('move task')
    fetch(`http://localhost:5000/api/tasks/move/${task_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'project_id': project_id,
            'old_pos': old_pos,
            'new_pos': new_pos
        }),
    }).then(response => response.json()).then(data => {
        console.log('response');
    }).catch((error) => console.error('Error:', error));
}

export const Task = {
    render : async (task) => {
        return `
            <p>${task.description}</p>
            <span style="background-color:red">${task.priority}</span>
            <span style="background-color:green">${task.state}</span>
            <form action="" class="edit_task">
                <button type="submit">EDIT</button>
            </form>
            <form action="" class="remove_task">
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
        
        const edit_task = element.querySelector('.edit_task');
        edit_task.addEventListener('submit', (e) => {
            e.preventDefault();

            // fetch request here
        })
        
        const remove_task = element.querySelector('.remove_task');
        remove_task.addEventListener('submit', (e) => {
            e.preventDefault();
            // fetch request here
        })



    }
}