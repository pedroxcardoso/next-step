/* Next Step — base de destinos (pesquisa out/2026). Valores em BRL são aproximados. */
export type Cidade = { id: string; nome: string; lat: number; lng: number; desc: string };
export type Visto = { nome: string; para: string; req: string };
export type Link = { nome: string; url: string };
export type Relato = { perfil: string; texto: string; veiculo: string; url: string };
export type Destino = {
  id: string; nome: string; iata: string; capital: string; moeda: string; iso: string; cor: string;
  idioma: string; langs: string[]; tags: string[];
  inicial: [number, number]; mensal: [number, number]; salMin: number; salMedio: number;
  textoInicial: string; textoMensal: string;
  salario: { minimo: string; medio: string; exemplos: [string, string][] };
  cidades: Cidade[]; vistos: Visto[]; agencias: Link[]; relatos: Relato[]; dicas: string[];
};
export type Credito = { id: string; file: string; artist: string; license: string; licenseUrl: string; source: string };

export const CAMBIO = "€1 ≈ R$ 6,00 · US$1 ≈ R$ 5,00 · CA$1 ≈ R$ 3,85 · A$1 ≈ R$ 3,50 · NZ$1 ≈ R$ 2,85 · ¥100 ≈ R$ 3,20 (out/2026)";

