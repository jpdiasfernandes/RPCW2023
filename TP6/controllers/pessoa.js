var axios = require('axios')
var pessoa = require('../models/pessoa')
var pessoasModel =  pessoa.pessoasModel

// Student list
module.exports.list = () => {
    return pessoasModel.find()
            .then(resp => {
                console.log(resp)
                return resp
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getPessoa = id => {
    return pessoasModel.findOne({id : id})
            .then( pessoa => {
                return pessoa
            })
            .catch( err => {
                console.log(err)
            })

}

module.exports.addPessoa = a => {
    var morada = {
        cidade: a.cidade,
        distrito: a.distrito
    }
    
    delete a.cidade
    delete a.distrito
    
    var partido = {
        party_abbr: a.party_abbr,
        party_name: a.party_name,
    }
    
    delete a.party_abbr
    delete a.party_name

    var atributos = {
        fumador:      (a.fumador === 'true'),
        gosta_cinema: (a.gosta_cinema === 'true'),
        gosta_viajar: (a.gosta_viajar === 'true'), 
        acorda_cedo:  (a.acorda_cedo ===  'true'),
        gosta_ler:    (a.gosta_ler   ===  'true'), 
        gosta_musica: (a.gosta_musica === 'true'),
        gosta_comer:  (a.gosta_comer ===  'true'), 
        gosta_animais_estimacao: (a.gosta_animais_estimacao === 'true'),
        gosta_dancar: (a.gosta_dancar === 'true'),
        comida_favorita: a.comida_favorita
    }
    
    delete a.fumador
    delete a.gosta_cinema
    delete a.gosta_viajar
    delete a.acorda_cedo
    delete a.gosta_ler
    delete a.gosta_musica
    delete a.gosta_comer
    delete a.gosta_animais_estimacao
    delete a.gosta_dancar
    delete a.comida_favorita
    
    a["morada"] = morada
    a["partido_politico"] = partido
    a["atributos"] = atributos

    console.log(a)
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