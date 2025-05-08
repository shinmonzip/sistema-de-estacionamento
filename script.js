// Configurações do estacionamento
const VALOR_FIXO_ATE_3_HORAS = 10; // Valor em R$ para até 3 horas
const VALOR_HORA_ADICIONAL = 5;    // Valor em R$ por hora adicional
const TEMPO_TOLERANCIA = 15;       // Tolerância em minutos

// Lista de estados permitidos para validação de placas
let ESTADOS_PERMITIDOS = ['SP', 'RJ', 'MG'];

// Banco de dados de prefixos de placas e seus estados
const prefixosEstados = {
    // São Paulo
    'AAA': 'SP', 'AAB': 'SP', 'AAC': 'SP', 'AAD': 'SP', 'AAE': 'SP',
    'AAF': 'SP', 'AAG': 'SP', 'AAH': 'SP', 'AAI': 'SP', 'AAJ': 'SP',
    'AKL': 'SP', 'AKM': 'SP', 'AKN': 'SP', 'AKO': 'SP', 'AKP': 'SP',
    'AKQ': 'SP', 'AKR': 'SP', 'AKS': 'SP', 'AKT': 'SP', 'AKU': 'SP',
    'BFA': 'SP', 'BFB': 'SP', 'BFC': 'SP', 'BFD': 'SP', 'BFE': 'SP',
    
    // Rio de Janeiro
    'KVE': 'RJ', 'KVF': 'RJ', 'KVG': 'RJ', 'KVH': 'RJ', 'KVI': 'RJ',
    'KVJ': 'RJ', 'KVK': 'RJ', 'KVL': 'RJ', 'KVM': 'RJ', 'KVN': 'RJ',
    'LUI': 'RJ', 'LUJ': 'RJ', 'LUK': 'RJ', 'LUL': 'RJ', 'LUM': 'RJ',
    'LUN': 'RJ', 'LUO': 'RJ', 'LUP': 'RJ', 'LUQ': 'RJ', 'LUR': 'RJ',
    
    // Minas Gerais
    'GKJ': 'MG', 'GKK': 'MG', 'GKL': 'MG', 'GKM': 'MG', 'GKN': 'MG',
    'GKO': 'MG', 'GKP': 'MG', 'GKQ': 'MG', 'GKR': 'MG', 'GKS': 'MG',
    'HMG': 'MG', 'HMH': 'MG', 'HMI': 'MG', 'HMJ': 'MG', 'HMK': 'MG',
    'HML': 'MG', 'HMM': 'MG', 'HMN': 'MG', 'HMO': 'MG', 'HMP': 'MG',
    
};

// Estado do estacionamento
let estacionamento = [];
let veiculosEstacionados = {};

// Elementos DOM
document.addEventListener('DOMContentLoaded', () => {
    // Inicialização do estacionamento
    const btnCriarEstacionamento = document.getElementById('criarEstacionamento');
    btnCriarEstacionamento.addEventListener('click', criarEstacionamento);
    
    // Formulário de entrada
    const formEntrada = document.getElementById('entradaForm');
    formEntrada.addEventListener('submit', registrarEntrada);
    
    // Formulário de saída
    const formSaida = document.getElementById('saidaForm');
    formSaida.addEventListener('submit', registrarSaida);
    
    // Inicializar estacionamento com tamanho padrão
    criarEstacionamento();
});

// Função para criar o estacionamento com base nas dimensões especificadas
function criarEstacionamento() {
    const linhas = parseInt(document.getElementById('linhas').value);
    const colunas = parseInt(document.getElementById('colunas').value);
    
    // Validar dimensões
    if (isNaN(linhas) || isNaN(colunas) || linhas <= 0 || colunas <= 0) {
        exibirErro('Dimensões inválidas para o estacionamento');
        return;
    }
    
    // Inicializar matriz de estacionamento
    estacionamento = Array(linhas).fill().map(() => Array(colunas).fill(null));
    
    // Limpar veículos estacionados
    veiculosEstacionados = {};
    
    // Atualizar visualização
    atualizarVisualizacaoEstacionamento();
}

// Função para atualizar a visualização do estacionamento
function atualizarVisualizacaoEstacionamento() {
    const container = document.getElementById('estacionamento');
    container.innerHTML = '';
    
    // Configurar grid
    container.style.gridTemplateColumns = `repeat(${estacionamento[0].length}, 1fr)`;
    
    // Criar elementos para cada vaga
    estacionamento.forEach((linha, i) => {
        linha.forEach((vaga, j) => {
            const vagaEl = document.createElement('div');
            vagaEl.classList.add('vaga');
            
            if (vaga === null) {
                vagaEl.classList.add('vaga-livre');
                vagaEl.innerHTML = `<div class="vaga-texto">Livre<br>${i+1}-${j+1}</div>`;
            } else {
                vagaEl.classList.add('vaga-ocupada');
                vagaEl.innerHTML = `<div class="vaga-texto">${vaga}<br>${i+1}-${j+1}</div>`;
            }
            
            container.appendChild(vagaEl);
        });
    });
}

