#!/usr/bin/env python3
from bs4 import BeautifulSoup
with open("arq.xml") as fp:
    soup = BeautifulSoup(fp, 'xml')

#print(soup)

count = 0
elems = soup.findAll('ARQELEM')
for elem in elems:
    count += 1
    arq_file = open("arqfiles/arq" + str(count) + ".xml", "w")
    arq_file.write(str(elem))
    arq_file.close()


pagweb = """
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>ArqueoSítios Index</title>
    </head>
    <body>
        <table width = "100%">
            <tr>
                <td>
                    <center>
                        <h1>ArqueoSítios</h1>
                    </center>
                </td>
            </tr>
            <tr valign="top">
                <td width="30%">
                    <ul>
"""

count = 0
for elem in elems:
    count += 1
    id = elem.find('IDENTI').contents
    #Se tiver identificação
    if len(id) > 0:
        id = id[0]
        pagweb += f"""
                        <li>
                            <a href="/porta/{count}"> {id} </a>
                        </li>
"""

pagweb += """
                    </ul>
                </td>
                <td width="80%">
                    <p> Resto da data </p>
                </td>
            </tr>
        </table>
    </body>
</html>
"""

print(pagweb)
