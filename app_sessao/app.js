const startSection = () => {
    fetch("http://127.0.0.1:5984/_session", {
        "method": "POST",
        "credentials": "include",
        "headers": {
            "user-agent": "vscode-restclient",
            "host": "127.0.0.1:5984",
            "content-type": "application/json"
        },
        "body": JSON.stringify({
            "username": "admin",
            "password": "couchdb"
        })
    })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
}

const getSectionInfo = () => {
    fetch("http://127.0.0.1:5984/_session", {
        credentials: "include"
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });
}

const getTaskList = () => {
    fetch("http://127.0.0.1:5984/tasks/_all_docs?include_doc=true", {
        credentials: "include"
    })
    .then(response => {
        console.log(response);
        return response.json()
    })
    .then(console.log)
    .catch(err => {
        console.error(err);
    });
}

const endSession = () => {
    fetch("http://127.0.0.1:5984/_session", {
    "method": "DELETE",
    "credentials": "include",
    "headers": {
        "user-agent": "vscode-restclient",
        "host": "127.0.0.1:5984"
    }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
}