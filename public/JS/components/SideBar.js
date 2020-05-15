export const addProjectsToMenu = (projects) => {
    const list = document.getElementById('project_list');
    if (list === undefined || list === null) return;

    projects.forEach((project) => {
        const element = document.createElement('li');
        element.innerHTML = `
            <a href="/#/project/show/${project._id}">${project.name}</a>
        `;
        list.append(element);
    });
}

export const SideBar = {
    render : () => {
        return `
            <aside class="menu aside-menu">
                <h1 class="side-nav-title"><i class="fa fa-bug" aria-hidden="true"></i>B-TRACK</h1>
                <p class="menu-label">General</p>
                <ul class="menu-list">
                    <li><a href="/#/" class="is-active">Home</a></li>
                </ul>
                <p class="menu-label">Admin</p>
                <ul class="menu-list">
                    <li><a href="#">Manage Users</a></li>
                    <li><a href="#">Manage Projects</a></li>
                </ul>
                <p class="menu-label">Projects</p>
                <ul class="menu-list">
                    <li>
                    <a href="/#/project/new">New Project</a>
                        <ul id="project_list"></ul>
                    </li>
                </ul>
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