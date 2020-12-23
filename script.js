const APIURL = 'https://api.github.com/users/';

const form = document.getElementById("form");
const i = document.getElementById("search-i");
const search = document.getElementById("search");
const main = document.getElementById("main");

async function getUser(username){
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    createUserCard(respData);

    getRepos(username);
}

async function getRepos(username){
    const resp = await fetch(APIURL + username + '/repos');
    const respData = await resp.json();

    addReposToCard(respData);
}

function createUserCard(user){
    const cardHTML = `
    <div class="card">
        <div>
            <img src="${user.avatar_url}">
        </div>
        <div>
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul>
                <li>
                <i class="fas fa-users"></i>
                ${user.followers}
                </li>

                <li>
                <i class="fas fa-heart"></i>
                ${user.following}
                </li>

                <li>
                <i class="fas fa-briefcase"></i>
                ${user.public_repos}
                </li>
            </ul>

            <div class="repos" id="repos"></div>
        </div>
    </div>
    `;

    main.innerHTML = cardHTML;
}

function addReposToCard(repos){
    const reposEl = document.getElementById("repos");

    repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0,10).forEach(repo => {
        const repoEl = document.createElement("a");

        repoEl.classList.add("repo");

        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    });
}

i.addEventListener("click", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user){
        getUser(user);

        search.value = "";
    }
});
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user){
        getUser(user);

        search.value = "";
    }
});