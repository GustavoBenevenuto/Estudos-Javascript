function escopo() {
    const relogio = document.querySelector('#relogio');
    const btnIniciar = document.querySelector('.btn-iniciar');
    const btnPausar = document.querySelector('.btn-pausar');
    const btnZerar = document.querySelector('.btn-zerar');
    let segundos = 0;
    let timer;
    let pisca1, pisca2;

    function iniciaRelogio(){
        timer = setInterval( () => {
            segundos++;
            relogio.innerText = criaHoraDosSegundos(segundos);
            console.log(segundos);
        }, 1000);
    }

    function limpaPisca(){
        clearInterval(pisca1);
        clearInterval(pisca2);
    }

    btnIniciar.addEventListener('click', () => {
        clearInterval(timer);
        limpaPisca();
        relogio.style.color = 'green';
        iniciaRelogio();
    });

    btnPausar.addEventListener('click', () => {
        limpaPisca();
        pisca1 = setInterval( () => {
            relogio.style.color = 'rgb(233, 0, 0)';
        }, 500);
        pisca2 = setInterval( () => {
            relogio.style.color = 'rgb(155, 0, 0)';
        }, 1000);        
        clearInterval(timer);
    });

    btnZerar.addEventListener('click', () => {
        limpaPisca();
        clearInterval(timer);
        relogio.style.color = 'black';
        segundos = 0;
        relogio.innerText = '00:00:00';
    });
}

function criaHoraDosSegundos(segundos){
    const data = new Date(segundos * 1000);
    return data.toLocaleTimeString('pt-BR',{
        hour12: false,
        timeZone: 'UTC'
    });
}

escopo();
