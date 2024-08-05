// URL da Api;
const url = "https://localhost:7039/";

const token = document.cookie.split('token=')[1];

let data;
let notificacao;

// Login / Cadastro

async function Logar(credenciais) {
    let result;
    await fetch(url + "Auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json;charset=UTF-8"},
        body: JSON.stringify(credenciais)
    }).then((r) => result = r)
    .then((r) => r.text())
    .then((text) => data = JSON.parse(text)).catch(() => result = "Usuário ou senha inválidos");
    
    if(result.status === 200){
        document.cookie = `token=${data.token}`;
        sessionStorage.setItem('Nome', data.nome);
        window.location.replace("/");
    } else return result;
}

async function Cadastro(credenciais){
    let result;
    await fetch(url + "Auth/cadastro", {
        method: "POST",
        headers: {"Content-Type": "application/json;charset=UTF-8"},
        body: JSON.stringify(credenciais)
    }).then((r) => result = r).catch((r) => result = r.text())

    if(result.status === 200){
        document.querySelector("#SucessoCadastro").innerText = "Usuário cadastrado com sucesso!\n redirecionando..."
        setTimeout(() => {location.reload()}, 3000);
    }
    else if(result.status === 400){
        return "Email já cadastrado.";
    }
    else return "Falha ao cadastrar";
}

function Logout() {
    var Cookies = document.cookie.split(';');
    for (var i = 0; i < Cookies.length; i++) {
        document.cookie = Cookies[i] + "=; expires="+ new Date(0).toUTCString();
    }
    sessionStorage.clear();
    window.location.replace("/login.html");
}

// Requisições CRUD das tarefas

async function CriarTarefa(Tarefa){
    let result;
    await fetch(url + "api/Tarefas", {
        method: "POST",
        headers: {"Authorization": `Bearer ${token}`,
                 "Content-Type": "application/json;charset=UTF-8"},
        body: JSON.stringify(Tarefa)
    }).then((r) => result = r).catch((r) => result = r)

    return result.status;
}

async function TodasTarefas() {
    let result;
    let tarefas;
    await fetch(url + "api/Tarefas/", {
        method: "GET",
        headers: {"Authorization": `Bearer ${token}`},
    }).then((r) => result = r).then((r) => r.text())
    .then((text) => tarefas = JSON.parse(text))
    .catch((ex) => console.error(ex));

    if(result.status == 200) return tarefas
}

async function GetPaginacao(num){
    let result;
    let data;
    await fetch(url + "api/Tarefas/" + num,{
        method: "GET",
        headers: {"Authorization": `Bearer ${token}`},
    }).then((r) => result = r)
    .then((r) => r.text()).then((text) => data = JSON.parse(text))
    
    return data;
}

async function EditarTarefa({titulo, descricao, id}) {
    let result;
    await fetch(url + "api/Tarefas/" + id, {
        method: "PUT",
        headers: {"Authorization": `Bearer ${token}`,
                 "Content-Type": "application/json;charset=UTF-8"},
        body: JSON.stringify({titulo, descricao})})
        .then((r) => result = r).catch((ex) => console.error(ex));

        return result.status;
}

async function RemoverTarefa(id){
    let result;
    let data;
    await fetch(url + "api/Tarefas/" + id, {
        method: "DELETE",
        headers: {"Authorization": `Bearer ${token}`}
    }).then((r) => result = r).then((r) => r.text())
    .then((text) => data = text);

    return result.status;
}

// Modo Noturno/Claro

const NoturnoClaro = document.querySelector('#NoturnoClaro');

NoturnoClaro.addEventListener('click', (e) => {
    if(localStorage.getItem('modo') === 'dark'){
        document.body.classList.remove('dark');
        localStorage.setItem('modo','light');
        e.target.classList.remove('fa-sun');
        e.target.classList.add('fa-moon');
    }
    else{
        document.body.classList.add('dark');
        localStorage.setItem('modo','dark');
        e.target.classList.remove('fa-moon');
        e.target.classList.add('fa-sun');
    }
})