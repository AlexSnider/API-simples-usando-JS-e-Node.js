var formulario = document.getElementById("formTime");
const urlBackEnd='http://localhost:3005/time';

formulario.onsubmit = manipularSubmissão;

function obterTimeFormulario(){
    const codigo = document.getElementById('team-code').value;
    const timeNome = document.getElementById('team-name').value;
    const tecnico = document.getElementById('coach-name').value;
    const dataCriacao = document.getElementById('team-creation-date').value;
    const patrocinador = document.getElementById('sponsor').value;
    const corReferencial = document.getElementById('referencial-color').value;
    if (codigo && timeNome && tecnico && dataCriacao && patrocinador && corReferencial) {
        return {
            codigo: codigo,
            timeNome: timeNome,
            tecnico: tecnico,
            dataCriacao: dataCriacao,
            patrocinador: patrocinador,
            corReferencial: corReferencial
        }
    }
    else{
        return undefined;
    }
}

function limpaForm(pcodigo='', ptimeNome='', ptecnico='', pdataCriacao='', ppatrocinador='', pcorReferencial=''){
    let codigo = document.getElementById('team-code')
    let timeNome = document.getElementById('team-name')
    let tecnico = document.getElementById('coach-name')
    let dataCriacao = document.getElementById('team-creation-date')
    let patrocinador = document.getElementById('sponsor')
    let corReferencial = document.getElementById('referencial-color')

        codigo.value = pcodigo;
        timeNome.value = ptimeNome;
        tecnico.value = ptecnico;
        dataCriacao.value = pdataCriacao;
        patrocinador.value = ppatrocinador;
        corReferencial.value = pcorReferencial;
}

document.getElementById('deletar').onclick = deletarTime;
document.getElementById('editar').onclick = editarTime;

function exibirClientesTabela(listaTimes){
    let divTabela = document.getElementById("tabela");
    let tabela = document.createElement('table');
    tabela.className = 'table table-dark table-hover"';

    let cabecalho = document.createElement('thead');
    cabecalho.innerHTML=`<tr>
                            <th>Código</th>
                            <th>Nome do Time</th>
                            <th>Nome do Tecnico</th>
                            <th>Data de Criação</th>
                            <th>Patrocinador</th>
                            <th>Cor de Referência</th>
                            <th>Ações</th>
                         <tr>
                        `
    tabela.appendChild(cabecalho);
    let body = document.createElement('tbody');
    for (let i=0; i < listaTimes.length; i++){
        let line = document.createElement('tr');
        line.innerHTML=`<td>${listaTimes[i].codigo}</td>
                        <td>${listaTimes[i].timeNome}</td>
                        <td>${listaTimes[i].tecnico}</td>
                        <td>${listaTimes[i].dataCriacao}</td>
                        <td>${listaTimes[i].patrocinador}</td>
                        <td>${listaTimes[i].corReferencial}</td>
                        <td>
                            <button onclick="selectRegister('${listaTimes[i].codigo}', 
                                                            '${listaTimes[i].timeNome}', 
                                                            '${listaTimes[i].tecnico}',
                                                            '${listaTimes[i].dataCriacao}', 
                                                            '${listaTimes[i].patrocinador}',
                                                            '${listaTimes[i].corReferencial}', 'Editar')" 
                                     type="button" class="btn btn-outline-primary">Editar</button>
                            <button onclick="selectRegister('${listaTimes[i].codigo}', 
                                                            '${listaTimes[i].timeNome}', 
                                                            '${listaTimes[i].tecnico}',
                                                            '${listaTimes[i].dataCriacao}', 
                                                            '${listaTimes[i].patrocinador}',
                                                            '${listaTimes[i].corReferencial}', 'Deletar')" 
                                     type="button" class="btn btn-outline-danger"">Deletar</button>
                        </td>
                       `
        body.appendChild(line);
    }
    tabela.appendChild(body);
    divTabela.innerHTML = "";
    divTabela.appendChild(tabela);

}

function mostrarClientesBackend(){
    fetch(urlBackEnd, {method:"GET"})
    .then((resp) => {
        return resp.json();
    })
    .then((dados) => {
        if (dados.length > 0){
            exibirClientesTabela(dados);
        }
        else{
            mensagem.innerHTML= `<div class='alert alert-danger' role='alert'
                                <h3>Não existem dados para exibição!</h3>
                                </div>`
        }
    }).catch((erro) => {
        mensagem.innerHTML= `<div class='alert alert-danger' role='alert'>
            	             ${erro.mensagem}
                             </div>`
    })
}

function gravarTimeBackend(){
    let codigo         = document.getElementById("team-code").value;
    let timeNome       = document.getElementById("team-name").value;
    let tecnico        = document.getElementById("coach-name").value;
    let dataCriacao    = document.getElementById("team-creation-date").value;
    let patrocinador   = document.getElementById("sponsor").value;
    let corReferencial = document.getElementById("referencial-color").value;

    fetch(urlBackEnd, {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "codigo"         :codigo,
            "timeNome"       :timeNome,
            "tecnico"        :tecnico,
            "dataCriacao"    :dataCriacao,
            "patrocinador"   :patrocinador,
            "corReferencial" :corReferencial
        })
    }).then((resp) =>{
        return resp.json();
    }).then((dados) =>{
        if (dados.status){
            mostrarClientesBackend();
            mensagem.innerHTML=`<div class='alert alert-success' role='alert'>
                                ${dados.mensagem}
                                </div>`
        }
        else{
            mensagem.innerHTML= `<div class='alert alert-danger' role='alert'>
                                 ${dados.mensagem}
                                 </div>`
        }
    }).catch((erro) =>{
        mensagem.innerHTML= `<div class='alert alert-info' role='alert'>
                             ${erro.message}
                             </div>`
    });
}

