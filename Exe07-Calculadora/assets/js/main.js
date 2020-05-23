(function () {

    function calculadora() {
        return {
            display: document.querySelector('.display'),

            construtor() {
                this.display.focus();
                this.clickBotoes();
                this.pressopnarEnter();
            },

            clickBotoes() {
                //this continua nesse corpo
                document.addEventListener('click', function (e) { 
                    //mas ao entrar aqui o this será o this do document e n da calculadora
                    const el = e.target;

                    if (el.classList.contains('btn-num')) {
                        this.btnParaDisplay(el.innerText);
                    }

                    if(el.classList.contains('btn-clear')){
                        this.btnClearDisplay();
                    }

                    if(el.classList.contains('btn-del')){
                        this.btnApagarUm();
                    }

                    if(el.classList.contains('btn-eq')){
                        this.realizarConta();
                    }

                }.bind(this)); //falando para usar o this da calculadora
                //pode usar o bin() ou o arrow function
            },

            pressopnarEnter(){
                this.display.addEventListener('keyup', e => {
                    if(e.keyCode === 13){
                        this.realizarConta();
                    }
                });
            },

            btnParaDisplay(valor){
                this.display.value += valor;
            },

            btnClearDisplay(){
                this.display.value = '';
            },

            btnApagarUm(){
                this.display.value = this.display.value.slice(0, -1);
            },

            realizarConta(){
                let conta = this.display.value;

                try{
                    conta = eval(conta);
                    if(!conta){
                        alert('Conta inválida');
                        return;
                    }

                    this.display.value = String(conta);
                    this.display.focus();
                }catch(e){
                    alert('Conta inválida');
                    this.display.focus();
                    return;
                }
            },
        };
    }


    const calc = calculadora();
    calc.construtor();

}());