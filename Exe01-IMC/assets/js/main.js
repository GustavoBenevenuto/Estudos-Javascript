function escopo() {
    // Declaração das variaveis 
    const form = document.querySelector('.form');
    const peso = document.querySelector('.ipt-peso');
    const altura = document.querySelector('.ipt-altura');
    const quadroResposta = document.querySelector('.quadro-resposta');

    form.addEventListener('submit', () => {
        event.preventDefault();
        quadroResposta.style.display = 'flex';
        let cor;
        if (peso.value && altura.value) { //Verifica se está vazio
            if (Number(peso.value) && Number(altura.value)) { //Verifica se esta vazio e se é numero
                cor = '#93D432';
                let total = parseFloat((peso.value / (altura.value * altura.value))).toFixed(2);
                let resultado = calculaIMC(total);
                setQuadroResposta(`O seu IMC é ${total} (${resultado})`,cor);
            } else {
                cor = '#F73737';
                setQuadroResposta('Dados inválidos',cor);
            }
        } else {
            cor = '#F73737';
            setQuadroResposta('Preencha todos os campos',cor);
        }

    });

    function calculaIMC(total) {
        if (total < 18.5) {
            return 'Abaixo do peso';
        } else if (total >= 18.5 && total <= 24.9) {
            return 'Peso normal';
        } else if (total >= 25 && total <= 29.9) {
            return 'Sobrepeso';
        } else if (total >= 30 && total <= 34.9) {
            return 'Obesidade de grau 1';
        } else if (total >= 35 && total <= 39.9) {
            return 'Obsidade de grau 2';
        } else {
            return 'Obsidade de grau 3';
        }

    }

    function setQuadroResposta(msg,cor) {
        quadroResposta.style.backgroundColor = cor;
        quadroResposta.innerHTML = `<p> ${msg} <p>`;
    }

}

escopo();
