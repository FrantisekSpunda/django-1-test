const form = document.querySelector('#loginForm')


form.addEventListener('submit', (event) => {
    event.preventDefault()

    let formData = {
        'username': form.username.value,
        'password': form.password.value,
    }

    fetch('http://127.0.0.1:8000/api/users/token/', {
        method:'POST', 
        headers: {
            'Content-Type': 'application/json',              
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if(data.access) {
            localStorage.setItem('token', data.access)
            window.location = 'file:///F:/web_dev/frontend/projects-list.html'
        }
        else {
            alert('Incorred username or password')
        }
    })
})