const randomColor = () => {
    const colors = [
        'lightseagreen',
        'lightcoral',
        'lightsalmon',
        'lightpink',
        'lightskyblue'
    ]
    const random_int = Math.floor(Math.random() * colors.length);
    return colors[random_int];
}

export const ProjectCard = {
    render : (project) => {
        const color = randomColor();
        return `
            <a href="/#/project/show/${project.project_id}" class="project_card" style="background-color: ${color}">
                <h2>${project.name}</h2>
                <p>${project.description}</p>
            </a>
        `;
    },
    addEvents : () => {

    }
}