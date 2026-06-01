// Variáveis globais do sistema.
const button = document.querySelector('#button-jogar');
const cronometro = document.querySelector('#cronometro');
const rodadasTela = document.querySelector('.rodadas')
const rodadas = document.querySelector('.numero-rodadas');
const containerBase = document.querySelector('.container-base');
const containerGanhador = document.querySelector('.container-ganhador ');
const buttonReiniciar = document.querySelector('#button-reiniciar');
const alexa = document.querySelector('#alexa');
const jogador = document.querySelector('#jogador');
const jogadorVitoria = document.querySelector('.jogador-vitoria');
const alexaVitoria = document.querySelector('.alexa-vitoria');
const carta1 = document.querySelector('#carta1')
const carta2 = document.querySelector('#carta2')
const carta3 = document.querySelector('#carta3')
const vencedor = document.querySelector('.nome');
const iconeTrophy = document.querySelector('.icone-trophy');
const textVencedor = document.querySelector('#text-vencedor')

let configRodadas = 5;// Pode ser modificado para quantas rodadas precisar
let configCronometro = 10;// Em segundos - Pode ser modificado para quantos segundos precisar

// Não editar as informações abaixo. 
rodadasTela.innerHTML = "Melhor de " + configRodadas + " Rodadas";
cronometro.innerHTML = configCronometro;

let rodada = 0;
let cronometroTela = configCronometro;
let jogando = "false";//Coloquei ele dentro dos "false" para ficar melhor de ver o codigo. porem sei que posso colcoar direto.

let jogadaJogador = null;
let jogadaAlexa = null;
let vitoriaJogador = 0;
let vitoriaAlexa = 0;

// Já estamos usando details/summary para fazer o menu, porém, para ele ficar suave, foi usado JS.
document.addEventListener("DOMContentLoaded", function () {// Esperando o HTML da tela ser totalmente carregado.
    const titulo = document.querySelector('.titulo-accordion');
    const details = document.querySelector('.legendas-regras details');
    const conteudo = document.querySelector('.conteudo-accordion');
    const container = document.querySelector('.container');

    if (titulo && details && conteudo && container) {
        titulo.addEventListener('click', function (e) {
            // Impede o navegador de abrir o details de forma bruta e instantânea
            e.preventDefault();

            // Se o menu está fechado, vamos abrir com animação
            if (!details.hasAttribute('open')) {
                // Abre a estrutura do details na página
                details.setAttribute('open', '');

                // Usa um mini-timeout para dar tempo do navegador entender a estrutura e soltar a animação suave
                setTimeout(() => {
                    conteudo.classList.add('expandido');
                }, 10);

                // Controla a rolagem fluida sincronizada com os 1.5s (1500ms)
                let tempoDecorrido = 0;
                const duracaoAnimacao = 1500;
                const intervaloTempo = 25;

                const intervaloScroll = setInterval(() => {
                    const posicaoFundoContainer = container.getBoundingClientRect().bottom + window.scrollY;
                    const alturaJanela = window.innerHeight;

                    window.scrollTo({
                        top: posicaoFundoContainer - alturaJanela + 30,
                        behavior: 'auto'
                    });

                    tempoDecorrido += intervaloTempo;

                    if (tempoDecorrido >= duracaoAnimacao) {
                        clearInterval(intervaloScroll);
                    }
                }, intervaloTempo);

            } else {
                // Se o menu já está aberto, faz o efeito reverso (fecha devagar)
                conteudo.classList.remove('expandido');

                // Aguarda os 1.5s da animação de fechamento terminar para remover o atributo de vez
                setTimeout(() => {
                    details.removeAttribute('open');
                }, 1500);
            }
        });
    }
});

