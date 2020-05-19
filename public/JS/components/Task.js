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
    addEvents : (element) => {
        element.addEventListener('dragstart', () => element.classList.add('dragging_task'));
        element.addEventListener('dragend', () => element.classList.remove('dragging_task'));
        
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