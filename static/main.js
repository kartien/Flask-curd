const userForm =  document.querySelector('#userForm')

let users = []

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
                <button class="btn btn-danger btn-sm">
                <span class="material-icons">&#xe872;</span></button> <!--delete-->
                <button class="btn btn-primary btn-sm">
                <span class="material-icons">&#xe3c9;</span></button> <!--edit-->
            </div>
            </header>
            <p>${user.email}</p>
            <p class="text-truncate">${user.password}</p>
        `
        //console.log(userItem);
        userList.append(userItem)
    })

   

}