// Vamos para o Motor onde e feito a verificação de quem ganhou.
function motorResultado() {

    if (jogadaJogador === jogadaAlexa) {// Já começo verificando se não foi empate dentro da rodada.

        setTimeout(() => {

            alexa.style.background = "#f0a504";
            jogador.style.background = "#f0a504";

        }, 1000);


    } else if (// Para quem não entendeu: 1: Pedra, 2: Papel, 3: Tesoura. Estou verificando quando o jogador ganha.
        jogadaJogador === 2 && jogadaAlexa === 1 ||
        jogadaJogador === 1 && jogadaAlexa === 3 ||
        jogadaJogador === 3 && jogadaAlexa === 2

    ) {
        vitoriaJogador = ++vitoriaJogador;// Adiciono uma vitória ao jogador.
        jogadorVitoria.innerHTML = "Vitórias " + vitoriaJogador;// Coloco esta atualização na tela.
        setTimeout(() => {// Abro um setTimeout de 1 segundo para fazer a tratativa de cor da tela.

            alexa.style.background = "#f00505";
            jogador.style.background = "#02700b";

        }, 1000);

    } else if(jogadaJogador == null) {// Verifico se o jogador jogou ou só ficou sem jogar - ele perde se não jogar.
        vitoriaAlexa = ++vitoriaAlexa;// Vitoria da Alexa e 1 ponto para ela.
        alexaVitoria.innerHTML = "Vitórias " + vitoriaAlexa;//Coloco isso na tela.
        setTimeout(() => {// Abro um TimeOut de 1 segundo para fazer a tratativa de cor da tela.

            alexa.style.background = "#02700b";
            jogador.style.background = "#f00505";
            alert("Você não jogou e a Alexa ganhou ponto");

        }, 1000);

    } else {// Se chegou até aqui, então a Alexa ganhou de fato. Então bora lá.
        vitoriaAlexa = ++vitoriaAlexa;// 1 ponto para ela.
        alexaVitoria.innerHTML = "Vitórias " + vitoriaAlexa;//Coloco isso na tela.
        setTimeout(() => {// Abro um TimeOut de 1 segundo para fazer a tratativa de cor da tela.

            alexa.style.background = "#02700b";
            jogador.style.background = "#f00505";

        }, 1000);
    }

}

// Estamos agora preparando a jogada do jogador (você que está lendo isso kkkk).
function jogoJogador(carta) {// A função recebe o número da carta: 1, 2 ou 3, como já informado antes.

    if (jogando == "true") {// Verificamos se a jogada está ativa - se o jogador realmente iniciou a partida.

        let cartaAtiva = null


        switch (carta) {// Verificamos qual a carta ele escolheu.
            case 1:
                cartaAtiva = "&#x270A;";
                jogadaJogador = 1;
                break;

            case 2:
                cartaAtiva = "&#x270B;";
                jogadaJogador = 2;
                break;

            case 3:
                cartaAtiva = "&#x270C;";
                jogadaJogador = 3;
                break;

            default:
                cartaAtiva = "";
                break;
        }

        jogador.style.opacity = 1;// Removemos o opacity
        jogador.innerHTML = cartaAtiva;// Colocamos a carta na tela (Ou na mesa de jogo)


        cronometro.style.display = "none"// Removemos o Cronometro da tela.
        motorResultado() // Chamamos a função do motor.
        cronometro.style.color = "#02700b"
        cronometroTela = configCronometro;// Voltamos o cronometro para o configurado para quando ele for chamado já esta pronto.
        cronometro.innerHTML = cronometroTela;// Já colocamos o valor novo na tela. Ele não vai aparecer, porém já está lá no HTML esperando o display sair do none.
        stop()//Chamamos o Stop para parar tudo, la em baixo voce vai entender o que o stop faz.


    } else {// Se chegar ate aqui foi por que o jogador não iniciou uma partida.
        alert("Você precisa iniciar a partida!")// Um alerta para ele ficar atento.
    }

}
// Esta função é apenas para mostrar na tela a carta em cima da qual ele está com o mouse, ficando bem claro antes de clicar.
function jogoJogadorMostrar(carta) {// Mesma coisa do de cima, recebo a carta com o número dela.

    if (jogando == "true") {
        let cartaAtiva = null

        switch (carta) {
            case 1:
                cartaAtiva = "&#x270A;";
                break;

            case 2:
                cartaAtiva = "&#x270B;";
                break;

            case 3:
                cartaAtiva = "&#x270C;";
                break;

            default:
                cartaAtiva = "";
                break;
        }

        jogador.style.opacity = 0.3;//Coloco um opacity pra ficar bem clarinha.
        jogador.innerHTML = cartaAtiva;//Colocamso na tela pra mostrar a carta que ainda pode ser clicada.

    }

}

