const projectListMap = new Map();

export const addProjectsToMenu = (projects) => {
    const list = document.getElementById('project_list');
    console.log(list);
    if (list === undefined || list === null) return;
    console.log('loop')
    projects.forEach((project) => {
        const element = document.createElement('li');
        element.classList.add('project_link');
        element.innerHTML = `
            <a href="/#/project/show/${project.id}">${project.name}</a>
        `;
        list.append(element);
        projectListMap.set(element, project.id);
    });
}

export const removeProjectFromMenu = (project_id) => {
    projectListMap.forEach((key, value) => {
        if (key == project_id) {
            value.remove();
        }
    });
}

export const SideBar = {
    render : async () => {
        return `
            <aside>
                <h1 class="menu_title">B-TRACK</h1>
                <p class="menu_mark">General</p>
                <a href="/#/" class="menu_link">Home</a>
                <p class="menu_mark">Projects</p>
                <a href="/#/project/new" class="menu_link">New Project</a>
                <ul id="project_list"></ul>
                <form action="/logout" method="POST">
                    <button type="submit" id="logout_button">Logout</button>
                </form>
            </aside>
        `;
    },
    addEvents : async () => {
        fetch('http://localhost:5000/api/projects/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()).then(data => {
            console.log(data);
            addProjectsToMenu(data);
        }).catch((error) => console.error('Error:', error));
    },
}