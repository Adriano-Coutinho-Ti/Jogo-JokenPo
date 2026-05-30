//Menu de Tutorial/Regras - ja estamos usando o details,summary para fazer o meu porem para ele ficar suave foi usado o JS.
document.addEventListener("DOMContentLoaded", function () {// to esperando a tela ser total carregada o HTML.
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