// Vamos para a Jogada TOP, a ALEXA aqui vamos fazer tudo de forma aleatória usando o Math.random.
function jogoAlexa() {

    jogoAlexaleatorio = setInterval(() => {// Colocamos o setInterval em uma variável para poder controlar ele.
        const resultado = Math.floor(Math.random() * 3 + 1);// Isso aki peja o valor Random 0,9 * 3 = 2,7 fica vira 2 por conta do floor e depois coloca +1 virando 3.

        switch (resultado) {// Verifico qual a carta que foi selecionada .
            case 1:
                alexa.innerHTML = "&#x270A;";// Pedra.
                jogadaAlexa = 1;// Coloca na variável.
                break;
            case 2:
                alexa.innerHTML = "&#x270B;";// Papel.
                jogadaAlexa = 2;// Coloca na variável.
                break;
            case 3:
                alexa.innerHTML = "&#x270C;";// Tesoura.
                jogadaAlexa = 3;// Coloca na variável.
                break;

            default:
                break;
        }

    }, 50);


}

// Estamos definindo as cores do timer (cronometro) para ficar legal o jogador saber que o tempo esta acabando.
function cor() {
    if (cronometroTela > 8) {// Ate os 7 segundo fica verde.
        cronometro.style.color = "#02700b"
    }
    if (cronometroTela <= 8 && cronometroTela > 5) {// Se for menos que 8 fica laranjado.
        cronometro.style.color = "#f0a504"
    }
    if (cronometroTela <= 5 && cronometroTela > 1) {// Menor que 5 fica vermelho.
        cronometro.style.color = "#f00505"
    }
}

// Chegamos no STOP aki vamos parar as coisa.
function stop() {

    if (rodada == configRodadas) {// Vamos verificar se chegamos na última rodada.
        finalPartida()// Se sim vamos chegar quem ganhou de verdade.
    }

    setTimeout(() => {// Abrimos o TimeOut de 3 segundos. para abriro resultado na tela. 
        button.disabled = false;// Estamos reabilitando o botão.
    }, 3000);
    clearInterval(cron)// Limpa o cronometro.
    clearInterval(jogoAlexaleatorio)// Para a jogada da Alexa.
    jogando = "false";// Fechamos o jogo agora.
}

// Vamos tratar o resultado final agora e mostrar o ganhador na tela.
function finalPartida() {

    if (vitoriaJogador == vitoriaAlexa) {// Se der empate (os dois jogadores com os mesmos pontos).

        vencedor.innerHTML = "Empate";// Aqui é simples, joga na tela.
        vitoriaJogador = 0;// Coloca 0 na variável para a próxima rodada.
        vitoriaAlexa = 0;// Coloca 0 na variável para a próxima rodada.
        iconeTrophy.innerHTML = "&#x1F926;&#x200D;&#x2642;&#xFE0F &#x1F926;&#x200D;&#x2640;&#xFE0F";//Coloca os icones na tela.
        textVencedor.innerHTML = "";// Não coloca nome de vencedor.

    } else if (vitoriaJogador > vitoriaAlexa) {// Se o jogador ganhar.
        textVencedor.innerHTML = "Vencedor";
        vencedor.innerHTML = "Você";
        vitoriaJogador = 0;
        vitoriaAlexa = 0;
        iconeTrophy.innerHTML = "&#x1F60E; &#x1F3C6;"
    } else {
        textVencedor.innerHTML = "Vencedora";// Se a Alexa ganhar.
        vencedor.innerHTML = "Alexa";
        vitoriaJogador = 0;
        vitoriaAlexa = 0;
        iconeTrophy.innerHTML = "&#x1F3C6; &#x1F469;&#x200D;&#x1F4BB"
    }

    setTimeout(() => {// Espera 3 segundo para mostrar o resultado final.
        containerGanhador.style.display = "flex";
        containerBase.style.display = "none";
    }, 3000);

}

