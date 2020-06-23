export const addProjectsToMenu = (projects) => {
    const list = document.getElementById('project_list');
    if (list === undefined || list === null) return;
    projects.forEach((project) => {
        const element = document.createElement('li');
        element.classList.add('menu_item');
        element.innerHTML = `
            <a href="/#/project/show/${project.id}" class="menu_link">${project.name}</a>
            <button type="button" class="delete_project_btn">X</button>
        `;
        list.append(element);
    });
}

export const SideBar = {
    render : () => {
        return `
            <aside>
                <h1>B-TRACK</h1>
                <p class="menu_mark">General</p>
                <a href="/#/" class="menu_link">Home</a>
                <p class="menu_mark">Admin</p>
                <a href="#">Manage Users</a>
                <a href="#">Manage Projects</a>

                <p class="menu_mark">Projects</p>
                <a href="/#/project/new">New Project</a>
                <ul id="project_list"></ul>
          
                <form action="/logout" method="POST">
                    <button type="submit" id="logout_button">Logout</button>
                </form>
            </aside>
        `;
    },
    addEvents : () => {
        fetch('http://localhost:5000/api/projects/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()).then(data => {
            addProjectsToMenu(data);
        }).catch((error) => console.error('Error:', error));
    },
}