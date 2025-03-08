const metaForm = document.getElementById('metaForm');
const listaMetas = document.getElementById('metas');

// Função para adicionar uma nova meta
metaForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nomeMeta = document.getElementById('nomeMeta').value;
    const valorMeta = parseFloat(document.getElementById('valorMeta').value);
    const valorAtual = parseFloat(document.getElementById('valorAtual').value);

    // Cria um objeto para a nova meta
    const novaMeta = {
        id: Date.now(), // Gera um ID único
        nome: nomeMeta,
        valorMeta: valorMeta,
        valorAtual: valorAtual
    };

    // Cria o elemento HTML para a nova meta
    const novaMetaItem = document.createElement('li');
    novaMetaItem.className = 'list-group-item';
    novaMetaItem.dataset.id = novaMeta.id; // Armazena o ID da meta
    novaMetaItem.innerHTML = `
        <strong>${novaMeta.nome}</strong><br>
        Valor da Meta: R$ ${novaMeta.valorMeta.toFixed(2)}<br>
        Valor Atual: R$ ${novaMeta.valorAtual.toFixed(2)}<br>
        <div class="progresso">
            <div class="barra" style="width: ${(novaMeta.valorAtual / novaMeta.valorMeta) * 100}%;">
                ${((novaMeta.valorAtual / novaMeta.valorMeta) * 100).toFixed(2)}%
            </div>
        </div>
        <button class="btn btn-warning btn-sm mt-2" onclick="abrirModalEdicao(${novaMeta.id})">Editar</button>
    `;

    // Adiciona a nova meta à lista
    listaMetas.appendChild(novaMetaItem);

    // Limpa o formulário
    metaForm.reset();
});

// Função para abrir o modal de edição
function abrirModalEdicao(id) {
    // Encontra a meta na lista pelo ID
    const metaItem = document.querySelector(`#metas li[data-id="${id}"]`);
    const nome = metaItem.querySelector('strong').textContent;
    const valorMeta = parseFloat(metaItem.querySelectorAll('br')[0].nextSibling.textContent.replace('Valor da Meta: R$ ', ''));
    const valorAtual = parseFloat(metaItem.querySelectorAll('br')[1].nextSibling.textContent.replace('Valor Atual: R$ ', ''));

    // Preenche o modal com os dados da meta
    document.getElementById('editarMetaId').value = id;
    document.getElementById('editarNomeMeta').value = nome;
    document.getElementById('editarValorMeta').value = valorMeta;
    document.getElementById('editarValorAtual').value = valorAtual;

    // Abre o modal
    const modal = new bootstrap.Modal(document.getElementById('editarMetaModal'));
    modal.show();
}

// Função para salvar as alterações
document.getElementById('salvarEdicao').addEventListener('click', function () {
    // Captura os valores do modal
    const id = document.getElementById('editarMetaId').value;
    const nome = document.getElementById('editarNomeMeta').value;
    const valorMeta = parseFloat(document.getElementById('editarValorMeta').value);
    const valorAtual = parseFloat(document.getElementById('editarValorAtual').value);

    // Atualiza a meta na lista
    const metaItem = document.querySelector(`#metas li[data-id="${id}"]`);
    if (metaItem) {
        metaItem.innerHTML = `
            <strong>${nome}</strong><br>
            Valor da Meta: R$ ${valorMeta.toFixed(2)}<br>
            Valor Atual: R$ ${valorAtual.toFixed(2)}<br>
            <div class="progresso">
                <div class="barra" style="width: ${(valorAtual / valorMeta) * 100}%;">
                    ${((valorAtual / valorMeta) * 100).toFixed(2)}%
                </div>
            </div>
            <button class="btn btn-warning btn-sm mt-2" onclick="abrirModalEdicao(${id})">Editar</button>
        `;
    }

    // Fecha o modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editarMetaModal'));
    modal.hide();
});