export const perfil = {
  nome: "Igor Marques",
  nomeCompleto: "Igor Marques de Azevedo",
  iniciais: "IM",
  titulo: "Engenheiro de Software",
  subtitulo: "Back-end · Full Stack · Sistemas Distribuídos",
  local: "João Pessoa, PB — Brasil",
  experiencia: "3+ anos",
  disponibilidade: "Aberto a novos projetos e freelances",
  email: "igormarquesdeazevedo11@gmail.com",
  telefone: "(83) 98653-1492",
  linkedin: "https://linkedin.com/in/igor-marques-azevedo/",
  github: "https://github.com/IgorMarqx",
  resumo:
    "Desenvolvimento e sustentação de sistemas em produção: integrações críticas, automações financeiras, processamento assíncrono e plataformas de gestão. Do levantamento do problema ao deploy e à observabilidade.",
  sobre:
    "Trabalho o ciclo completo da solução — modelagem de dados, arquitetura, API, interface, deploy e manutenção. Atuo principalmente com PHP/Laravel, Go e Node.js/TypeScript, em sistemas que precisam se comportar bem sob carga, com consistência de dados, rastreamento de eventos e resposta a incidentes.",
};

export const metricas = [
  { valor: "26 mil+", rotulo: "entregadores impactados" },
  { valor: "300+", rotulo: "empresas integradas" },
  { valor: "5 mil+", rotulo: "pedidos/dia em serviço iFood" },
];

export const experiencias = [
  {
    periodo: "2023 — ATUAL",
    cargo: "Engenheiro de Software / Back-end",
    empresa: "MOOVERY",
    descricao:
      "Integrações em escala, automações financeiras e processamento orientado a eventos na operação logística.",
    destaques: [
      "Antecipação e pagamentos para entregadores integrados à IUGU, com processamento assíncrono via RabbitMQ.",
      "Pagamentos agendados e garantidos com AWS EventBridge Scheduler e Amazon MQ, fora do fluxo síncrono da aplicação.",
      "Serviço iFood em Node.js atendendo 300+ empresas e 5 mil+ pedidos por dia.",
      "Integrações com iFood, 99Food, Anota.ai, Saipos, Softcom, Brendi, CardápioWeb e Open Delivery.",
      "Regras de idempotência e controle de origem para evitar duplicidade e reprocessamento de pedidos.",
      "Financeiro de entregadores: saldos, transações, repasses, ciclos, créditos, débitos e conciliação.",
      "Modernização do legado PHP/Laravel com novas capacidades desacopladas em Go e Node.js.",
      "Observabilidade de integrações: disponibilidade, última comunicação, falhas de autenticação e timeouts.",
    ],
  },
  {
    periodo: "2024 — ATUAL",
    cargo: "Fundador / Engenheiro de Software",
    empresa: "SDI — SISTEMAS DIGITAIS INTELIGENTES",
    descricao:
      "Concepção, arquitetura, desenvolvimento e evolução de sistemas próprios de gestão e digitalização de processos.",
    destaques: [
      "Aplicações em PHP, Laravel e Go: arquitetura, APIs, banco, regras de negócio, infraestrutura e deploy.",
      "Processos apoiados em planilhas e comunicação manual convertidos em fluxos digitais auditáveis.",
      "Atuação direta com usuários para transformar necessidade operacional em regra de software.",
      "Manutenção ponta a ponta: suporte, correções, evolução funcional, relatórios e integrações.",
    ],
  },
];

export const formacao = {
  curso: "Bacharelado em Ciência da Computação",
  instituicao: "Centro Universitário de João Pessoa — UNIPÊ",
  periodo: "2021 — 2025",
};

export type Projeto = {
  /** Chave que liga o cartão ao texto longo em `detalhes-projetos.ts`. */
  slug: string;
  numero: string;
  categoria: string;
  nome: string;
  descricao: string;
  visual: string;
  tags: string[];
  impacto: string;
};

