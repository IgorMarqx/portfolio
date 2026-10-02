/**
 * Narrativa de cada projeto, lida dentro do modal.
 *
 * Cada capítulo é um par: um texto e a imagem que ele explica. O modal mostra a
 * imagem do capítulo que estiver sendo lido — por isso o texto de um capítulo
 * precisa fazer sentido olhando para aquela tela, e não para o projeto inteiro.
 */

export type Capitulo = {
  id: string;
  titulo: string;
  /** Tela do trecho. Sem `src` nem `video`, o palco mostra o cartão do capítulo. */
  imagem: { rotulo: string; legenda: string; src?: string; video?: string };
  paragrafos: string[];
};

export type DetalheProjeto = {
  titulo: string;
  resumo: string;
  /** Um parágrafo ou vários. */
  abertura: string | string[];
  capitulos: Capitulo[];
  fecho: string;
};

export const detalhesProjetos: Record<string, DetalheProjeto> = {
  "clube-de-tenis": {
    titulo: "Sistema de Gestão para Centro Tenístico",
    resumo: "Laravel · MySQL · Integração Sicredi · WhatsApp",
    abertura:
      "Quando o cliente me procurou, o centro tenístico funcionava — mas funcionava na cabeça das pessoas. Reserva de quadra, aula, mensalidade e boleto viviam em conversas de WhatsApp, planilhas paralelas e no Internet Banking. Nada disso estava errado por descuido: era o que dava para fazer sem sistema. O que faltava era um lugar onde a operação inteira coubesse.",
    capitulos: [
      {
        id: "quadras",
        titulo: "Começou pelas quadras",
        imagem: {
          rotulo: "[ MAPA DE RESERVAS ]",
          legenda:
            "Grade de horários das cinco quadras, com as regras de limite já aplicadas",
          video: "/videos/centro-tenistico/reservas-centro-tenistico.mp4",
        },
        paragrafos: [
          "A reserva chegava por mensagem. Alguém da secretaria lia, conferia de memória se o horário estava livre, respondia e anotava. Multiplique isso por cinco quadras e um dia cheio.",
          "O efeito colateral aparecia no fim de semana: um mesmo associado conseguia segurar vários horários, porque não existia nenhuma regra automática dizendo que não podia. Quem chegava depois encontrava a agenda ocupada por poucas pessoas.",
          "A primeira coisa que o sistema fez foi trazer a reserva para dentro — com as regras que o próprio centro definiu, não com as minhas. Disponibilidade, limite por associado, liberação de horário e cancelamento passaram a ser decisão da plataforma, não da lembrança de quem estava de plantão.",
        ],
      },
      {
        id: "visibilidade",
        titulo: "E então deu para ver o que acontecia",
        imagem: {
          rotulo: "[ DASHBOARD ]",
          legenda:
            "Uso das quadras, reservas do dia e histórico — o que antes não existia em lugar nenhum",
          video: "/videos/centro-tenistico/dashboard-centro-tenistico.mp4",
        },
        paragrafos: [
          "Centralizar a reserva teve um efeito que o cliente não tinha pedido: a operação virou número. Quantas reservas foram feitas, quais quadras e horários enchem, quem mais usa, quantas pessoas circulam por dia, quanto se cancela.",
          "Antes, essas perguntas só tinham resposta por impressão. O dashboard passou a responder com o registro — e decisão de diretoria deixou de depender de quem tinha a memória mais confiante.",
        ],
      },
      {
        id: "aulas",
        titulo: "Cada professor com seus alunos",
        imagem: {
          rotulo: "[ TURMAS E AULAS ]",
          legenda: "Turmas de um professor, com horários e alunos vinculados",
          src: "/img/centro-tenistico/turmas-centro-tenistico.png",
        },
        paragrafos: [
          "Do lado das aulas, o problema era outro: ninguém sabia dizer com precisão quantos alunos cada professor tinha, que turmas existiam e quais horários estavam comprometidos.",
          "O fluxo que desenhamos tem quatro passos e uma intenção clara — secretaria, professor, secretaria, aluno. A secretaria cadastra e vincula; o professor organiza turmas, horários e aulas; o processo volta para a secretaria, que trata a parte administrativa antes da confirmação final do aluno.",
          "O desenho existe para o professor conseguir tocar o trabalho dele sem ganhar permissão administrativa que não é da função dele. Ele mexe no que é seu; o controle continua com quem responde pelo centro.",
        ],
      },
      {
        id: "social",
        titulo: "O projeto social entrou na mesma casa",
        imagem: {
          rotulo: "[ PROJETO SOCIAL ]",
          legenda: "Participantes, professores responsáveis e aulas do projeto",
          src: "/img/centro-tenistico/projetosocial-centro-tenistico.png",
        },
        paragrafos: [
          "O centro oferece aulas gratuitas para crianças das comunidades. É uma das coisas de que o clube mais se orgulha — e era justamente uma das que menos estavam registradas.",
          "Participantes, professores responsáveis e aulas passaram a ficar no mesmo ambiente do resto da gestão. Deixou de ser uma iniciativa tocada à parte e virou parte oficial da operação, com acompanhamento como qualquer outro módulo.",
        ],
      },
      {
        id: "boletos",
        titulo: "O maior problema era o boleto",
        imagem: {
          rotulo: "[ COBRANÇAS ]",
          legenda:
            "Geração de cobrança integrada ao Sicredi e envio pelo WhatsApp",
          video: "/videos/centro-tenistico/financeiro-centro-tenistico.mp4",
        },
        paragrafos: [
          "Operação era dor de cabeça; financeiro era o que tirava o sono. O centro emite boleto pelo Sicredi e, até então, alguém entrava no Internet Banking, gerava boleto por boleto e mandava cada um para o aluno certo.",
          "O problema desse processo não é só o tempo. É que ele erra: cobrança enviada para a pessoa errada, cobrança esquecida, pagamento que ninguém sabe se entrou, e nenhuma visão de conjunto no fim do mês.",
          "A integração com o Sicredi trouxe a geração para dentro da plataforma, e o envio passou a sair pelo WhatsApp do aluno ou associado. O que antes eram várias ações manuais em sequência virou um passo do fluxo normal do sistema.",
        ],
      },
      {
        id: "cantina",
        titulo: "Quando a cantina virou financeiro",
        imagem: {
          rotulo: "[ CANTINA E ESTOQUE ]",
          legenda:
            "Consumo lançado para o associado, com produto, preço e estoque",
        },
        paragrafos: [
          "Com o financeiro estruturado, os outros módulos puderam se conectar a ele. A cantina é o exemplo mais direto: produtos, categorias, preços e estoque ficam no sistema, e o consumo lançado para um usuário pode gerar a cobrança sozinho.",
          "É a diferença entre ter vários sistemas pequenos e ter uma plataforma. Uma ação em um canto aparece no outro sem ninguém precisar transcrever nada.",
        ],
      },
      {
        id: "permissoes",
        titulo: "Cada um enxerga o que é seu",
        imagem: {
          rotulo: "[ USUÁRIOS E PERMISSÕES ]",
          legenda: "Perfis de diretoria, secretaria, professor e associado",
        },
        paragrafos: [
          "Diretoria, secretaria, professores, associados, alunos, convidados e funcionários usam a mesma plataforma com responsabilidades bem diferentes. Cada perfil enxerga e executa apenas o que a função pede.",
          "A autenticação ficou centralizada numa única estrutura de usuários, em vez de cada módulo manter o seu cadastro — decisão que evita a pessoa existir três vezes, com três senhas e três versões do próprio nome.",
        ],
      },
    ],
    fecho:
      "O pedido inicial era organizar reservas e parar de gerar boleto à mão. O que ficou foi a operação do centro inteira — quadras, aulas, projeto social, fila de espera, cantina, histórico e financeiro — dentro de uma aplicação só, com rastro de quem fez o quê. O ganho não foi digitalizar o que já existia: foi transformar um processo que dependia de memória e de conversa em algo estruturado, automatizado e auditável.",
  },

  integracoes: {
    titulo: "Integrações",
    resumo: "Node.js · Go · PHP/Laravel · RabbitMQ · Amazon MQ · AWS",
    abertura: [
      "Um pedido pode chegar por um marketplace, um sistema de gestão ou um canal próprio de vendas. Para o estabelecimento, ele precisa seguir para entrega. Para a Moovery, precisa entrar com as informações corretas, respeitar as regras da operação e manter sua origem identificada durante o processo.",
      "Na Moovery, desenvolvi integrações com Saipos, Anota.ai, Cardápio Web, 99Food, Brendi, iFood, Sischef, Delivery Direto, Neemo, Accon, Goomer, Ipalito, Hanzo, Pedino, Menew e Open Delivery.",
      "O desafio era fazer esse ecossistema funcionar em conjunto: receber pedidos de fontes diferentes, interpretar seus eventos e conectar cada fluxo à operação logística sem multiplicar as particularidades de cada parceiro dentro da Moovery.",
    ],
    capitulos: [
      {
        id: "problema",
        titulo: "Cada integração trazia uma nova forma de trabalhar",
        imagem: {
          rotulo: "[ O PROBLEMA ]",
          legenda: "Contratos, formatos e estados diferentes em cada parceiro",
        },
        paragrafos: [
          "Cada parceiro possui seu próprio contrato de comunicação: formatos de dados, autenticação, identificação de estabelecimentos, estados de pedido e regras para troca de informações.",
          "Alguns eventos chegam por webhook. Em outros fluxos, é necessário consultar a plataforma. Uma atualização pode ser reenviada, chegar atrasada ou representar um estado diferente daquele usado internamente.",
          "Sem uma camada para tratar essas diferenças, cada novo parceiro aumenta a complexidade da operação. O suporte precisa entender mais exceções, a manutenção fica mais dispersa e um mesmo pedido pode chegar por caminhos diferentes.",
          "Meu trabalho foi absorver essas particularidades nas integrações e encaminhar para a Moovery as informações necessárias para operar a entrega.",
        ],
      },
      {
        id: "abrangencia",
        titulo: "Dezesseis integrações conectadas ao mesmo objetivo",
        imagem: {
          rotulo: "[ ABRANGÊNCIA ]",
          legenda: "As 16 conexões do escopo, incluindo o padrão Open Delivery",
        },
        paragrafos: [
          "Saipos · Anota.ai · Cardápio Web · 99Food · Brendi · iFood · Sischef · Delivery Direto · Neemo · Accon · Goomer · Ipalito · Hanzo · Pedino · Menew · Open Delivery.",
          "Essas integrações ampliam os caminhos pelos quais um estabelecimento pode conectar seus pedidos à Moovery. O valor comercial está em permitir que a operação logística se conecte às ferramentas que os clientes já utilizam.",
          "A lista representa o escopo desenvolvido. Cada conexão possui suas próprias capacidades; recebimento de pedidos, atualização de status, cancelamento e rastreamento não são funcionalidades idênticas em todos os parceiros.",
        ],
      },
      {
        id: "padronizacao",
        titulo: "Traduzir na entrada para simplificar a operação",
        imagem: {
          rotulo: "[ PADRONIZAÇÃO ]",
          legenda: "Formato do parceiro traduzido para o formato interno na entrada",
        },
        paragrafos: [
          "Para fazer essas conexões trabalharem juntas, tratei as diferenças de comunicação antes de encaminhar os dados para a operação.",
          "A integração interpreta o formato externo, identifica o estabelecimento e a origem do pedido e traduz as informações para o formato utilizado internamente. Assim, as particularidades do parceiro ficam concentradas no ponto de integração.",
          "Essa separação permite trabalhar em duas responsabilidades: de um lado, entender o contrato de cada plataforma; do outro, aplicar o funcionamento da logística da Moovery.",
          "O benefício é uma operação mais consistente e uma manutenção com limites mais claros. Uma mudança no formato de um parceiro pode ser tratada na conexão correspondente, reduzindo a necessidade de espalhar adaptações pelo sistema.",
        ],
      },
      {
        id: "assincrono",
        titulo: "Receber um evento e executar o trabalho são etapas diferentes",
        imagem: {
          rotulo: "[ PROCESSAMENTO ASSÍNCRONO ]",
          legenda: "Entrada do parceiro, fila e processamento em background",
        },
        paragrafos: [
          "Nos fluxos assíncronos, o recebimento do evento foi separado do processamento de negócio. O evento entra na fila, e o trabalho continua em background.",
          "Utilizei RabbitMQ e Amazon MQ para desacoplar essas etapas. Isso reduz o trabalho executado durante a chamada externa e permite tratar processamento, falhas e novas tentativas fora da requisição de entrada.",
          "Essa estrutura ajuda a absorver variações de demanda e reduz o acoplamento entre o tempo de resposta de um parceiro e o processamento interno.",
          "A fila faz parte da solução, mas a confiabilidade também depende das regras de consumo: controle de ordem quando necessário, tratamento de falhas e cuidado para que uma nova tentativa não gere uma nova operação indevida.",
        ],
      },
      {
        id: "duplicidade",
        titulo: "O mesmo pedido pode aparecer mais de uma vez",
        imagem: {
          rotulo: "[ ORIGEM E DUPLICIDADE ]",
          legenda: "Evento reenviado encontra a operação que já existe, sem criar outra",
        },
        paragrafos: [
          "Reenvio de webhook não significa um novo pedido. Uma nova tentativa de processamento também não deveria criar outra entrega.",
          "Além disso, um estabelecimento pode utilizar ferramentas conectadas entre si. Isso torna necessário distinguir o canal que transmitiu o evento da origem do pedido.",
          "Implementei regras de idempotência e controle de origem para tratar esses cenários. O objetivo é reconhecer o que já foi recebido ou processado e impedir que repetições gerem operações duplicadas.",
          "Na prática, esse cuidado protege a operação contra solicitações indevidas, retrabalho do suporte e o risco de mobilizar entregadores para a mesma demanda mais de uma vez.",
        ],
      },
      {
        id: "continuidade",
        titulo: "A conexão precisa acompanhar o que acontece depois",
        imagem: {
          rotulo: "[ CONTINUIDADE DO FLUXO ]",
          legenda: "99Food: endpoints logísticos, webhooks e rastreamento do entregador",
        },
        paragrafos: [
          "O trabalho de integração continua depois da entrada do pedido. Conforme o contrato de cada parceiro, existem atualizações e comunicações necessárias para manter os sistemas alinhados.",
          "Na integração com a 99Food, desenvolvi endpoints logísticos, tratamento de webhooks e envio de informações de rastreamento com a localização do entregador.",
          "Esse é um exemplo concreto de integração que acompanha a execução logística. O pedido entra na Moovery, a operação evolui e as informações previstas no contrato retornam à plataforma.",
          "No conjunto das integrações, o cuidado é respeitar os eventos e as capacidades de cada parceiro, sem assumir que todos trabalham com os mesmos estados ou oferecem o mesmo fluxo.",
        ],
      },
      {
        id: "escala",
        titulo: "Centenas de conexões, milhares de pedidos e uma operação compartilhada",
        imagem: {
          rotulo: "[ ESCALA E PROCESSAMENTO ]",
          legenda: "599 vínculos com empresas, 497 ativos, em 17 integrações do painel",
        },
        paragrafos: [
          "O painel reúne 17 integrações cadastradas e 599 vínculos com empresas, dos quais 497 estão ativos. Além do iFood, são 188 vínculos distribuídos pelas demais integrações, com 165 ativos.",
          "Cardápio Web aparece com 95 vínculos, Anota.ai com 36, Saipos com 12 e Neemo com 9. A operação também recebe conexões de Brendi, 99Food, Delivery Direto, Accon, Sischef, Pedino, Ipalito, Hanzo, Menuvem e Goomer.",
          "A escala envolve diferentes fontes enviando pedidos e atualizações para uma mesma operação. Cada parceiro acrescenta formatos, regras e situações de falha que precisam ser tratados sem comprometer a consistência dos pedidos.",
          "Para lidar com essa carga, separei o recebimento dos eventos do processamento de negócio. Nos fluxos assíncronos, utilizei RabbitMQ e Amazon MQ para enfileirar o trabalho e executá-lo em background, reduzindo o processamento concentrado nas requisições externas.",
          "A fila cria uma separação entre a chegada dos eventos e sua execução. Isso permite organizar o trabalho pendente e tratar novas tentativas sem depender de uma chamada externa permanecer aberta durante todo o processamento.",
          "Também implementei idempotência e controle de origem para evitar que reenvios e reprocessamentos gerassem solicitações duplicadas. O tratamento de falhas e o acompanhamento da comunicação com os parceiros completam esse fluxo, dando contexto para identificar interrupções e recuperar o processamento.",
          "O resultado é uma arquitetura que ajuda a absorver variações de demanda e reduz o risco de sobrecarga causada pelo processamento imediato dos eventos, mantendo controle sobre o que entra e o que já foi executado.",
          "Volume informado: média aproximada de 5 mil pedidos por dia por integração. Nas 16 integrações do escopo, isso representa uma estimativa de 80 mil pedidos por dia, caso todas mantenham esse volume no mesmo período — uma soma que não equivale a pedidos únicos nem a entregas concluídas.",
        ],
      },
      {
        id: "visibilidade",
        titulo: "Saber onde a comunicação parou",
        imagem: {
          rotulo: "[ VISIBILIDADE OPERACIONAL ]",
          legenda: "Disponibilidade, última comunicação, último pedido, autenticação e timeouts",
        },
        paragrafos: [
          "Uma integração pode apresentar falha sem provocar um erro visível na tela. Os pedidos deixam de chegar, a autenticação falha ou uma plataforma demora a responder.",
          "Estruturei o acompanhamento de disponibilidade, última comunicação, último pedido recebido, falhas de autenticação, timeouts e erros de comunicação.",
          "Essas informações ajudam a localizar a interrupção e dão contexto para a investigação. Em vez de tratar todo incidente como “o pedido não entrou”, passa a ser possível identificar em qual etapa a comunicação apresentou problema.",
          "Essa visibilidade apoia tanto a manutenção técnica quanto o atendimento à operação.",
        ],
      },
      {
        id: "impacto",
        titulo: "Mais conexões comerciais e menos intervenção manual",
        imagem: {
          rotulo: "[ IMPACTO ]",
          legenda: "Ecossistema ampliado e menos correção manual entre sistemas",
        },
        paragrafos: [
          "As integrações ampliaram o ecossistema de plataformas conectadas à Moovery e reduziram a necessidade de intervenção manual nos fluxos automatizados.",
          "Para os estabelecimentos, isso facilita conectar seus canais de pedidos à operação de entrega. Para a Moovery, amplia as possibilidades de atender clientes que utilizam sistemas diferentes.",
          "Dentro da operação, os ganhos estão na padronização das informações, no tratamento de eventos repetidos, na possibilidade de reprocessar falhas com controle e na visibilidade sobre a saúde das conexões.",
          "Esses resultados têm efeito direto sobre o trabalho diário: menos necessidade de corrigir informações entre sistemas e mais contexto para resolver problemas quando eles acontecem.",
        ],
      },
      {
        id: "atuacao",
        titulo: "Do contrato externo à sustentação em produção",
        imagem: {
          rotulo: "[ MINHA ATUAÇÃO ]",
          legenda: "APIs, webhooks, filas, idempotência e diagnóstico de falhas",
        },
        paragrafos: [
          "Minha atuação envolveu o entendimento das regras de integração, desenvolvimento das conexões, tratamento dos eventos e acompanhamento do comportamento em produção.",
          "Trabalhei com APIs, webhooks, processamento assíncrono, idempotência, controle de origem e diagnóstico de falhas, utilizando tecnologias como Node.js, Go, PHP/Laravel, RabbitMQ e AWS em diferentes partes do ecossistema.",
          "O resultado é um conjunto de integrações que conecta plataformas diferentes à logística da Moovery, preservando as particularidades de cada parceiro e buscando consistência na operação interna.",
        ],
      },
    ],
    fecho:
      "Por trás de um pedido que chega e segue para entrega, existe um trabalho contínuo para manter sistemas independentes se comunicando de forma confiável.",
  },

  "antecipacao-repasses": {
    titulo: "Antecipação e repasses para entregadores",
    resumo: "Go · RabbitMQ · EventBridge · IUGU",
    abertura:
      "Entregador não espera fechamento de ciclo para receber. A antecipação existe para encurtar essa espera — e, por mexer com dinheiro de gente que conta com ele no mesmo dia, não pode depender de uma requisição HTTP chegar até o fim.",
    capitulos: [
      {
        id: "assincrono",
        titulo: "Dinheiro sai da frente da tela",
        imagem: {
          rotulo: "[ FLUXO DE ANTECIPAÇÃO ]",
          legenda: "Pedido, fila e processamento fora do fluxo síncrono",
        },
        paragrafos: [
          "O pedido de antecipação entra em fila e é processado em background. Quem pediu não precisa manter o aplicativo aberto, e uma queda de conexão no meio não deixa a operação pela metade.",
          "A integração com a IUGU acontece desse lado de cá, com o processamento assíncrono via RabbitMQ atendendo uma base de mais de 26 mil entregadores.",
        ],
      },
      {
        id: "agendamento",
        titulo: "Pagamento com hora marcada",
        imagem: {
          rotulo: "[ AGENDAMENTO ]",
          legenda: "EventBridge Scheduler disparando a rodada de pagamentos",
        },
        paragrafos: [
          "Além da antecipação sob demanda existem os pagamentos agendados e garantidos, que precisam acontecer num horário definido, todo dia, tenha ou não alguém usando o sistema.",
          "Esses rodam com AWS EventBridge Scheduler junto do Amazon MQ: a execução da operação financeira é agendada fora da aplicação, e a aplicação só consome o resultado.",
        ],
      },
      {
        id: "conciliacao",
        titulo: "O difícil é fechar a conta",
        imagem: {
          rotulo: "[ EXTRATO E CICLOS ]",
          legenda: "Saldos, transações, repasses e ciclos do entregador",
        },
        paragrafos: [
          "Enviar o pagamento é a parte simples. O trabalho está em garantir que o mesmo valor não saia duas vezes e que o extrato mostre exatamente o que aconteceu no provedor.",
          "Isso envolve as regras de saldo, transação, repasse, ciclo, crédito, débito e antecipação, as triggers que sustentam parte disso no banco e as rotinas de conciliação — com webhooks de IUGU, Mercado Pago e Asaas chegando de fora e precisando ser casados com o que já existe aqui dentro.",
        ],
      },
    ],
    fecho:
      "Um fluxo que ninguém elogia quando funciona. O critério de sucesso é silencioso: o entregador recebe o valor certo, no momento certo, e a conciliação fecha no dia seguinte.",
  },

  "compras-licitacoes": {
    titulo: "Sistema de Compras e Licitações",
    resumo: "PHP · MySQL · Processos administrativos",
    abertura:
      "Comprar dentro de um órgão é menos sobre a compra e mais sobre conseguir provar depois como ela aconteceu. O processo passava por planilha, papel e combinação informal — e quem queria saber em que pé estava uma solicitação dependia de achar a pessoa certa e de ela lembrar.",
    capitulos: [
      {
        id: "solicitacao",
        titulo: "Toda solicitação passa a ter dono e etapa",
        imagem: {
          rotulo: "[ PROCESSOS ]",
          legenda: "Lista de solicitações por etapa e responsável",
        },
        paragrafos: [
          "A solicitação entra no sistema e nasce com responsável e etapa. Nada avança por mensagem paralela: o estado do processo é o que está registrado.",
          "Fornecedores, valores e propostas ficam junto do processo a que pertencem, e não em arquivos soltos que precisam ser reunidos de novo toda vez.",
        ],
      },
      {
        id: "historico",
        titulo: "O histórico é o produto",
        imagem: {
          rotulo: "[ MOVIMENTAÇÕES ]",
          legenda: "Linha do tempo de um processo, com quem moveu e quando",
        },
        paragrafos: [
          "Cada movimentação fica gravada com autor e data. Meses depois, reconstituir uma decisão deixa de ser um exercício de arqueologia.",
          "Sobre esse registro vêm os relatórios administrativos e o controle de permissões por perfil — cada um enxerga o que a função pede.",
        ],
      },
    ],
    fecho:
      "O ganho é rastreabilidade: menos dependência de planilha paralela e do conhecimento individual de quem tocava o processo.",
  },

  "ponto-funcionarios": {
    titulo: "Sistema de Ponto e Gestão de Funcionários",
    resumo: "PHP · MySQL · Controle de jornada",
    abertura:
      "Controle de frequência espalhado entre folha e anotação não sustenta auditoria. A informação até existe, mas ninguém consegue somá-la com confiança no fim do mês.",
    capitulos: [
      {
        id: "marcacoes",
        titulo: "A marcação e o que veio antes dela",
        imagem: {
          rotulo: "[ MARCAÇÕES ]",
          legenda: "Entradas e saídas do funcionário, dia a dia",
        },
        paragrafos: [
          "Entrada e saída ficam registradas com histórico completo, por funcionário e por período.",
          "A jornada deixa de ser reconstruída no fim do mês: ela já está lá, do jeito que foi acontecendo.",
        ],
      },
      {
        id: "correcao",
        titulo: "Correção faz parte, e fica registrada",
        imagem: {
          rotulo: "[ AJUSTES ]",
          legenda: "Correção de inconsistência preservando o registro original",
        },
        paragrafos: [
          "Marcação esquecida e batida errada acontecem — tratar isso como exceção é o que faz um sistema de ponto perder a confiança de quem usa.",
          "O ajuste é um evento registrado, não uma sobrescrita silenciosa. É isso que mantém o relatório defensável numa conferência.",
        ],
      },
    ],
    fecho:
      "Centraliza a frequência e dá à administração um relatório por período que se sustenta sozinho.",
  },

  "viagens-frota-fiscal": {
    titulo: "Viagens, frota e documentos fiscais",
    resumo: "PHP · Go · Processos internos e gestão pública",
    abertura:
      "São três processos administrativos diferentes com o mesmo problema de fundo: a informação necessária para prestar contas mora espalhada entre documentos, e-mails e controles paralelos. O destino final dela é sempre o mesmo — precisa ser reencontrada meses depois, com contexto.",
    capitulos: [
      {
        id: "viagens",
        titulo: "Viagens e eventos",
        imagem: {
          rotulo: "[ SOLICITAÇÕES ]",
          legenda:
            "Solicitação de viagem com participantes, despesas e pagamentos",
        },
        paragrafos: [
          "Solicitação, participantes, despesas, pagamentos e acompanhamento do processo passam a viver no mesmo lugar, com histórico.",
          "Parte desses fluxos também atende meio ambiente e geolocalização, organizando informação de campo que antes voltava em papel.",
        ],
      },
      {
        id: "frota",
        titulo: "Combustível por veículo",
        imagem: {
          rotulo: "[ ABASTECIMENTOS ]",
          legenda: "Consumo por veículo e responsável, com histórico e valores",
        },
        paragrafos: [
          "Cada abastecimento fica ligado a um veículo e a um responsável, com valor e data.",
          "Com o histórico em série, padrão de consumo e divergência aparecem sozinhos no relatório por período.",
        ],
      },
      {
        id: "fiscal",
        titulo: "Notas fiscais que não se perdem",
        imagem: {
          rotulo: "[ NOTAS FISCAIS ]",
          legenda:
            "Documentos por fornecedor e período, com situação e histórico",
        },
        paragrafos: [
          "As notas ficam organizadas por fornecedor e período, com valor, situação do documento e histórico.",
          "O que se evita aqui é a perda de contexto entre o documento e a pessoa que sabia do que ele se tratava.",
        ],
      },
    ],
    fecho:
      "Processos internos viram fluxo digital com histórico e consulta — inclusive para a prestação de contas ao TCE.",
  },
};
