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

const ValidarMaiuscula = document.querySelector('#ValidarMaiuscula')
const ValidarMinuscula = document.querySelector('#ValidarMinuscula')
const ValidarNumero = document.querySelector('#ValidarNumero')
const ValidarSimbolo = document.querySelector('#ValidarSimbolo')
const ValidarTamanho = document.querySelector('#ValidarTamanho')

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
        validminuscula: minuscula.test(entrada),
        validmaiuscula: maiuscula.test(entrada),
        validtamanho: tamanho.test(entrada),
        validsimbolo: simbolo.test(entrada),
        validnumero: numero.test(entrada),

        validar: function () {
            if(this.validmaiuscula && this.validminuscula && this.validtamanho 
                && this.validnumero
                && this.validsimbolo
            ) return true
            else return false
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
    if(validacoes.validmaiuscula) ValidarMaiuscula.classList.add('check'); else ValidarMaiuscula.classList.remove('check')
    if(validacoes.validminuscula) ValidarMinuscula.classList.add('check'); else ValidarMinuscula.classList.remove('check')
    if(validacoes.validnumero) ValidarNumero.classList.add('check'); else ValidarNumero.classList.remove('check')
    if(validacoes.validsimbolo) ValidarSimbolo.classList.add('check'); else ValidarSimbolo.classList.remove('check')
    if(validacoes.validtamanho) ValidarTamanho.classList.add('check'); else ValidarTamanho.classList.remove('check')
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
    if(SenhaInput.value === SenhaConfirm.value) return true
    else return false
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