export const projetos: Projeto[] = [
  {
    slug: "clube-de-tenis",
    numero: "01",
    categoria: "GESTÃO / ESPORTE",
    nome: "Clube de Tênis",
    descricao:
      "Plataforma que centraliza a operação de um clube com 100+ sócios: reservas das 5 quadras, turmas, mensalidades, financeiro, cantina e estoque.",
    visual: "[ RESERVAS ]",
    tags: ["Laravel", "React", "MySQL", "S3"],
    impacto:
      "Substitui controles separados por uma plataforma única, com rastreabilidade para secretaria e diretoria.",
  },
  {
    slug: "servico-ifood",
    numero: "02",
    categoria: "API / INTEGRAÇÕES",
    nome: "Serviço iFood",
    descricao:
      "Serviço em Node.js que conecta plataformas de delivery à operação logística, com webhooks, filas e controle de duplicidade.",
    visual: "[ PEDIDOS/DIA ]",
    tags: ["Node.js", "RabbitMQ", "AWS"],
    impacto:
      "300+ empresas integradas e mais de 5 mil pedidos processados por dia.",
  },
  {
    slug: "antecipacao-repasses",
    numero: "03",
    categoria: "FINANCEIRO",
    nome: "Antecipação & Repasses",
    descricao:
      "Fluxo de antecipação e pagamento de entregadores integrado à IUGU, com agendamento via EventBridge e processamento assíncrono.",
    visual: "[ CICLOS ]",
    tags: ["Go", "RabbitMQ", "IUGU"],
    impacto:
      "Base com mais de 26 mil entregadores atendida sem bloquear o fluxo síncrono.",
  },
  {
    slug: "compras-licitacoes",
    numero: "04",
    categoria: "PROCESSOS ADMINISTRATIVOS",
    nome: "Compras e Licitações",
    descricao:
      "Digitalização de solicitações, fornecedores, propostas, etapas e responsáveis, com histórico de movimentações e relatórios.",
    visual: "[ PROCESSOS ]",
    tags: ["PHP", "MySQL"],
    impacto:
      "Mais rastreabilidade e menos dependência de planilhas e documentos físicos.",
  },
  {
    slug: "ponto-funcionarios",
    numero: "05",
    categoria: "RH / JORNADA",
    nome: "Ponto e Funcionários",
    descricao:
      "Registro de entradas e saídas, histórico de marcações, correção de inconsistências e relatórios por período.",
    visual: "[ MARCAÇÕES ]",
    tags: ["PHP", "MySQL"],
    impacto: "Centraliza a frequência e facilita auditoria administrativa.",
  },
  {
    slug: "viagens-frota-fiscal",
    numero: "06",
    categoria: "GESTÃO PÚBLICA",
    nome: "Viagens, Frota e Fiscal",
    descricao:
      "Solicitações, despesas, pagamentos, abastecimentos por veículo e acompanhamento de notas fiscais por fornecedor e período.",
    visual: "[ RELATÓRIOS ]",
    tags: ["PHP", "Go", "Geolocalização"],
    impacto:
      "Processos internos viram fluxos digitais com histórico, consulta e prestação de contas.",
  },
];

export type Habilidade = {
  area: string;
  detalhe: string;
  uso: "DIÁRIO" | "FREQUENTE" | "APOIO";
  onde: string;
};

/** Sem porcentagem: o que conta é onde a tecnologia roda hoje, não uma nota. */
export const habilidades: Habilidade[] = [
  {
    area: "Back-end",
    detalhe: "PHP/Laravel · Go · Node.js",
    uso: "DIÁRIO",
    onde: "Serviços em produção na Moovery e sistemas próprios na SDI",
  },
  {
    area: "Dados",
    detalhe: "MySQL · PostgreSQL · Redis",
    uso: "DIÁRIO",
    onde: "Modelagem, índices e investigação de gargalos direto em produção",
  },
  {
    area: "Mensageria",
    detalhe: "RabbitMQ · Amazon MQ · SQS",
    uso: "DIÁRIO",
    onde: "Pedidos e pagamentos processados fora do fluxo síncrono",
  },
  {
    area: "AWS & DevOps",
    detalhe: "EC2 · RDS · S3 · EventBridge · Docker",
    uso: "FREQUENTE",
    onde: "Deploy, agendamento de rotinas financeiras e resposta a incidentes",
  },
  {
    area: "Front-end",
    detalhe: "React · Next.js · Vue",
    uso: "APOIO",
    onde: "Painéis internos e interfaces dos sistemas que eu entrego ponta a ponta",
  },
];

export const servicos = [
  "APIs, webhooks e integrações entre sistemas",
  "Processamento assíncrono e event driven",
  "Automações e fluxos financeiros",
  "Sustentação de produção e troubleshooting",
];

export const stack = {
  "BACK-END": [
    "PHP 8+",
    "Laravel",
    "Go",
    "Node.js",
    "NestJS",
    "TypeScript",
    "APIs REST",
  ],
  "FRONT-END": ["React", "Next.js", "Vue.js", "JavaScript", "HTML5", "CSS3"],
  DADOS: [
    "MySQL",
    "PostgreSQL",
    "Redis",
    "Modelagem relacional",
    "Otimização de queries",
  ],
  MENSAGERIA: [
    "RabbitMQ",
    "Amazon MQ",
    "Amazon SQS",
    "Filas FIFO",
    "Event driven",
  ],
  "AWS / DEVOPS": [
    "EC2",
    "RDS",
    "S3",
    "EventBridge",
    "Route 53",
    "Docker",
    "Nginx",
    "PM2",
    "GitHub Actions",
  ],
  ARQUITETURA: [
    "Microsserviços",
    "Sistemas distribuídos",
    "Idempotência",
    "Desacoplamento",
    "Observabilidade",
  ],
  ENGENHARIA: [
    "Clean Code",
    "SOLID",
    "Controller/Service/Repository",
    "Code review",
    "Documentação técnica",
  ],
};

export const ferramentas = [
  "VS Code",
  "Git & GitHub",
  "GitLab",
  "Docker",
  "AWS",
  "MySQL",
  "Linux",
  "Postman",
];

export const navegacao = [
  { id: "home", rotulo: "01_HOME" },
  { id: "projetos", rotulo: "02_PROJETOS" },
  { id: "stack", rotulo: "03_STACK" },
  { id: "sobre", rotulo: "04_SOBRE" },
  { id: "contato", rotulo: "05_CONTATO" },
];
