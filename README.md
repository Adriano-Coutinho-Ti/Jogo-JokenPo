# 🎮 Jokenpô contra a Alexa (Você vs. Alexa)

Bem-vindo ao repositório do **Jokenpô contra a Alexa**! Este é um jogo de Pedra, Papel e Tesoura totalmente interativo desenvolvido no navegador, onde o usuário enfrenta a "Alexa" em partidas dinâmicas e com tempo limite.

> 🚀 **Nota de Aprendizado:** Este projeto foi desenvolvido inteiramente por mim com **menos de 1 mês de estudo de JavaScript do absoluto zero**. O objetivo principal foi aplicar na prática conceitos de manipulação do DOM, controle de tempo com intervalos e lógica de programação básica/intermediária.

---

## 💻 Sobre o Projeto

O sistema simula uma partida clássica de Jokenpô (Melhor de 5 rodadas) com elementos modernos de interface de usuário (UI) e experiência do usuário (UX), como feedbacks visuais de cores, transparências nas cartas ao passar o mouse e controle estrito do fluxo do jogo por meio de cronômetro.

### ⚙️ Funcionalidades Principais:
* **Configuração Flexível:** Permite alterar facilmente no topo do código o número de rodadas (`configRodadas`) e o tempo do cronômetro (`configCronometro`).
* **Inteligência Artificial Aleatória:** A rodada da Alexa é gerada em tempo real e de forma randômica enquanto o cronômetro corre.
* **Cronômetro Dinâmico com Feedback Visual:** O timer muda de cor (Verde ➔ Laranja ➔ Vermelho) conforme o tempo vai esgotando.
* **Punição por Inatividade:** Se o jogador não escolher uma carta antes do cronômetro zerar, a Alexa ganha o ponto da rodada automaticamente.
* **Menu de Regras Animado (Accordion):** Um menu de tutorial suave feito com a tag `<details>` integrada ao JavaScript para realizar um scroll suave sincronizado na tela.
* **Prevenção de Bugs:** Botões de ação são desabilitados durante o andamento da rodada para evitar cliques múltiplos e travamento de loops.

---

## 🛠️ Tecnologias Utilizadas

Para a construção deste projeto, utilizei as três tecnologias base do Front-end:

* **HTML5:** Estruturação semântica do jogo (Uso de tags como `header`, `main`, `nav`, `footer`, `fieldset`, `details`, entre outras).
* **CSS3:** Estilização visual, layout responsivo com Flexbox, efeitos de hover, cursor personalizado (`not-allowed`) e transições de opacidade/altura para animações suaves.
* **JavaScript (ES6):** Toda a inteligência e motor de regras do jogo.

---

## 🧠 Conceitos de JavaScript Aplicados

Neste projeto, consegui praticar e consolidar os seguintes tópicos fundamentais da linguagem:

1. **Manipulação Avançada do DOM:** Seleção de múltiplos elementos (`querySelector`), alteração de conteúdos dinamicamente (`innerHTML`) e modificação de estilos direto no script (`style.color`, `style.display`, `style.opacity`).
2. **Escopo e Variáveis:** Uso de `let` e `const` para gerenciar o estado global e local do jogo (placar, rodada atual, cartas ativas).
3. **Estruturas Condicionais e de Repetição:** Aplicação de `if/else if/else` complexos para o motor de checagem do vencedor e estruturas `switch/case` para mapear os cliques das cartas e escolhas da IA.
4. **Gerenciamento de Tempo (Timers):** Uso de `setInterval` para o funcionamento do cronômetro e a animação do sorteio da Alexa, e `setTimeout` para controlar o tempo de exibição das cores e reabertura de rodadas.
5. **Eventos do Navegador (EventListeners):** Captura de cliques (`click`), entrada do mouse (`mouseenter`) e saída do mouse (`mouseleave`) para criar efeitos visuais interativos nas cartas.
6. **Matemática Nativa (`Math`):** Uso do `Math.random()` combinado com `Math.floor()` para gerar números aleatórios de 1 a 3 para a jogada da Alexa.

---

## 📑 Estrutura do Código: Como o Jogo Funciona por Trás

O script foi dividido logicamente em blocos funcionais para facilitar a leitura e manutenção:

* **Variáveis de Configuração:** Onde ficam definidas as regras da partida (Ex: Melhor de 5).
* **Menu de Tutorial:** Escuta o carregamento da página (`DOMContentLoaded`) e adiciona a animação de expansão e scroll do acordeão.
* **`timerTela()` (Função de Entrada):** Reinicia os estados de cada rodada, limpa a mesa, sorteia a animação da Alexa e dispara o contador regressivo de 1 em 1 segundo.
* **`jogoAlexa()`:** Fica trocando rapidamente os emojis na tela a cada 50ms usando `setInterval` para dar o efeito de "computando jogada".
* **`jogoJogador()`:** Captura o clique do jogador e imediatamente para os contadores (`stop()`), congelando as jogadas e chamando o motor do resultado.
* **`motorResultado()`:** Analisa quem jogou o quê com base na lógica clássica do Jokenpô e distribui a pontuação na tela aplicando as cores verde (vitória) e vermelho (derrota).
* **`finalPartida()`:** Verifica se a contagem de rodadas chegou ao fim e decide o grande campeão exibindo a tela de pódio final com emojis divertidos (`🏆`, `😎`, `👩‍💻`).

---

## 🎯 Próximos Passos (Melhorias Futuras)
Como este é o meu primeiro projeto oficial com menos de um mês de estudos, pretendo retornar a ele no futuro para aplicar conceitos mais avançados, tais como:

[ ] Refatorar o uso de strings booleanas para tipos primitivos (true/false).

[ ] Mudar a manipulação de cores direto no JS para alternância de classes CSS (classList.add).

[ ] Declarar variáveis de controle de timer de forma restrita no escopo correto para evitar poluição global.

Componente de Portfólio desenvolvido por Adriano Coutinho - Conecte-se comigo ou acompanhe minha jornada de evolução no desenvolvimento!
https://www.linkedin.com/in/adriano-coutinho-ti/
