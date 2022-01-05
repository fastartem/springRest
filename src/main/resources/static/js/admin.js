const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findAllUsers: async () => await fetch('api/users'),
    findAllRoles: async () => await fetch('api/roles'),
    findOneUser: async (id) => await fetch(`api/users/${id}`),
    findCurrentUser: async () => await fetch(`api/user`),
    saveUser: async (user) => await fetch('api/users', {
        method: 'POST',
        headers: userFetchService.head,
        body: JSON.stringify(user)
    }),
    updateUser: async (user, id) => await fetch(`api/users/${id}`, {
        method: 'PUT',
        headers: userFetchService.head,
        body: JSON.stringify(user)
    }),
    deleteUser: async (id) => await fetch(`api/users/${id}`, {method: 'DELETE', headers: userFetchService.head})
}

fillCurrentUserTable()
fillAllUsersTable()

//user table
function fillCurrentUserTable() {
    userFetchService.findCurrentUser().then(res => {
            res.json().then(u => {
                let tempU = ""
                tempU += '<tr>'
                tempU += '<td>' + u.id + '</td>'
                tempU += '<td>' + u.name + '</td>'
                tempU += '<td>' + u.roles.map(r => r.role) + '</td>'
                document.getElementById('currentUserData').innerHTML = tempU
            })
        }
    )
}

//all users table
function fillAllUsersTable() {
    userFetchService.findAllUsers().then(res => {
        let table = ""
        document.getElementById('usersData').innerHTML = table

        res.json().then(data => {
            if (data.length > 0) {
                data.forEach(user => {
                    table = ""
                    table += '<td>' + user.id + '</td>'
                    table += '<td>' + user.name + '</td>'
                    table += '<td>' + user.password + '</td>'
                    table += '<td>' + user.roles.map(r => r.role) + '</td>'
                    table += '<td>' + '<button data-bs-toggle="modal" class="btn btn-primary"' +
                        'data-bs-target="#editModal" onclick=moduleEdit(' + user.id + ')' + '>Edit</button>' + '</td>'
                    table += '<td>' + '<button data-bs-toggle="modal" class="btn btn-danger"' +
                        'data-bs-target="#deleteModal" onclick=moduleDelete(' + user.id + ')' + '>Delete</button>' + '</td>'
                    document.getElementById('usersData').innerHTML += table
                })
            }
        })
    })
}

//edit
function moduleEdit(id) {
    userFetchService.findOneUser(id).then(res => {
        res.json().then(userData => {
                document.getElementById('editId').value = userData.id
                document.getElementById('editName').value = userData.name
                document.getElementById('editPassword').value = userData.password
            }
        )
    })
    userFetchService.findAllRoles().then(rol => {
        let editRoles = document.getElementById('editRole')
        rol.json().then(data => {
            editRoles.innerHTML = ''
            data.forEach((el) => {
                const option = document.createElement('option')
                option.innerHTML = el.role
                editRoles.innerHTML += `<option value="${el.role}">${el.role}</option>>`
            })
        })
    })
}

//delete
function moduleDelete(id) {
    userFetchService.findOneUser(id).then(res => {
            res.json().then(userData => {
                document.getElementById('deleteId').value = userData.id
                document.getElementById('deleteName').value = userData.name
                document.getElementById('deletePassword').value = userData.password

                let editRoles = document.getElementById('deleteRole')
                editRoles.innerHTML = ''
                document.createElement('option')
                editRoles.innerHTML += `<option>${userData.roles.map(r => r.role)}</option>>`
            })
        }
    )
}

//event edit
document.querySelector('#editUser').addEventListener('click', async (e) => {
    let editUser = {
        id: parseInt($('#editId').val()),
        name: $('#editName').val(),
        password: $('#editPassword').val(),
        roles: $("#editRole").val()
    }
    await userFetchService.updateUser(editUser, editUser.id);
    await fillAllUsersTable();
})

//event delete
document.querySelector('#deleteUser').addEventListener('click', async (e) => {
    await userFetchService.deleteUser(parseInt($('#deleteId').val()));
    await fillAllUsersTable();
})

//event new user
document.querySelector('#newUserTabLink').addEventListener('click', () => {
    document.getElementById('newName')
    document.getElementById('newPassword')

    userFetchService.findAllRoles().then(rol => {
        let newRoles = document.getElementById('newRoles')
        rol.json().then(data => {
            newRoles.innerHTML = ''
            data.forEach((el) => {
                const option = document.createElement('option')
                option.innerHTML = el.role
                newRoles.innerHTML += `<option value="${el.role}">${el.role}</option>>`
            })
        })
    })
})

document.querySelector('#newUser').addEventListener('click', async (e) => {
    const newUser = {
        id: parseInt($('#newId').val()),
        name: $('#newName').val(),
        password: $('#newPassword').val(),
        roles: $("#newRoles").val()
    }
    await userFetchService.saveUser(newUser)
    fillAllUsersTable()
    $('.nav-tabs a[href="#table"]').tab('show');
})