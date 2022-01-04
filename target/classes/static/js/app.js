const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findAllUsers: async () => await fetch('api/users'),
    findAllRoles: async () => await fetch('api/roles'),
    findOneUser: async (id) => await fetch(`api/users/${id}`),
    updateUser: async (user, id) => await fetch(`api/users/${id}`, {
        method: 'PUT',
        headers: userFetchService.head,
        body: JSON.stringify(user)
    }),
    deleteUser: async (id) => await fetch(`api/users/${id}`, {method: 'DELETE', headers: userFetchService.head})
}

// // Вход User
// fetch('http://localhost:8080/api/users/oneUser').then(res => {
//         res.json().then(u => {
//             let tempU = ""
//             tempU += '<tr>'
//             tempU += '<td>' + u.id + '</td>'
//             tempU += '<td>' + u.firstName + '</td>'
//             tempU += '<td>' + u.roles.map(r => r.role) + '</td>'
//             document.getElementById('dataUser').innerHTML = tempU
//         })
//     }
// )


//all users
listUsers()

function listUsers() {
    userFetchService.findAllUsers().then(res => {
        res.json().then(data => {
            if (data.length > 0) {
                data.forEach(user => {
                    let table = ""
                    table += '<td>' + user.id + '</td>'
                    table += '<td>' + user.name + '</td>'
                    table += '<td>' + user.password + '</td>'
                    table += '<td>' + user.roles.map(r => r.role) + '</td>'
                    table += '<td>' + '<button data-bs-toggle="modal" class="btn-info btn btn-primary"' +
                        'data-bs-target="#editModal" onclick=moduleEdit(' + user.id + ')' + '>Edit</button>' + '</td>'
                    table += '<td>' + '<button data-bs-toggle="modal" class="btn-info btn btn-red"' +
                        'data-bs-target="#deleteModal" onclick=moduleDelete(' + user.id + ')' + '>Delete</button>' + '</td>'
                    document.getElementById('usersData').innerHTML += table
                })
            }
        })
    })
}


//edit
let editRoles = document.getElementById('editRole')
let option = document.getElementById('option')

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
        return rol.json()
    }).then(data => {
        editRoles.innerHTML = ''
        data.forEach((el) => {
            const option = document.createElement('option')
            option.innerHTML = el.role
            editRoles.innerHTML += `<option value="${el.role}">${el.role}</option>>`
        })
    })
}

document.querySelector('#editUser').addEventListener('click', (e) => {
    let editUser = {
        id: parseInt($('#editId').val()),
        name: $('#editName').val(),
        password: $('#editPassword').val(),
        roles: $("#editRole").val()
    }
    userFetchService.updateUser(editUser, editUser.id).then(() => location.reload())
})


// модальное окно Delete
function moduleDelete(id) {
    fetch('http://localhost:8080/api/users/' + id).then(res => {
        res.json().then(userData => {
                document.getElementById('deleteId').value = userData.id
                document.getElementById('deleteFirstName').value = userData.firstName
                document.getElementById('deleteLastName').value = userData.lastName
                document.getElementById('deleteAge').value = userData.age
                document.getElementById('deleteEmail').value = userData.email
                document.getElementById('deletePassword').value = userData.password

                fetch('http://localhost:8080/api/users/roles').then(rol => {
                    rol.json().then(roleData => {
                        roleData.map(role => {
                            $('#deleteRole').append(
                                $('<option>').text(role.role))
                        })
                    })
                })

            }
        )
    })

}

document.querySelector('#deleteUser').addEventListener('click', (e) => {
    const deleteUser = {
        id: parseInt($('#deleteId').val()),
        firstName: $('#deleteFirstName').val(),
        lastName: $('#deleteLastName').val(),
        age: $('#deleteAge').val(),
        email: $('#deleteEmail').val(),
        password: $('#deletePassword').val(),
        role: $('#deleteRole').val()
    }

    fetch('http://localhost:8080/api/users/' + deleteUser.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteUser)
    }).then(() => location.reload())
})


