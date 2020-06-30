import { removeProjectFromMenu } from './SideBar.js';
import { returnToNewProject } from './../page_loader.js';

const leaveProject = async (project_id) => {
    const project = await fetch(`http://localhost:5000/api/projects/leave/${project_id}?_method=DELETE`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json()).then(data => {
        return data;
    }).catch((error) => console.error('Error:', error));
    return project;
}

export const LeaveButton = {
    render : async () => {
        return `
            <button type="button" class="cancel_button">Leave</button>
        `;
    },
    addEvents : (project_id) => {
        const leave_button = document.querySelector('.cancel_button');
        leave_button.addEventListener('click', async (e) => {
            e.preventDefault();
            if (!confirm('Sure you want to leave?')) return ;
            const response = await leaveProject(project_id);
            if (response !== null && response !== undefined) {
                removeProjectFromMenu(response.project_id);
                returnToNewProject();
            }
        });
    }
}