export const DESTINOS: Destino[] = [
  {
    "id": "portugal",
    "nome": "Portugal",
    "iata": "LIS",
    "capital": "Lisboa",
    "moeda": "Euro (EUR)",
    "iso": "620",
    "idioma": "Português. Nenhum exame para brasileiros; algumas vagas de TI e turismo pedem inglês B2.",
    "langs": [
      "pt"
    ],
    "tags": [
      "praia",
      "cidade",
      "tranquilo",
      "quente"
    ],
    "inicial": [
      30000,
      40000
    ],
    "mensal": [
      5700,
      6600
    ],
    "salMin": 5520,
    "salMedio": 10300,
    "textoInicial": "Passagem, visto (≈ €90) + VFS, apostilas, seguro, caução e 3 meses de reserva, morando em quarto. Para o D7, os consulados costumam pedir saldo de ≈ €11.040 (R$ 66 mil).",
    "textoMensal": "Lisboa, em quarto: € 950–1.100. Quarto ≈ € 550, mercado € 250–300, passe Navegante € 40.",
    "salario": {
      "minimo": "€ 920/mês em 14 pagamentos (2026) ≈ R$ 5.520",
      "medio": "€ 1.611–1.835/mês bruto (INE, 2026) ≈ R$ 9.700–11.000",
      "exemplos": [
        [
          "Hotelaria e restauração",
          "€ 920–1.100/mês ≈ R$ 5.500–6.600"
        ],
        [
          "Desenvolvedor(a) júnior a pleno",
          "€ 1.300–3.000/mês ≈ R$ 7.800–18.000"
        ],
        [
          "Enfermeiro(a), após inscrição na Ordem",
          "€ 1.600–1.800/mês ≈ R$ 9.600–10.800"
        ]
      ]
    },
    "cidades": [
      {
        "id": "lisboa",
        "nome": "Lisboa",
        "lat": 38.7223,
        "lng": -9.1393,
        "desc": "Capital e principal polo de TI, turismo e serviços, com os aluguéis mais caros do país (quarto ≈ €550/mês)."
      },
      {
        "id": "porto",
        "nome": "Porto",
        "lat": 41.1579,
        "lng": -8.6291,
        "desc": "Forte comunidade brasileira, universidades e custo um pouco menor que Lisboa (quarto ≈ €450/mês)."
      },
      {
        "id": "braga",
        "nome": "Braga",
        "lat": 41.5454,
        "lng": -8.4265,
        "desc": "Cidade universitária e tecnológica no norte, procurada por famílias pelo custo mais baixo (quarto ≈ €355/mês)."
      }
    ],
    "vistos": [
      {
        "nome": "Visto de estudo (D4, ensino superior)",
        "para": "Quem tem matrícula em universidade ou politécnico português.",
        "req": "Carta de aceitação + comprovação de meios (bolsa, termo de responsabilidade ou renda própria)."
      },
      {
        "nome": "Visto D7 (rendimentos próprios)",
        "para": "Aposentados ou quem vive de aluguéis, investimentos ou outra renda passiva.",
        "req": "Renda mínima de € 920/mês (+50% por adulto, +30% por filho), em geral com saldo de 12 meses."
      },
      {
        "nome": "Visto D8 (nômade digital)",
        "para": "Quem trabalha remotamente para empresa ou clientes fora de Portugal.",
        "req": "Renda média de € 3.680/mês nos últimos 3 meses."
      },
      {
        "nome": "Visto de trabalho (D1 / D3 qualificado)",
        "para": "Quem já tem contrato ou promessa de contrato.",
        "req": "Contrato assinado. Desde 23/10/2025 o visto de procura de trabalho ficou restrito a profissionais qualificados."
      }
    ],
    "agencias": [
      {
        "nome": "AIMA – Agência para a Integração, Migrações e Asilo (oficial)",
        "url": "https://aima.gov.pt"
      },
      {
        "nome": "Portal de Vistos do MNE (oficial)",
        "url": "https://vistos.mne.gov.pt"
      },
      {
        "nome": "VFS Global – pedidos de visto para Portugal no Brasil",
        "url": "https://visa.vfsglobal.com/bra/pt/prt/"
      },
      {
        "nome": "CI Intercâmbio",
        "url": "https://www.ci.com.br"
      }
    ],
    "relatos": [
      {
        "perfil": "Analista de QA, casado, Grande Lisboa",
        "texto": "Mesmo com nós dois empregados e documentados, quando reconheciam nosso sotaque ao telefone diziam que o apartamento já estava alugado. Tivemos que adiantar seis aluguéis. Hoje, depois de quatro anos, já compramos nosso imóvel.",
        "veiculo": "InfoMoney",
        "url": "https://www.infomoney.com.br/minhas-financas/moradia-em-portugal/"
      },
      {
        "perfil": "Empresária do setor de beleza, Grande Lisboa",
        "texto": "Vendi minha empresa no Brasil para vir. Caí num golpe no reagrupamento familiar e tive sorte de recuperar o dinheiro. Mesmo com NIF e NISS, foi difícil alugar sem declaração de IRS.",
        "veiculo": "InfoMoney",
        "url": "https://www.infomoney.com.br/minhas-financas/moradia-em-portugal/"
      },
      {
        "perfil": "Jornalista e mestranda, 26 anos, Lisboa",
        "texto": "Divido um T2 no centro desde 2022. Ser brasileira e jovem deixa os proprietários inseguros. O que me ajudou foi uma carta de apresentação bem detalhada.",
        "veiculo": "InfoMoney",
        "url": "https://www.infomoney.com.br/minhas-financas/moradia-em-portugal/"
      }
    ],
    "dicas": [
      "Peça o NIF (número fiscal) logo no início, nas Finanças ou à distância com representante fiscal. Depois, o NISS (Segurança Social).",
      "Apostile no Brasil antecedentes da PF, certidões e diploma com histórico. O antecedente vale 90 dias.",
      "Peça o PB4/CDAM (acordo Brasil–Portugal) para usar o SNS antes de ter residência.",
      "Valide o diploma na DGES. Enfermagem, engenharia e psicologia exigem também inscrição na Ordem profissional.",
      "Para alugar, leve carta de apresentação, contrato ou comprovativo de meios. Desconfie de anúncio que pede sinal antes da visita."
    ],
    "cor": "#0e7c3a"
  },
  {
    "id": "irlanda",
    "nome": "Irlanda",
    "iata": "DUB",
    "capital": "Dublin",
    "moeda": "Euro (EUR)",
    "iso": "372",
    "idioma": "Inglês. Curso de inglês (Stamp 2) não exige nota; graduação e pós pedem IELTS 6.0–6.5; enfermagem IELTS 7.0.",
    "langs": [
      "en"
    ],
    "tags": [
      "cidade",
      "frio",
      "natureza"
    ],
    "inicial": [
      55000,
      75000
    ],
    "mensal": [
      8100,
      9900
    ],
    "salMin": 14350,
    "salMedio": 27200,
    "textoInicial": "Intercâmbio estudo + trabalho: curso de 25 semanas + seguro (R$ 17–24 mil), registro IRP € 300, caução e 3 meses de reserva. A imigração pede ≈ € 4.200 de fundos.",
    "textoMensal": "Dublin, em quarto: € 1.350–1.650. Quarto individual € 770–1.080 (Daft.ie, 2026).",
    "salario": {
      "minimo": "€ 14,15/h (2026) ≈ € 2.390/mês ≈ R$ 14.350",
      "medio": "€ 1.046,88/semana (CSO, 2026) ≈ R$ 27.200/mês",
      "exemplos": [
        [
          "Hospitalidade, limpeza, delivery (20 h/sem nas aulas)",
          "€ 14,15–16/h ≈ R$ 85–96/h"
        ],
        [
          "Enfermeiro(a) registrado(a) NMBI",
          "≈ € 36–40 mil/ano ≈ R$ 18–20 mil/mês"
        ],
        [
          "TI com Critical Skills Permit",
          "€ 45–75 mil/ano ≈ R$ 22,5–37,5 mil/mês"
        ]
      ]
    },
    "cidades": [
      {
        "id": "dublin",
        "nome": "Dublin",
        "lat": 53.3498,
        "lng": -6.2603,
        "desc": "Sede europeia de big techs e destino nº 1 dos intercambistas brasileiros, com o aluguel mais caro do país."
      },
      {
        "id": "cork",
        "nome": "Cork",
        "lat": 51.8985,
        "lng": -8.4756,
        "desc": "Indústria farmacêutica e de tecnologia, com quartos 10–20% mais baratos que em Dublin."
      },
      {
        "id": "galway",
        "nome": "Galway",
        "lat": 53.2707,
        "lng": -9.0568,
        "desc": "Cidade universitária e cultural na costa oeste, com escolas de inglês e polo de tecnologia médica."
      }
    ],
    "vistos": [
      {
        "nome": "Stamp 2 – estudante",
        "para": "Intercambistas. Brasileiros entram sem visto prévio e se registram (IRP) em até 90 dias.",
        "req": "Curso de 25 semanas em escola ILEP, seguro e fundos. Trabalho de 20 h/semana nas aulas, 40 h nas férias."
      },
      {
        "nome": "Critical Skills Employment Permit",
        "para": "Profissionais de TI, engenharia e saúde com oferta de emprego.",
        "req": "Salário mínimo de € 40.904/ano com diploma (desde 01/03/2026). Leva à Stamp 4 após 2 anos."
      },
      {
        "nome": "General Employment Permit",
        "para": "Outras ocupações elegíveis com oferta de trabalho.",
        "req": "Salário mínimo de € 36.605/ano e, em regra, teste de mercado."
      },
      {
        "nome": "Stamp 1G – graduados",
        "para": "Quem concluiu graduação ou pós na Irlanda.",
        "req": "Trabalho em tempo integral por 12 meses (até 24 para nível 9+) enquanto busca permit."
      }
    ],
    "agencias": [
      {
        "nome": "Irish Immigration Service Delivery (oficial)",
        "url": "https://www.irishimmigration.ie"
      },
      {
        "nome": "Employment Permits – Dept. of Enterprise (oficial)",
        "url": "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/"
      },
      {
        "nome": "E-Dublin",
        "url": "https://www.edublin.com.br"
      },
      {
        "nome": "STB – Student Travel Bureau",
        "url": "https://www.stb.com.br"
      }
    ],
    "relatos": [
      {
        "perfil": "Engenheira de produção, 33 anos, Dublin",
        "texto": "Cheguei com uns R$ 14 mil e fiquei frustrada por não conseguir emprego na engenharia. Hoje estudo computação. Mercado, energia e aluguel só sobem. Queria que tivessem me contado a real.",
        "veiculo": "Jornal de Brasília / Estadão",
        "url": "https://jornaldebrasilia.com.br/noticias/mundo/trabalhar-na-irlanda-oportunidades-e-seguranca-mas-aluguel-e-caro/"
      },
      {
        "perfil": "Dentista, 29 anos, Dublin",
        "texto": "Escolhi a Irlanda porque dava visto de trabalho conforme a profissão, e hoje tenho minha própria clínica. Viajo nos fins de semana porque tudo é perto. O estranho é o inverno, com dias muito curtos.",
        "veiculo": "NSC Total",
        "url": "https://www.nsctotal.com.br/cotidiano/saudades-do-pinhao-catarinenses-se-mudam-para-a-irlanda-e-relatam-rotina-e-atrativos-do-pais"
      },
      {
        "perfil": "Intercambista, 46 anos, Cork",
        "texto": "Vim para Cork num intercâmbio. A diversidade é enorme e os imigrantes fazem amizade entre si. Moradia é onde mais se gasta, e os preços são sempre altos.",
        "veiculo": "NSC Total",
        "url": "https://www.nsctotal.com.br/cotidiano/saudades-do-pinhao-catarinenses-se-mudam-para-a-irlanda-e-relatam-rotina-e-atrativos-do-pais"
      }
    ],
    "dicas": [
      "Peça o PPS Number pelo MyWelfare.ie assim que tiver comprovante de endereço; sem ele você paga imposto emergencial.",
      "Agende o IRP (€ 300) cedo: em Dublin os horários esgotam rápido.",
      "Abra uma conta digital com IBAN irlandês primeiro e um banco tradicional depois.",
      "Procure moradia no Daft.ie e nunca pague caução sem visitar o imóvel e assinar contrato.",
      "Enfermeiros se registram na NMBI; outros diplomas podem ser comparados pelo QQI."
    ],
    "cor": "#12b886"
  },
  {
    "id": "canada",
    "nome": "Canadá",
    "iata": "YYZ",
    "capital": "Ottawa",
    "moeda": "Dólar canadense (CAD)",
    "iso": "124",
    "idioma": "Inglês e francês. Express Entry: CLB 7 (≈ IELTS General 6.0 por habilidade). Faculdade: IELTS 6.0–6.5. Francês NCLC 5+ abre rotas próprias.",
    "langs": [
      "en",
      "fr"
    ],
    "tags": [
      "cidade",
      "frio",
      "natureza"
    ],
    "inicial": [
      37000,
      50000
    ],
    "mensal": [
      6930,
      8850
    ],
    "salMin": 11970,
    "salMedio": 22330,
    "textoInicial": "Com permissão de trabalho: passagem, taxas e biometria, exame de idioma, seguro, 1º e último aluguel e 3 meses de reserva. Estudantes somam anuidade (CAD 15–35 mil) e comprovam CAD 23.448 (≈ R$ 90 mil).",
    "textoMensal": "Toronto, em quarto: CAD 1.800–2.300. Montreal: CAD 1.400–1.800.",
    "salario": {
      "minimo": "Ontário CAD 17,95/h (out/2026) ≈ R$ 11.970/mês",
      "medio": "CAD 1.337,77/semana (StatCan, 2026) ≈ R$ 22.330/mês",
      "exemplos": [
        [
          "Hospitalidade (garçom, barista)",
          "CAD 17–20/h + gorjetas ≈ R$ 65–77/h"
        ],
        [
          "Construção e manutenção",
          "CAD 22–30/h ≈ R$ 85–115/h"
        ],
        [
          "Desenvolvedor(a) de software",
          "CAD 75–110 mil/ano ≈ R$ 24–35 mil/mês"
        ],
        [
          "Enfermeiro(a) RN licenciado(a)",
          "CAD 38–55/h ≈ R$ 146–212/h"
        ]
      ]
    },
    "cidades": [
      {
        "id": "toronto",
        "nome": "Toronto",
        "lat": 43.6532,
        "lng": -79.3832,
        "desc": "Maior mercado de trabalho do país, muito multicultural, com a maior comunidade brasileira e aluguel caro."
      },
      {
        "id": "vancouver",
        "nome": "Vancouver",
        "lat": 49.2827,
        "lng": -123.1207,
        "desc": "Clima mais ameno, forte em tecnologia, cinema e turismo, mas uma das cidades mais caras da América do Norte."
      },
      {
        "id": "montreal",
        "nome": "Montreal",
        "lat": 45.5019,
        "lng": -73.5674,
        "desc": "Metrópole francófona de Québec, com aluguel mais acessível e imigração própria para quem fala francês."
      }
    ],
    "vistos": [
      {
        "nome": "Study Permit",
        "para": "Quem quer estudar e depois tentar o PGWP e a residência.",
        "req": "Carta de aceitação DLI + PAL provincial + CAD 23.448/ano além da anuidade. Trabalho de até 24 h/semana."
      },
      {
        "nome": "Express Entry (FSW / CEC)",
        "para": "Profissionais qualificados que buscam residência permanente direta.",
        "req": "Pontuação CRS competitiva: idade, idioma CLB 7+, diploma validado (ECA/WES) e experiência."
      },
      {
        "nome": "Provincial Nominee Program (PNP)",
        "para": "Quem tem perfil ou oferta de emprego numa província específica.",
        "req": "Indicação da província, que soma 600 pontos no Express Entry."
      },
      {
        "nome": "Mobilité Francophone",
        "para": "Quem fala francês e tem oferta de emprego fora de Québec.",
        "req": "Francês NCLC 5+ (TEF/TCF) e oferta de trabalho. Dispensa LMIA."
      }
    ],
    "agencias": [
      {
        "nome": "IRCC – Immigration, Refugees and Citizenship Canada (oficial)",
        "url": "https://www.canada.ca/en/immigration-refugees-citizenship.html"
      },
      {
        "nome": "EduCanada (portal oficial de estudo)",
        "url": "https://www.educanada.ca"
      },
      {
        "nome": "Immigration Québec (oficial)",
        "url": "https://www.quebec.ca/en/immigration"
      },
      {
        "nome": "CI Intercâmbio",
        "url": "https://www.ci.com.br"
      }
    ],
    "relatos": [
      {
        "perfil": "Profissional de fotografia e marketing, 27 anos",
        "texto": "Morar no Canadá era um sonho de infância e estou aqui legalmente há três anos. Mas as regras mudam sem parar desde 2023. Meu pedido de residência segue pendente, e a incerteza virou um tormento.",
        "veiculo": "BBC News Brasil",
        "url": "https://www.opovo.com.br/agencia/bbc/2025/07/08/sonho-canadense-virou-tormento-para-imigrantes.html"
      },
      {
        "perfil": "Confeiteira, 5 anos no Canadá",
        "texto": "Vim estudar inglês e hoje estou perto da residência. Aqui garçonete, médico ou engenheiro estão no mesmo patamar: todo mundo se respeita e pode ganhar salários muito bons.",
        "veiculo": "SBT News",
        "url": "https://sbtnews.sbt.com.br/noticia/mundo/202446-canada-se-torna-um-dos-destinos-favoritos-dos-brasileiros"
      },
      {
        "perfil": "Casal de 20 e 21 anos, Toronto",
        "texto": "Planejamos por dois anos antes de vir. Melhorar o inglês foi mais difícil do que esperávamos, mas as oportunidades foram infinitamente maiores. O frio de -20°C é questão de costume.",
        "veiculo": "Catraca Livre",
        "url": "https://catracalivre.com.br/viagem-livre/em-video-casal-compartilha-altos-e-baixos-de-morar-no-canada/"
      }
    ],
    "dicas": [
      "Peça o SIN numa Service Canada logo ao chegar: é obrigatório para trabalhar.",
      "Para o Express Entry, faça cedo o ECA (WES) e o IELTS General ou CELPIP; francês dá pontos extras.",
      "O Canadá aceita a Apostila de Haia desde jan/2024: apostile diplomas, certidões e antecedentes.",
      "Contrate seguro privado para a carência do plano provincial e peça o cartão (OHIP, RAMQ) ao chegar.",
      "Abra conta para recém-chegados e use um cartão de crédito garantido para construir histórico."
    ],
    "cor": "#e01e37"
  },
  {
    "id": "australia",
    "nome": "Austrália",
    "iata": "SYD",
    "capital": "Canberra",
    "moeda": "Dólar australiano (AUD)",
    "iso": "036",
    "idioma": "Inglês. Curso de inglês sem nota mínima; visto de estudante para graduação ou VET: IELTS 6.0; Work and Holiday: inglês funcional.",
    "langs": [
      "en"
    ],
    "tags": [
      "praia",
      "quente",
      "natureza",
      "cidade"
    ],
    "inicial": [
      60000,
      80000
    ],
    "mensal": [
      8050,
      10150
    ],
    "salMin": 15240,
    "salMedio": 31600,
    "textoInicial": "Estudante de inglês/VET: passagem, visto AUD 2.000, 3 meses de curso, seguro OSHC, bond e 3 meses de reserva. O visto 500 exige declarar AUD 29.710/ano.",
    "textoMensal": "Sydney, em quarto: AUD 2.300–2.900. Brisbane: AUD 1.900–2.400.",
    "salario": {
      "minimo": "AUD 26,44/h (jul/2026) ≈ R$ 15.240/mês; casuais recebem +25%",
      "medio": "AUD 2.083,70/semana (ABS, 2026) ≈ R$ 31.600/mês",
      "exemplos": [
        [
          "Limpeza (comum entre estudantes)",
          "AUD 27–35/h ≈ R$ 95–122/h"
        ],
        [
          "Hospitalidade, barista, kitchen hand",
          "AUD 26,44–33/h ≈ R$ 92–115/h"
        ],
        [
          "Enfermeiro(a) RN / desenvolvedor(a)",
          "AUD 80–140 mil/ano ≈ R$ 23–41 mil/mês"
        ]
      ]
    },
    "cidades": [
      {
        "id": "sydney",
        "nome": "Sydney",
        "lat": -33.8688,
        "lng": 151.2093,
        "desc": "Destino mais procurado pelos intercambistas brasileiros, com vagas em hospitalidade e limpeza e o aluguel mais caro do país."
      },
      {
        "id": "melbourne",
        "nome": "Melbourne",
        "lat": -37.8136,
        "lng": 144.9631,
        "desc": "Capital cultural e gastronômica, com universidades, bom transporte e custo um pouco menor que Sydney."
      },
      {
        "id": "brisbane",
        "nome": "Brisbane",
        "lat": -27.4698,
        "lng": 153.0251,
        "desc": "Clima quente, ritmo mais tranquilo e custo menor, perto da Gold Coast e da Sunshine Coast."
      }
    ],
    "vistos": [
      {
        "nome": "Student Visa (subclass 500)",
        "para": "Inglês, curso técnico (VET) ou ensino superior.",
        "req": "CoE, seguro OSHC, fundos de AUD 29.710/ano, taxa AUD 2.000. Trabalho de 48 h por quinzena."
      },
      {
        "nome": "Work and Holiday (subclass 462)",
        "para": "Brasileiros de 18 a 30 anos, com cota anual limitada.",
        "req": "Superior completo ou 2 anos de faculdade, inglês funcional e ≈ AUD 5.000."
      },
      {
        "nome": "Skills in Demand (subclass 482)",
        "para": "Profissionais com patrocínio de empregador australiano.",
        "req": "Empregador aprovado, ocupação elegível e experiência comprovada."
      },
      {
        "nome": "Skilled Independent / Nominated (189, 190, 491)",
        "para": "Residência permanente por pontos.",
        "req": "Skills assessment (ACS, AHPRA…) + pontuação + convite no SkillSelect."
      }
    ],
    "agencias": [
      {
        "nome": "Department of Home Affairs (oficial)",
        "url": "https://immi.homeaffairs.gov.au"
      },
      {
        "nome": "Study Australia (oficial)",
        "url": "https://www.studyaustralia.gov.au"
      },
      {
        "nome": "STB – Student Travel Bureau",
        "url": "https://www.stb.com.br"
      },
      {
        "nome": "EF Education First Brasil",
        "url": "https://www.ef.com.br"
      }
    ],
    "relatos": [
      {
        "perfil": "Estudante e professora em creche, 25 anos, Brisbane",
        "texto": "Escolhi Brisbane por ser meio-termo entre cidade grande e pequena. Trabalho três dias por semana numa creche, ganhando AUD 32,73 por hora. Remédio é barato aqui.",
        "veiculo": "InfoMoney",
        "url": "https://www.infomoney.com.br/consumo/vai-mudar-de-pais-brisbane-na-australia-atrai-brasileiros-por-baixo-custo-de-vida/"
      },
      {
        "perfil": "Residente permanente, Sunshine Coast",
        "texto": "Levei nove anos para conseguir o visto permanente. Aqui você pode ser quem quiser, em qualquer carreira, e há muito menos desigualdade. Mas o Medicare não é de graça: pagamos uma taxa na declaração.",
        "veiculo": "InfoMoney",
        "url": "https://www.infomoney.com.br/consumo/vai-mudar-de-pais-brisbane-na-australia-atrai-brasileiros-por-baixo-custo-de-vida/"
      },
      {
        "perfil": "Enfermeiro, estudante de Business, Melbourne",
        "texto": "Era enfermeiro no Rio. Aqui estudo gestão e trabalho limpando maçanetas num depósito, porque não posso atuar na saúde até o diploma ser reconhecido. Mas me sinto com sorte por ter emprego.",
        "veiculo": "SBS Português",
        "url": "https://www.sbs.com.au/language/portuguese/en/podcast-episode/at-least-i-have-a-job-international-students-are-turning-to-this-industry-for-survival/95nlc0uoo"
      }
    ],
    "dicas": [
      "Peça o TFN online no site da ATO logo ao chegar; sem ele o imposto retido é o máximo.",
      "Confira seus direitos no Fair Work e desconfie de pagamento 'cash in hand' abaixo do mínimo.",
      "Abra conta antes de embarcar e acompanhe a superannuation, que pode ser resgatada ao sair do país.",
      "Profissões reguladas exigem skills assessment (AHPRA, ACS, Engineers Australia). Comece ainda no Brasil.",
      "O bond do aluguel deve ser depositado no órgão estadual, nunca só na mão do proprietário."
    ],
    "cor": "#0a74da"
  },
  {
    "id": "alemanha",
    "nome": "Alemanha",
    "iata": "BER",
    "capital": "Berlim",
    "moeda": "Euro (EUR)",
    "iso": "276",
    "idioma": "Alemão. Chancenkarte: alemão A1 ou inglês B2. Saúde: alemão B2. Ausbildung: B1–B2. Muitas vagas de TI aceitam só inglês.",
    "langs": [
      "de",
      "en"
    ],
    "tags": [
      "cidade",
      "frio"
    ],
    "inicial": [
      35000,
      50000
    ],
    "mensal": [
      6600,
      8400
    ],
    "salMin": 14460,
    "salMedio": 29100,
    "textoInicial": "Passagem, visto (€ 75), traduções e avaliação ZAB, seguro, Kaution e 3 meses de reserva. Para Chancenkarte ou estudo, comprovar ≈ € 12.324/ano (≈ R$ 74 mil) numa conta bloqueada.",
    "textoMensal": "Berlim, em república (WG): € 1.100–1.400. Munique: € 1.300–1.600.",
    "salario": {
      "minimo": "€ 13,90/h (2026) ≈ € 2.410/mês ≈ R$ 14.460",
      "medio": "€ 4.851/mês bruto (Destatis) ≈ R$ 29.100",
      "exemplos": [
        [
          "Gastronomia, limpeza, logística",
          "€ 2.400–2.600/mês ≈ R$ 14.400–15.600"
        ],
        [
          "Enfermeiro(a), após reconhecimento e B2",
          "€ 3.300–4.000/mês ≈ R$ 19.800–24.000"
        ],
        [
          "Desenvolvedor(a) / engenheiro(a) com Blue Card",
          "€ 4.225–5.800/mês ≈ R$ 25–35 mil"
        ]
      ]
    },
    "cidades": [
      {
        "id": "berlim",
        "nome": "Berlim",
        "lat": 52.52,
        "lng": 13.405,
        "desc": "Capital cosmopolita, polo de startups e TI, com cena cultural forte e muitos empregos em que o inglês basta."
      },
      {
        "id": "munique",
        "nome": "Munique",
        "lat": 48.1351,
        "lng": 11.582,
        "desc": "Indústria automotiva e de engenharia, os maiores salários e o aluguel mais caro do país."
      },
      {
        "id": "frankfurt",
        "nome": "Frankfurt",
        "lat": 50.1109,
        "lng": 8.6821,
        "desc": "Centro financeiro e aeroportuário, com vagas em finanças, TI e logística."
      }
    ],
    "vistos": [
      {
        "nome": "Chancenkarte (Cartão de Oportunidade)",
        "para": "Diploma superior ou técnico de 2+ anos, para procurar emprego no país.",
        "req": "6 pontos, alemão A1 ou inglês B2 e ≈ € 1.027/mês. Vale 12 meses; trabalho de 20 h/semana."
      },
      {
        "nome": "Blaue Karte EU (Blue Card)",
        "para": "Graduados com oferta de emprego qualificada.",
        "req": "€ 50.700/ano em 2026 (€ 45.934 em áreas em falta). Residência permanente em 21–27 meses."
      },
      {
        "nome": "Profissional qualificado / reconhecimento (§18a, §18b, §16d)",
        "para": "Técnicos e graduados com oferta, ou em processo de reconhecimento (comum na enfermagem).",
        "req": "Diploma reconhecido ou em reconhecimento + oferta. Saúde exige alemão B2."
      },
      {
        "nome": "Estudante / Ausbildung",
        "para": "Universidade (muitas gratuitas) ou formação técnica remunerada.",
        "req": "Admissão ou contrato de Ausbildung + conta bloqueada ou salário. Alemão B1–B2."
      }
    ],
    "agencias": [
      {
        "nome": "Make it in Germany (oficial, em português)",
        "url": "https://www.make-it-in-germany.com/pt"
      },
      {
        "nome": "DAAD Brasil",
        "url": "https://www.daad.org.br"
      },
      {
        "nome": "Anerkennung in Deutschland (reconhecimento de diplomas)",
        "url": "https://www.anerkennung-in-deutschland.de"
      },
      {
        "nome": "Goethe-Institut Brasil",
        "url": "https://www.goethe.de/brasil"
      }
    ],
    "relatos": [
      {
        "perfil": "Profissional de marketing, na Alemanha desde 2019",
        "texto": "Somos muito bem recebidos e gosto de morar aqui. Mas o primeiro ano foi cheio de dificuldades com idioma. Levei um ano e oito meses para sentir a Alemanha como casa, e os dias escuros mexem com a cabeça.",
        "veiculo": "Euro Dicas",
        "url": "https://www.eurodicas.com.br/o-imigrante-brasileiro-e-bem-recebido-na-alemanha/"
      },
      {
        "perfil": "Engenheiro civil, Zwickau",
        "texto": "Vim para um mestrado e hoje sou planejador de obras numa grande empresa. É incrível, mas desafiador: idioma, diferenças culturais e xenofobia pesaram, principalmente nos mini-jobs antes de me formar.",
        "veiculo": "Euro Dicas",
        "url": "https://www.eurodicas.com.br/brasileiros-na-alemanha/"
      },
      {
        "perfil": "Estudante, Düsseldorf",
        "texto": "Quando fui abrir uma conta e pedi o contrato em inglês, o atendente disse que aquele banco não era para mim. Às vezes fico em dúvida se é racismo ou xenofobia, mas essa foi evidente.",
        "veiculo": "DW Brasil",
        "url": "https://www.opovo.com.br/noticias/mundo/2025/02/23/com-avanco-da-afd-brasileiros-sao-alvo-de-xenofobia-na-alemanha.html"
      }
    ],
    "dicas": [
      "Faça a Anmeldung no Bürgeramt em até 14 dias: ela destrava conta, Steuer-ID e Ausländerbehörde.",
      "Confira seu diploma na base anabin; a Chancenkarte e a Blue Card podem exigir a avaliação da ZAB (€ 200).",
      "Apostile e faça tradução juramentada para o alemão de diplomas, históricos e certidões.",
      "Abra a conta bloqueada e o seguro de entrada com provedores aceitos pelo consulado.",
      "Comece o alemão no Brasil (Goethe ou telc): pesa na burocracia, na moradia e no reconhecimento."
    ],
    "cor": "#f2a900"
  },
  {
    "id": "espanha",
    "nome": "Espanha",
    "iata": "MAD",
    "capital": "Madri",
    "moeda": "Euro (EUR)",
    "iso": "724",
    "idioma": "Espanhol. Graduação e mestrado em espanhol pedem B2 (DELE/SIELE); nacionalidade exige DELE A2 + CCSE.",
    "langs": [
      "es"
    ],
    "tags": [
      "praia",
      "quente",
      "cidade"
    ],
    "inicial": [
      32000,
      52000
    ],
    "mensal": [
      5700,
      7800
    ],
    "salMin": 7330,
    "salMedio": 14770,
    "textoInicial": "Passagem, visto de estudante (≈ €80), apostilas e traduções, seguro sem copagamento, caução e 3 meses de reserva. O visto de estudante exige ≈ €600/mês (100% do IPREM).",
    "textoMensal": "Madri ou Barcelona, em quarto: € 950–1.300. Valência: € 850–1.100.",
    "salario": {
      "minimo": "SMI 2026: € 1.221/mês em 14 pagas ≈ R$ 7.330",
      "medio": "€ 29.540/ano (INE) ≈ € 2.462/mês ≈ R$ 14.770",
      "exemplos": [
        [
          "Hotelaria (garçom, cozinha, camareira)",
          "€ 1.300–1.500/mês ≈ R$ 7.800–9.000"
        ],
        [
          "Desenvolvedor(a) júnior a pleno",
          "€ 2.300–3.750/mês ≈ R$ 13.800–22.500"
        ],
        [
          "Limpeza e cuidados de idosos",
          "≈ € 1.400/mês ≈ R$ 7.300–8.400"
        ]
      ]
    },
    "cidades": [
      {
        "id": "madri",
        "nome": "Madri",
        "lat": 40.4168,
        "lng": -3.7038,
        "desc": "Capital e maior mercado de trabalho do país, forte em serviços, TI e hotelaria, com aluguel em alta."
      },
      {
        "id": "barcelona",
        "nome": "Barcelona",
        "lat": 41.3874,
        "lng": 2.1686,
        "desc": "Polo de startups, design e mestrados internacionais, com praia; aluguel mais caro do país e o catalão ajuda."
      },
      {
        "id": "valencia",
        "nome": "Valência",
        "lat": 39.4699,
        "lng": -0.3763,
        "desc": "Praia, clima ameno e custo menor, muito procurada por nômades digitais e famílias."
      }
    ],
    "vistos": [
      {
        "nome": "Visado de estudios",
        "para": "Graduação, mestrado ou curso de espanhol com mais de 90 dias.",
        "req": "Matrícula, fundos de 100% do IPREM/mês e seguro sem copagamento. Trabalho de até 30 h/semana."
      },
      {
        "nome": "Visado de teletrabajo (nômade digital)",
        "para": "Profissional remoto de empresa ou clientes de fora da Espanha.",
        "req": "Renda de ≈ € 2.849/mês, diploma ou 3 anos de experiência, vínculo de 3+ meses."
      },
      {
        "nome": "Nacionalidade por residência (2 anos)",
        "para": "Brasileiros com residência legal e contínua.",
        "req": "2 anos de residência (em vez de 10), DELE A2 + CCSE e antecedentes limpos."
      },
      {
        "nome": "Arraigo (social, sociolaboral, socioformativo)",
        "para": "Quem já está na Espanha e quer se regularizar.",
        "req": "Desde maio/2025, 2 anos de permanência + contrato ou curso de formação."
      }
    ],
    "agencias": [
      {
        "nome": "Consulado-Geral da Espanha em São Paulo",
        "url": "https://www.exteriores.gob.es/Consulados/saopaulo/pt/Paginas/inicio.aspx"
      },
      {
        "nome": "Portal de Imigração do Governo da Espanha",
        "url": "https://www.inclusion.gob.es/web/migraciones"
      },
      {
        "nome": "CI Intercâmbio",
        "url": "https://www.ci.com.br"
      },
      {
        "nome": "STB – Student Travel Bureau",
        "url": "https://www.stb.com.br"
      }
    ],
    "relatos": [
      {
        "perfil": "Casal de profissionais de TI, Valência",
        "texto": "Escolhemos a Espanha pelo clima, e o espanhol é fácil de entender. A maior dificuldade foi a burocracia, achar informação confiável e o aluguel caro. Chegar sem nenhum conhecido pesou muito.",
        "veiculo": "Euro Dicas",
        "url": "https://www.eurodicas.com.br/brasileiros-que-moram-na-espanha/"
      },
      {
        "perfil": "Jornalista freelancer, Barcelona",
        "texto": "O idioma facilitou e achei aqui o mestrado que eu queria; gosto do jeito de viver para desfrutar. O difícil é fechar as contas com o aluguel subindo e mais furtos na cidade.",
        "veiculo": "Euro Dicas",
        "url": "https://www.eurodicas.com.br/brasileiros-que-moram-na-espanha/"
      },
      {
        "perfil": "Pesquisadora de pós-doutorado, Tenerife",
        "texto": "Tenerife é mágico, com gente simpática e muita influência latina, e tirei a nacionalidade após dois anos. O mais difícil foi me despedir da família e dos amigos.",
        "veiculo": "Euro Dicas",
        "url": "https://www.eurodicas.com.br/brasileiros-que-moram-na-espanha/"
      }
    ],
    "dicas": [
      "Apostile certidões e antecedentes da PF (menos de 6 meses) e faça tradução juramentada para o espanhol.",
      "O visto traz o NIE, mas em até 30 dias você precisa da cita previa para emitir o TIE. Agende assim que tiver endereço.",
      "Faça o empadronamiento na prefeitura: é a base para TIE, saúde pública e para contar os 2 anos da nacionalidade.",
      "Peça a homologação do diploma no Ministerio de Ciencia antes de embarcar; pode levar mais de 1 ano.",
      "Contrate seguro 'sin copago y sin carencia' de seguradora autorizada na Espanha."
    ],
    "cor": "#d6246e"
  },
  {
    "id": "nova-zelandia",
    "nome": "Nova Zelândia",
    "iata": "AKL",
    "capital": "Wellington",
    "moeda": "Dólar neozelandês (NZD)",
    "iso": "554",
    "idioma": "Inglês. Universidade: IELTS 6.0–6.5; residência qualificada: IELTS 6.5. Working Holiday não exige teste.",
    "langs": [
      "en"
    ],
    "tags": [
      "natureza",
      "tranquilo",
      "frio"
    ],
    "inicial": [
      40000,
      55000
    ],
    "mensal": [
      5400,
      7100
    ],
    "salMin": 11800,
    "salMedio": 17500,
    "textoInicial": "Working Holiday: taxa NZ$ 770, fundos obrigatórios NZ$ 4.200, passagem, seguro de 12 meses, bond e 3 meses de reserva.",
    "textoMensal": "1 pessoa em quarto: NZ$ 1.900–2.500/mês (quarto NZ$ 250–330/semana em Auckland).",
    "salario": {
      "minimo": "NZ$ 23,95/h (abr/2026) ≈ R$ 11.800/mês",
      "medio": "Mediana NZ$ 1.419/semana (Stats NZ, 2026) ≈ R$ 17.500/mês",
      "exemplos": [
        [
          "Kitchenhand, barista, garçom",
          "NZ$ 24–28/h ≈ R$ 11.800–13.800/mês"
        ],
        [
          "Colheita e packhouse (sazonal)",
          "NZ$ 23,95–28/h ou por produção"
        ],
        [
          "Desenvolvedor(a) pleno",
          "NZ$ 90–130 mil/ano ≈ R$ 21–31 mil/mês"
        ]
      ]
    },
    "cidades": [
      {
        "id": "auckland",
        "nome": "Auckland",
        "lat": -36.8485,
        "lng": 174.7633,
        "desc": "Principal mercado de trabalho e maior comunidade brasileira, com escolas de inglês, mas disputada e cara."
      },
      {
        "id": "wellington",
        "nome": "Wellington",
        "lat": -41.2865,
        "lng": 174.7762,
        "desc": "Capital compacta, com vagas em governo, TI e hospitalidade; famosa pelo vento forte e pelos aluguéis em queda."
      },
      {
        "id": "christchurch",
        "nome": "Christchurch",
        "lat": -43.5321,
        "lng": 172.6362,
        "desc": "Principal cidade da Ilha Sul, reconstruída após os terremotos, com custo menor e construção civil aquecida."
      }
    ],
    "vistos": [
      {
        "nome": "Brazil Working Holiday Visa",
        "para": "Brasileiros de 18 a 30 anos, por até 12 meses.",
        "req": "300 vagas/ano que esgotam rápido; NZ$ 4.200 de fundos, seguro e taxa NZ$ 770. A cota de 2026 já fechou."
      },
      {
        "nome": "Fee Paying Student Visa",
        "para": "Inglês (14+ semanas), diploma, graduação ou pós.",
        "req": "Matrícula aprovada e ≈ NZ$ 20.000/ano. Trabalho de até 25 h/semana."
      },
      {
        "nome": "Accredited Employer Work Visa (AEWV)",
        "para": "Quem tem oferta de empregador credenciado.",
        "req": "Salário de mercado; em geral 2 anos de experiência ou qualificação."
      },
      {
        "nome": "Skilled Migrant Category",
        "para": "Residência permanente para qualificados.",
        "req": "6 pontos (qualificação, registro ou renda) + emprego qualificado + IELTS 6.5."
      }
    ],
    "agencias": [
      {
        "nome": "Immigration New Zealand (oficial)",
        "url": "https://www.immigration.govt.nz"
      },
      {
        "nome": "Study with New Zealand (oficial)",
        "url": "https://www.studywithnewzealand.govt.nz"
      },
      {
        "nome": "Embaixada da Nova Zelândia no Brasil",
        "url": "https://www.mfat.govt.nz/br/countries-and-regions/americas/brazil/new-zealand-embassy-to-brazil"
      },
      {
        "nome": "IE Intercâmbio",
        "url": "https://www.ie.com.br"
      }
    ],
    "relatos": [
      {
        "perfil": "Jornalista, mãe de família, Wellington",
        "texto": "As pessoas são educadas e, passada a barreira inicial, viram amigos incríveis. Mas semanas de céu cinza e vento deprimem, os aluguéis estão altos e ainda me custa entender o sotaque kiwi.",
        "veiculo": "Blog Família Kiwi",
        "url": "https://familiakiwi.wordpress.com/2018/01/23/10-coisas-ruins-na-nova-zelandia-familia-kiwi/"
      },
      {
        "perfil": "Designer em curso de inglês, Auckland",
        "texto": "Distribuí currículos em restaurantes sem resposta; num hotel me acharam qualificada demais. Insisti até conseguir, mas Auckland é muito disputada; cidades menores podem ser mais fáceis.",
        "veiculo": "Blog A Pureguria",
        "url": "https://apureguria.com/oceania/nova-zelandia/a-longa-jornada-operaria/"
      },
      {
        "perfil": "Casal de intercambistas, Wellington",
        "texto": "Trabalhamos de 4 a 5 dias por semana como kitchenhand e a vontade de ficar só aumenta. Mas o vento de Wellington assusta, já teve rajada de 150 km/h.",
        "veiculo": "Depoimento em agência",
        "url": "https://nzega.com/depoimentos/"
      }
    ],
    "dicas": [
      "Acompanhe a abertura anual do Working Holiday e deixe RealMe, passaporte, seguro e extrato prontos: as vagas acabam no mesmo dia.",
      "Peça o IRD number online ao chegar; sem ele o salário sofre retenção de 45%.",
      "Para residência ou registro profissional, avalie o diploma no NZQA.",
      "O bond é de no máximo 4 semanas e vai para a Tenancy Services. Exija recibo.",
      "Estadias longas podem exigir exame médico e raio-X com médico credenciado no Brasil."
    ],
    "cor": "#7acc29"
  },
  {
    "id": "estados-unidos",
    "nome": "Estados Unidos",
    "iata": "MIA",
    "capital": "Washington, D.C.",
    "moeda": "Dólar (USD)",
    "iso": "840",
    "idioma": "Inglês. Universidades: TOEFL iBT 80–100 ou IELTS 6.5–7.0 (Duolingo English Test também aceito). Mercado qualificado: C1.",
    "langs": [
      "en"
    ],
    "tags": [
      "cidade",
      "praia",
      "quente"
    ],
    "inicial": [
      45000,
      70000
    ],
    "mensal": [
      9000,
      14000
    ],
    "salMin": 13000,
    "salMedio": 26700,
    "textoInicial": "Estudante F-1, sem anuidade: passagem, MRV + SEVIS + visa integrity fee (≈ R$ 4 mil), seguro, depósito e 3 meses de reserva. Anuidade de US$ 10–60 mil à parte.",
    "textoMensal": "1 pessoa em quarto: US$ 1.800–2.800/mês. Fora de NY e Boston o carro costuma ser indispensável.",
    "salario": {
      "minimo": "Flórida e Massachusetts US$ 15/h ≈ R$ 13.000/mês (federal US$ 7,25/h)",
      "medio": "Mediana US$ 1.232/semana (BLS, 2026) ≈ R$ 26.700/mês",
      "exemplos": [
        [
          "Limpeza residencial e comercial",
          "US$ 16–22/h ≈ R$ 14–19 mil/mês"
        ],
        [
          "Construção, pintura, drywall",
          "US$ 20–30/h ≈ R$ 17,5–26 mil/mês"
        ],
        [
          "Desenvolvedor(a) de software",
          "≈ US$ 133 mil/ano ≈ R$ 55 mil/mês"
        ]
      ]
    },
    "cidades": [
      {
        "id": "miami",
        "nome": "Miami",
        "lat": 25.7617,
        "lng": -80.1918,
        "desc": "Porta de entrada latina, com grande comunidade brasileira e vagas em serviços e turismo; aluguel dos mais caros do país."
      },
      {
        "id": "orlando",
        "nome": "Orlando",
        "lat": 28.5383,
        "lng": -81.3792,
        "desc": "Polo de turismo e parques, escolhido por famílias brasileiras, com custo menor que Miami."
      },
      {
        "id": "boston",
        "nome": "Boston",
        "lat": 42.3601,
        "lng": -71.0589,
        "desc": "Região com uma das maiores concentrações de brasileiros, forte em universidades, saúde e tecnologia."
      }
    ],
    "vistos": [
      {
        "nome": "F-1 (Student Visa)",
        "para": "Graduação, pós ou inglês intensivo.",
        "req": "I-20, fundos para o 1º ano, SEVIS US$ 350, MRV US$ 185. Depois, OPT de 12 meses (+24 em STEM)."
      },
      {
        "nome": "H-1B (Specialty Occupation)",
        "para": "Profissional com diploma e oferta na área.",
        "req": "Empregador patrocinador e sorteio anual. Taxa de US$ 100 mil para petições de quem está fora dos EUA."
      },
      {
        "nome": "EB-2 NIW",
        "para": "Mestrado (ou graduação + 5 anos) ou habilidade excepcional.",
        "req": "Green card sem empregador: provar mérito e importância nacional (teste Dhanasar)."
      },
      {
        "nome": "J-1 (Au Pair, intercâmbio e pesquisa)",
        "para": "Au pair de 18 a 26 anos, pesquisadores e professores visitantes.",
        "req": "Patrocínio de organização designada; alguns exigem 2 anos de volta ao Brasil."
      }
    ],
    "agencias": [
      {
        "nome": "EducationUSA (Departamento de Estado)",
        "url": "https://educationusa.state.gov"
      },
      {
        "nome": "Embaixada e Consulados dos EUA no Brasil",
        "url": "https://br.usembassy.gov/pt/"
      },
      {
        "nome": "Comissão Fulbright Brasil",
        "url": "https://fulbright.org.br"
      },
      {
        "nome": "EF Education First",
        "url": "https://www.ef.com.br"
      }
    ],
    "relatos": [
      {
        "perfil": "Gerente de engenharia de software, 42 anos, Los Angeles",
        "texto": "Me desenvolvi muito profissionalmente nos primeiros anos aqui e consegui o green card pelo EB-2 NIW em 2024. Encontrei mais segurança e uma economia mais forte.",
        "veiculo": "Terra",
        "url": "https://www.terra.com.br/amp/noticias/brasil/migracao-de-brasileiros-ultracapacitados-cresce-nos-eua-em-meio-a-alta-de-deportacoes-nos-ultimos-anos,c565058e39881660adb4f66107789349wnfez98f.html"
      },
      {
        "perfil": "Professor universitário de física, Maryland",
        "texto": "A universidade investe em nos tornar professores melhores; no Brasil eu vivia na incerteza do financiamento. Por outro lado, escola particular e plano de saúde pesam no orçamento.",
        "veiculo": "Terra",
        "url": "https://www.terra.com.br/amp/noticias/brasil/migracao-de-brasileiros-ultracapacitados-cresce-nos-eua-em-meio-a-alta-de-deportacoes-nos-ultimos-anos,c565058e39881660adb4f66107789349wnfez98f.html"
      },
      {
        "perfil": "Trabalhador, 60 anos, região de Boston",
        "texto": "Não posso falar mal daqui. Só que hoje a gente tem medo de sair para trabalhar, de ir ao mercado. Não suporto mais essa situação e planejo voltar ao Brasil.",
        "veiculo": "Terra",
        "url": "https://www.terra.com.br/amp/noticias/brasil/5-dias-com-brasileiros-sob-o-cerco-de-trump-nos-eua-posso-perder-meu-filho,63c989489199a158a5445667797f92c43sq5z6sy.html"
      }
    ],
    "dicas": [
      "Antes da entrevista: DS-160, MRV, SEVIS I-901 e extratos que cubram o valor do I-20.",
      "Com autorização de trabalho, peça o SSN: é exigido para salário, banco, crédito e impostos.",
      "Comece o credit score cedo, com cartão garantido e contas no seu nome.",
      "Avalie o diploma numa empresa reconhecida (WES, ECE) para H-1B, NIW e licenças.",
      "Nunca trabalhe sem autorização nem ultrapasse o I-94. Para NIW ou H-1B, consulte advogado licenciado nos EUA."
    ],
    "cor": "#1b3a8c"
  },
  {
    "id": "japao",
    "nome": "Japão",
    "iata": "NGO",
    "capital": "Tóquio",
    "moeda": "Iene (JPY)",
    "iso": "392",
    "idioma": "Japonês. Yonsei: JLPT N4 (18–30) ou N3 (31–35). Tokutei Ginou: N4. Escritório, TI e universidade: N2.",
    "langs": [
      "ja"
    ],
    "tags": [
      "cidade",
      "tranquilo"
    ],
    "inicial": [
      20000,
      45000
    ],
    "mensal": [
      3800,
      6400
    ],
    "salMin": 6500,
    "salMedio": 10900,
    "textoInicial": "Passagem (algumas empreiteiras adiantam), koseki e certidões, seguro de viagem, entrada no apartamento ou dormitório e 3 meses de reserva.",
    "textoMensal": "Interior industrial: ¥ 120–150 mil/mês. Tóquio: ¥ 160–200 mil. Impostos e seguros saem do salário.",
    "salario": {
      "minimo": "Média ¥ 1.176/h (2026) ≈ R$ 6.500/mês",
      "medio": "¥ 340.600/mês (MHLW 2025) ≈ R$ 10.900",
      "exemplos": [
        [
          "Fábrica via empreiteira",
          "¥ 250–360 mil/mês com extras ≈ R$ 8.000–11.500"
        ],
        [
          "Konbini, restaurante (estudantes)",
          "¥ 1.100–1.300/h ≈ R$ 4.200–4.600/mês"
        ],
        [
          "Engenheiro(a) de TI",
          "¥ 4–7 milhões/ano ≈ R$ 10.600–18.600/mês"
        ]
      ]
    },
    "cidades": [
      {
        "id": "hamamatsu",
        "nome": "Hamamatsu",
        "lat": 34.7108,
        "lng": 137.7261,
        "desc": "Uma das maiores comunidades brasileiras do Japão, com fábricas da Suzuki e Yamaha e comércio brasileiro."
      },
      {
        "id": "nagoya",
        "nome": "Nagoya (Aichi)",
        "lat": 35.1815,
        "lng": 136.9066,
        "desc": "Aichi concentra o maior número de brasileiros, com trabalho em autopeças pelas empreiteiras."
      },
      {
        "id": "toquio",
        "nome": "Tóquio",
        "lat": 35.6762,
        "lng": 139.6503,
        "desc": "Destino de quem vai estudar ou atuar em TI, ensino e escritório; japonês fluente faz diferença."
      }
    ],
    "vistos": [
      {
        "nome": "Nikkei: cônjuge/filho de japonês (2ª geração) e Teijuusha (3ª geração)",
        "para": "Filhos e netos de japoneses, e seus cônjuges.",
        "req": "Provar a ascendência com o koseki tohon e as certidões que ligam as gerações. Sem restrição de trabalho."
      },
      {
        "nome": "Programa Yonsei (4ª geração)",
        "para": "Bisnetos de japoneses de 18 a 35 anos.",
        "req": "JLPT N4 ou N3, um apoiador por 3 anos e permanência máxima de 5 anos."
      },
      {
        "nome": "Tokutei Ginou / Engenheiro-Especialista",
        "para": "Não descendentes com qualificação técnica ou diploma superior.",
        "req": "Prova do setor + JLPT N4, ou diploma compatível + contrato com empresa japonesa."
      },
      {
        "nome": "Visto de estudante (Ryugaku)",
        "para": "Escola de japonês, graduação, pós ou bolsa MEXT.",
        "req": "COE emitido via escola e comprovação financeira; trabalho de até 28 h/semana."
      }
    ],
    "agencias": [
      {
        "nome": "Embaixada do Japão no Brasil (vistos e bolsas MEXT)",
        "url": "https://www.br.emb-japan.go.jp"
      },
      {
        "nome": "Study in Japan (JASSO)",
        "url": "https://www.studyinjapan.go.jp"
      },
      {
        "nome": "Fundação Japão em São Paulo (JLPT)",
        "url": "https://fjsp.org.br"
      },
      {
        "nome": "JADESAS (programa Yonsei)",
        "url": "https://www.jadesas.or.jp"
      }
    ],
    "relatos": [
      {
        "perfil": "Educadora física, 27 anos, operária em Shimane",
        "texto": "Vim com meu marido trabalhar por empreiteira numa fábrica de eletrônicos. No começo eram 12 horas à noite, com contrato temporário, mas aqui a família anda na rua sem medo e temos mais qualidade de vida.",
        "veiculo": "Click Petróleo e Gás",
        "url": "https://clickpetroleoegas.com.br/brasileiros-que-trocaram-o-pais-pelo-japao-encaram-turnos-de-12-horas-por-dia-mas-dizem-que-a-seguranca-de-andar-na-rua-sem-medo-e-a-qualidade-de-vida-compensam-numa-comunidade-que-ja-btl96/"
      },
      {
        "perfil": "Desenvolvedor de software, 33 anos",
        "texto": "Escolhi uma vaga híbrida de TI, com contrato fixo, para fugir das jornadas de 12 horas das fábricas. Mas o mercado é restrito: para cargos sêniores é preciso inglês e japonês.",
        "veiculo": "Click Petróleo e Gás",
        "url": "https://clickpetroleoegas.com.br/brasileiros-que-trocaram-o-pais-pelo-japao-encaram-turnos-de-12-horas-por-dia-mas-dizem-que-a-seguranca-de-andar-na-rua-sem-medo-e-a-qualidade-de-vida-compensam-numa-comunidade-que-ja-btl96/"
      },
      {
        "perfil": "Operária de fábrica, Aichi",
        "texto": "Na fábrica há muitos jovens vietnamitas. Nos comunicamos com gestos e o japonês que dá para quebrar o galho. Prefiro aprender a cultura deles a vê-los como ameaça.",
        "veiculo": "Correio Braziliense",
        "url": "https://www.correiobraziliense.com.br/mundo/2023/04/5084550-por-que-brasileiros-vem-perdendo-lugar-entre-estrangeiros-no-japao.html"
      }
    ],
    "dicas": [
      "Nikkei: peça o koseki tohon do ascendente e reúna as certidões que ligam cada geração; grafia divergente de nomes é o problema mais comum.",
      "Ao chegar, registre o endereço na prefeitura em até 14 dias; lá é gerado o My Number.",
      "Antes de assinar com empreiteira, confira se ela inscreve você no shakai hoken e quanto desconta de moradia.",
      "Faça o JLPT no Brasil (julho e dezembro). O N2 abre vagas fora da fábrica.",
      "O acordo previdenciário Brasil–Japão permite somar contribuições; quem sai pode pedir reembolso parcial do nenkin."
    ],
    "cor": "#ff7ba6"
  },
  {
    "id": "holanda",
    "nome": "Holanda",
    "iata": "AMS",
    "capital": "Amsterdã",
    "moeda": "Euro (EUR)",
    "iso": "528",
    "idioma": "Holandês, mas o inglês é amplamente falado. Universidades: IELTS 6.5. Holandês A2–B1 para integração e muitas vagas de saúde.",
    "langs": [
      "en",
      "nl"
    ],
    "tags": [
      "cidade",
      "frio",
      "tranquilo"
    ],
    "inicial": [
      43000,
      70000
    ],
    "mensal": [
      7800,
      12000
    ],
    "salMin": 15200,
    "salMedio": 24000,
    "textoInicial": "Passagem, taxa do IND, apostilas e traduções, seguro, caução + 1º aluguel e 3 meses de reserva, já que achar moradia pode levar semanas.",
    "textoMensal": "Amsterdã: € 1.600–2.000/mês, com quarto a € 900–1.200. Roterdã e Eindhoven: € 1.300–1.600.",
    "salario": {
      "minimo": "€ 14,99/h (jul/2026) ≈ R$ 14.800–15.600/mês + 8% de vakantiegeld",
      "medio": "Renda modal ≈ € 4.000/mês ≈ R$ 24.000",
      "exemplos": [
        [
          "Orderpicker em centro de distribuição",
          "€ 2.500–2.900/mês ≈ R$ 15.000–17.400"
        ],
        [
          "Hotelaria e restaurantes",
          "€ 2.400–2.700/mês ≈ R$ 14.400–16.200"
        ],
        [
          "Desenvolvedor(a) pleno (kennismigrant)",
          "€ 4.000–6.000/mês ≈ R$ 24–36 mil"
        ]
      ]
    },
    "cidades": [
      {
        "id": "amsterda",
        "nome": "Amsterdã",
        "lat": 52.3676,
        "lng": 4.9041,
        "desc": "Hub de tecnologia e multinacionais que funcionam em inglês, com a crise de moradia mais aguda do país."
      },
      {
        "id": "roterda",
        "nome": "Roterdã",
        "lat": 51.9244,
        "lng": 4.4777,
        "desc": "Maior porto da Europa, com vagas em logística e engenharia e aluguel um pouco menor."
      },
      {
        "id": "eindhoven",
        "nome": "Eindhoven",
        "lat": 51.4416,
        "lng": 5.4697,
        "desc": "Polo de alta tecnologia (ASML, Philips) com forte demanda por engenheiros."
      }
    ],
    "vistos": [
      {
        "nome": "Kennismigrant (Migrante Altamente Qualificado)",
        "para": "Profissionais contratados por empresa reconhecida pelo IND.",
        "req": "Salário mínimo de € 5.942/mês (30+ anos) ou € 4.357 (menos de 30)."
      },
      {
        "nome": "EU Blue Card",
        "para": "Graduados com oferta qualificada de 12+ meses.",
        "req": "€ 5.942/mês em 2026 (€ 4.754 para recém-graduados) e diploma reconhecido."
      },
      {
        "nome": "Estudante + Zoekjaar (ano de busca)",
        "para": "Graduação ou mestrado na Holanda.",
        "req": "Admissão e fundos; depois 1 ano para achar emprego com salário reduzido de kennismigrant."
      },
      {
        "nome": "Autônomo (zelfstandige)",
        "para": "Empreendedores com negócio de valor para a economia holandesa.",
        "req": "Plano de negócios avaliado por pontos (RVO)."
      }
    ],
    "agencias": [
      {
        "nome": "IND – Immigratie- en Naturalisatiedienst (oficial)",
        "url": "https://ind.nl/en"
      },
      {
        "nome": "Study in NL (Nuffic)",
        "url": "https://www.studyinnl.org"
      },
      {
        "nome": "Netherlands and You (Embaixada no Brasil)",
        "url": "https://www.netherlandsandyou.nl"
      },
      {
        "nome": "CI Intercâmbio",
        "url": "https://www.ci.com.br"
      }
    ],
    "relatos": [
      {
        "perfil": "Criadora de conteúdo freelancer, Amsterdã",
        "texto": "Me sinto segura até à noite, o transporte funciona e todos me atenderam em inglês, até para abrir minha empresa. Mas o céu é cinza, os aluguéis são disputadíssimos e os impostos pesam.",
        "veiculo": "Euro Dicas",
        "url": "https://www.eurodicas.com.br/um-ano-morando-em-amsterdam/"
      },
      {
        "perfil": "Ex-farmacêutica que virou fotógrafa, Amsterdã",
        "texto": "A fotografia me trouxe liberdade e consegui me reinventar aqui. O mais difícil foi o choque com o individualismo holandês, fazer amigos e encontrar moradia.",
        "veiculo": "Blog Melissa na Holanda",
        "url": "https://melissanaholanda.com/brasileiras-que-se-reinventaram-na-holanda/"
      },
      {
        "perfil": "Empresária do setor de limpeza",
        "texto": "Entrei como turista e trabalhei dois anos recebendo por fora, até ser detida e deportada. Anos depois me regularizei e hoje tenho minha empresa; não vivo mais com medo.",
        "veiculo": "Revista Cenarium",
        "url": "https://revistacenarium.com.br/brasileiros-sem-documentos-enfrentam-desafios-com-informalidade-na-holanda/"
      }
    ],
    "dicas": [
      "Leve a certidão de nascimento em inteiro teor, apostilada e traduzida: ela é exigida no registro na gemeente, que gera o BSN.",
      "Com o BSN, ative o DigiD e contrate o seguro básico obrigatório em até 4 meses (multa retroativa).",
      "Busque empregadores da lista de 'erkende referenten' do IND e pergunte sobre a regra dos 30%.",
      "Avalie o diploma na Nuffic/IDW; saúde exige registro BIG e holandês B2.",
      "Confirme que o endereço permite registro no BRP antes de alugar: sem registro, nada de BSN."
    ],
    "cor": "#ff8a00"
  }
];

