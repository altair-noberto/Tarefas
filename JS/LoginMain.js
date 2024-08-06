const LoginForm = document.querySelector('#LoginForm');
const CadastroForm = document.querySelector('#CadastroForm');
const CadastroContainer = document.querySelector('#CadastroContainer');
const SenhaInput = document.querySelector('#senhaRegistro')
const SenhaConfirm = document.querySelector('#senhaConfirm')
const LoginContainer = document.querySelector('#LoginContainer');

// Botões para ir ao login ou cadastro

const IrCadastro = document.querySelector('#IrRegistro');
const IrLogin = document.querySelector('#IrLogin');

// Span de validação da senha

const validmaiuscula = document.querySelector('#ValidarMaiuscula')
const validminuscula = document.querySelector('#ValidarMinuscula')
const validnumero = document.querySelector('#ValidarNumero')
const validsimbolo = document.querySelector('#ValidarSimbolo')
const validtamanho = document.querySelector('#ValidarTamanho')

LoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const labelLogin = document.querySelector('#LabelLogin');
    labelLogin.innerText = "Autenticando...";
    const credenciais = {
        email: e.target.email.value,
        senha: e.target.senha.value
    }
    let result = await Logar(credenciais);
    if(result.status != 200) labelLogin.innerText = "Usuário ou senha inválidos";
})

CadastroForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const labelCadastro = document.querySelector('#LabelCadastro')
    labelCadastro.innerText = "Cadastrando...";
    const credenciais = {
        nome: e.target.nomeRegistro.value,
        email: e.target.emailRegistro.value,
        senha: e.target.senhaRegistro.value,
    }
    let result = await Cadastro(credenciais);
    labelCadastro.innerText = '';
    if(result != undefined) labelCadastro.innerText = result
})

IrCadastro.addEventListener('click', () => {
    LoginContainer.classList.add('hidden');
    CadastroContainer.classList.remove('hidden');
})

IrLogin.addEventListener('click', () => {
    CadastroContainer.classList.add('hidden');
    LoginContainer.classList.remove('hidden');
})

// Verificação de senha

function VerificarSenha(entrada){
    const minuscula = /(?=.*[a-z])/;
    const maiuscula = /(?=.*[A-Z])/;
    const tamanho = /^.{6,16}$/;
    const simbolo = /[$*&@#%]/;
    const numero = /[0-9]/;

    return {
        validminuscula: minuscula.test(entrada), // id 0
        validmaiuscula: maiuscula.test(entrada), // id 1
        validtamanho: tamanho.test(entrada), // id 2
        validsimbolo: simbolo.test(entrada), // id 3
        validnumero: numero.test(entrada), // id 4

        validar: function () {
            if(this.validmaiuscula && this.validminuscula && this.validtamanho 
                && this.validnumero
                && this.validsimbolo
            ) return true;
            return false
        }
    }
}

let SenhaValida = false;
let ConfirmarSenha = false;

function ExibirValidacao(){
    document.querySelector('.SenhaValida').style.display = 'initial'
}

function OcultarValidacao(){
    document.querySelector('.SenhaValida').style.display = 'none'
}

SenhaInput.addEventListener('keyup', (e) => {
    const validacoes = VerificarSenha(e.target.value)
    ConfirmarSenha = VerificarConfirmarSenha();

    function validar(condicaoId, label){
        const condicao = Object.values(validacoes)[condicaoId]
        condicao ? label.classList.add('check') : label.classList.remove('check');
    }

    validar(0, validminuscula)
    validar(1, validmaiuscula)
    validar(2, validtamanho)
    validar(3, validsimbolo)
    validar(4, validnumero)

    if(validacoes.validar()){
        SenhaValida = true;
        ValidarSenha()
    }
    if(!validacoes.validar()) {
        SenhaValida = false;
        ValidarSenha()
    }
})

SenhaConfirm.addEventListener('keyup', () => {
    ConfirmarSenha = VerificarConfirmarSenha()
    ValidarSenha()
})

function VerificarConfirmarSenha(){
    if(SenhaInput.value === SenhaConfirm.value) return true;
    return false
}

function ValidarSenha(){
    if(SenhaValida && ConfirmarSenha){
        CadastroForm.CadastroSubmit.removeAttribute('disabled')
        CadastroForm.senhaRegistro.classList.remove('invalid')
    }
    else {
        CadastroForm.CadastroSubmit.setAttribute('disabled', '')
        CadastroForm.senhaRegistro.classList.add('invalid')
    }
}