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
        return resp.data // tarefas
    })
    .catch(err => {
        return err
    })
}