// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring')
const { exists } = require('fs')

// Server creation
// 


function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            console.log(parse(body))
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

function renderTodoPage(res, d) {
        axios.get("http://localhost:3000/tarefas")
            .then(response => {
                var tarefas = response.data
                // Render page with the student's list
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write(templates.todoPage(tarefas, d))
                res.end()
            })
            .catch(function(erro){
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>Não foi possível obter a lista de alunos... Erro: " + erro)
                res.end()
            })

}

function idExists(id, tarefas) {
    for (let i in tarefas) {
        var t = tarefas[i]
        if (t.id == id) 
            return true
    }
    return false
}

var alunosServer = http.createServer(function (req, res) {
// Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if(req.url == "/"){
                    renderTodoPage(res,d)
                }
                //// GET /alunos/:id --------------------------------------------------------------------
                //else if(/\/alunos\/(A|PG)[0-9]+$/i.test(req.url)){
                //    var idAluno = req.url.split("/")[2]
                //    axios.get("http://localhost:3000/alunos/" + idAluno)
                //        .then( response => {
                //            let a = response.data
                //            // Add code to render page with the student record
                //            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                //            res.end(templates.studentPage(a,d))
                //        })
                //}
                //// GET /alunos/registo --------------------------------------------------------------------
                //else if(req.url == "/alunos/registo"){
                //    // Add code to render page with the student form
                //    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                //    // res.write(studentFormPage(d))
                //    res.end(templates.personForm(d))
                //}
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            case "POST":
                if(req.url == '/'){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    collectRequestBodyData(req, result => {
                        if (result) {
                                axios.get('http://localhost:3000/tarefas')
                                .then (resp => {
                                    var tarefas = resp.data
                                    if (idExists(result.id,tarefas)) {
                                        console.log(result)
                                        console.log("Result ID " + result.id)
                                        axios.put('http://localhost:3000/tarefas/' + result.id, result)
                                        .then( resp => {
                                            renderTodoPage(res,d)
                                        })
                                    }
                                    else {
                                        axios.post('http://localhost:3000/tarefas', result)
                                        .then( resp => {
                                            renderTodoPage(res,d)
                                        })
                                    }
                                })
                                .catch( err => {
                                    console.log("Erro: " + err)
                                })
                        }
                    })
                }
                //else if (req.url == '/alunos/registo') {
                //    collectRequestBodyData(req, result => {
                //        if (result) {
                //            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                //            res.write(templates.personPostConfirmPage(result, d))
                //            axios.post('http://localhost:3000/alunos', result)
                //                .then( resp => {
                //                    console.log(resp.status)
                //                })
                //                .catch( err => {
                //                    console.log("Erro: " + err)
                //                })
                //        }
                //    })
                //}
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



