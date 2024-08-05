const Titulo = document.querySelector('.MainTitle');
const PaginasDiv = document.querySelector('.Paginas');
const PrimeiraPag = document.querySelector('#PrimeiraPag');
const PagAnterior = document.querySelector('#PagAnterior');
const PagSeguinte = document.querySelector('#PagSeguinte');
const UltimaPag = document.querySelector('#UltimaPag');
const Section = document.querySelector('.ListaTarefas');
const BarraNotificacao = document.querySelector('.Notificacao');
const BarraDePesquisa = document.querySelector('#BuscarTarefa');

let ListaTarefas;
let PaginasNum;
let PaginaAtual = 1;

// Exibe o nome do usuário no cabeçalho

try{
    Titulo.innerText += `, ${sessionStorage.getItem('Nome').split(' ')[0]}!`;
}catch(ex){console.error(ex)}

// Exibe as tarefas e adiciona as funcionalidades

async function CarregarTarefas(page){
    PaginaAtual = page;
    document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
    document.querySelector("#pag" + page).classList.add('active');
    Section.innerHTML = '';
    const Tarefas = await GetPaginacao(page);
    await Tarefas.forEach(tarefa => {
        Section.innerHTML += `<div id="Tarefa${tarefa.id}" class="Tarefa">
            <div class="TarefaHeader">
                <div class="HeaderEsquerda">
                    <i id="abrir${tarefa.id}" onclick="AbrirDescricao(${tarefa.id})" class="ExibirDesc fa-solid fa-caret-right"></i>
                    <h3>${tarefa.titulo}</h3>
                </div>
                <div class="HeaderDireita">
                    <i onclick="AtualizarTarefa(${tarefa.id})" class="AtualizarIcon fa-solid fa-pencil"></i>
                    <i onclick="Apagar(${tarefa.id})" class="RemoverIcon fa-solid fa-trash"></i>
                </div>
            </div>
            <p id="descricao${tarefa.id}" class="Descricao">${tarefa.descricao}</p>
        </div>`
    });
}

function AbrirDescricao(id){
    let desc = document.querySelector('#descricao' + id);
    let btn = document.querySelector('#abrir' + id);
    if(desc.classList.contains('Aberto'))
        {
            desc.classList.remove('Aberto')
            btn.classList.remove('fa-caret-down')
            btn.classList.add('fa-caret-right')
        }
        else {
            desc.classList.add('Aberto')
            btn.classList.remove('fa-caret-right')
            btn.classList.add('fa-caret-down')
        }
}


// Função busca

BarraDePesquisa.addEventListener('keyup', (e) => {
    if(e.target.value === '') throw Inicio()
    const Resultado = ListaTarefas.filter(function (t){
        if(t.titulo.toUpperCase().includes(e.target.value.toUpperCase()) || 
        t.descricao.toUpperCase().includes(e.target.value.toUpperCase()))
            return t;
    })
    CarregarBusca(Resultado);
})

function CarregarBusca(tarefas){
    Section.innerHTML = ''
     tarefas.forEach(tarefa => {
        Section.innerHTML += `<div id="Tarefa${tarefa.id}" class="Tarefa">
            <div class="TarefaHeader">
                <div class="HeaderEsquerda">
                    <i id="abrir${tarefa.id}" onclick="AbrirDescricao(${tarefa.id})" class="ExibirDesc fa-solid fa-caret-right"></i>
                    <h3>${tarefa.titulo}</h3>
                </div>
                <div class="HeaderDireita">
                    <i onclick="AtualizarTarefa(${tarefa.id})" class="AtualizarIcon fa-solid fa-pencil"></i>
                    <i onclick="Apagar(${tarefa.id})" class="RemoverIcon fa-solid fa-trash"></i>
                </div>
            </div>
            <p id="descricao${tarefa.id}" class="Descricao">${tarefa.descricao}</p>
        </div>`
    });
}

// Obtem o número de páginas e as gera por um laço for

async function RenderPaginas(){
    PaginasDiv.innerHTML = ''
    let index = 1;
    let pagsNum = PaginasNum;
    if(PaginaAtual > PaginasNum) PaginaAtual = 1;
     if(PaginasNum > 10){
        pagsNum = 10
        if(PaginaAtual > 7){
            index = PaginaAtual - 1;
            pagsNum = PaginaAtual + 9;
        }
    }
    for(index; index <= pagsNum; index++){
        CriarPaginaBtn(index)
    }
}

// Definição da paginação

function CriarPaginaBtn(index){
    const Pagbtn = document.createElement('span')
    if(index === PaginaAtual) Pagbtn.classList.add('active')
    Pagbtn.classList.add('page')
    Pagbtn.id = "pag" + index;
    Pagbtn.innerText = index;
    Pagbtn.addEventListener('click', (e) =>{
        CarregarTarefas(Pagbtn.innerText)
    })
    PaginasDiv.appendChild(Pagbtn)
}

PrimeiraPag.addEventListener('click', () =>{
    PaginaAtual = 1;
    Inicio();
})

PagAnterior.addEventListener('click', () => {
    if(PaginaAtual === 1) return;
    PaginaAtual--;
    Inicio();
})

PagSeguinte.addEventListener('click', () =>{
    if(PaginaAtual === PaginasNum) return;
    PaginaAtual++;
    Inicio();
})

UltimaPag.addEventListener('click', () =>{
    PaginaAtual = PaginasNum;
    Inicio();
})

function Notificacao(mensagem){
    BarraNotificacao.innerHTML = mensagem;
    BarraNotificacao.style.opacity = "1";
    setTimeout(() => {BarraNotificacao.style.opacity = "0"}, 4000)
}

// Função inicial

async function Inicio(){
    ListaTarefas = await TodasTarefas();
    PaginasNum = Math.ceil(ListaTarefas.length / 10);
    if(PaginasNum == 0) PaginasNum = 1;
    await RenderPaginas();
    CarregarTarefas(PaginaAtual)
};

Inicio();