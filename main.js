class Pessoa {
    constructor() {
        this.id = 1;
        this.objArray = [];
        this.idAtualizar = null;
    };

    lerDados() {
        let individuo = {};
        individuo.id = this.id;
        individuo.nome = document.getElementById("nomePessoa").value;
        individuo.idade = document.getElementById("idadePessoa").value;
        individuo.email = document.getElementById("emailPessoa").value;
        individuo.cpf = document.getElementById("cpfPessoa").value;
        return individuo;
    };

    validarCampos(pessoa) {
        let alerta = "";
        if (pessoa.nome == "") {
            alerta += "-Digite o Nome da Pessoa\n";
        };
        if (pessoa.idade == "") {
            alerta += "-Digite a Idade da Pessoa\n";
        };
        if (pessoa.email == "") {
            alerta += "-Digite o E-mail da Pessoa\n";
        };
        if (pessoa.cpf == "") {
            alerta += "-Digite o CPF da Pessoa\n";
        }
        if (alerta != "") {
            alert(alerta)
            return false;
        }
        return true;
    };

    cancelar() {
        document.getElementById("nomePessoa").value = "";
        document.getElementById("idadePessoa").value = "";
        document.getElementById("emailPessoa").value = "";
        document.getElementById("cpfPessoa").value = "";
    };

    adicionarArray(pessoa) {
        this.objArray.push(pessoa);
        this.cancelar();
    }

    inserirCampos() {
        let tbody = document.getElementById("tbody");
        tbody.innerText = "";

        for (let i = 0; i < this.objArray.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_idade = tr.insertCell();
            let td_email = tr.insertCell();
            let td_cpf = tr.insertCell();
            let td_acao = tr.insertCell();

            td_id.innerText = this.objArray[i].id;
            td_nome.innerText = this.objArray[i].nome;
            td_idade.innerText = this.objArray[i].idade;
            td_email.innerText = this.objArray[i].email;
            td_cpf.innerText = this.objArray[i].cpf;

            let imgEdit = document.createElement("img");
            imgEdit.src = "edit.png";
            imgEdit.setAttribute(
                "onclick",
                "pessoa.editar(" + JSON.stringify(this.objArray[i]) + ")"
            )
            td_acao.appendChild(imgEdit);

            let imgExc = document.createElement("img");
            imgExc.src = "delete.png";
            imgExc.setAttribute(
                "onclick",
                "pessoa.excluir(" + this.objArray[i].id + ")"
            );
            td_acao.appendChild(imgExc);
        };
    };

    cadastrar() {
        let pessoaSalva = this.lerDados();
        if (this.validarCampos(pessoaSalva)) {
            if (this.idAtualizar == null) {
                this.adicionarArray(pessoaSalva);
                this.id++;
            } else {
                this.atualizar(this.idAtualizar, pessoaSalva);
                this.idAtualizar = null;
                document.getElementById("addPessoa").innerHTML = "CADASTRAR";
                this.cancelar();
            };
        };
        this.inserirCampos();
    };

    excluir(id) {
        if (confirm("DESEJA REALMENTE EXCLUIR O PRODUTO?")) {
          let tbody = document.getElementById("tbody");
          for (let i = 0; i < this.objArray.length; i++) {
            if (this.objArray[i].id == id) {
              this.objArray.splice(i, 1); //Exclui o valor da array na posição (i, 1)
              tbody.deleteRow(i);
            };
          };
        };
      };

    editar(novaPessoa) {
        this.idAtualizar = novaPessoa.id;
        document.getElementById("nomePessoa").value = novaPessoa.nome;
        document.getElementById("idadePessoa").value = novaPessoa.idade;
        document.getElementById("emailPessoa").value = novaPessoa.email;
        document.getElementById("cpfPessoa").value = novaPessoa.cpf;
        document.getElementById("addPessoa").innerHTML = "ATUALIZAR";
    };

    atualizar(id, pessoa) {
        for (let i = 0; i < this.objArray.length; i++) {
            if (this.objArray[i].id == id) {
                this.objArray[i].nome = pessoa.nome;
                this.objArray[i].idade = pessoa.idade;
                this.objArray[i].email = pessoa.email;
                this.objArray[i].cpf = pessoa.cpf;
            };
        };
    };

};

let pessoa = new Pessoa();