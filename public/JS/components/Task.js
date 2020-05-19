export const Task = {
    render : async (task) => {
        return `
            <p>${task.description}</p>
            `;
            {/* <form action="" class="edit_task">
                <button type="submit">EDIT</button>
            </form>
            <form action="" class="remove_task">
                <button type="submit">X</button>
            </form> */}
    },
    addEvents : (element) => {
        const edit_form = element.querySelector('.edit_task');
        // console.log(edit_form)

        element.addEventListener('dragstart', () => {
            element.classList.add('dragging');
            // console.log('start drag');
        })

        element.addEventListener('dragend', () => {
            element.classList.remove('dragging');
            // console.log('drag end');
        })

        // edit_form.addEventListener('submit', (e) => {
        //     e.preventDefault();
        //     // fetch request here
        // })

    }
}