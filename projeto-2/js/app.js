// let tarefas = [];

function criaTarefasHTML() {
  tarefas.map(function(tarefa) {
    criaLI(tarefa);
  });
}

function criaLI(tarefa) {
  const ul = document.getElementById('ulTarefas');
  const li = document.createElement('li');
  li.tarefa = tarefa;
  const t = document.createTextNode(tarefa.description);
  li.appendChild(t);
  li.onclick = concluirTarefa;
  ul.appendChild(li);

  if (!tarefa.active)
    li.classList.toggle('checked');
  
  const botao = criaBotaoExcluirTarefa();
  li.appendChild(botao);
}

function excluirTarefaHtml(event) {
  this.parentElement.style.display = 'none';
  event.stopPropagation();
  excluiTarefa(this.parentElement.tarefa);
}

function criaBotaoExcluirTarefa() {
  const span = document.createElement('SPAN');
  const i = document.createElement('I');
  i.innerHTML = '<i class="fas fa-trash close"></i>'
  span.appendChild(i);
  span.onclick = excluirTarefaHtml;
  return span;
}

function concluirTarefa() {
  // this.classList.toggle('checked');
  atualizaTarefa(this);
}

function novaTarefa() {
  const edtTarefa = document.getElementById('edtTarefa');
  const tarefaTXT = edtTarefa.value;

  if (tarefaTXT === '') {
    alert('A tarefa está vazia. Informe um valor!');
  } else {
    const tarefa = {
      description: tarefaTXT,
      active: true
    };
    // tarefas.push(tarefa);
    // criaTarefasHTML()
    incluirTaskOnDB(tarefa)
    edtTarefa.value = '';
  }
}
