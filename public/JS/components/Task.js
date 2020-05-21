import { listMap } from "./ProjectPage.js";

const updateTask = (project_id, task_id, new_state, new_priority) => {
    fetch(`http://localhost:5000/api/projects/${project_id}/task/${task_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'state': new_state,
            'priority': new_priority
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
                    console.log('found myself');
                    // console.log(i);

                    listMap.forEach((key, value) => {
                        console.log(key);
                        if (key === parent) {
                            console.log(value) // value is the state
                            console.log(i) // position
                            console.log(task_data)
                            updateTask(project_id, task_data._id, value, i);
                            // task_id, new_state, new_position
                        }
                    })

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