// Função para registrar entrada de veículo
function registrarEntrada(event) {
    event.preventDefault();
    
    // Obter dados do formulário
    const placa = document.getElementById('placaEntrada').value.toUpperCase();
    const horaEntrada = document.getElementById('horaEntrada').value;
    
    // Validar placa
    if (!validarPlaca(placa)) {
        exibirErro('Placa inválida. O formato deve ser LLLNLNN (ex: ABC1D23)');
        return;
    }
    
    // Verificar se a placa pertence a um dos estados permitidos
    const estado = identificarEstadoPlaca(placa);
    if (!estado) {
        exibirErro('Não foi possível identificar o estado de origem da placa');
        return;
    }
    
    if (!ESTADOS_PERMITIDOS.includes(estado)) {
        exibirErro(`Placa fora da região coberta. Apenas veículos de ${ESTADOS_PERMITIDOS.join(', ')} são permitidos.`);
        return;
    }
    
    // Verificar se o veículo já está estacionado
    if (veiculosEstacionados[placa]) {
        exibirErro('Este veículo já está estacionado');
        return;
    }
    
    // Encontrar vaga livre
    const vaga = encontrarVagaLivre();
    if (!vaga) {
        exibirErro('Estacionamento lotado');
        return;
    }
    
    // Registrar veículo
    estacionamento[vaga.linha][vaga.coluna] = placa;
    veiculosEstacionados[placa] = {
        horaEntrada: horaEntrada,
        vaga: vaga
    };
    
    // Atualizar visualização
    atualizarVisualizacaoEstacionamento();
    limparFormulario('entradaForm');
    esconderErro();
}

// Função para registrar saída de veículo
function registrarSaida(event) {
    event.preventDefault();
    
    // Obter dados do formulário
    const placa = document.getElementById('placaSaida').value.toUpperCase();
    const horaSaida = document.getElementById('horaSaida').value;
    
    // Verificar se o veículo está estacionado
    if (!veiculosEstacionados[placa]) {
        exibirErro('Veículo não encontrado no estacionamento');
        return;
    }
    
    // Calcular tempo e valor
    const veiculo = veiculosEstacionados[placa];
    const resultado = calcularTempoEValor(veiculo.horaEntrada, horaSaida);
    
    // Liberar vaga
    const vaga = veiculo.vaga;
    estacionamento[vaga.linha][vaga.coluna] = null;
    delete veiculosEstacionados[placa];
    
    // Atualizar visualização
    atualizarVisualizacaoEstacionamento();
    
    // Exibir resultado
    document.getElementById('placaResultado').textContent = placa;
    document.getElementById('estadoOrigem').textContent = identificarEstadoPlaca(placa);
    document.getElementById('tempoPermanencia').textContent = `${resultado.horas}h ${resultado.minutos}min`;
    document.getElementById('valorPagar').textContent = `R$ ${resultado.valor.toFixed(2)}`;
    
    document.getElementById('resumo').classList.remove('hidden');
    document.getElementById('mensagemErro').classList.add('hidden');
    
    limparFormulario('saidaForm');
}

// Função para validar formato da placa
function validarPlaca(placa) {
    // Formato: LLLNLNN (3 letras, 1 número, 1 letra, 2 números)
    const regex = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
    return regex.test(placa);
}

// Função para identificar o estado de origem da placa
function identificarEstadoPlaca(placa) {
    if (!validarPlaca(placa)) return null;
    
    const prefixo = placa.substring(0, 3);
    return prefixosEstados[prefixo] || 'Desconhecido';
}

// Função para encontrar a primeira vaga livre
function encontrarVagaLivre() {
    for (let i = 0; i < estacionamento.length; i++) {
        for (let j = 0; j < estacionamento[i].length; j++) {
            if (estacionamento[i][j] === null) {
                return { linha: i, coluna: j };
            }
        }
    }
    return null; // Estacionamento lotado
}

// Função para calcular tempo de permanência e valor a pagar
function calcularTempoEValor(horaEntrada, horaSaida) {
    // Converter strings de hora para objetos Date
    const dataEntrada = new Date();
    const [horasEntrada, minutosEntrada] = horaEntrada.split(':').map(Number);
    dataEntrada.setHours(horasEntrada, minutosEntrada, 0);
    
    const dataSaida = new Date();
    const [horasSaida, minutosSaida] = horaSaida.split(':').map(Number);
    dataSaida.setHours(horasSaida, minutosSaida, 0);
    
    // Calcular diferença em minutos
    let diferencaMinutos = (dataSaida - dataEntrada) / (1000 * 60);
    
    // Ajustar caso a saída seja no dia seguinte
    if (diferencaMinutos < 0) {
        diferencaMinutos += 24 * 60; // Adicionar 24 horas em minutos
    }
    
    // Calcular horas e minutos
    const horasTotais = Math.floor(diferencaMinutos / 60);
    const minutosTotais = Math.floor(diferencaMinutos % 60);
    
    // Calcular valor a pagar
    let valor = 0;
    
    // Aplicar tolerância
    if (diferencaMinutos <= TEMPO_TOLERANCIA) {
        valor = 0;
    } 
    // Até 3 horas: valor fixo
    else if (diferencaMinutos <= 180) {
        valor = VALOR_FIXO_ATE_3_HORAS;
    } 
    // Mais de 3 horas: valor fixo + adicional por hora ou fração
    else {
        const horasAdicionais = Math.ceil((diferencaMinutos - 180) / 60);
        valor = VALOR_FIXO_ATE_3_HORAS + (horasAdicionais * VALOR_HORA_ADICIONAL);
    }
    
    return {
        horas: horasTotais,
        minutos: minutosTotais,
        valor: valor
    };
}

// Funções auxiliares
function exibirErro(mensagem) {
    const erro = document.getElementById('mensagemErro');
    erro.textContent = mensagem;
    erro.classList.remove('hidden');
    document.getElementById('resumo').classList.add('hidden');
}

function esconderErro() {
    document.getElementById('mensagemErro').classList.add('hidden');
}

function limparFormulario(formId) {
    document.getElementById(formId).reset();
} 