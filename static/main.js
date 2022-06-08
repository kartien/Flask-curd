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
    console.log(data);
    userForm.reset();
});


function renderUser(users){
    const userList = document.querySelector("#userList");
    userList.innerHTML = '';

    users.forEach(user => {
        const userItem = document.createElement('li')
        userItem.classList = 'list-group-item list-group-item-dark my-2'
        userItem.innerHTML = `
            <h3>${user.username}</h3>
            <p>${user.email}</p>
            <p>${user.password}</p>
        `
        console.log(userItem);
        userList.append(userItem)
    })

   

}

console.log("Hello")