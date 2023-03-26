var axios = require('axios')
var pessoa = require('../models/pessoa')
var pessoasModel =  pessoa.pessoasModel

// Student list
module.exports.list = () => {
    return pessoasModel.find()
            .sort({nome: 1})
            .then(resp => {
                return resp
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getPessoa = id => {
    return pessoasModel.findOne({id : id})
            .then(pessoa => {
                return pessoa
            })
            .catch(err => {
                return erro
            })
}

module.exports.addPessoa = a => {
    return pessoasModel.create(a)
            .then( pessoa => {
                return pessoa
            })
            .catch( err => {
                return err
            })
}

module.exports.updatePessoa = a => {
    return pessoasModel.updateOne({id:a.id}, a)
            .then( pessoa => {
                return pessoasModel.findOne({id:a.id}).then(resp => {return resp})
            })
            .catch( err => {
                return err
            })
}


module.exports.deletePessoa = id => {
    return pessoasModel.deleteOne({id:id})
            .then( pessoa => {
                return pessoasModel.findOne({id:a.id}).then(resp => {return resp})
            })
            .catch( err => {
                return err
            })
}