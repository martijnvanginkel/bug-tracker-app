const showInviteMessage = (message) => {
    const message_box = document.getElementById('invite_message');
    message_box.innerHTML = message;
    setTimeout(() => message_box.innerHTML = '', 2000);
}

const sendProjectInvite = (id, email) => {
    fetch(`http://localhost:5000/api/projects/invite/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'email': email
        })
    }).then(response => response.json()).then(data => {

        // if (data.user !== undefined) {
        //     showInviteMessage(data.message);
        // }
        // else {
        // }
        showInviteMessage(data.message);
        // email.value = '';
        // console.log(data);
        // addTaskToList(data.task, data.task.project_id);
        // description.value = '';
    }).catch((error) => console.error('Error:', error));
}

export const InviteForm = {
    render : async (id) => {
        return `
            <form action="/api/projects/invite/${id}" method="POST" id="invite_form">
                <span id="invite_message"></span>
                <label for="email"></label>
                <input type="text" name="email" placeholder="invite by email"/>
                <button type="submit">Invite</button>
            </form>
        `;
    },
    addEvents : (id) => {
        const invite_form = document.getElementById('invite_form');
        console.log(invite_form);
        invite_form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(e.target.email.value)
            sendProjectInvite(id, e.target.email.value);
        });
        // const form = document.getElementById('task_form');
        // form.addEventListener('submit', (e) => {
        //     e.preventDefault();
        //     createNewTask(project_id, e.target.description);
        // });
    }
}