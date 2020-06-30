import { ProjectCard } from './ProjectCard.js';

const addCardsToPage = (projects) => {
    const parent = document.querySelector('.project_cards');
    projects.forEach(project => {
        const card_element = document.createElement('div');
        parent.append(card_element)
        card_element.outerHTML = ProjectCard.render(project);
    });
}

const addNoProjectsText = () => {
    const element = document.getElementById('no_projects_text');
    element.innerHTML = 'You have no projects at the moment';
}

export const HomePage = {
    render : async () => {
        return `
            <div class="home_page">
                <h1>Projects</h1>
                <p id="no_projects_text"></p>
                <div class="project_cards"></div>
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
            if (projects.length === 0) {
                addNoProjectsText();
            }
            else {
                addCardsToPage(projects);
            }
        }).catch((error) => console.error('Error:', error));
    }
}