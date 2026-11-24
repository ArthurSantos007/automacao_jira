# Integração CI/CD: Playwright + Xray Cloud + Jira Automation

Projeto de portfólio focado em **Engenharia de Qualidade (QA)** que demonstra uma pipeline completa de testes automatizados integrada à gestão de testes e abertura automática de defeitos.

---

## Problema Resolvido & Valor de Negócio
Em fluxos tradicionais, resultados de testes automatizados ficam isolados nos logs do CI/CD, exigindo que o QA analise falhas manualmente e abra cards de bug no Jira. 

Esta arquitetura elimina o trabalho manual e garante **rastreabilidade de ponta a ponta**:
1. **Execução Contínua:** A cada *push* no repositório, os testes E2E rodam automaticamente.
2. **Visibilidade Centralizada:** Os resultados (JUnit XML) são enviados via API REST para o **Xray**, criando e atualizando execuções de teste dentro do Jira.
3. **Resposta Rápida a Falhas (Quality Gate):** Caso algum teste falhe, uma regra do **Jira Automation** detecta a reprovação via JQL e abre imediatamente um card de **Bug** vinculado à execução de origem.

---

## Arquitetura do Fluxo

```text
[GitHub Push] 
      │
      ▼
[GitHub Actions] ──► Executa suíte Playwright (Gera relatório JUnit XML)
      │
      ▼
[API REST Xray]  ──► Autentica via Client ID/Secret e importa resultados
      │
      ▼
[Jira + Xray]    ──► Cria a Test Execution (2 PASS / 1 FAIL)
      │
      ▼
[Jira Automation]──► Detecta falha via JQL e abre Bug vinculado automaticamente
```

---

## Tecnologias & Ferramentas
* **Automação E2E:** [Playwright](https://playwright.dev) (TypeScript)
* **CI/CD:** GitHub Actions
* **Gestão de Testes:** Xray Test Management for Jira (API REST v2)
* **Automação de Fluxo:** Jira Automation & JQL (`testExecutionTests`)
* **Aplicação Alvo:** [SauceDemo](https://saucedemo.com)

---

## Cenários Automatizados
* **CT01:** Validar carregamento da página de login *(PASS)*
* **CT02:** Realizar login com sucesso utilizando usuário padrão *(PASS)*
* **CT03:** Validar mensagem de erro com usuário bloqueado *(FAIL proposital para validar a abertura automática de Bug no Jira)*

---

## Evidências de Funcionamento

### 1. Pipeline no GitHub Actions
> Execução dos testes no Chromium, geração do XML e envio para a API do Xray.
![Pipeline GitHub Actions](docs/01-github-actions.png)

### 2. Test Execution gerada no Xray
> Sincronização automática mostrando os cenários aprovados e o cenário reprovado.
![Test Execution Xray](docs/02-xray-execution.png)

### 3. Regra configurada no Jira Automation
> Gatilho na criação da Test Execution + Validação JQL de falhas + Ação de criação de Bug.
![Regra Jira Automation](docs/03-jira-automation.png)

### 4. Bug aberto e vinculado automaticamente
> Card de defeito gerado sem intervenção manual contendo a rastreabilidade da execução.
![Bug Criado Automaticamente](docs/04-bug-criado.png)

---