function manipularSubmissão(evento){
    if(validaTime()){
        gravarTimeBackend();

    }
    evento.stopPropagation();
    evento.preventDefault();

}   

function validaTime(){
    let codigo         = document.getElementById("team-code").value;
    let timeNome       = document.getElementById("team-name").value;
    let tecnico        = document.getElementById("coach-name").value;
    let dataCriacao    = document.getElementById("team-creation-date").value;
    let patrocinador   = document.getElementById("sponsor").value;
    let corReferencial = document.getElementById("referencial-color").value;

    if (!codigo){
        mensagem.innerHTML = `<div class='alert alert-info' role='alert'
                              <h3>Por favor, informe o codigo!</h3>
                              </div>`
        return false;
    }
    
    
    if (!timeNome){
        mensagem.innerHTML = `<div class='alert alert-info' role='alert'
                              <h3>Por favor, informe o nome!</h3>
                              </div>`
        return false;
    }

    else if(!tecnico){
        mensagem.innerHTML = `<div class="alert alert-info" role="alert"
                              <h3>Por favor, informe o tecnico!</h3>
                              </div>`
        return false;
    }

    else if(!dataCriacao){
        mensagem.innerHTML = `<div class="alert alert-info" role="alert"
                              <h3>Por favor, informe a data de criação!</h3>
                              </div>`
        return false;
    }

    else if(!patrocinador){
        mensagem.innerHTML = `<div class="alert alert-info" role="alert"
                              <h3>Por favor, informe o patrocinador!</h3>
                              </div>`
        return false;
    }

    else if(!corReferencial){
        mensagem.innerHTML = `<div class="alert alert-info" role="alert"
                              <h3>Por favor, informe a cor referencial!</h3>
                              </div>`
        return false;
    }

    mensagem.innerHTML="";
    return true;
}

function selectRegister(pcodigo="", ptimeNome="", ptecnico="", pdataCriacao="", ppatrocinador="", pcorReferencial="", acao){
    let codigo         = document.getElementById("team-code")
    let timeNome       = document.getElementById("team-name")
    let tecnico        = document.getElementById("coach-name")
    let dataCriacao    = document.getElementById("team-creation-date")
    let patrocinador   = document.getElementById("sponsor")
    let corReferencial = document.getElementById("referencial-color")

    codigo.value = pcodigo;
    timeNome.value = ptimeNome;
    tecnico.value = ptecnico;
    dataCriacao.value = pdataCriacao;
    patrocinador.value = ppatrocinador;
    corReferencial.value = pcorReferencial;

    if (acao == 'Deletar'){
        document.getElementById('team-code').disabled = true;
        let btnCadastro = document.getElementById("cadastrar");
        btnCadastro.disabled = true;
        let btnDeletar = document.getElementById("deletar");
        btnDeletar.disabled = false;
        let btnEditar = document.getElementById("editar");
        btnEditar.disabled = true;
    }
    else if (acao == 'Editar'){
        document.getElementById('team-code').disabled = true;
        let btnCadastro = document.getElementById("cadastrar");
        btnCadastro.disabled = true;
        let btnDeletar = document.getElementById("deletar");
        btnDeletar.disabled = true;
        let btnEditar = document.getElementById("editar");
        btnEditar.disabled = false;
    }
    else{
        document.getElementById('team-code').disabled = false;
        btnCadastro.disabled= false;
        btnEditar.disabled = true;
        btnDeletar.disabled = true;
    }

}
    
function deletarTime(){
    if(confirm('Deseja realmente deletar esse time?')){
        document.getElementById('cadastrar').disabled = false;
        document.getElementById('team-code').disabled = false;
        fetch(urlBackEnd,{
            method : "DELETE",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({
                codigo : document.getElementById('team-code').value
            })
        }).then((resp) =>{
            return resp.json();
        }).then((dados) =>{
            if (dados.status){
                mostrarClientesBackend();
                mensagem.innerHTML=`<div class='alert alert-success' role='alert'>
                                    ${dados.mensagem}
                                    </div>`
                limpaForm();
            }
            else{
                mensagem.innerHTML= `<div class='alert alert-danger' role='alert'>
                                     ${dados.mensagem}
                                     </div>`
            }
        }).catch((erro) =>{
            mensagem.innerHTML= `<div class='alert alert-info' role='alert'>
                                 ${erro.message}
                                 </div>`
        });
    }
    else{
        selectRegister();
        mostrarClientesBackend();
    }
}

function editarTime(){
    if(confirm('Deseja editar esse time?')){
        document.getElementById('cadastrar').disabled = false;
        document.getElementById('team-code').disabled = false;
        const time = obterTimeFormulario();
        fetch(urlBackEnd,{
            method : "PUT",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify(time)
        }).then((resp) =>{
            return resp.json();
        }).then((dados) =>{
            if (dados.status){
                mostrarClientesBackend();
                mensagem.innerHTML=`<div class='alert alert-success' role='alert'>
                                    ${dados.mensagem}
                                    </div>`
                limpaForm();
            }
            else{
                mensagem.innerHTML= `<div class='alert alert-danger' role='alert'>
                                     ${dados.mensagem}
                                     </div>`
            }
        }).catch((erro) =>{
            mensagem.innerHTML= `<div class='alert alert-info' role='alert'>
                                 ${erro.message}
                                 </div>`
        });
    }
    else{
        selectRegister();
        mostrarClientesBackend();
    }
}

mostrarClientesBackend();
