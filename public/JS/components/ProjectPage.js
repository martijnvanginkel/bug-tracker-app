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

export const ProjectPage = {
    render : async () => {
        // const project = await getProjectByID(id);
        // console.log(project);
        return `
            <h1 class="project_title"></h1>
            <div class="task_container">
                <div class="task_list to_do_list">
                    <form action="" id="task_form">
                        <input class="input" id="project_name" type="text" placeholder="Name" required>
                        <button type="submit" class="button is-primary submit_btn">Submit</button>
                    </form>
                </div>
                <div class="task_list doing_list">asdf</div>
                <div class="task_list done_list">qwe</div>
            </div>
        `;
    },
    addEvents : async (id) => {

        const project = await getProjectByID(id);
        // console.log(project);

        const to_do_list = document.querySelector('.to_do_list');

        project.tasks.forEach((task) => {
            
        })

        console.log(project.tasks);
    }
}