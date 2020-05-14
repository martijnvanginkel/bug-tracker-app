export const ProjectForm = {
    render : () => {
        return `
            <form action="" id="project_form">
                <h1 class="title is-4">Create project</h1>
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input class="input" id="project_name" type="text" placeholder="Name">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                        <textarea class="textarea" id="project_description" placeholder="Description"></textarea>
                    </div>
                </div>
                <div class="field"> 
                    <label class="checkbox">
                    <input type="checkbox" checked>
                        Public
                    </label>
                </div>
                <div class="field is-grouped">
                    <div class="control">
                        <button type="submit" class="button is-primary submit_btn">Submit</button>
                    </div>
                    <div class="control">
                        <button class="button is-link is-light">Clear</button>
                    </div>
                </div>
            </form>
        `;
    },
    addEvents : () => {
        const submit_btn = document.querySelector('.submit_btn');
        submit_btn.addEventListener('click', (e) => {
            e.preventDefault();

            const name = document.getElementById('project_name');
            const description = document.getElementById('project_description');
            const type = document.getElementById('project_type');

            const data = {
                'name': name,
                'description': description,
                'type': type
            }

            fetch('http://localhost:5000/api/projects/new', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {
                console.log('Success:', data);
                })
                .catch((error) => {
                console.error('Error:', error);
            });

        })
    }
}