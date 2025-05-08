# Sistema de Gerenciamento de Estacionamento

Este é um sistema simples de gerenciamento de estacionamento desenvolvido com JavaScript, HTML e CSS. O sistema permite registrar a entrada e saída de veículos, calcular o tempo de permanência e o valor a ser pago, além de gerenciar as vagas disponíveis.

## Funcionalidades

### Validação de Ticket

- Registro de horário de entrada e saída
- Cálculo automático do tempo de permanência
- Cálculo do valor a ser pago com base nas seguintes regras:
  - Tolerância de 15 minutos (não cobra se passar até esse tempo)
  - Até 3 horas: cobra um valor fixo
  - Após 3 horas: cobra valor adicional por hora ou fração

### Gerenciamento de Vagas

- Representação visual do estacionamento com matriz bidimensional
- Alocação automática na primeira vaga livre
- Liberação de vaga ao registrar saída
- Visualização de vagas livres e ocupadas com cores diferentes

### Validação de Placas

- Formato Mercosul: LLLNLNN (ex: ABC1D23)
- Identificação do estado de origem da placa
- Validação se a placa pertence a uma das regiões permitidas

## Como Usar

1. **Configuração do Estacionamento**

   - Defina o número de linhas e colunas
   - Clique em "Criar Estacionamento"

2. **Registrar Entrada**

   - Insira a placa do veículo no formato LLLNLNN
   - Informe a hora de entrada
   - Clique em "Registrar Entrada"

3. **Registrar Saída**
   - Insira a placa do veículo
   - Informe a hora de saída
   - Clique em "Registrar Saída"
   - O sistema exibirá o tempo de permanência e o valor a pagar

## Configuração

Você pode ajustar os seguintes parâmetros no arquivo `script.js`:

- `VALOR_FIXO_ATE_3_HORAS`: Valor em R$ para até 3 horas de permanência
- `VALOR_HORA_ADICIONAL`: Valor em R$ por hora adicional
- `TEMPO_TOLERANCIA`: Tolerância em minutos
- `ESTADOS_PERMITIDOS`: Lista de estados permitidos (substituir pelos 3 estados sorteados)

## Executando o Sistema

Basta abrir o arquivo `index.html` em qualquer navegador moderno.
