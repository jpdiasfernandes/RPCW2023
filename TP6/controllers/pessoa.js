var axios = require('axios')
var pessoa = require('../models/pessoa')
var pessoasModel =  pessoa.pessoasModel

var assign_bool = (value) => {
   if (!value) {
        return value
   } else {
        return value === 'true' 
   }

}
var refactor_body = (a) => {
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
        fumador:                assign_bool(a.fumador                ),
        gosta_cinema:           assign_bool(a.gosta_cinema           ),
        gosta_viajar:           assign_bool(a.gosta_viajar           ), 
        acorda_cedo:            assign_bool(a.acorda_cedo            ),
        gosta_ler:              assign_bool(a.gosta_ler              ), 
        gosta_musica:           assign_bool(a.gosta_musica           ),
        gosta_comer:            assign_bool(a.gosta_comer            ), 
        gosta_animais_estimacao:assign_bool(a.gosta_animais_estimacao),
        gosta_dancar:           assign_bool(a.gosta_dancar           ),
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

    return a
}
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
    return pessoasModel.create(refactor_body(a))
            .then( pessoa => {
                return pessoa
            })
            .catch( err => {
                return err
            })
}

module.exports.updatePessoa = a => {
    return pessoasModel.updateOne({id:a.id}, refactor_body(a))
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