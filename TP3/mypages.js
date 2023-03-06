exports.pessoasPage = function (lista) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>About People...</title>
            <style>
                a:link {
                    text-decoration: none;
                  }
                  
                  a:visited {
                    text-decoration: none;
                  }
                  
                  a:hover {
                    text-decoration: underline;
                  }
                  
                  a:active {
                    text-decoration: underline;
                  }        
              </style>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Lista de Pessoas</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th>
                        </tr>
                `
    for (let i = 0; i < lista.length; i++) {
      pagHTML += `
                <tr>
                    <td><a href="/${lista[i].id}">${lista[i].id}</a></td><td>${lista[i].nome}</td><td>${lista[i].idade}</td>
                    <td>${lista[i].sexo}</td><td>${lista[i].morada.cidade}</td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated in RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.pessoaPage = function (pessoa_arg) {
    var pessoa = pessoa_arg[0]
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>About ${pessoa.nome}</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1> Informação sobre ${pessoa.nome}</h1>
                </header>
        
                <div class="w3-container">
                    <h1> ${pessoa.nome} </h1>
                    <h3> Idade: ${pessoa.idade} </h3>
                    <h3> Sexo: ${pessoa.sexo} </h3>
                    <h3> Morada: </h3>
                    <ul> 
                        <li> Cidade: ${pessoa.morada["cidade"]} </li>
                        <li> Distrito: ${pessoa.morada["distrito"]} </li>
                    </ul>
        `
        if (pessoa.BI) {
            pagHTML += `
                <h3> BI : ${pessoa.BI} </h3>
            `
        }
        if (pessoa.CC) {
            pagHTML += `
                <h3> CC : ${pessoa.CC} </h3>
            `

        }
    
        pagHTML += `
                    <h3> ID: ${pessoa.id} </h3>
        `
        if (pessoa.descrição) {
            pagHTML += `
                    <h3> Descrição: </h3>
                    <p> ${pessoa.descrição} </p>
            `
        }
    
        if (pessoa.profissao) {
            pagHTML += `
                    <h3> Profissao: ${pessoa.profissao} </h3>
            ` 

        }
    
        if (pessoa.partido_politico) {
            pagHTML  += `
                    <h3> Partido público: ${pessoa.partido_politico.party_name} (${pessoa.partido_politico.party_abbr})</h3>
            `
        }
    
        if (pessoa.religiao) {
            pagHTML += `
                    <h3> Religião: ${pessoa.religiao} </h3>
            ` 
        }
    
        if (pessoa.desportos) {
            pagHTML += `
                    <h3> Desportos: </h3>
                    <ul>
            `
 
            for (let desp in pessoa.desportos) {
                pagHTML += `
                        <li> ${pessoa.desportos[desp]} </li>
            `
            }
            pagHTML += `
                </ul>
            `
        }
    
        if (pessoa.animais) {
            
            pagHTML += `
                            <h3> Animais: </h3>
                            <ul>
            `
    
            for (let anim in pessoa.animais) {
                pagHTML += `
                                <li> ${pessoa.animais[anim]} </li>
                `
            }
            
            pagHTML += `
                    </ul>
            `
 
        }

        if (pessoa.figura_publica_pt) {
            pagHTML += `
                            <h3> Figuras Públicas: </h3>
                            <ul>
            `
    
            for (let fig in pessoa.figura_publica_pt) {
                pagHTML += `
                                <li> ${pessoa.figura_publica_pt[fig]} </li>
                `
            }
            
            pagHTML += `
                    </ul>
            `
            
        }
   
   
    pagHTML += `
                    </ul>
                    <h3> Random facts: </h3>
    `
        
    const atributos_gosta = {
        gosta_cimena : "de cinema",
        gosta_viajar : "de viajar",
        gosta_ler : "de ler",
        gosta_comer : "de comer",
        gosta_musica : "de música",
        gosta_animais_estimacao : "de animais de estimação",
        gosta_dancar : "de dançar"
    }
    
    const atributos = {
        fumador : "É fumador",
        acorda_cedo : "Acorda cedo"
    }
    
    const notAtributos = {
        fumador : "Não é fumador",
        acorda_cedo : "Não acorda cedo"
    }

    for (let atrib in pessoa.atributos) {
        pagHTML += `
                    <h3> `

        if (["gosta_cinema", "gosta_viajar", "gosta_ler", "gosta_musica", "gosta_comer", "gosta_animais_estimacao", "gosta_dancar"].includes(atrib)) {
            var tmp = atributos_gosta[atrib]
            console.log("Atrib " + atrib + " Temp var " + tmp)
            if (tmp) {
                if (pessoa.atributos[atrib] == false) {
                    pagHTML += "Não gosta "
                } else {
                    pagHTML += "Gosta "
                }
                pagHTML += `${tmp} `
            }
        }
        else if (["fumador", "acorda_cedo"].includes(atrib)) {
            var tmp
            if (pessoa.atributos[atrib] == false) 
                tmp = notAtributos[atrib]
            else 
                tmp = atributos[atrib] 
            
            pagHTML += `${tmp} `
        }
        else if (atrib == "comida_favorita") {
            pagHTML += `Gosta de comida ${pessoa.atributos[atrib]} `
        }

        pagHTML += `
                    </h3> `
    }
    
    pagHTML += `
            </div>
                <footer class="w3-container w3-blue">
                   <h5>Generated in RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
    ` 
    
    return pagHTML
}

exports.sexInfoPage = function (masc, fem) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Distribuição por sexo </title>
            <style>
                a:link {
                    text-decoration: none;
                  }
                  
                  a:visited {
                    text-decoration: none;
                  }
                  
                  a:hover {
                    text-decoration: underline;
                  }
                  
                  a:active {
                    text-decoration: underline;
                  }        
              </style>

        </head>
        <body>
            
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-teal">
                    <h1> Distribuição por sexo </h1>
                </header>
                <div class="w3-cell-row">
                    <div class="w3-container w3-cell w3-padding-32">
                        <div class="w3-container w3-teal">
                            <h3> Número de pessoas do sexo feminino </h3>
                        </div>
                        <div class="w3-container w3-light-green w3-center">
                            <a href="/dist_sexo?sexo=feminino"><h3>${fem}</h3></a>
                        </div>
                    </div>
                    <div class="w3-container w3-cell w3-padding-32">
                        <div class="w3-container w3-teal">
                            <h3> Número de pessoas do sexo masculino </h3>
                        </div>
                        <div class="w3-container w3-light-green w3-center">
                            <a href="/dist_sexo?sexo=masculino"><h3>${masc}</h3></a>
                        </div>
                    </div>
                </div>
                <footer class="w3-container w3-blue">
                <h5>Generated in RPCW2023</h5>
                </footer>
        </div>
        </body>
        </html>
        `
        return pagHTML
}

