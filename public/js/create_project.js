// const createNewProject = async (name, private) => {
//     const response = await fetch('http://127.0.0.1:8000/api/project', {
//         method: 'POST',
//         headers:{
//             "Content-Type": "application/json; charset=utf-8"
//         },
//         body: JSON.stringify({name: name, private: private})
//     }).then(function(response) {
//         return response.json();
//     });
//     return response;
// }

// const form = document.getElementById('project_form');

// form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const name = e.target.elements.name.value;
//     const private = e.target.elements.private.checked;
//     const new_project = await createNewProject(name, private);

//     console.log(new_project)

// });
