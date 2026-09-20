document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       BANCO DE DADOS LOCAL
       ========================================== */

    let clientes =
        JSON.parse(localStorage.getItem("pdv_clientes")) || [];

    let servicos =
        JSON.parse(localStorage.getItem("pdv_servicos")) || [];

    let tecnicos =
        JSON.parse(localStorage.getItem("pdv_tecnicos")) || [];

    let ferramentas =
        JSON.parse(localStorage.getItem("pdv_ferramentas")) || [];

    let pedidos =
        JSON.parse(localStorage.getItem("pdv_pedidos")) || [];


    let tipoModalAtual = null;

    let idEditando = null;


    /* ==========================================
       ELEMENTOS
       ========================================== */

    const paginas =
        document.querySelectorAll(".pagina");

    const botoesMenu =
        document.querySelectorAll(".menu-item");

    const botoesPagina =
        document.querySelectorAll("[data-pagina]");

    const modal =
        document.getElementById("modal");

    const fecharModal =
        document.getElementById("fecharModal");

    const cancelarModal =
        document.getElementById("cancelarModal");

    const formModal =
        document.getElementById("formModal");

    const modalTitulo =
        document.getElementById("modalTitulo");

    const camposModal =
        document.getElementById("camposModal");


    /* ==========================================
       SALVAR DADOS
       ========================================== */

    function salvarDados() {

        localStorage.setItem(
            "pdv_clientes",
            JSON.stringify(clientes)
        );

        localStorage.setItem(
            "pdv_servicos",
            JSON.stringify(servicos)
        );

        localStorage.setItem(
            "pdv_tecnicos",
            JSON.stringify(tecnicos)
        );

        localStorage.setItem(
            "pdv_ferramentas",
            JSON.stringify(ferramentas)
        );

        localStorage.setItem(
            "pdv_pedidos",
            JSON.stringify(pedidos)
        );

    }


    /* ==========================================
       NAVEGAÇÃO
       ========================================== */

    function abrirPagina(nomePagina) {

        paginas.forEach(function (pagina) {

            pagina.classList.remove(
                "ativa-pagina"
            );

        });


        const paginaSelecionada =
            document.getElementById(nomePagina);


        if (paginaSelecionada) {

            paginaSelecionada.classList.add(
                "ativa-pagina"
            );

        }


        botoesMenu.forEach(function (botao) {

            botao.classList.remove("ativo");

            if (
                botao.getAttribute("data-pagina")
                === nomePagina
            ) {

                botao.classList.add("ativo");

            }

        });


        atualizarTudo();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    botoesMenu.forEach(function (botao) {

        botao.addEventListener(
            "click",
            function () {

                const pagina =
                    botao.getAttribute("data-pagina");

                abrirPagina(pagina);

            }
        );

    });


    botoesPagina.forEach(function (botao) {

        botao.addEventListener(
            "click",
            function () {

                const pagina =
                    botao.getAttribute("data-pagina");

                abrirPagina(pagina);

            }
        );

    });


    /* ==========================================
       MODAL
       ========================================== */

    function abrirModal(tipo, id = null) {

        tipoModalAtual = tipo;
        idEditando = id;

        camposModal.innerHTML = "";

        let titulo = "";


        if (tipo === "cliente") {

            titulo =
                id
                    ? "Editar Cliente"
                    : "Novo Cliente";

            montarFormularioCliente(id);

        }


        if (tipo === "servico") {

            titulo =
                id
                    ? "Editar Serviço"
                    : "Novo Serviço";

            montarFormularioServico(id);

        }


        if (tipo === "tecnico") {

            titulo =
                id
                    ? "Editar Técnico"
                    : "Novo Técnico";

            montarFormularioTecnico(id);

        }


        if (tipo === "ferramenta") {

            titulo =
                id
                    ? "Editar Ferramenta"
                    : "Nova Ferramenta";

            montarFormularioFerramenta(id);

        }


        if (tipo === "pedido") {

            titulo =
                id
                    ? "Editar Pedido"
                    : "Novo Pedido";

            montarFormularioPedido(id);

        }


        modalTitulo.textContent = titulo;

        modal.classList.add("aberto");

    }


    function fecharModalFuncao() {

        modal.classList.remove("aberto");

        tipoModalAtual = null;

        idEditando = null;

        camposModal.innerHTML = "";

        formModal.reset();

    }


    fecharModal.addEventListener(
        "click",
        fecharModalFuncao
    );


    cancelarModal.addEventListener(
        "click",
        fecharModalFuncao
    );


    modal.addEventListener(
        "click",
        function (evento) {

            if (evento.target === modal) {
                fecharModalFuncao();
            }

        }
    );


    /* ==========================================
       CAMPOS AUXILIARES
       ========================================== */

    function campo(
        nome,
        id,
        tipo = "text",
        valor = "",
        obrigatorio = true
    ) {

        return `
            <div class="form-grupo">

                <label for="${id}">
                    ${nome}
                </label>

                <input
                    id="${id}"
                    name="${id}"
                    type="${tipo}"
                    value="${valor}"
                    ${obrigatorio ? "required" : ""}
                >

            </div>
        `;

    }


    function campoSelect(
        nome,
        id,
        opcoes,
        valorAtual = ""
    ) {

        let html = `
            <div class="form-grupo">

                <label for="${id}">
                    ${nome}
                </label>

                <select
                    id="${id}"
                    name="${id}"
                    required
                >
        `;


        opcoes.forEach(function (opcao) {

            html += `
                <option
                    value="${opcao}"
                    ${opcao === valorAtual ? "selected" : ""}
                >
                    ${opcao}
                </option>
            `;

        });


        html += `
                </select>

            </div>
        `;


        return html;

    }


    function campoTextarea(
        nome,
        id,
        valor = ""
    ) {

        return `
            <div class="form-grupo">

                <label for="${id}">
                    ${nome}
                </label>

                <textarea
                    id="${id}"
                    name="${id}"
                >${valor}</textarea>

            </div>
        `;

    }


    /* ==========================================
       FORMULÁRIO CLIENTE
       ========================================== */

    function montarFormularioCliente(id) {

        const cliente =
            clientes.find(function (item) {
                return item.id === id;
            });


        camposModal.innerHTML =

            campo(
                "Nome completo",
                "nome",
                "text",
                cliente?.nome || ""
            )

            +

            campo(
                "Telefone",
                "telefone",
                "tel",
                cliente?.telefone || ""
            )

            +

            campo(
                "E-mail",
                "email",
                "email",
                cliente?.email || "",
                false
            )

            +

            campo(
                "Endereço",
                "endereco",
                "text",
                cliente?.endereco || "",
                false
            )

            +

            campoTextarea(
                "Observações",
                "observacoes",
                cliente?.observacoes || ""
            );

    }


    /* ==========================================
       FORMULÁRIO SERVIÇO
       ========================================== */

    function montarFormularioServico(id) {

        const servico =
            servicos.find(function (item) {
                return item.id === id;
            });


        camposModal.innerHTML =

            campo(
                "Nome do serviço",
                "nome",
                "text",
                servico?.nome || ""
            )

            +

            campo(
                "Valor",
                "valor",
                "number",
                servico?.valor || "",
                false
            )

            +

            campoTextarea(
                "Descrição",
                "descricao",
                servico?.descricao || ""
            );

    }


    /* ==========================================
       FORMULÁRIO TÉCNICO
       ========================================== */

    function montarFormularioTecnico(id) {

        const tecnico =
            tecnicos.find(function (item) {
                return item.id === id;
            });


        camposModal.innerHTML =

            campo(
                "Nome do técnico",
                "nome",
                "text",
                tecnico?.nome || ""
            )

            +

            campo(
                "Telefone",
                "telefone",
                "tel",
                tecnico?.telefone || ""
            )

            +

            campo(
                "Especialidade",
                "especialidade",
                "text",
                tecnico?.especialidade || "",
                false
            )

            +

            campoSelect(
                "Status",
                "status",
                [
                    "Ativo",
                    "Inativo"
                ],
                tecnico?.status || "Ativo"
            );

    }


    /* ==========================================
       FORMULÁRIO FERRAMENTA
       ========================================== */

    function montarFormularioFerramenta(id) {

        const ferramenta =
            ferramentas.find(function (item) {
                return item.id === id;
            });


        camposModal.innerHTML =

            campo(
                "Nome da ferramenta",
                "nome",
                "text",
                ferramenta?.nome || ""
            )

            +

            campo(
                "Quantidade",
                "quantidade",
                "number",
                ferramenta?.quantidade || "1"
            )

            +

            campo(
                "Localização",
                "localizacao",
                "text",
                ferramenta?.localizacao || "",
                false
            )

            +

            campoSelect(
                "Status",
                "status",
                [
                    "Disponível",
                    "Em uso",
                    "Manutenção"
                ],
                ferramenta?.status || "Disponível"
            );

    }


    /* ==========================================
       FORMULÁRIO PEDIDO
       ========================================== */

    function montarFormularioPedido(id) {

        const pedido =
            pedidos.find(function (item) {
                return item.id === id;
            });


        let html = "";


        html += campoSelect(
            "Cliente",
            "cliente",
            clientes.length
                ? clientes.map(function (cliente) {
                    return cliente.nome;
                })
                : ["Nenhum cliente cadastrado"],
            pedido?.cliente || ""
        );


        html += campoSelect(
            "Serviço",
            "servico",
            servicos.length
                ? servicos.map(function (servico) {
                    return servico.nome;
                })
                : ["Nenhum serviço cadastrado"],
            pedido?.servico || ""
        );


        html += campoSelect(
            "Técnico",
            "tecnico",
            tecnicos.length
                ? tecnicos.map(function (tecnico) {
                    return tecnico.nome;
                })
                : ["Nenhum técnico cadastrado"],
            pedido?.tecnico || ""
        );


        html += campo(
            "Data",
            "data",
            "date",
            pedido?.data || ""
        );


        html += campo(
            "Horário",
            "horario",
            "time",
            pedido?.horario || ""
        );


        html += campo(
            "Valor",
            "valor",
            "number",
            pedido?.valor || "",
            false
        );


        html += campoSelect(
            "Status",
            "status",
            [
                "Pendente",
                "Agendado",
                "Em andamento",
                "Concluído",
                "Cancelado"
            ],
            pedido?.status || "Pendente"
        );


        html += campoTextarea(
            "Ferramentas utilizadas",
            "ferramentas",
            pedido?.ferramentas || ""
        );


        html += campoTextarea(
            "Observações",
            "observacoes",
            pedido?.observacoes || ""
        );


        camposModal.innerHTML = html;

    }


    /* ==========================================
       SALVAR FORMULÁRIO
       ========================================== */

    formModal.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const dados =
                new FormData(formModal);


            const objeto =
                Object.fromEntries(dados.entries());


            if (tipoModalAtual === "cliente") {

                salvarRegistro(
                    clientes,
                    objeto,
                    "Cliente"
                );

            }


            if (tipoModalAtual === "servico") {

                salvarRegistro(
                    servicos,
                    objeto,
                    "Serviço"
                );

            }


            if (tipoModalAtual === "tecnico") {

                salvarRegistro(
                    tecnicos,
                    objeto,
                    "Técnico"
                );

            }


            if (tipoModalAtual === "ferramenta") {

                salvarRegistro(
                    ferramentas,
                    objeto,
                    "Ferramenta"
                );

            }


            if (tipoModalAtual === "pedido") {

                salvarRegistro(
                    pedidos,
                    objeto,
                    "Pedido"
                );

            }


            salvarDados();

            fecharModalFuncao();

            atualizarTudo();

        }
    );


    function salvarRegistro(
        lista,
        objeto,
        nome
    ) {

        if (idEditando) {

            const indice =
                lista.findIndex(function (item) {
                    return item.id === idEditando;
                });


            if (indice !== -1) {

                lista[indice] = {
                    ...lista[indice],
                    ...objeto
                };

            }

        } else {

            lista.push({

                id:
                    Date.now().toString(),

                ...objeto,

                criadoEm:
                    new Date().toISOString()

            });

        }

    }


    /* ==========================================
       AÇÕES DOS BOTÕES
       ========================================== */

    document.addEventListener(
        "click",
        function (evento) {

            const botao =
                evento.target.closest("[data-acao]");


            if (!botao) {
                return;
            }


            const acao =
                botao.getAttribute("data-acao");


            if (acao === "novo-pedido") {
                abrirModal("pedido");
            }


            if (acao === "novo-cliente") {
                abrirModal("cliente");
            }


            if (acao === "novo-servico") {
                abrirModal("servico");
            }


            if (acao === "novo-tecnico") {
                abrirModal("tecnico");
            }


            if (acao === "nova-ferramenta") {
                abrirModal("ferramenta");
            }


            if (acao === "editar") {

                const tipo =
                    botao.getAttribute("data-tipo");

                const id =
                    botao.getAttribute("data-id");

                abrirModal(tipo, id);

            }


            if (acao === "excluir") {

                const tipo =
                    botao.getAttribute("data-tipo");

                const id =
                    botao.getAttribute("data-id");

                excluirRegistro(tipo, id);

            }


            if (acao === "status-pedido") {

                const id =
                    botao.getAttribute("data-id");

                alterarStatusPedido(id);

            }

        }
    );


    /* ==========================================
       EXCLUIR
       ========================================== */

    function excluirRegistro(tipo, id) {

        if (
            !confirm(
                "Tem certeza que deseja excluir este registro?"
            )
        ) {
            return;
        }


        if (tipo === "cliente") {

            clientes =
                clientes.filter(function (item) {
                    return item.id !== id;
                });

        }


        if (tipo === "servico") {

            servicos =
                servicos.filter(function (item) {
                    return item.id !== id;
                });

        }


        if (tipo === "tecnico") {

            tecnicos =
                tecnicos.filter(function (item) {
                    return item.id !== id;
                });

        }


        if (tipo === "ferramenta") {

            ferramentas =
                ferramentas.filter(function (item) {
                    return item.id !== id;
                });

        }


        if (tipo === "pedido") {

            pedidos =
                pedidos.filter(function (item) {
                    return item.id !== id;
                });

        }


        salvarDados();

        atualizarTudo();

    }


    /* ==========================================
       STATUS DO PEDIDO
       ========================================== */

    function alterarStatusPedido(id) {

        const pedido =
            pedidos.find(function (item) {
                return item.id === id;
            });


        if (!pedido) {
            return;
        }


        const status = [
            "Pendente",
            "Agendado",
            "Em andamento",
            "Concluído",
            "Cancelado"
        ];


        const atual =
            status.indexOf(pedido.status);


        const proximo =
            (atual + 1) % status.length;


        pedido.status =
            status[proximo];


        salvarDados();

        atualizarTudo();

    }


    /* ==========================================
       RENDER CLIENTES
       ========================================== */

    function renderClientes() {

        const lista =
            document.getElementById(
                "listaClientes"
            );


        if (!clientes.length) {

            lista.innerHTML = `
                <div class="lista-vazia">
                    <div>👥</div>
                    <h3>Nenhum cliente cadastrado</h3>
                    <p>Cadastre o primeiro cliente.</p>
                </div>
            `;

            return;

        }


        lista.innerHTML =
            clientes.map(function (cliente) {

                return `
                    <div class="item-card">

                        <div class="item-info">

                            <h3>
                                ${escapar(cliente.nome)}
                            </h3>

                            <p>
                                📞 ${escapar(cliente.telefone || "Sem telefone")}
                            </p>

                            <p>
                                ✉️ ${escapar(cliente.email || "Sem e-mail")}
                            </p>

                            <p>
                                📍 ${escapar(cliente.endereco || "Sem endereço")}
                            </p>

                        </div>

                        <div class="item-acoes">

                            <button
                                class="btn-pequeno"
                                data-acao="editar"
                                data-tipo="cliente"
                                data-id="${cliente.id}"
                            >
                                Editar
                            </button>

                            <button
                                class="btn-pequeno btn-excluir"
                                data-acao="excluir"
                                data-tipo="cliente"
                                data-id="${cliente.id}"
                            >
                                Excluir
                            </button>

                        </div>

                    </div>
                `;

            }).join("");

    }


    /* ==========================================
       RENDER SERVIÇOS
       ========================================== */

    function renderServicos() {

        const lista =
            document.getElementById(
                "listaServicos"
            );


        if (!servicos.length) {

            lista.innerHTML = `
                <div class="lista-vazia">
                    <div>🔧</div>
                    <h3>Nenhum serviço cadastrado</h3>
                    <p>Cadastre os serviços da empresa.</p>
                </div>
            `;

            return;

        }


        lista.innerHTML =
            servicos.map(function (servico) {

                return `
                    <div class="item-card">

                        <div class="item-info">

                            <h3>
                                ${escapar(servico.nome)}
                            </h3>

                            <p>
                                ${escapar(
                                    servico.descricao ||
                                    "Sem descrição"
                                )}
                            </p>

                            <p>
                                Valor:
                                R$ ${formatarMoeda(servico.valor)}
                            </p>

                        </div>

                        <div class="item-acoes">

                            <button
                                class="btn-pequeno"
                                data-acao="editar"
                                data-tipo="servico"
                                data-id="${servico.id}"
                            >
                                Editar
                            </button>

                            <button
                                class="btn-pequeno btn-excluir"
                                data-acao="excluir"
                                data-tipo="servico"
                                data-id="${servico.id}"
                            >
                                Excluir
                            </button>

                        </div>

                    </div>
                `;

            }).join("");

    }


    /* ==========================================
       RENDER TÉCNICOS
       ========================================== */

    function renderTecnicos() {

        const lista =
            document.getElementById(
                "listaTecnicos"
            );


        if (!tecnicos.length) {

            lista.innerHTML = `
                <div class="lista-vazia">
                    <div>👨‍🔧</div>
                    <h3>Nenhum técnico cadastrado</h3>
                    <p>Cadastre os técnicos da empresa.</p>
                </div>
            `;

            return;

        }


        lista.innerHTML =
            tecnicos.map(function (tecnico) {

                return `
                    <div class="item-card">

                        <div class="item-info">

                            <h3>
                                ${escapar(tecnico.nome)}
                            </h3>

                            <p>
                                📞 ${escapar(
                                    tecnico.telefone ||
                                    "Sem telefone"
                                )}
                            </p>

                            <p>
                                Especialidade:
                                ${escapar(
                                    tecnico.especialidade ||
                                    "Não informada"
                                )}
                            </p>

                            <span class="status ${
                                tecnico.status === "Ativo"
                                    ? "status-concluido"
                                    : "status-cancelado"
                            }">
                                ${escapar(tecnico.status)}
                            </span>

                        </div>

                        <div class="item-acoes">

                            <button
                                class="btn-pequeno"
                                data-acao="editar"
                                data-tipo="tecnico"
                                data-id="${tecnico.id}"
                            >
                                Editar
                            </button>

                            <button
                                class="btn-pequeno btn-excluir"
                                data-acao="excluir"
                                data-tipo="tecnico"
                                data-id="${tecnico.id}"
                            >
                                Excluir
                            </button>

                        </div>

                    </div>
                `;

            }).join("");

    }


    /* ==========================================
       RENDER FERRAMENTAS
       ========================================== */

    function renderFerramentas() {

        const lista =
            document.getElementById(
                "listaFerramentas"
            );


        if (!ferramentas.length) {

            lista.innerHTML = `
                <div class="lista-vazia">
                    <div>🧰</div>
                    <h3>Nenhuma ferramenta cadastrada</h3>
                    <p>Cadastre as ferramentas da empresa.</p>
                </div>
            `;

            return;

        }


        lista.innerHTML =
            ferramentas.map(function (ferramenta) {

                return `
                    <div class="item-card">

                        <div class="item-info">

                            <h3>
                                ${escapar(ferramenta.nome)}
                            </h3>

                            <p>
                                Quantidade:
                                ${escapar(
                                    ferramenta.quantidade ||
                                    "0"
                                )}
                            </p>

                            <p>
                                Localização:
                                ${escapar(
                                    ferramenta.localizacao ||
                                    "Não informada"
                                )}
                            </p>

                            <span class="status ${
                                ferramenta.status === "Disponível"
                                    ? "status-concluido"
                                    : ferramenta.status === "Em uso"
                                        ? "status-agendado"
                                        : "status-pendente"
                            }">
                                ${escapar(ferramenta.status)}
                            </span>

                        </div>

                        <div class="item-acoes">

                            <button
                                class="btn-pequeno"
                                data-acao="editar"
                                data-tipo="ferramenta"
                                data-id="${ferramenta.id}"
                            >
                                Editar
                            </button>

                            <button
                                class="btn-pequeno btn-excluir"
                                data-acao="excluir"
                                data-tipo="ferramenta"
                                data-id="${ferramenta.id}"
                            >
                                Excluir
                            </button>

                        </div>

                    </div>
                `;

            }).join("");

    }


    /* ==========================================
       RENDER PEDIDOS
       ========================================== */

    function renderPedidos() {

        const lista =
            document.getElementById(
                "listaPedidos"
            );


        if (!pedidos.length) {

            lista.innerHTML = `
                <div class="lista-vazia">
                    <div>📋</div>
                    <h3>Nenhum pedido cadastrado</h3>
                    <p>Clique em "Novo Pedido" para começar.</p>
                </div>
            `;

            renderPedidosRecentes();

            return;

        }


        const pesquisa =
            (
                document.getElementById(
                    "pesquisaPedido"
                )?.value || ""
            ).toLowerCase();


        const filtro =
            document.getElementById(
                "filtroStatus"
            )?.value || "todos";


        const filtrados =
            pedidos.filter(function (pedido) {

                const texto =
                    `
                    ${pedido.cliente || ""}
                    ${pedido.servico || ""}
                    ${pedido.tecnico || ""}
                    `.toLowerCase();


                const correspondePesquisa =
                    texto.includes(pesquisa);


                const correspondeStatus =
                    filtro === "todos" ||
                    pedido.status === filtro;


                return (
                    correspondePesquisa &&
                    correspondeStatus
                );

            });


        if (!filtrados.length) {

            lista.innerHTML = `
                <div class="lista-vazia">
                    <div>🔎</div>
                    <h3>Nenhum resultado</h3>
                    <p>Não encontramos pedidos com esses filtros.</p>
                </div>
            `;

            renderPedidosRecentes();

            return;

        }


        lista.innerHTML =
            filtrados.map(function (pedido) {

                return `
                    <div class="item-card">

                        <div class="item-info">

                            <h3>
                                ${escapar(
                                    pedido.cliente ||
                                    "Cliente não informado"
                                )}
                            </h3>

                            <p>
                                🔧 Serviço:
                                ${escapar(
                                    pedido.servico ||
                                    "Não informado"
                                )}
                            </p>

                            <p>
                                👨‍🔧 Técnico:
                                ${escapar(
                                    pedido.tecnico ||
                                    "Não informado"
                                )}
                            </p>

                            <p>
                                📅 ${escapar(
                                    pedido.data ||
                                    "Sem data"
                                )}
                                às
                                ${escapar(
                                    pedido.horario ||
                                    "Sem horário"
                                )}
                            </p>

                            <p>
                                💰 R$
                                ${formatarMoeda(
                                    pedido.valor
                                )}
                            </p>

                            <span class="status ${classeStatus(
                                pedido.status
                            )}">
                                ${escapar(
                                    pedido.status ||
                                    "Pendente"
                                )}
                            </span>

                        </div>

                        <div class="item-acoes">

                            <button
                                class="btn-pequeno"
                                data-acao="status-pedido"
                                data-id="${pedido.id}"
                            >
                                Próximo status
                            </button>

                            <button
                                class="btn-pequeno"
                                data-acao="editar"
                                data-tipo="pedido"
                                data-id="${pedido.id}"
                            >
                                Editar
                            </button>

                            <button
                                class="btn-pequeno btn-excluir"
                                data-acao="excluir"
                                data-tipo="pedido"
                                data-id="${pedido.id}"
                            >
                                Excluir
                            </button>

                        </div>

                    </div>
                `;

            }).join("");


        renderPedidosRecentes();

    }


    /* ==========================================
       PEDIDOS RECENTES
       ========================================== */

    function renderPedidosRecentes() {

        const lista =
            document.getElementById(
                "pedidosRecentes"
            );


        if (!pedidos.length) {

            lista.innerHTML = `
                <div>📋</div>
                <h3>Nenhum pedido cadastrado</h3>
                <p>Os pedidos criados aparecerão aqui.</p>
            `;

            return;

        }


        const recentes =
            [...pedidos]
                .reverse()
                .slice(0, 5);


        lista.className =
            "lista-cards";


        lista.innerHTML =
            recentes.map(function (pedido) {

                return `
                    <div class="item-card">

                        <div class="item-info">

                            <h3>
                                ${escapar(
                                    pedido.cliente ||
                                    "Cliente"
                                )}
                            </h3>

                            <p>
                                ${escapar(
                                    pedido.servico ||
                                    "Serviço"
                                )}
                            </p>

                            <span class="status ${classeStatus(
                                pedido.status
                            )}">
                                ${escapar(
                                    pedido.status
                                )}
                            </span>

                        </div>

                    </div>
                `;

            }).join("");

    }


    /* ==========================================
       PESQUISA
       ========================================== */

    const pesquisaCliente =
        document.getElementById(
            "pesquisaCliente"
        );


    if (pesquisaCliente) {

        pesquisaCliente.addEventListener(
            "input",
            function () {

                const termo =
                    this.value.toLowerCase();


                const cards =
                    document.querySelectorAll(
                        "#listaClientes .item-card"
                    );


                cards.forEach(function (card) {

                    const texto =
                        card.textContent.toLowerCase();


                    card.style.display =
                        texto.includes(termo)
                            ? "flex"
                            : "none";

                });

            }
        );

    }


    const pesquisaPedido =
        document.getElementById(
            "pesquisaPedido"
        );


    if (pesquisaPedido) {

        pesquisaPedido.addEventListener(
            "input",
            renderPedidos
        );

    }


    const filtroStatus =
        document.getElementById(
            "filtroStatus"
        );


    if (filtroStatus) {

        filtroStatus.addEventListener(
            "change",
            renderPedidos
        );

    }


    /* ==========================================
       CONTADORES
       ========================================== */

    function atualizarContadores() {

        document.getElementById(
            "totalPedidos"
        ).textContent = pedidos.length;


        document.getElementById(
            "totalPendentes"
        ).textContent =
            pedidos.filter(function (pedido) {

                return (
                    pedido.status === "Pendente" ||
                    pedido.status === "Agendado"
                );

            }).length;


        document.getElementById(
            "totalServicos"
        ).textContent =
            servicos.length;


        document.getElementById(
            "totalClientes"
        ).textContent =
            clientes.length;


        document.getElementById(
            "relatorioPedidos"
        ).textContent =
            pedidos.length;


        document.getElementById(
            "relatorioClientes"
        ).textContent =
            clientes.length;


        document.getElementById(
            "relatorioServicos"
        ).textContent =
            servicos.length;


        document.getElementById(
            "relatorioTecnicos"
        ).textContent =
            tecnicos.length;

    }


    /* ==========================================
       ATUALIZAR TUDO
       ========================================== */

    function atualizarTudo() {

        atualizarContadores();

        renderClientes();

        renderServicos();

        renderTecnicos();

        renderFerramentas();

        renderPedidos();

    }


    /* ==========================================
       FUNÇÕES AUXILIARES
       ========================================== */

    function formatarMoeda(valor) {

        const numero =
            parseFloat(valor) || 0;


        return numero.toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    }


    function classeStatus(status) {

        if (status === "Pendente") {
            return "status-pendente";
        }

        if (status === "Agendado") {
            return "status-agendado";
        }

        if (status === "Em andamento") {
            return "status-andamento";
        }

        if (status === "Concluído") {
            return "status-concluido";
        }

        if (status === "Cancelado") {
            return "status-cancelado";
        }

        return "status-pendente";

    }


    function escapar(valor) {

        return String(valor ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* ==========================================
       INICIALIZAÇÃO
       ========================================== */

    atualizarTudo();

    abrirPagina("inicio");


    console.log(
        "PDV de Pedidos carregado com sucesso."
    );

});