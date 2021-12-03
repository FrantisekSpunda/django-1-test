let logoutBtn = document.getElementById('logout-btn')
let loginBtn = document.getElementById('login-btn')
if(localStorage.getItem('token')) {
    loginBtn.remove()
} else {
    logoutBtn.remove()
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token')
})

let getData = () => {

    fetch('http://127.0.0.1:8000/api/projects/')
    .then(response => response.json())
    .then(data => {

        mainContentProjects = new RenderProjects({
            data: data,
            wrapperId: 'projects-wrapper',
            baseUrl: 'http://127.0.0.1:8000',
        })

    })
}

class RenderProjects {
    constructor({data, wrapperId, baseUrl}) {
        this.data = data
        this.wrapperId = wrapperId
        this.baseUrl = baseUrl
        this.init()
    }

    initWrapper() {
        this.wrapperHtml = document.getElementById(this.wrapperId)
        this.wrapperHtml.innerHTML = ''
    }

    initContent(projects) {
        this.content = []
        this.content['projects'] = []

        projects.forEach((project, index) => {
            this.content['projects'][index] = document.createElement('div')
            this.content['projects'][index].classList.add('mainWrapper__item')
            this.content['projects'][index].innerHTML =`
                <img src="${this.baseUrl + project.featured_image}">
                <div>
                    <div class="mainWrapper__item__header">
                        <h3>${project.title}</h3>
                        <strong class="vote--option" data-vote="up" data-project="${project.id}">&#43;</strong>
                        <strong class="vote--option" data-vote="down" data-project="${project.id}">&#8722;</strong>
                    </div>
                    <i>${project.vote_ratio}% Positive feedback</i>
                    <p>${project.description.substring(0, 150)}</p>
                </div>
            `

            this.wrapperHtml.appendChild(this.content['projects'][index])
        });

        
    }

    initVoteEvents() {
        this.content['voteButtons'] = []
        this.content['voteButtons'] = this.wrapperHtml.querySelectorAll('.vote--option')

        this.content['voteButtons'].forEach(voteButton => {
            voteButton.addEventListener('click', (event) => {
                let vote = event.target.dataset.vote
                let project = event.target.dataset.project
                let token = localStorage.getItem('token')

                fetch(`${this.baseUrl}/api/projects/${project}/vote/`, {
                    method:'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,                    
                    },
                    body: JSON.stringify({'value': vote})
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Succes: ', data);
                })
                location.reload();
            })
            this.initContent(this.data)
        })
    }

    init() {
        this.initWrapper()
        this.initContent(this.data)
        this.initVoteEvents()
        console.log(this)
    }

}

getData()