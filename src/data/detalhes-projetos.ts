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
  /** Marcador da tela a ser capturada. As imagens ainda não existem. */
  imagem: { rotulo: string; legenda: string; src?: string };
  paragrafos: string[];
};

export type DetalheProjeto = {
  titulo: string;
  resumo: string;
  abertura: string;
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

  "servico-ifood": {
    titulo: "Integração iFood em escala",
    resumo: "Node.js · RabbitMQ · Amazon MQ · AWS",
    abertura:
      "Um pedido que aparece no aplicativo do consumidor precisa virar entrega na rua em poucos segundos. Entre uma coisa e outra existe um serviço que fala a língua de cada plataforma de delivery e entrega para a operação logística sempre a mesma coisa: o pedido certo, uma vez só.",
    capitulos: [
      {
        id: "entrada",
        titulo: "Cada parceiro fala uma língua",
        imagem: {
          rotulo: "[ PARCEIROS CONECTADOS ]",
          legenda:
            "iFood, 99Food, Anota.ai, Saipos, Softcom, Brendi, CardápioWeb e Open Delivery",
        },
        paragrafos: [
          "São oito integrações vivas, cada uma com seu contrato, seu jeito de avisar que algo mudou e sua própria ideia do que é o estado de um pedido. Algumas empurram webhook; outras precisam ser perguntadas.",
          "A operação, do outro lado, não quer saber disso. O serviço existe para absorver essa diferença e entregar um formato único para dentro de casa.",
        ],
      },
      {
        id: "fila",
        titulo: "Nada é processado dentro da requisição",
        imagem: {
          rotulo: "[ FLUXO DE EVENTOS ]",
          legenda: "Recebimento, fila e consumo em background",
        },
        paragrafos: [
          "O evento que chega é aceito e enfileirado, não processado na hora. A chamada externa responde rápido, e o trabalho pesado acontece em background, na ordem certa e com nova tentativa quando algo falha.",
          "Esse desacoplamento com RabbitMQ e Amazon MQ é o que permite o serviço aguentar mais de 5 mil pedidos por dia para mais de 300 empresas sem que um parceiro lento derrube o restante.",
        ],
      },
      {
        id: "duplicidade",
        titulo: "O erro caro é o pedido em dobro",
        imagem: {
          rotulo: "[ CONTROLE DE ORIGEM ]",
          legenda: "Regras de idempotência e de origem por pedido",
        },
        paragrafos: [
          "Parceiro reenvia evento. Webhook chega fora de ordem. A mesma loja aparece conectada por dois caminhos diferentes. Sem tratamento, cada uma dessas situações vira um segundo pedido igual ao primeiro — e um entregador saindo para uma entrega que não existe.",
          "Por isso o serviço carrega regras de idempotência e controle de origem: o mesmo pedido não entra duas vezes, e reprocessamento não gera operação nova.",
        ],
      },
      {
        id: "observabilidade",
        titulo: "Integração quebra em silêncio",
        imagem: {
          rotulo: "[ SAÚDE DAS INTEGRAÇÕES ]",
          legenda:
            "Disponibilidade, última comunicação e último pedido por parceiro",
        },
        paragrafos: [
          "Quando uma integração cai, normalmente nada estoura: os pedidos simplesmente param de chegar, e o primeiro a perceber é o cliente ao telefone.",
          "O acompanhamento que montei olha disponibilidade, última comunicação, último pedido recebido, falha de autenticação, timeout e erro de comunicação — para o problema ter nome antes de virar ligação.",
        ],
      },
    ],
    fecho:
      "É um serviço que quase ninguém vê funcionando e que todo mundo sente quando para. 300+ empresas integradas e 5 mil+ pedidos por dia dependem de ele ser chato com duplicidade, ordem e tentativa.",
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
