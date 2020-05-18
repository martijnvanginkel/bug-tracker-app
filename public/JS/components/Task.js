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
    addEvents : (me, id) => {
        const edit_form = me.querySelector('.edit_task');
        console.log(edit_form)

        edit_form.addEventListener('submit', (e) => {
            e.preventDefault();
            // fetch request here
        })

    }
}