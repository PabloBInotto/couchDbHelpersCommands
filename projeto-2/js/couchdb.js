const tarefas = [];

fetch("http://127.0.0.1:5984/tasks/_all_docs?include_docs=true", {
    "method": "GET",
    "headers": {
        "user-agent": "vscode-restclient",
        "host": "127.0.0.1:5984",
        "authorization": "Basic YWRtaW46Y291Y2hkYg=="
    }
})
    .then(response => {
        return response.json();
    })
    .then(json => {
        json.rows.forEach(tarefa => tarefas.push(tarefa.doc))
        criaTarefasHTML();
        console.log(tarefas);
    })
    .catch(err => {
        console.error(err);
    });

function incluirTaskOnDB(tarefa) {
    const bulk_doc = {
        docs: [tarefa]
    }
    fetch("http://127.0.0.1:5984/tasks/_bulk_docs", {
        "method": "POST",
        "headers": {
            "user-agent": "vscode-restclient",
            "host": "127.0.0.1:5984",
            "authorization": "Basic YWRtaW46Y291Y2hkYg==",
            "content-type": "application/json"
        },
        "body": JSON.stringify(bulk_doc)
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            tarefa._id = json[0].id;
            tarefa._rev = json[0].rev;
            criaLI(tarefa);
            console.log(tarefa);
        })
        .catch(err => {
            console.error(err);
        });
}

function atualizaTarefa(objetoLi) {
    objetoLi.tarefa.active = !objetoLi.tarefa.active;
    fetch(`http://127.0.0.1:5984/tasks/${objetoLi.tarefa._id}?rev=${objetoLi.tarefa._rev}`, {
        "method": "PUT",
        "headers": {
            "user-agent": "vscode-restclient",
            "host": "127.0.0.1:5984",
            "authorization": "Basic YWRtaW46Y291Y2hkYg==",
            "content-type": "application/json"
        },
        "body": JSON.stringify(objetoLi.tarefa)
    })
        .then(response => {
            return response.json();
        })
        .then(json => {
            objetoLi.classList.toggle("checked")
            objetoLi.tarefa._rev = json.rev
        })
        .catch(err => {
            console.error(err);
        });
}


function excluiTarefa(tarefa) {

    fetch(`http://127.0.0.1:5984/tasks/${tarefa._id}?rev=${tarefa._rev}`, {
      "method": "DELETE",
      "headers": {
        "user-agent": "vscode-restclient",
        "host": "127.0.0.1:5984",
        "authorization": "Basic YWRtaW46Y291Y2hkYg==",
        "content-type": "application/json"
      }
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
        
    })
    .catch(err => {
      console.error(err);
    });
}