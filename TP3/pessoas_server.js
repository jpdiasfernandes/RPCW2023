// pessoas_server.js
// RPCW2023: 2023-02-27
// by jcr

var http = require('http')
var url = require('url')
var axios = require('axios')
var mypages = require('./mypages')
var groupBy = require('json-groupby')
var fs = require('fs')

http.createServer(function(req, res){
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    var dicURL = url.parse(req.url, true)
    console.log(dicURL.pathname.substring(0,2))

    if(dicURL.pathname == "/" ){
        axios.get("http://localhost:3000/pessoas")
            .then( function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoas))
            })
            .catch( erro => {
                console.log("Erro axios: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO axios: " + erro)
            })
    }
    else if(dicURL.pathname == "/ordenada" ){
        axios.get("http://localhost:3000/pessoas?_sort=nome&order=asc")
            .then( function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoas))
            })
            .catch( erro => {
                console.log("Erro axios: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO axios: " + erro)
            })
    }
    else if(dicURL.pathname == "/ordenadav2" ){
        axios.get("http://localhost:3000/pessoas")
            .then( function(resp){
                var pessoas = resp.data
                let pessoasOrdenadas = pessoas.sort(
                    (p1, p2) => (p1.nome < p2.nome) ? -1 : 1
                    // function(p1,p2){ return (p1.nome < p2.nome) ? -1 : 1 }
                )
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoasOrdenadas))
            })
            .catch( erro => {
                console.log("Erro axios: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO axios: " + erro)
            })
    }
    else if(dicURL.pathname == "/w3.css"){
        fs.readFile('w3.css', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            if(err){
                console.log("Erro na leitura da stylesheet.")
                res.write("Erro: " + err)
            }
            else
                res.write(data)
            res.end()
        })
    }
    else if (dicURL.pathname.substring(0,2) == "/p") {
        var id = dicURL.pathname.substring(1) 
        var link = "http://localhost:3000/pessoas?id=" + id
        console.log(link)
        axios.get(link)
            .then( function(resp) {
                var pessoa = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoaPage(pessoa))
            })
            .catch( erro => {
                console.log("Erro axios: " + erro)
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO axios: " + erro)
            })
    }
    else if (dicURL.pathname == "/dist_sexo") {
        var link = "http://localhost:3000/pessoas?sexo=" 

        console.log(dicURL.search)
        if (dicURL.search == null) {
            var link = "http://localhost:3000/pessoas?sexo=" 
            var fem = link + "feminino"
            var masc = link + "masculino"
            const femPromise = axios.get(fem)
            const mascPromise = axios.get(masc)
    
            Promise.all([mascPromise, femPromise])
                .then( resp => {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(mypages.sexInfoPage(resp[0].data.length, resp[1].data.length))
                })
                .catch( err => {
                    console.log("Erro axios: " + err)
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end("ERRO axios: " + err)
                })
               
        }
        else {
            sex = dicURL.query.sexo
            link += sex    
            console.log(link)
            axios.get(link)
                .then( function(resp){
                    var pessoas = resp.data
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(mypages.pessoasPage(pessoas))
                })
                .catch( erro => {
                    console.log("Erro axios: " + erro)
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end("ERRO axios: " + erro)
                })
        }
    }
    else if (dicURL.pathname == "/dist_desp") {

        var link = "http://localhost:3000/pessoas" 
        if (dicURL.search == null) {

            axios.get(link)
            .then( function(resp){
                var pessoas = resp.data
                var group = groupBy(pessoas, ['desportos'], ['id'])

                var list = []
                for (desp in group) {
                    list.push([desp, group[desp].id.length]) 
                }
                
                list.sort( function(a,b) {
                    return b[1] - a[1]
                })
                
                console.log(list)
                
                
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.desportoPage(list))
            })
            .catch( erro => {
                console.log("Erro axios: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO axios: " + erro)
            })

        }
        else {
            desp = dicURL.query.desporto
            axios.get(link)
                .then( function(resp){
                    var pessoas = resp.data
                    var group = groupBy(pessoas, ['desportos'])
                    var desp_dic = group[desp]
                    console.log(desp_dic) 
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(mypages.pessoasPage(desp_dic))
                })
                .catch( erro => {
                    console.log("Erro axios: " + erro)
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end("ERRO axios: " + erro)
                })
        }


    }
    else if (dicURL.pathname == "/top_prof") {
        var link = "http://localhost:3000/pessoas" 
        if (dicURL.search == null) {
            axios.get(link)
            .then( function(resp){
                var pessoas = resp.data
                var group = groupBy(pessoas, ['profissao'], ['id'])


                console.log(group)
                var list = []
                for (prof in group) {
                    list.push([prof, group[prof].id.length]) 
                }
                
                list.sort( function(a,b) {
                    return b[1] - a[1]
                })
                
                list = list.slice(0,10)
                console.log(list)
                
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.profPage(list))
            })
            .catch( erro => {
                console.log("Erro axios: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO axios: " + erro)
            })

        }
        else {
            prof = dicURL.query.prof
            axios.get(link)
                .then( function(resp){
                    var pessoas = resp.data
                    var group = groupBy(pessoas, ['profissao'])
                    var prof_dic = group[prof]
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(mypages.pessoasPage(prof_dic))
                })
                .catch( erro => {
                    console.log("Erro axios: " + erro)
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end("ERRO axios: " + erro)
                })
        }

       
    }

    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end("Erro: Operação não suportada")
    }
}).listen(6201)

console.log("Servidor à escuta na porta 7777...")