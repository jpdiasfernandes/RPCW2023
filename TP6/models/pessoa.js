const { default: mongoose } = require("mongoose")
const dataJson = require('../pessoas.json');


var moradaSchema = new mongoose.Schema({
    cidade : String,
    distrito: String   
})

var partidoSchema = new mongoose.Schema({
    party_abbr: String,
    party_name: String
})

var atributoSchema = new mongoose.Schema({
    fumador: Boolean,
    gosta_cinema: Boolean,
    gosta_viajar: Boolean,
    acorda_cedo: Boolean,
    gosta_ler: Boolean,
    gosta_musica: Boolean,
    gosta_comer: Boolean,
    gosta_animais_estimacao: Boolean,
    gosta_dancar: Boolean,
    comida_favorita: String
})

var pessoaSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
    sexo: String,
    morada: moradaSchema,
    BI: String,
    CC: String,
    descrição: String,
    profissao: String,
    partido_politico: partidoSchema,
    religiao: String, 
    desportos: [ String ],
    animais: [ String ],
    figura_publica_pt: [ String ],
    marca_carro: String,
    destinos_favoritos: [ String ],
    atributos: atributoSchema,
    id: String
})


var pessoasModel 
module.exports.pessoasModel = mongoose.model('pessoas', pessoaSchema)


