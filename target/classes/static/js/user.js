fetch(`api/user`).then(res => {
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