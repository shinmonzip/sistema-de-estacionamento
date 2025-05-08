
# 🅿️ Sistema de Gerenciamento de Estacionamento

Um sistema web interativo para controlar entradas, saídas e cobrança em um estacionamento, desenvolvido com **HTML, CSS e JavaScript (vanilla)**. Idealizado como solução prática para desafios de lógica computacional e estruturas discretas.

---

## ⚙️ Funcionalidades Principais

### 🧾 Validação de Ticket
- Registro da **hora de entrada e saída**
- Cálculo automático do **tempo de permanência**
- Cálculo do **valor a ser pago**, com base nas regras:
  - ⏱️ **15 minutos de tolerância** (sem cobrança)
  - 🕒 Até **3 horas**: valor fixo
  - ➕ Após 3 horas: cobrança **por hora adicional ou fração**

### 🅿️ Gerenciamento de Vagas
- Representação visual em **matriz bidimensional (m x n)**
- Alocação automática na **primeira vaga livre**
- Liberação automática da vaga ao registrar a saída
- Vagas livres e ocupadas destacadas com **cores diferentes**

### 🔍 Validação de Placas
- Suporte ao padrão **Mercosul**: `LLLNLNN` (ex: ABC1D23)
- Identificação do **estado de origem** pela placa
- Verificação se a placa pertence aos **3 estados sorteados** para o grupo

---

## 🖥️ Tecnologias Utilizadas
- HTML5
- CSS3
- JavaScript (Vanilla)

---

## 🚀 Como Usar

### 1. Configurar o Estacionamento
- Defina o número de **linhas e colunas**
- Clique em **"Criar Estacionamento"**

### 2. Registrar Entrada
- Informe a **placa do veículo** (formato válido)
- Defina a **hora de entrada**
- Clique em **"Registrar Entrada"**

### 3. Registrar Saída
- Informe a **placa do veículo**
- Defina a **hora de saída**
- O sistema exibirá:
  - Estado da placa
  - Tempo total de permanência
  - Valor total a pagar

---

## 🔧 Parâmetros Configuráveis (em `script.js`)
- `VALOR_FIXO_ATE_3_HORAS`: Valor base até 3h
- `VALOR_HORA_ADICIONAL`: Valor adicional por hora extra
- `TEMPO_TOLERANCIA`: Minutos de tolerância sem cobrança
- `ESTADOS_PERMITIDOS`: Lista com os **3 estados permitidos** (ex: `['RJ', 'SP', 'MG']`)

---

## 📦 Execução Local

1. Baixe ou clone o repositório
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Não é necessária nenhuma instalação ou dependência externa

---

## 📌 Observações

- O sistema trata situações como: estacionamento lotado, placas inválidas, duplicidade de entrada, entre outros.
- Todos os dados são manipulados em tempo real na interface — **sem backend**.

---

## 📘 Licença

Projeto desenvolvido com fins acadêmicos, voltado para a disciplina de **Resolução de Problemas (Matemática Discreta)**.
