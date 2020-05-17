export const Task = {
    render : async (task) => {
        return `
            <div class="task_box">
                ${task.description}
            </div>
        `;
    },
    addEvents : () => {

    }
}