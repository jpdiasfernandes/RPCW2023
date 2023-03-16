const axios = require('axios')

module.exports.list = () => {
    return axios.get("http://localhost:3000/tarefas")
        .then(resp => {
            return resp.data // tarefas
        })
        .catch(err => {
            return err
        })
}

module.exports.addTask = (t) => {
    return axios.post("http://localhost:3000/tarefas", t)
    .then(resp => {
        return resp.data // tarefa
    })
    .catch(err => {
        return err
    })
}

module.exports.updateTask = (t) => {
    console.log(t)
    return axios.put("http://localhost:3000/tarefas/" + t.id, t)
    .then(resp => {
        return resp.data // tarefa
    })
    .catch(err => {
        return err
    })
}

module.exports.deleteTask = (req) => {
    console.log(req)
    return axios.delete("http://localhost:3000/tarefas/" + req.id)
    .then(resp => {
        return resp.data // tarefa
    })
    .catch(err => {
        return err
    })
}

