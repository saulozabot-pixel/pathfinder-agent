# Demo Video Script — Pathfinder Agent
### Roteiro de gravação (fale em inglês, anotações em português pra você)

Duração alvo: **2:30 a 3:00 min**. Grave a tela (Loom, OBS, ou até o gravador do celular
apontado pro monitor funciona) e narre em inglês seguindo o texto abaixo. Não precisa
decorar — pode ler, mas tente soar natural, não robótico.

---

## 0:00 – 0:25 | O gancho pessoal (tela: você falando ou uma tela preta com texto)

**Fale:**
> "A few months ago, I was manually applying to H-2B seasonal jobs in the US — cook and
> kitchen positions. I'd search government job listings by hand, read each one, and write
> a custom cover letter for every single application. It took hours. It worked — I actually
> got hired. But it made me think: this whole process is exactly what an AI agent should
> be doing autonomously. So I built one."

*(Nota: isso é 100% verdade e é o seu maior trunfo — conte com confiança.)*

---

## 0:25 – 0:45 | Apresentando o projeto (tela: página inicial do Pathfinder Agent)

Abra **https://pathfinder-agent.vercel.app** e mostre a tela inicial.

**Fale:**
> "This is Pathfinder Agent. It's an autonomous agent, built with Gemini 2.5 Flash, that
> does three things on its own: it searches real, live job postings filed with the US
> Department of Labor, it evaluates how well a candidate genuinely fits each one, and it
> drafts a tailored, honest cover letter — no fabricated qualifications, ever."

*Aponte o mouse pro card "Perfil do candidato" enquanto fala.*

> "This candidate profile is real — it's mine. Nine years of kitchen experience, including
> work as a sushi chef."

---

## 0:45 – 1:05 | Explicando a fonte de dados real (destaque técnico importante)

**Fale:**
> "The job data isn't scraped or simulated. It comes directly from the DOL's public H-2B
> case data feed — the same registry US employers use to file real, legally binding job
> orders. The agent pulls several days of filings, because each day's file is a
> non-cumulative snapshot, and filters for kitchen-related roles."

---

## 1:05 – 1:15 | Rodando o agente ao vivo (o momento principal)

Clique em **"Executar agente"**.

**Fale enquanto os passos aparecem na tela:**
> "Let's run it live. First it searches the DOL feed. Then it scores each job against the
> candidate profile. Then it drafts a cover letter for every match — all autonomously,
> no human in the loop."

*(Deixe rodar — leva uns 30-50 segundos. Pode cortar esse tempo no vídeo/editar,
mas mostre pelo menos alguns segundos reais do indicador de progresso.)*

---

## 1:55 – 2:35 | Mostrando os resultados (o clímax)

Quando os resultados aparecerem, role a tela mostrando os cards.

**Fale:**
> "Here are the results, ranked by fit score. This one — Line Cook at a Vermont resort —
> scored 95. The reasoning references the candidate's real, specific experience: grill
> stations, multi-station coordination, food safety."

Clique em **"Ver carta gerada"** num resultado com nota alta.

> "And here's the generated cover letter — personalized, references the exact case number
> and employer, and grounded only in real experience."

Role até o resultado com **nota baixa** (a vaga de culinária Sichuan).

> "This is the part I actually care about most: the agent doesn't inflate scores to please
> anyone. This job requires Sichuan cuisine specialization the candidate doesn't have — and
> the agent says so, honestly, at a score of 15. An agent that's useful has to be honest,
> not just persuasive."

---

## 2:35 – 2:55 | Rastreador + fechamento

Mostre o checkbox **"Candidatura enviada"**.

**Fale:**
> "Each application can be tracked as sent, so the whole search-to-submission pipeline is
> covered in one place."

**Fechamento:**
> "I built this because I lived the problem it solves. It's live right now at
> pathfinder-agent.vercel.app, built with Next.js, the Gemini API, and real US government
> labor data. Thanks for watching."

---

## Checklist antes de gravar

- [ ] Abrir a aba em modo anônimo/limpo (sem extensões visíveis, sem abas irrelevantes)
- [ ] Zoom do navegador em 100%, janela maximizada
- [ ] Testar o "Executar agente" uma vez antes de gravar pra garantir que não vai dar erro de rate limit da API
- [ ] Gravar em local silencioso, falar devagar e claro (você não precisa de sotaque perfeito — clareza importa mais)
- [ ] Se errar, não pare a gravação — refaça a frase e corte depois, ou grave de novo do zero (é mais rápido que editar)

## Onde subir o vídeo

O Devpost geralmente pede um link de vídeo (YouTube, Vimeo ou similar), não upload direto.
Suba como **"Não listado"** no YouTube (não precisa ser público) e cole o link no campo do
Devpost.
