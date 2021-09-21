const { connect } = require('http2')

window.addEventListener('load', function(){
    const fs = require('fs')
    const axios = require('axios')

    const dir = `${__dirname}\\data\\clientes`
    
    var form = document.querySelector('form')

    let content = document.querySelector('content')

    content.innerHTML = 'Carregando informações...'

    let delay = 900

    this.setTimeout(function(){
        fs.readdir(dir, (err, files)=>{
            content.innerHTML = `${files.length} cadastros. <br><br>`

            let data = new Array(files.length);

            for(i = 1; i <= files.length; i++){
                data[i] = JSON.parse(fs.readFileSync(`${dir}/${i}_cliente.json`))
            }

            for(i = 1; i <= files.length; i++){

                content.innerHTML += `
                    <div class="cliente">
                        <table class="bordered" width="100%">
                            <tr>
                                <th>ID</th>
                                <th>NOME</th>
                                <th>ENDEREÇO</th>
                                <th>BAIRRO</th>
                                <th>CIDADE</th>
                                <th>ESTADO</th>
                                <th>CEP</th>
                                <th>TELEFONE</th>
                                <th>OBS</th>
                                <th>Ação</th>
                            </tr>
                            <tr style="text-align:center;">
                                <td>${i}</td>
                                <td>${data[i].nome}</td>
                                <td>${data[i].endereco}</td>
                                <td>${data[i].bairro}</td>
                                <td>${data[i].cidade}</td>
                                <td>${data[i].estado}</td>
                                <td>${data[i].cep}</td>
                                <td>${data[i].telefone}</td>
                                <td><a href="javascript:void(0);" onclick="alert('${data[i].observacao}')">LER</a></td>
                                <td><a href="javascript:void(0);" onclick="deleteThis(${i})">EXCLUIR</a></td>
                            </tr>
                        </table>
                    </div>
                `
            }

        })
    }, delay)

    form.querySelector('input[name=cep]').addEventListener('blur', function(e){
        let cepIn = e.target.value
        let webservice = "https://viacep.com.br/ws/"+cepIn+"/json"

        axios.get(webservice)
        .then(response =>{
            if(response.status == 200){
                console.log(response.data)
                form.querySelector('input[name=bairro]').value = response.data.bairro
                form.querySelector('input[name=cidade]').value = response.data.localidade
                form.querySelector('input[name=endereco]').value = response.data.logradouro
                form.querySelector(`select[name=estado]`).options[form.querySelector(`select[name=estado]`).selectedIndex].value = response.data.uf
                form.querySelector(`select[name=estado]`).options[form.querySelector(`select[name=estado]`).selectedIndex].innerText = response.data.uf

            }
        })
    })

    


    function getData(type, name){
        if(type == 'input'){
            return form.querySelector(`input[name=${name}]`).value
        }
        if(type == 'select'){
            return form.querySelector(`select[name=${name}]`).options[form.querySelector(`select[name=${name}]`).selectedIndex].value
        }
        if(type == 'textarea'){
            return form.querySelector(`textarea[name=${name}]`).value
        }
    }


    form.addEventListener('submit', function(e){
        e.preventDefault()

        let data = {
            nome: (getData('input', 'nome') == '' ? '&nbsp;*&nbsp;' : getData('input', 'nome')),
            endereco: (getData('input', 'endereco') == '' ? '&nbsp;*&nbsp;' : getData('input', 'endereco') ),
            bairro: (getData('input', 'bairro') == '' ? '&nbsp;*&nbsp;' : getData('input', 'bairro') ),
            cidade: (getData('input', 'cidade') == '' ? '&nbsp;*&nbsp;' : getData('input', 'cidade') ),
            estado: (getData('select', 'estado') == '' ? '&nbsp;*&nbsp;' : getData('select', 'estado') ),
            telefone: (getData('input', 'telefone') == '' ? '&nbsp;*&nbsp;' : getData('input', 'telefone') ),
            cep: (getData('input', 'cep') == '' ? '&nbsp;*&nbsp;' : getData('input', 'cep') ),
            telefone: (getData('input', 'telefone') == '' ? '&nbsp;*&nbsp;' : getData('input', 'telefone') ),
            observacao: (getData('textarea', 'observacao') == '' ? 'Nenhuma observação.' : getData('textarea', 'observacao') ),
        }
        
        data = JSON.stringify(data)

        fs.readdir(dir, (err, files)=>{
            fs.appendFile(`${dir}/${files.length+1}_cliente.json`, data, (err) =>{
                if(err) throw err;
                alert('Cadastro feito!')

            })
        })
        window.location.reload()
    }) 
    
})
    