export const FOTOS_CREDITOS: Credito[] = [
  {
    "id": "lisboa",
    "file": "Lisbon cityscape (22341918126).jpg",
    "artist": "Bex Walton from London, England",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Lisbon_cityscape_(22341918126).jpg"
  },
  {
    "id": "porto",
    "file": "View of Ribeira from Cais de Gaia, 20250605 1628 9890.jpg",
    "artist": "Jakub Hałun",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:View_of_Ribeira_from_Cais_de_Gaia,_20250605_1628_9890.jpg"
  },
  {
    "id": "braga",
    "file": "Vista aérea de Braga (4).JPG",
    "artist": "Béria Lima de Rodríguez",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Vista_a%C3%A9rea_de_Braga_(4).JPG"
  },
  {
    "id": "dublin",
    "file": "River Liffey and Samuel Beckett Bridge.jpg",
    "artist": "Christian David",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:River_Liffey_and_Samuel_Beckett_Bridge.jpg"
  },
  {
    "id": "galway",
    "file": "Galway - Spanish Arch ^ Medieval Wall - SE Side - geograph.org.uk - 3027032.jpg",
    "artist": "Joseph Mischyshyn",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Galway_-_Spanish_Arch_%5E_Medieval_Wall_-_SE_Side_-_geograph.org.uk_-_3027032.jpg"
  },
  {
    "id": "toronto",
    "file": "Toronto skyline viewed from Trillium Park.jpg",
    "artist": "Maksim Sokolov (maxergon.com)",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Toronto_skyline_viewed_from_Trillium_Park.jpg"
  },
  {
    "id": "vancouver",
    "file": "Vancouver Skyline 04.jpg",
    "artist": "Xicotencatl",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Vancouver_Skyline_04.jpg"
  },
  {
    "id": "montreal",
    "file": "Kondiaronk Belvedere, Montreal city, Canada.jpg",
    "artist": "Wilfredor",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Kondiaronk_Belvedere,_Montreal_city,_Canada.jpg"
  },
  {
    "id": "sydney",
    "file": "Sydney Opera House and Harbour Bridge, southeast view 20230224 1.jpg",
    "artist": "DXR",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Sydney_Opera_House_and_Harbour_Bridge,_southeast_view_20230224_1.jpg"
  },
  {
    "id": "melbourne",
    "file": "Princes Bridge and Melbourne skyline, southwest view 20230219 1.jpg",
    "artist": "DXR",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Princes_Bridge_and_Melbourne_skyline,_southwest_view_20230219_1.jpg"
  },
  {
    "id": "brisbane",
    "file": "Brisbane skyline from Kangaroo Point.jpg",
    "artist": "King Eliot",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Brisbane_skyline_from_Kangaroo_Point.jpg"
  },
  {
    "id": "berlim",
    "file": "Reichstagsgebäude und Paul-Löbe-Haus, Berlin-Mitte, 170327, ako.jpg",
    "artist": "Ansgar Koreng",
    "license": "CC BY-SA 3.0 de",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/de/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Reichstagsgeb%C3%A4ude_und_Paul-L%C3%B6be-Haus,_Berlin-Mitte,_170327,_ako.jpg"
  },
  {
    "id": "munique",
    "file": "Frauenkirche and Neues Rathaus Munich March 2013.JPG",
    "artist": "Martin Falbisoner",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG"
  },
  {
    "id": "frankfurt",
    "file": "Skyline Frankfurt am Main 2015.jpg",
    "artist": "Christian Wolf (www.c-w-design.de)",
    "license": "CC BY-SA 3.0 de",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/de/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Skyline_Frankfurt_am_Main_2015.jpg"
  },
  {
    "id": "barcelona",
    "file": "Barcelona view from Montjuïc hill.jpg",
    "artist": "Kallerna",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Barcelona_view_from_Montju%C3%AFc_hill.jpg"
  },
  {
    "id": "valencia",
    "file": "El Hemisférico, Ciudad de las Artes y las Ciencias, Valencia, España, 2014-06-29, DD 71.JPG",
    "artist": "Diego Delso",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "source": "https://commons.wikimedia.org/wiki/File:El_Hemisf%C3%A9rico,_Ciudad_de_las_Artes_y_las_Ciencias,_Valencia,_Espa%C3%B1a,_2014-06-29,_DD_71.JPG"
  },
  {
    "id": "auckland",
    "file": "Auckland Skyline as seen from Devonport 20100128 3.jpg",
    "artist": "DXR",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Auckland_Skyline_as_seen_from_Devonport_20100128_3.jpg"
  },
  {
    "id": "wellington",
    "file": "Cityscape of Wellington.jpg",
    "artist": "Krzysztof Golik",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Cityscape_of_Wellington.jpg"
  },
  {
    "id": "christchurch",
    "file": "Town hall, Christchurch City, New Zealand.jpg",
    "artist": "Michal Klajban",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Town_hall,_Christchurch_City,_New_Zealand.jpg"
  },
  {
    "id": "miami",
    "file": "Miami, Florida skyline.jpg",
    "artist": "Wilfredor",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Miami,_Florida_skyline.jpg"
  },
  {
    "id": "orlando",
    "file": "Lake Eola and Orlando Skyline seen in 2024.jpg",
    "artist": "JER3L1337",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Lake_Eola_and_Orlando_Skyline_seen_in_2024.jpg"
  },
  {
    "id": "boston",
    "file": "Boston Public Garden lagoon and Back Bay skyline, Boston, Massachusetts.jpg",
    "artist": "Christian David",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Boston_Public_Garden_lagoon_and_Back_Bay_skyline,_Boston,_Massachusetts.jpg"
  },
  {
    "id": "nagoya",
    "file": "Sakae Nagoya skyline (west) from Mirai Tower 2024-07-24.jpg",
    "artist": "LMP 2001",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Sakae_Nagoya_skyline_(west)_from_Mirai_Tower_2024-07-24.jpg"
  },
  {
    "id": "toquio",
    "file": "Tokyo Tower, Minato City.jpg",
    "artist": "David Kernan",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Tokyo_Tower,_Minato_City.jpg"
  },
  {
    "id": "amsterda",
    "file": "Colorful canal houses at golden hour in Damrak avenue Amsterdam the Netherlands.jpg",
    "artist": "Basile Morin",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Colorful_canal_houses_at_golden_hour_in_Damrak_avenue_Amsterdam_the_Netherlands.jpg"
  },
  {
    "id": "roterda",
    "file": "Erasmusbrug, September 2019.jpg",
    "artist": "Martin Falbisoner",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Erasmusbrug,_September_2019.jpg"
  },
  {
    "id": "eindhoven",
    "file": "Vesteda Tower, Eindhoven (2024).jpg",
    "artist": "S. Perquin",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Vesteda_Tower,_Eindhoven_(2024).jpg"
  },
  {
    "id": "cork",
    "file": "Saint Fin Barre's Cathedral (Cork) 2016.jpg",
    "artist": "William Murphy",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Saint_Fin_Barre%27s_Cathedral_(Cork)_2016.jpg"
  },
  {
    "id": "madri",
    "file": "Madrid Gran Via Metropolis (28895530633).jpg",
    "artist": "Nan Palmero from San Antonio, TX, USA",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Madrid_Gran_Via_Metropolis_(28895530633).jpg"
  },
  {
    "id": "hamamatsu",
    "file": "Hamamatsu Castle, enkei-3.jpg",
    "artist": "Saigen Jiro",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Hamamatsu_Castle,_enkei-3.jpg"
  }
];

export const byId: Record<string, Destino> = Object.fromEntries(DESTINOS.map((d) => [d.id, d]));
