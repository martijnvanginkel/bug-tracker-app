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
    render : async (id) => {
        const project = await getProjectByID(id);
        return `
            <h1>${project.name}</h1>
        `;
    },
    addEvents : () => {

    }
}