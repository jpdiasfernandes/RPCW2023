#!/usr/bin/env python3

import json

f = open("../../datasets/mapa.json") #Modo leitura textual
data = json.load(f)
cidades = data["cidades"]
cidades.sort(key=lambda x: x["nome"])
ligacoes = data["ligações"]

cidade_map = {}

pagweb = """
<!DOCTYPE html>
<html>
    <head>
        <title> Mapa virtual </title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1> Mapa virtual </h1>
        <table>
            <tr>
                <td width="30%" valign="top">
                    <h3>Índice</h3>
                    <a name="indice"/>
                    <!-- Lista com índice -->
                    <ul>
"""

for cidade in cidades:
    cidade_map[cidade['id']] = cidade['nome']
    pagweb += f"""
        <li>
            <a href="#{cidade['id']}">{cidade['nome']}</a>
        </li>
    """

pagweb += """
                    </ul>

                </td>

                <td width="70%">
"""

for cidade in cidades:
    pagweb += f"""
                    <a name="{cidade['id']}" />
                    <h3> {cidade['nome']}</h3>
                    <p><b>população: </b> {cidade['população']}</p>
                    <p><b>descrição: </b> {cidade['descrição']} </p>
                    <p><b>distrito: </b> {cidade['distrito']} </p>
    """
    #<address>[<a href="#indice"> Voltar ao índice </a>] </adress>
    pagweb += f"""
                    <p><b>Ligações Possíveis: </b></p>
                    <ul>
    """
    for ligacao in ligacoes:
        if ligacao['origem'] == cidade['id']:
            dest_nome = cidade_map[ligacao['destino']]
            pagweb += f"""
                <li>
                    <a href="#{ligacao['destino']}">Cidade : {dest_nome}. Distância: {ligacao['distância']}km </a>
                </li>

            """

    pagweb += f"""
                    </ul>
                    <address>[<a href="#indice"> Voltar ao índice </a>] </adress>
                    <center>
                        <hr width="80%"/>
                    </center>
    """


pagweb += """
               </td> <!-- Não era preciso por os 70 porque ele ia alocar de forma automática -->

            </tr>
        </table>
    </body>
</html>
"""

print(pagweb)
