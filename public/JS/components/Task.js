import { listMap } from "./ProjectPage.js";

const moveTask = (project_id, task_id, old_state, new_state) => {
    fetch(`http://localhost:5000/api/projects/${project_id}/move_task/${task_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'old_state': old_state,
            'new_state': new_state
            // 'state': new_state,
            // 'priority': new_priority
        }),
    }).then(response => response.json()).then(data => {
        console.log('response');
        console.log(data);
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

                            // project id
                            // task id
                            // old task state and position
                            // new task state and position

                            const old_state = {
                                state: task_data.state,
                                priority: task_data.priority
                            }

                            const new_state = {
                                state: value,
                                priority: i
                            }

                            moveTask(project_id, task_data._id, old_state, new_state);
                            return;
                        }
                    });
                    return;
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