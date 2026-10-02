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
          rotulo: "MAPA DE RESERVAS",
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
          rotulo: "DASHBOARD",
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
          rotulo: "TURMAS E AULAS",
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
          rotulo: "PROJETO SOCIAL",
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
          rotulo: "COBRANÇAS",
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
          rotulo: "CANTINA E ESTOQUE",
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
          rotulo: "USUÁRIOS E PERMISSÕES",
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
          rotulo: "O PROBLEMA",
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
          rotulo: "ABRANGÊNCIA",
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
          rotulo: "PADRONIZAÇÃO",
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
          rotulo: "PROCESSAMENTO ASSÍNCRONO",
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
          rotulo: "ORIGEM E DUPLICIDADE",
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
          rotulo: "CONTINUIDADE DO FLUXO",
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
          rotulo: "ESCALA E PROCESSAMENTO",
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
          rotulo: "VISIBILIDADE OPERACIONAL",
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
          rotulo: "IMPACTO",
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
          rotulo: "MINHA ATUAÇÃO",
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
          rotulo: "FLUXO DE ANTECIPAÇÃO",
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
          rotulo: "AGENDAMENTO",
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
          rotulo: "EXTRATO E CICLOS",
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
    resumo: "Laravel · React · Inertia · Reverb · WhatsApp · S3",
    abertura: [
      "Comprar dentro de um órgão público é menos sobre a compra e mais sobre conseguir provar depois como ela aconteceu. Os pedidos de compra e de serviço das secretarias circulavam em papel e planilha, sem status, sem histórico e sem prova de entrega.",
      "Quem queria saber em que pé estava um pedido dependia de achar a pessoa certa e de ela lembrar. A plataforma levou o ciclo inteiro para um lugar só: da solicitação à entrega comprovada com foto, passando por aprovação, fornecedor e nota fiscal.",
    ],
    capitulos: [
      {
        id: "solicitacoes",
        titulo: "Todo pedido ganha número e estado",
        imagem: {
          rotulo: "SOLICITAÇÕES",
          legenda: "Lista de solicitações com tipo, secretaria, fornecedor, valor e status",
          src: "/img/compras-licitacoes/solicitacoes-compras.png",
        },
        paragrafos: [
          "Cada solicitação nasce com um número sequencial por ano e entra num fluxo de oito status: rascunho, enviada, aprovada, em compra, entregue parcial, entregue, devolvida e cancelada. O estado do pedido passa a ser o que está registrado, não o que alguém lembra.",
          "A lista junta o que antes ficava espalhado: tipo, secretaria, fornecedor, justificativa, valor estimado e para quem é o pedido. A busca procura em todos os campos de uma vez, e os filtros por tipo e status reduzem a fila ao que importa naquele momento.",
        ],
      },
      {
        id: "nova",
        titulo: "O pedido já nasce completo",
        imagem: {
          rotulo: "NOVA SOLICITAÇÃO",
          legenda: "Formulário de compra com secretaria, fornecedor, prazo, local de entrega e itens",
          src: "/img/compras-licitacoes/nova-compras.png",
        },
        paragrafos: [
          "A solicitação é de compra ou de serviço, e o formulário pede de saída o que antes chegava aos pedaços: secretaria, fornecedor, justificativa, prazo desejado, local de entrega, destinatário e quem vai retirar.",
          "Os itens entram com descrição, unidade, quantidade e valor unitário. O subtotal de cada linha e o total estimado da solicitação são calculados na hora. Um pedido parecido com outro anterior pode ser duplicado e volta como rascunho, pronto para ajuste.",
        ],
      },
      {
        id: "detalhe",
        titulo: "Tudo de uma solicitação numa tela só",
        imagem: {
          rotulo: "DETALHE",
          legenda: "Visão completa da solicitação e dos itens vinculados",
          src: "/img/compras-licitacoes/detalhe-compras.png",
        },
        paragrafos: [
          "O detalhe reúne o pedido inteiro: quem pediu, para qual secretaria, de qual fornecedor, com que prazo, onde entregar e por que comprar. Os itens aparecem com subtotal e total no rodapé.",
          "Dali sai a ordem de compra em PDF, com os itens e o local de entrega. É o documento que o fornecedor recebe, gerado a partir do mesmo registro que o aprovador conferiu.",
        ],
      },
      {
        id: "whatsapp",
        titulo: "O aviso sai sozinho",
        imagem: {
          rotulo: "NOTIFICAÇÕES",
          legenda: "Configuração de aviso por WhatsApp: mensagem, status de disparo e números",
          src: "/img/compras-licitacoes/whatsapp-compras.png",
        },
        paragrafos: [
          "Cada mudança de status pode avisar as pessoas certas por WhatsApp. A configuração define quais status disparam, para quais números, e com qual mensagem — um template editável com variáveis como o número da solicitação, o status novo e o anterior.",
          "Nenhuma tela precisa lembrar de avisar. Um observer no model percebe a troca de status e põe o envio na fila, com três tentativas, intervalo entre elas e registro de falha. Os telefones são normalizados e deduplicados antes de sair.",
        ],
      },
      {
        id: "historico",
        titulo: "Entrega com prova, não com palavra",
        imagem: {
          rotulo: "HISTÓRICO",
          legenda: "Resumo do histórico: total, entregues, canceladas e valor estimado",
          src: "/img/compras-licitacoes/historico-compras.png",
        },
        paragrafos: [
          "O fornecedor recebe as ordens destinadas a ele, registra a nota fiscal com data de emissão e arquivo anexado e comprova a retirada com uma foto tirada pela câmera do próprio aparelho. Nota e foto ficam guardadas no S3, e dá para abrir qualquer anexo sem sair da tela.",
          "O histórico fecha a conta por fornecedor: quantas solicitações passaram, quantas foram entregues, quantas canceladas e quanto isso soma. A pergunta \"foi entregue?\" passa a ter resposta com documento.",
        ],
      },
      {
        id: "relatorios",
        titulo: "Relatório que responde a pergunta feita",
        imagem: {
          rotulo: "RELATÓRIOS",
          legenda: "Filtros combináveis, valor total filtrado e exportação em PDF",
          src: "/img/compras-licitacoes/relatorios-compras.png",
        },
        paragrafos: [
          "Os filtros se combinam: ano, mês, intervalo de datas, secretaria, solicitante, fornecedor, tipo e status. O valor total acompanha o recorte, os filtros ficam salvos no navegador e o resultado sai em PDF.",
          "O painel não precisa de recarga. Quando um processamento termina, um evento passa pelo WebSocket e a tela se atualiza sozinha. As contagens por mês, status e secretaria são agregadas no banco, e não no navegador.",
        ],
      },
      {
        id: "cadastros",
        titulo: "Cadastros que dão sentido aos números",
        imagem: {
          rotulo: "SECRETARIAS",
          legenda: "Secretarias com cor própria, usada nos gráficos do dashboard",
          src: "/img/compras-licitacoes/secretarias-compras.png",
        },
        paragrafos: [
          "Cada secretaria tem uma cor, e essa cor acompanha a secretaria nos gráficos de valor gasto. Quem bate o olho no dashboard reconhece de quem é cada fatia.",
          "Os usuários se dividem em cinco perfis — administrador, aprovador, solicitante, fornecedor e operador — e cada um abre um painel diferente na mesma rota. O cadastro busca o endereço pelo CEP e mostra o local no mapa.",
        ],
      },
    ],
    fecho:
      "O ganho é rastreabilidade: cada pedido tem número, dono, status e prova de entrega, e cada mudança fica registrada e avisada. O processo deixa de depender da memória de quem o tocava.",
  },

  "ponto-funcionarios": {
    titulo: "Sistema de Ponto e Gestão de Funcionários",
    resumo: "Laravel · React · Inertia · Reverb · WhatsApp · S3",
    abertura: [
      "Em prefeitura com várias secretarias e locais de trabalho, frequência em papel ou planilha tem três problemas: batida fora do local ou feita por outra pessoa, hora apurada à mão e folha de ponto montada e distribuída uma a uma todo mês.",
      "O sistema cobre o ciclo inteiro. O servidor bate o ponto com foto e geolocalização, a jornada do dia é apurada sozinha, e o RH acompanha tudo no painel, gera as folhas em PDF e as envia por WhatsApp.",
    ],
    capitulos: [
      {
        id: "registro",
        titulo: "A batida acontece no lugar certo, com rosto",
        imagem: {
          rotulo: "REGISTRO",
          legenda: "Verificação facial: CPF, horário do ponto e câmera antes da batida",
          src: "/img/ponto-funcionarios/registro-ponto.png",
        },
        paragrafos: [
          "O servidor se identifica pelo CPF e a câmera do aparelho tira uma foto no momento da batida. A foto vai para o S3 e fica como evidência de quem bateu.",
          "A batida só é aceita dentro de uma cerca geográfica. O ponto de referência pode ser definido por colaborador e por dia da semana, ou herdado da secretaria. A distância é calculada no servidor, e não no aparelho de quem bate.",
          "Sem internet, a batida não se perde: fica numa fila no navegador e sai sozinha quando a conexão volta. Quem está de férias, licença-prêmio ou atestado tem a batida bloqueada.",
        ],
      },
      {
        id: "relatorio",
        titulo: "Cada batida chega com a própria prova",
        imagem: {
          rotulo: "RELATÓRIO DE PONTOS",
          legenda: "Batidas do dia com foto, localização no mapa, observação e atestado",
          src: "/img/ponto-funcionarios/relatorio-ponto.png",
        },
        paragrafos: [
          "O relatório mostra cada batida com a foto, o ponto no mapa, a observação e o atestado, quando houver. Filtra por período, local de trabalho e nome, e exporta para Excel.",
          "Dali mesmo o RH seleciona colaboradores e gera as folhas de ponto do mês em lote. A conferência deixa de ser um pedido de confiança: a foto e o local estão ao lado do horário.",
        ],
      },
      {
        id: "jornadas",
        titulo: "A jornada é regra, não planilha",
        imagem: {
          rotulo: "JORNADAS",
          legenda: "Horas semanais por colaborador e a jornada de cada dia da semana",
          src: "/img/ponto-funcionarios/jornadas-ponto.png",
        },
        paragrafos: [
          "Cada colaborador, ou cada secretaria, tem minutos previstos e tolerância por dia da semana. A edição pode ser feita em lote, para uma equipe inteira de uma vez.",
          "O plantão que atravessa a meia-noite conta como um dia só. Cada batida dispara a apuração do dia em fila: ok, incompleto ou sem batida, com atrasos, horas extras e banco de horas, sem travar o registro.",
        ],
      },
      {
        id: "dashboard",
        titulo: "O dia inteiro num painel",
        imagem: {
          rotulo: "DASHBOARD",
          legenda: "Batidas, presentes, atrasos, horas por secretaria e ranking de atrasos",
          src: "/img/ponto-funcionarios/dashboard-ponto.png",
        },
        paragrafos: [
          "O painel mostra os indicadores do dia (batidas, colaboradores presentes e atrasos) e os gráficos de batidas por dia, horas trabalhadas por secretaria, evolução do banco de horas e ranking de atrasos.",
          "O RH deixa de perguntar quem veio. A resposta já está na tela, filtrada pelo local de trabalho que ele escolheu.",
        ],
      },
      {
        id: "manual",
        titulo: "Quando o RH precisa lançar",
        imagem: {
          rotulo: "BATIDA MANUAL",
          legenda: "Lançamento para vários colaboradores e um intervalo de datas, com anexo",
          src: "/img/ponto-funcionarios/manual-ponto.png",
        },
        paragrafos: [
          "Curso fora da sede, plantão por escala, esquecimento: o RH lança batidas para um ou vários colaboradores, num intervalo de datas, com observação obrigatória e anexo de atestado ou decreto.",
          "Antes de gravar, o sistema procura conflitos. Se já existem batidas no período ou se alguém está afastado, ele avisa e pede confirmação. Editar ou excluir uma batida também exige motivo.",
        ],
      },
      {
        id: "ferias",
        titulo: "Afastamento que o próprio ponto respeita",
        imagem: {
          rotulo: "FÉRIAS E LICENÇAS",
          legenda: "Solicitações de férias pendentes, aprovadas e rejeitadas, com anexo",
          src: "/img/ponto-funcionarios/ferias-ponto.png",
        },
        paragrafos: [
          "Férias e licença-prêmio têm o próprio fluxo: solicitação, aprovação ou rejeição, documento anexado e consulta por colaborador, secretaria ou período.",
          "O afastamento aprovado conversa com o resto do sistema. A batida fica bloqueada no período, e a folha de ponto já sai com os dias certos.",
        ],
      },
      {
        id: "folha",
        titulo: "A folha se monta e chega sozinha",
        imagem: {
          rotulo: "FOLHA DE PONTO",
          legenda: "Folha mensal em PDF: resumo, batidas do dia a dia e observações",
          src: "/img/ponto-funcionarios/folha-ponto.png",
        },
        paragrafos: [
          "A folha de ponto mensal é gerada em PDF para um colaborador ou em lote, salva no S3 e enviada por WhatsApp. Ela traz o resumo do mês (dias úteis, dias com batida, atestados, atrasos e banco de horas) e o registro de cada dia.",
          "O lote roda em segundo plano. Quando termina, o Reverb avisa a tela, e as folhas novas aparecem na central com o contador de não lidas. Todo dia, entre 19h e 20h, cada colaborador recebe pelo WhatsApp o resumo das próprias batidas.",
        ],
      },
      {
        id: "auditoria",
        titulo: "Toda alteração deixa rastro",
        imagem: {
          rotulo: "AUDITORIA",
          legenda: "Quem mudou o quê, quando, com o valor de antes e o de depois",
          src: "/img/ponto-funcionarios/auditoria-ponto.png",
        },
        paragrafos: [
          "No serviço público, alguém sempre vai perguntar quem mudou uma batida e por quê. Toda criação, alteração e exclusão fica registrada com o antes e o depois, consultável por administrador e RH.",
          "Um observer genérico grava o diff de cada model. Nenhuma tela precisa lembrar de auditar, e os registros antigos são limpos automaticamente.",
        ],
      },
      {
        id: "cadastros",
        titulo: "Cadastros em massa, escopo por secretaria",
        imagem: {
          rotulo: "COLABORADORES",
          legenda: "Colaboradores com vínculo, local de trabalho, mapa e ações em massa",
          src: "/img/ponto-funcionarios/colaboradores-ponto.png",
        },
        paragrafos: [
          "Colaboradores são ativados, desativados e vinculados a locais de trabalho em massa, com histórico de inativação. Secretarias e locais guardam coordenadas e raio, com importação em lote.",
          "São cinco perfis: administrador, RH, operador, colaborador e totem. O operador só enxerga as secretarias a que foi vinculado, e um middleware resolve o local de trabalho em cada requisição e filtra as consultas automaticamente.",
        ],
      },
    ],
    fecho:
      "Do registro no celular à folha entregue no WhatsApp, sem etapa manual no meio. O que sustenta isso: regra de jornada de verdade, idempotência, fila offline e auditoria de cada alteração.",
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
          rotulo: "SOLICITAÇÕES",
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
          rotulo: "ABASTECIMENTOS",
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
          rotulo: "NOTAS FISCAIS",
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