// Função de entrada - estamos tratando várias informações nesta função. 
function timerTela() {// Vamos que vamos...
    jogando = "true";// Abrimos o Jogos.
    jogador.innerHTML = "";// Limpamos a variável.
    alexa.style.background = "";// Limpamos a cor de fundo (background).
    jogador.style.background = "";// Limpamos a cor de fundo (background).
    jogadorVitoria.innerHTML = "Vitórias " + vitoriaJogador;// Mostramos as vitórias na tela.
    alexaVitoria.innerHTML = "Vitórias " + vitoriaAlexa;// Mostramos as vitórias na tela.
    jogadaJogador = null// Limpa a jogada
    jogoAlexa()// Pedimos para a Alexa começas o jogo dela.
    containerGanhador.style.display = "none";// Escondemos o container do ganhador se estiver mostrando.
    containerBase.style.display = "flex";// Garantimos que o container base fique ativo.
    cronometro.style.display = "flex";// Garantimos que o container do cronometro fique ativo.
    rodadas.style.display = "flex";// Garantimos que o container rodadas fique ativo.
    button.disabled = true;// Desligamos o button agora para evitar o jogador apertar novamente.

    if (rodada == configRodadas) {// Se as rodadas já estiverem no limite, então precisamos limpar isso.
        rodada = 0
    }
    rodadas.innerHTML = "Rodada: " + ++rodada;// Vamos colocar uma rodada na tela. / Ja colocamos ++ antes para colocar uma rodada extra.

    cron = setInterval(() => {// Abrimos uma variável para controlar o timer de um segundo.

        cor()// Chamamos a cor.

        if (cronometroTela == 0) {// Vamos verificar se o tempo acabou .

            cronometro.style.color = "#02700b"// Vamos colocar ele no verde de volta.
            cronometroTela = configCronometro + 1;// Voltamos o cronometro para o da configuração.
        }

        cronometroTela--// Estamos tirando um segundo aqui.

        cronometro.innerHTML = cronometroTela;// Colocamos isso na tela.

        if (cronometroTela == 0) {// Quando o cronometro chegar a 0 ele fica preto.

            cronometro.style.color = "#000000"// Coloca ele como preto.
            motorResultado()// Chamamos o motor de resultado. Vamos ver quem ganhou nesta rodada.
            stop()// Para tudo com o STOP que já verificamos a cima.

        }

    }, 1000);// Este é o 1 segundo.

}


// Aqui vamos usar os EventListeners.
button.addEventListener("click", timerTela);// Estamos verificanso o button.
buttonReiniciar.addEventListener("click", timerTela);// Estamos verificanso o buttonReiniciar.

carta1.addEventListener("click", () => jogoJogador(1));// Vamos verificar se teve clique na carta 1
carta2.addEventListener("click", () => jogoJogador(2));// Vamos verificar se teve clique na carta 2
carta3.addEventListener("click", () => jogoJogador(3));// Vamos verificar se teve clique na carta 3
// Aqui estamos verificando se o mouse está em cima da carta ou se saiu de cima da carta.
carta1.addEventListener("mouseenter", () => jogoJogadorMostrar(1));
carta1.addEventListener("mouseleave", () => jogoJogadorMostrar(0));
carta2.addEventListener("mouseenter", () => jogoJogadorMostrar(2));
carta2.addEventListener("mouseleave", () => jogoJogadorMostrar(0));
carta3.addEventListener("mouseenter", () => jogoJogadorMostrar(3));
carta3.addEventListener("mouseleave", () => jogoJogadorMostrar(0));