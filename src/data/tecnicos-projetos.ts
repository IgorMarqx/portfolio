/**
 * Ficha técnica de cada projeto, mostrada no modal "Detalhes técnicos".
 *
 * `confirmar: true` marca o que ainda não foi checado contra o projeto real —
 * aparece na tela como "a confirmar" em vez de virar afirmação inventada.
 */

export type ItemTecnico = { nome: string; papel: string; confirmar?: boolean };

export type SecaoTecnica = {
  id: string;
  titulo: string;
  imagem: { rotulo: string; legenda: string; src?: string };
  texto?: string;
  itens?: ItemTecnico[];
  passos?: string[];
};

export type DetalheTecnico = {
  resumo: string;
  secoes: SecaoTecnica[];
};

export const tecnicosProjetos: Record<string, DetalheTecnico> = {
  "clube-de-tenis": {
    resumo:
      "Laravel 13 · Inertia · React 19 · MySQL · Sicredi · S3 · DigitalOcean",
    secoes: [
      {
        id: "stack",
        titulo: "Stack da aplicação",
        imagem: {
          rotulo: "ARQUITETURA",
          legenda:
            "Monolito Laravel servindo React pelo Inertia, sem API separada",
        },
        texto:
          "Um monolito só, de propósito: o Inertia entrega as páginas React direto do controller, sem manter uma API pública e um front separado para um sistema que tem um cliente só. Menos contrato para versionar, menos coisa para subir.",
        itens: [
          { nome: "Laravel 13", papel: "Aplicação, regras de negócio e rotas" },
          {
            nome: "Inertia v3 + React 19",
            papel: "Páginas renderizadas pelo servidor, interface em React",
          },
          { nome: "Tailwind v4", papel: "Design system da interface" },
          {
            nome: "Fortify",
            papel:
              "Autenticação centralizada, um usuário para todos os módulos",
          },
          { nome: "Reverb", papel: "WebSocket para atualização em tempo real" },
          {
            nome: "Wayfinder",
            papel: "Rotas tipadas compartilhadas entre PHP e TypeScript",
          },
          {
            nome: "MySQL",
            papel: "Modelagem relacional, índices e consultas de relatório",
          },
        ],
      },
      {
        id: "financeiro",
        titulo: "Cobrança: Sicredi de ponta a ponta",
        imagem: {
          rotulo: "FLUXO DE COBRANÇA",
          legenda:
            "Geração do boleto, retorno por webhook e baixa no financeiro",
        },
        texto:
          "A cobrança nasce dentro do sistema e volta por webhook: o pagamento não depende de alguém conferir extrato. O retorno do banco é que dá baixa, e é ele a fonte da verdade do que foi pago.",
        passos: [
          "A administração gera a cobrança na plataforma, com o associado e o valor já vinculados;",
          "A integração com o Sicredi emite o boleto sem passar pelo Internet Banking;",
          "O banco avisa o pagamento por webhook e o sistema dá a baixa sozinho;",
          "A cobrança segue para o WhatsApp do associado, com o link do boleto.",
        ],
        itens: [
          {
            nome: "Sicredi",
            papel: "Emissão de boleto e webhook de pagamento",
          },
          {
            nome: "Gzappy",
            papel: "Envio da cobrança ao associado pelo WhatsApp",
          },
        ],
      },
      {
        id: "infra",
        titulo: "Onde roda",
        imagem: {
          rotulo: "INFRAESTRUTURA",
          legenda: "VPS na DigitalOcean, Nginx, MySQL e bucket S3",
        },
        texto:
          "VPS própria na DigitalOcean, com Nginx à frente da aplicação Laravel. Arquivo de usuário não fica no disco do servidor: anexo e documento vão para o S3, que sobrevive à troca de máquina.",
        itens: [
          {
            nome: "DigitalOcean",
            papel: "VPS própria, com Nginx à frente da aplicação",
          },
          {
            nome: "Amazon S3",
            papel: "Anexos e documentos enviados pelos usuários",
          },
          { nome: "MySQL", papel: "Banco de produção no próprio servidor" },
          {
            nome: "PWA",
            papel: "Convite de instalação no celular, com dispensa lembrada",
          },
        ],
      },
      {
        id: "entrega",
        titulo: "Como vai para produção",
        imagem: {
          rotulo: "PIPELINE",
          legenda: "Do push ao deploy",
        },
        texto:
          "O deploy não depende de quem está na máquina: push na main dispara o GitHub Actions, que constrói, checa e publica na VPS.",
        passos: [
          "Push na main dispara o workflow do GitHub Actions;",
          "Build do front e checagem de tipos antes de qualquer coisa subir;",
          "Migrações aplicadas de forma controlada, nunca junto do build;",
          "Deploy publicado e cache da aplicação regenerado.",
        ],
        itens: [
          {
            nome: "GitHub Actions",
            papel: "Pipeline disparado no push da branch main",
          },
          { nome: "Nginx", papel: "Servidor HTTP à frente da aplicação" },
        ],
      },
      {
        id: "decisoes",
        titulo: "Decisões que valem contar",
        imagem: {
          rotulo: "PERMISSÕES",
          legenda: "Mesma tela, escopo diferente por perfil",
        },
        texto:
          "Duas escolhas explicam boa parte do sistema. A primeira: quem executa não decide — o professor pede alteração de aula e a secretaria aprova, em vez de o professor editar direto. A segunda: mesma rota, composição diferente por perfil — a secretaria vê a grade da semana, o professor vê a agenda do dia, e o endpoint é o mesmo, escopado no backend.",
        itens: [
          {
            nome: "Autenticação única",
            papel: "Um cadastro de usuário para todos os módulos",
          },
          {
            nome: "Escopo no backend",
            papel: "O perfil limita o dado, não só a tela",
          },
        ],
      },
    ],
  },

  integracoes: {
    resumo: "Node.js · Go · PHP/Laravel · RabbitMQ · Amazon MQ · AWS",
    secoes: [
      {
        id: "stack",
        titulo: "Stack das integrações",
        imagem: {
          rotulo: "INTEGRAÇÕES",
          legenda: "Conexões entre as plataformas de delivery e a operação logística",
        },
        texto:
          "As integrações ficam distribuídas entre Node.js, Go e PHP/Laravel, conforme a parte do ecossistema. Cada conexão concentra as particularidades do parceiro e entrega à operação o formato interno.",
        itens: [
          { nome: "Node.js / TypeScript", papel: "Conexões e tratamento de webhooks" },
          { nome: "Go", papel: "Partes do ecossistema de integração" },
          {
            nome: "PHP / Laravel",
            papel: "Aplicação legada que consome o resultado",
          },
          { nome: "MySQL", papel: "Persistência de pedidos e eventos" },
          { nome: "Docker", papel: "Empacotamento e paridade entre ambientes" },
        ],
      },
      {
        id: "mensageria",
        titulo: "Mensageria",
        imagem: {
          rotulo: "FILAS",
          legenda: "Recebimento, fila e consumo em background",
        },
        texto:
          "A fila é o que separa receber de processar. O webhook responde rápido; o trabalho acontece depois, com ordem e nova tentativa.",
        itens: [
          {
            nome: "RabbitMQ / Amazon MQ",
            papel: "Desacoplamento e processamento em background",
          },
          {
            nome: "Amazon SQS",
            papel: "Filas de eventos, incluindo FIFO onde a ordem importa",
          },
          {
            nome: "Idempotência",
            papel:
              "Chave de controle para o mesmo pedido não entrar duas vezes",
          },
        ],
      },
      {
        id: "infra",
        titulo: "Infraestrutura",
        imagem: { rotulo: "AWS", legenda: "Onde o serviço roda" },
        itens: [
          { nome: "EC2", papel: "Execução do serviço" },
          { nome: "RDS", papel: "Banco gerenciado" },
          { nome: "S3", papel: "Armazenamento de arquivos e retornos" },
          { nome: "EventBridge", papel: "Agendamento de rotinas" },
          {
            nome: "Nginx + PM2",
            papel: "Entrada HTTP e supervisão do processo",
          },
        ],
      },
      {
        id: "entrega",
        titulo: "Entrega e observabilidade",
        imagem: { rotulo: "PIPELINE", legenda: "Deploy e acompanhamento" },
        itens: [
          {
            nome: "GitHub Actions / GitLab",
            papel: "Pipeline de build e deploy",
            confirmar: true,
          },
          {
            nome: "Logs e troubleshooting",
            papel: "Investigação de incidente em produção",
          },
          {
            nome: "Monitor de integrações",
            papel:
              "Disponibilidade, última comunicação, falha de autenticação e timeout",
          },
        ],
      },
    ],
  },

  "antecipacao-repasses": {
    resumo: "Go · RabbitMQ · EventBridge · IUGU · MySQL",
    secoes: [
      {
        id: "stack",
        titulo: "Stack",
        imagem: {
          rotulo: "SERVIÇOS",
          legenda: "Go e PHP dividindo o fluxo financeiro",
        },
        itens: [
          { nome: "Go", papel: "Serviços novos, desacoplados do legado" },
          {
            nome: "PHP / Laravel",
            papel: "Regras financeiras que seguem no monolito",
          },
          {
            nome: "MySQL",
            papel: "Saldos, transações, ciclos e triggers de conciliação",
          },
        ],
      },
      {
        id: "agendamento",
        titulo: "Agendamento e filas",
        imagem: {
          rotulo: "AGENDAMENTO",
          legenda: "EventBridge disparando a rodada",
        },
        itens: [
          {
            nome: "AWS EventBridge Scheduler",
            papel: "Disparo das rodadas de pagamento no horário",
          },
          {
            nome: "Amazon MQ / RabbitMQ",
            papel: "Execução fora do fluxo síncrono",
          },
        ],
      },
      {
        id: "pagamentos",
        titulo: "Provedores de pagamento",
        imagem: {
          rotulo: "WEBHOOKS",
          legenda: "Retornos financeiros conciliados",
        },
        itens: [
          { nome: "IUGU", papel: "Antecipação, repasse e pagamento" },
          { nome: "Mercado Pago", papel: "Cobrança e retorno de pagamento" },
          { nome: "Asaas", papel: "Cobrança e webhooks financeiros" },
        ],
        texto:
          "Todo provedor devolve evento por webhook, e todo evento precisa casar com um registro daqui. É nessa junção que mora a conciliação — e o cuidado para o mesmo valor não sair duas vezes.",
      },
    ],
  },

  "compras-licitacoes": {
    resumo: "Laravel 12 · Inertia · React 19 · Reverb · Queues · S3 · Docker",
    secoes: [
      {
        id: "stack",
        titulo: "Stack da aplicação",
        imagem: {
          rotulo: "ARQUITETURA",
          legenda: "Monolito Laravel servindo React pelo Inertia",
        },
        texto:
          "Um monolito Laravel com o front em React servido pelo Inertia, organizado em camadas Controller → Service → Repository. Controllers finos, regras nos Services e consultas nos Repositories: as regras podem ser testadas isoladas.",
        itens: [
          { nome: "PHP 8.2 + Laravel 12", papel: "Aplicação, regras de negócio e rotas" },
          { nome: "Sanctum", papel: "Autenticação por token na API" },
          {
            nome: "Inertia 2 + React 19 + TypeScript",
            papel: "Páginas servidas pelo Laravel, interface em React",
          },
          {
            nome: "Tailwind CSS 4 + Radix UI + Framer Motion",
            papel: "Componentes acessíveis e animações da interface",
          },
          { nome: "Recharts", papel: "Gráficos do dashboard" },
          { nome: "jsPDF + AutoTable", papel: "Ordem de compra e relatórios em PDF" },
          { nome: "Pest", papel: "Testes automatizados" },
        ],
      },
      {
        id: "filas",
        titulo: "Filas, eventos e tempo real",
        imagem: {
          rotulo: "FILAS",
          legenda: "Da troca de status ao aviso e à tela atualizada",
        },
        passos: [
          "Um observer no model percebe a troca de status da solicitação.",
          "O envio por WhatsApp entra na fila como job, com 3 tentativas, intervalo entre elas e log de falha.",
          "Itens são inseridos em lote, até 1.000 linhas por vez, e o total é recalculado no mesmo job.",
          "A trava WithoutOverlapping impede dois jobs concorrentes na mesma solicitação.",
          "No fim do processamento, um evento sai pelo Reverb e o Echo atualiza o dashboard sem recarregar.",
        ],
      },
      {
        id: "integracoes",
        titulo: "Integrações",
        imagem: {
          rotulo: "WHATSAPP",
          legenda: "Configuração de aviso por status, com template e números",
          src: "/img/compras-licitacoes/whatsapp-compras.png",
        },
        itens: [
          {
            nome: "API de WhatsApp",
            papel: "Envio de texto e mídia, com telefones normalizados e deduplicados",
          },
          { nome: "AWS S3", papel: "Notas fiscais e fotos de coleta" },
          { nome: "Google Maps embed", papel: "Endereço do usuário no mapa" },
          { nome: "Busca por CEP", papel: "Preenchimento automático do endereço" },
        ],
      },
      {
        id: "acesso",
        titulo: "Acesso por perfil",
        imagem: {
          rotulo: "PERFIS",
          legenda: "Cinco perfis, um painel para cada um",
        },
        texto:
          "Middleware de autenticação na API e middleware de perfil nas rotas web. Administrador, aprovador, solicitante, fornecedor e operador abrem a mesma rota e recebem painéis diferentes.",
      },
      {
        id: "infra",
        titulo: "Infraestrutura e entrega",
        imagem: { rotulo: "AMBIENTE", legenda: "Onde a aplicação roda" },
        itens: [
          { nome: "Docker + Docker Compose", papel: "Ambiente reproduzível da aplicação" },
          { nome: "Vite 7", papel: "Build do front" },
          { nome: "MySQL", papel: "Banco relacional da aplicação", confirmar: true },
          { nome: "Hospedagem", papel: "Servidor da aplicação", confirmar: true },
          { nome: "CI/CD", papel: "Publicação da aplicação", confirmar: true },
        ],
      },
    ],
  },

  "ponto-funcionarios": {
    resumo: "PHP · MySQL",
    secoes: [
      {
        id: "stack",
        titulo: "Stack",
        imagem: {
          rotulo: "APLICAÇÃO",
          legenda: "Registro de jornada e relatórios",
        },
        itens: [
          { nome: "PHP", papel: "Aplicação e regras de jornada" },
          { nome: "MySQL", papel: "Marcações, ajustes e histórico" },
        ],
      },
      {
        id: "infra",
        titulo: "Infraestrutura e entrega",
        imagem: { rotulo: "HOSPEDAGEM", legenda: "Onde a aplicação roda" },
        itens: [
          {
            nome: "Hospedagem",
            papel: "Servidor da aplicação",
            confirmar: true,
          },
          { nome: "CI/CD", papel: "Publicação da aplicação", confirmar: true },
        ],
      },
    ],
  },

  "viagens-frota-fiscal": {
    resumo: "PHP · Go · MySQL",
    secoes: [
      {
        id: "stack",
        titulo: "Stack",
        imagem: {
          rotulo: "APLICAÇÕES",
          legenda: "Conjunto de sistemas administrativos",
        },
        itens: [
          { nome: "PHP", papel: "Aplicações administrativas" },
          { nome: "Go", papel: "Serviços de apoio" },
          { nome: "MySQL", papel: "Lançamentos, histórico e relatórios" },
          {
            nome: "Geolocalização",
            papel: "Informação de campo vinculada ao registro",
          },
        ],
      },
      {
        id: "infra",
        titulo: "Infraestrutura e entrega",
        imagem: {
          rotulo: "HOSPEDAGEM",
          legenda: "Onde as aplicações rodam",
        },
        itens: [
          {
            nome: "Hospedagem",
            papel: "Servidor das aplicações",
            confirmar: true,
          },
          {
            nome: "Armazenamento de documentos",
            papel: "Notas e comprovantes",
            confirmar: true,
          },
          {
            nome: "CI/CD",
            papel: "Publicação das aplicações",
            confirmar: true,
          },
        ],
      },
    ],
  },
};
