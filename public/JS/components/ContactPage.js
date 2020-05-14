export const ContactPage = {
    render : () => {
        return `
            <h1>Contact page</h1>
            <p>All kinds of contact stuff</p>
            <button id="add_button">Add</button>
            <span id="counter"></span>
        `;
    },
    addEvents : () => {
        const button = document.getElementById('add_button');
        const counter = document.getElementById('counter');
        let counter_value = 0;

        counter.innerHTML = `${counter_value}`;
        button.addEventListener('click', () => {
            counter_value++;
            counter.innerHTML = `${counter_value}`;
        })
    }
}