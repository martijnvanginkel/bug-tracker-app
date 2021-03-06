const showInviteMessage = (message, email_input) => {
    const message_box = document.getElementById('invite_message');
    message_box.innerHTML = message;
    email_input.value = '';
    setTimeout(() => message_box.innerHTML = '', 2000);
}

const sendProjectInvite = (id, email_input) => {
    fetch(`http://localhost:5000/api/projects/invite/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'email': email_input.value
        })
    }).then(response => response.json()).then(data => {
        showInviteMessage(data.message, email_input);
    }).catch((error) => console.error('Error:', error));
}

export const InviteForm = {
    render : async (id) => {
        return `
            <span id="invite_message"></span>
            <form action="/api/projects/invite/${id}" method="POST" id="invite_form">
                <label for="email"></label>
                <input type="text" name="email" class="form_field" placeholder="Email"/>
                <button type="submit" class="submit_button">Invite</button>
            </form>
        `;
    },
    addEvents : (id) => {
        const invite_form = document.getElementById('invite_form');
        invite_form.addEventListener('submit', (e) => {
            e.preventDefault();
            sendProjectInvite(id, e.target.email);
        });
    }
}