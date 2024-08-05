// Criar tarefa

const AbrirDialogCriar = document.querySelector('#CriarTarefaBtn');
const CriarDialog = document.querySelector('#CriarTarefaDialog')
const FecharCriarDialog = document.querySelector("#FecharCriar");
const CriarForm = document.querySelector('#CriarTarefa');

AbrirDialogCriar.addEventListener('click', () =>{
    CriarDialog.showModal();
})

FecharCriarDialog.addEventListener('click', () => {
    CriarDialog.close();
})

CriarForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tarefa = {
        titulo: e.target.CriarTitulo.value,
        descricao: e.target.CriarDescricao.value
    }

    const result = await CriarTarefa(tarefa);
    if(result === 200){
        CriarDialog.close();
        Notificacao(`<i class="fa-solid fa-circle-check"></i> Tarefa Criada com sucesso!`)
        Inicio();
    }
    else Notificacao(`<i class="fa-solid fa-circle-xmark"> Não foi possível criar a tarefa, por favor tente refazer o login.</i>`)
})

// Atualizar tarefa

const AtualizarDialog = document.querySelector('#AtualizarTarefaDialog');
const AtualizarForm = document.querySelector('#AtualizarTarefa');
const FecharAtualizar = document.querySelector('#FecharAtualizar');
const TarefaIdSpan = document.querySelector('#TarefaIdData');

FecharAtualizar.addEventListener('click', () => {
    AtualizarDialog.close();
})

function AtualizarTarefa(tarefaId){
    let tarefa = ListaTarefas.filter((t) => t.id === tarefaId)[0];
    AtualizarForm.AtualizarTitulo.value = tarefa.titulo;
    AtualizarForm.AtualizarDescricao.value = tarefa.descricao;
    TarefaIdSpan.innerText = tarefaId;
    AtualizarDialog.showModal();
}

AtualizarForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let result = await EditarTarefa({titulo: e.target.AtualizarTitulo.value, descricao: e.target.AtualizarDescricao.value, id: TarefaIdSpan.innerText})
    if(result === 200){
        Notificacao(`<i class="fa-solid fa-circle-check"></i> Tarefa Atualizada com sucesso!`)
        Inicio();
        AtualizarDialog.close();
    }
    else Notificacao(`<i class="fa-solid fa-circle-xmark"> Não foi possível atualizar a tarefa, por favor tente refazer o login.</i>`)
})

// Remover tarefa

async function Apagar(id){
    if(confirm("Tem certeza que deseja remover essa tarefa?")) {
        if(await RemoverTarefa(id) === 200)
        {
            Notificacao(`<i class="fa-solid fa-circle-check"></i> Tarefa removida com sucesso!`)
            Inicio();
        }
        else Notificacao(`<i class="fa-solid fa-circle-xmark"> Não foi possível remover a tarefa, por favor tente refazer o login.</i>`);
    }
}