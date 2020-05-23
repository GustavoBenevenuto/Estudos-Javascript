class ValidaFormulario {

    constructor() {
        this.formulario = document.querySelector('.form');
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const camposValidos = this.camposSaoValidos();
        const senhasValidas = this.senhasSaoValidas();

        if(camposValidos && senhasValidas){
            alert('Formulário enviado com sucesso');
            this.formulario.submit();
        }
    }

    camposSaoValidos() {
        let valid = true;

        //Vai remover qualquer menssagem de error anterior, para que não haja
        //repetidas mensssagens de erro
        for(let error of this.formulario.querySelectorAll('.error-text')){
            error.remove();
        }

        //Vai pegar todos os inputs com a classe validar
        for (let campo of this.formulario.querySelectorAll('.validar')) {
            //Elemento irmão anterior, no caso o label
            let label = campo.previousElementSibling.innerText;
            // vazio?
            if (!campo.value) {
                //Vai enviar o campo e a menssagem para a cria erro
                this.criaErro(campo, 'Campos "'+label+'" estão em branco');
                valid = false;
            }

            if(campo.classList.contains('ipt-cpf')){
                if(!this.validaCPF(campo)) valid = false;

            }

            if(campo.classList.contains('ipt-usuario')){
                if(!this.validaUsuario(campo)) valid = false;
            }
        }
        
        return valid;
    }

    senhasSaoValidas(){
        let valid = true;
        const senha = this.formulario.querySelector('.ipt-senha');
        const repetirSenha = this.formulario.querySelector('.ipt-repetir-senha');
    
        if(senha.value !== repetirSenha.value){
            valid = false;
            this.criaErro(senha,'Senha e repetir senha devem ser iguais');
            this.criaErro(repetirSenha,'Senha e repetir senha devem ser iguais');
        }

        if(senha.value.length < 6 || senha.value.length >12){
            this.criaErro(senha, 'Senha precisa ter entre 6 e 12 caracteres');
            valid = false;
        }
        return valid;
    }

    criaErro(campo, msg) {
        //Cria a div
        const div = document.createElement('div');
        div.innerHTML = msg; //Insere a menssagem
        div.classList.add('error-text'); //Insere a classe error
        
        //A menssagem de erro vai aparece after(depois) do campo input onde se tem a classe validar
        campo.insertAdjacentElement('afterend', div);

    }

    validaCPF(campo){
        const cpf = new ValidaCPF(campo.value);

        if(!cpf.valida()){
            this.criaErro(campo, 'CPF invalido');
            return false;
        }
        return true;
    }

    validaUsuario(campo){
        const usuario = campo.value;
        let valid = true;
        if(usuario.length < 3 || usuario.length > 12){
            this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres');
            valid = false;
        }

        if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
            this.criaErro(campo, 'Usuário precisa conter apenas letras e/ou números');
            valid = false;
        }
        return valid;
    }
}

const valida = new ValidaFormulario();