exports.desportoPage = function (list) {
     var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Lista desportos ordem descendente </title>
            <style>
                a:link {
                    text-decoration: none;
                  }
                  
                  a:visited {
                    text-decoration: none;
                  }
                  
                  a:hover {
                    text-decoration: underline;
                  }
                  
                  a:active {
                    text-decoration: underline;
                  }        
              </style>

        </head>
        <body>
        <div class="w3-card-4 w3-margin w3-center">
                <header class="w3-container w3-teal">
                    <h1>Lista desportos ordem descendente </h1>
                </header>

                <div class="w3-container">
                    <ul class="w3-ul w3-border w3-center w3-hoverable" style="width:100%">
    `
    
    for (let elem in list) {
        console.log(elem)
        pagHTML += `
            <a href="/dist_desp?desporto=${list[elem][0]}"> <li> ${list[elem][0]} : ${list[elem][1]} participantes </li></a>
        `
    }
    
    pagHTML += `
                    </ul>
                </div>
                <footer class="w3-container w3-blue">
                <h5>Generated in RPCW2023</h5>                       
                </footer>                                
            </div>
        </body>
    </html>
        `
    return pagHTML
}

exports.profPage = function (list) {
     var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Lista Top 10 profissões </title>
            <style>
                a:link {
                    text-decoration: none;
                  }
                  
                  a:visited {
                    text-decoration: none;
                  }
                  
                  a:hover {
                    text-decoration: underline;
                  }
                  
                  a:active {
                    text-decoration: underline;
                  }        
              </style>

        </head>
        <body>
        <div class="w3-card-4 w3-margin w3-center">
                <header class="w3-container w3-teal">
                    <h1>Lista Top 10 profissões </h1>
                </header>

                <div class="w3-container">
                    <ul class="w3-ul w3-border w3-center w3-hoverable" style="width:100%">
    `
    
    for (let elem in list) {
        console.log(elem)
        pagHTML += `
            <a href="/top_prof?prof=${list[elem][0]}"> <li> ${list[elem][0]} : ${list[elem][1]} participantes </li></a>
        `
    }
    
    pagHTML += `
                    </ul>
                </div>
                <footer class="w3-container w3-blue">
                <h5>Generated in RPCW2023</h5>                       
                </footer>                                
            </div>
        </body>
    </html>
        `
    return pagHTML
}