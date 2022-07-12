const userForm =  document.querySelector('#userForm')

let users = []
let edittinig = false
let userId = null;


window.addEventListener('DOMContentLoaded', async ()  => {
    const response = await fetch("api/users");
    const data = await response.json()
    users =  data
    renderUser(users)
});

userForm.addEventListener('submit', async e => {
    e.preventDefault();
    
    const username = userForm['username'].value;
    const password = userForm['password'].value;
    const email = userForm['email'].value;
   
    
    if (!edittinig){
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
           },
            body: JSON.stringify({
                username,
                password,
                email
            })
        })
        const data = await response.json();
       
        users.unshift(data);
    }else{
        const response = await fetch(`/api/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                email,
            }),
        });
        const updateUser = await response.json();
        userse =  user.map(user => user.id === updateUser.id ? updateUser : user);
        edittinig = false;
        userId = null;
    }
    renderUser(users);
    userForm.reset();
});


function renderUser(users){
    const userList = document.querySelector("#userList");
    userList.innerHTML = '';

    users.forEach(user => {
        const userItem = document.createElement('li')
        userItem.classList = 'list-group-item list-group-item-dark my-2'
        userItem.innerHTML = `
            <header class="d-flex justify-content-between align-items-center" >
            <h3>${user.username}</h3>
            <div>
                <button class="btn-delete btn btn-danger btn-sm">
                <span class="material-icons">&#xe872;</span></button> <!--delete-->
                <button class="btn-edit btn btn-primary btn-sm">
                <span class="material-icons">&#xe3c9;</span></button> <!--edit-->
            </div>
            </header>
            <p>${user.email}</p>
            <p class="text-truncate">${user.password}</p>
        `

        const btnDelete = userItem.querySelector('.btn-delete')

        btnDelete.addEventListener('click', async () =>{
            const response = await fetch(`/api/users/${user.id}`, {
                method: 'DELETE',
            })
            const data = await response.json()

            users = users.filter(user => user.id !== data.id)
            renderUser(user)
        })

        const btnEdit = userItem.querySelector('.btn-edit')

        btnEdit.addEventListener('click', async e  => {
            const response = await fetch(`/api/users/${user.id}`)
            const data = await response.json()
            
            userForm["username"].value = data.username;
            userForm["email"].value = data.email;

            edittinig = true;
            userId = data.id;
        })


        userList.append(userItem)
    })

   

}

