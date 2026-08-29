# Demo Video Script — Pathfinder Agent
### Roteiro de gravação (fale em inglês, anotações em português pra você)

Duração alvo: **até 4 minutos** (limite oficial do hackathon). Grave a tela (Loom, OBS, ou
até o gravador do celular apontado pro monitor funciona) e narre em inglês seguindo o
texto abaixo. Não precisa decorar — pode ler, mas tente soar natural, não robótico.

**⚠️ Regras oficiais do vídeo (li na checklist final do Devpost) — não pule isso:**
- O vídeo tem que ficar **PÚBLICO** no YouTube ou Vimeo — **não pode ser "não listado" nem privado**.
- Precisa mostrar o agente **realmente funcionando** (não só descrever).
- Precisa mostrar **prova de que o backend roda no Google Cloud** — no nosso caso, o console
  do Firestore com dados reais sendo gravados. Isso é obrigatório pra elegibilidade, não opcional.
- Suba com antecedência — o processamento do YouTube pode levar horas antes do link funcionar
  no Devpost.

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

## 0:25 – 0:50 | Apresentando o projeto (tela: página inicial do Pathfinder Agent)

Abra **https://pathfinder-agent.vercel.app** e mostre a tela inicial.

**Fale:**
> "This is Pathfinder Agent. It's an autonomous agent, built with Gemini 3.5 Flash through
> Google's GenAI SDK, that does three things on its own: it searches real, live job
> postings filed with the US Department of Labor, it evaluates how well a candidate
> genuinely fits each one, and it drafts a tailored, honest cover letter — no fabricated
> qualifications, ever."

*Aponte o mouse pro card "Perfil do candidato" enquanto fala.*

> "This candidate profile is real — it's mine. Nine years of kitchen experience, including
> work as a sushi chef."

---

## 0:50 – 1:10 | Explicando a fonte de dados real (destaque técnico importante)

**Fale:**
> "The job data isn't scraped or simulated. It comes directly from the DOL's public H-2B
> case data feed — the same registry US employers use to file real, legally binding job
> orders. The agent pulls several days of filings, because each day's file is a
> non-cumulative snapshot, and filters for kitchen-related roles."

---

## 1:10 – 1:20 | Rodando o agente ao vivo (o momento principal)

Clique em **"Executar agente"**.

**Fale enquanto os passos aparecem na tela:**
> "Let's run it live. First it searches the DOL feed. Then Gemini scores each job against
> the candidate profile. Then it drafts a cover letter for every match — all autonomously,
> no human in the loop."

*(Deixe rodar — leva uns 30-50 segundos. Pode cortar esse tempo no vídeo/editar,
mas mostre pelo menos alguns segundos reais do indicador de progresso.)*

---

## 2:00 – 2:40 | Mostrando os resultados (o clímax)

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

## 2:40 – 3:00 | Rastreador de candidaturas

Clique no checkbox **"Candidatura enviada"** em um dos resultados.

**Fale:**
> "Each application can be tracked as sent, so the whole search-to-submission pipeline is
> covered in one place."

---

## 3:00 – 3:35 | PROVA DO GOOGLE CLOUD (obrigatório — não pule)

Troque de aba pro **Google Cloud Console**, na tela do Firestore
(console.cloud.google.com/firestore/databases/-default-/data, projeto `gen-lang-client-0913222793`)
mostrando a coleção `applications` com o documento que você acabou de marcar como enviado
aparecendo lá em tempo real (dê um refresh se precisar).

**Fale:**
> "This isn't just local state — application tracking is persisted server-side in Cloud
> Firestore. You can see it right here in the Google Cloud console: the case I just marked
> as applied is written to Firestore in real time."

*(Esse trecho é exigência explícita das regras do hackathon — sem ele o projeto fica
desqualificado, então não corte essa parte na edição.)*

---

## 3:35 – 4:00 | Fechamento

**Fale:**
> "I built this because I lived the problem it solves. It's live right now at
> pathfinder-agent.vercel.app, built with Next.js, Gemini 3.5 Flash, and Cloud Firestore.
> Thanks for watching."

---

## Checklist antes de gravar

- [ ] Abrir a aba em modo anônimo/limpo (sem extensões visíveis, sem abas irrelevantes)
- [ ] Zoom do navegador em 100%, janela maximizada
- [ ] Testar o "Executar agente" uma vez antes de gravar pra garantir que não vai dar erro de rate limit da API
- [ ] Ter uma aba já aberta e logada em console.cloud.google.com/firestore no projeto `gen-lang-client-0913222793`, pronta pra trocar de tela na hora H
- [ ] Gravar em local silencioso, falar devagar e claro (você não precisa de sotaque perfeito — clareza importa mais)
- [ ] Se errar, não pare a gravação — refaça a frase e corte depois, ou grave de novo do zero (é mais rápido que editar)

## Onde subir o vídeo

O Devpost pede um link de vídeo do YouTube ou Vimeo. **Precisa ser PÚBLICO** (não "não
listado", não privado) — isso está explícito na checklist final de submissão. Suba com
antecedência, porque o processamento pode levar horas antes do link funcionar
corretamente no formulário do Devpost. Cole o link público na etapa "Submit" da
submissão assim que estiver pronto.
