import { ProjectCard } from './ProjectCard.js';

const addCardsToPage = (projects) => {
    const parent = document.querySelector('.project_cards');
    projects.forEach(project => {
        const card_element = document.createElement('div');
        parent.append(card_element)
        card_element.outerHTML = ProjectCard.render(project);
    })
    // projects.fo
}

export const HomePage = {
    render : async () => {
        return `
            <div class="home_page">
                <h1>Projects</h1>
                <div class="project_cards">

                </div>
            </div>
        `;
    },
    addEvents : () => {
        fetch('http://localhost:5000/api/projects/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()).then(projects => {
            addCardsToPage(projects);
        }).catch((error) => console.error('Error:', error));
    }
}