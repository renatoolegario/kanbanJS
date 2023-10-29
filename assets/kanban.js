
		function addContKanban() {
			var nColuna = document.getElementById('nColunaKanban').value;
			var telefone = document.getElementById('telefoneAdd').value;
			var nome = document.getElementById('nomeAdd').value;
			var descricao = document.getElementById('descricaoAdd').value;
			var timestampAtual = new Date().getTime();
			var timestampAtualEmSegundos = Math.floor(timestampAtual / 1000);
			
			if(telefone == "" || nome == "" || descricao == ""){
				document.getElementById('tituloAddContato').innerText = 'Todos os dados devem ser preenchidos';
			}else{ 

				var cardInfo = {
					id: timestampAtualEmSegundos,
					foto: "",
					nome: nome,
					telefone: telefone,
					descricao: descricao,
					status: "",
					entradaC1: "",
					entradaC2: "",
					entradaC3: "",
					entradaC4: "",
					entradaC5: "",
					dtFinal: ""
				};

				// Verifique se o kanban já existe no localStorage, se não, crie um novo
				var kanban = JSON.parse(localStorage.getItem(nColuna)) || { cartoes: [] };

				kanban.cartoes.push(cardInfo);

				// Salve o kanban atualizado de volta no localStorage
				localStorage.setItem(nColuna, JSON.stringify(kanban));
				verificarColunasNoLocalStorage();
				fecharAddC();
			}
			
		}

		function fecharAddC(){
		
			const addContatosKanban = document.getElementById('addContatosKanban');
				addContatosKanban.style.display = "none";
				addContatosKanban.style.zIndex = "-10";
				
				document.getElementById('nColunaKanban').value = "";
				document.getElementById('telefoneAdd').value = "";
				document.getElementById('nomeAdd').value = "";
				document.getElementById('descricaoAdd').value = "";
		
		}
		
		function addC(n){
			
			let kanban = 'kanbanC' + n;
			document.getElementById('nColunaKanban').value = kanban;
			
			kanban = localStorage.getItem(kanban)
			const columnData = JSON.parse(kanban);			
			
			const addContatosKanban = document.getElementById('addContatosKanban');
				addContatosKanban.style.display = "";
				addContatosKanban.style.zIndex = "888";
				
				
		
		}
	
        // Função para verificar e criar as colunas no localStorage
        function verificarColunasNoLocalStorage() {
		
			for(i= 1; i <= 5; i++){
                var columnId = "kanbanC" + i;
                var columnData = localStorage.getItem(columnId);
                var titleColum = "titleC" + i;

                if (!columnData) {
                    // Se a coluna não existe no localStorage, crie-a com valores padrão
                    var columnName = columnId;
                    var message = {
                        idImagem: "",
                        idMensagem: ""
                    };
                    var cards = [];
					

                    var columnData = {
                        nome: columnName, // Adicione o nome da coluna aqui
                        mensagem: message,
                        cartoes: cards
                    };

                    // Armazene a nova coluna no localStorage
                    localStorage.setItem(columnId, JSON.stringify(columnData));
                } 
				
				var columnData = localStorage.getItem(columnId);
				var columnData = JSON.parse(columnData);
				
				document.getElementById(titleColum).value = columnData.nome;
				//aqui vai fazer a verificação de todos os cartões que ela possui e fazer a inclusão na coluna do Kanban
				
				var cartoes = columnData.cartoes;
				var colum = document.getElementById(columnId);
				var cardsToRemove = colum.querySelectorAll('.card[draggable="true"]');
					cardsToRemove.forEach(function(card) {
						card.remove();
					});
				
				for (var j = 0; j < cartoes.length; j++) {					
					colum.appendChild(createCard(cartoes[j]));				 
				}
				
				
				
            }      
        }

        // Chame a função para verificar e criar as colunas no localStorage na carga inicial da página
        verificarColunasNoLocalStorage();

        function allowDrop(event) {
            event.preventDefault();
        }

        function drag(event) {
            event.dataTransfer.setData("text", event.target.id);
        }

        function drop(event, targetColumn) {
            event.preventDefault();
            var data = event.dataTransfer.getData("text");
            var target = document.getElementById(targetColumn);
            if (target.classList.contains("column")) {
			
			
				try {
				  target.appendChild(document.getElementById(data));
				  
				  let cardId = data * 1;
				
				// Lista das colunas
				var colunas = ["kanbanC1", "kanbanC2", "kanbanC3", "kanbanC4", "kanbanC5"];

				var columnAntigo = null;

				// Iterar sobre as colunas
				for (var i = 0; i < colunas.length; i++) {
					var columnId = colunas[i];
					var columnData = localStorage.getItem(columnId);

					
					if (columnData) {
						// Verifique se a ID está dentro do objeto armazenado
						var cartoes = JSON.parse(columnData).cartoes;
						
						for (var j = 0; j < cartoes.length; j++) {
							
							if (cartoes[j].id === cardId) {
								columnAntigo = columnId;
								break;
							}
						}

						if (columnAntigo) {
							break;
						}
					}
				}
				
				if(targetColumn == columnAntigo){}else{
					updateColumnStorage(targetColumn,columnAntigo,cardId);
				}
				  
				  
				} catch (error) {
				  // Faça algo se ocorrer um erro (Y)
				  verificarColunasNoLocalStorage();
				}
              
				
				
            }
        }

        function changeTitle(titleId) {
            var titleInput = document.getElementById(titleId);
            var columnId = titleId.replace("title", "kanban");
            var newTitle = titleInput.value;

            // Recupere os dados atuais da coluna no localStorage
            var columnData = localStorage.getItem(columnId);

            if (columnData) {
                // Parse dos dados existentes
                columnData = JSON.parse(columnData);

                // Atualize apenas o nome
                columnData.nome = newTitle;

                // Guarde os dados atualizados novamente no localStorage
                localStorage.setItem(columnId, JSON.stringify(columnData));
            }
        }

		function updateColumnStorage(currentColumn, previousColumn, cardId) {
				
				//console.log("Esta puxando aqui: Coluna atual: " + currentColumn + " | Coluna Antiga: " + previousColumn + " | ID : " + cardId);

				// Entrar dentro do ColumAntigo e capturar todo o array do cardId.
							
							
							// Obtenha os dados do cartão da coluna antiga
						var previousColumnData = localStorage.getItem(previousColumn);
						if (previousColumnData) {
							previousColumnData = JSON.parse(previousColumnData);
							var cartoes = previousColumnData.cartoes;

							// Encontre o cartão pelo ID
							var cardIndex = -1;
							for (var i = 0; i < cartoes.length; i++) {
								if (cartoes[i].id === cardId) {
									cardIndex = i;
									break;
								}
							}

							if (cardIndex !== -1) {
								// Remova o cartão da coluna antiga
								var cartaoMovido = cartoes.splice(cardIndex, 1)[0];

								// Obtenha os dados da coluna atual
								var currentColumnData = localStorage.getItem(currentColumn);
								if (currentColumnData) {
									currentColumnData = JSON.parse(currentColumnData);

									// Adicione o cartão à coluna atual
									currentColumnData.cartoes.push(cartaoMovido);

									// Atualize o localStorage para refletir as mudanças
									localStorage.setItem(previousColumn, JSON.stringify(previousColumnData));
									localStorage.setItem(currentColumn, JSON.stringify(currentColumnData));

									
								} else {
									console.log("Coluna atual não encontrada no localStorage.");
								}
							} else {
								console.log("Cartão não encontrado na coluna antiga.");
							}
						} else {
							console.log("Coluna antiga não encontrada no localStorage.");
						}
							
				
				
				
				
			  
			}

        for (var i = 1; i <= 5; i++) {
            var columnId = "kanbanC" + i;
            var columnData = localStorage.getItem(columnId);
            if (columnData) {
                columnData = JSON.parse(columnData);
                document.getElementById(columnId).value = columnData.nome;
                // Você pode preencher a mensagem automática e os cartões com os dados armazenados.
            }
        }

        // Adicione cartões ao painel com botão de movimentação e informações
        function createCard(objeto) {
		
			var id = objeto.id;
			var foto = objeto.foto;
			var nome = objeto.nome;
			var telefone = objeto.telefone;
			var descricao = objeto.descricao;
			var status = objeto.status;
			var entradaC1 = objeto.entradaC1;
			var entradaC2 = objeto.entradaC2;
			var entradaC3 = objeto.entradaC3;
			var entradaC4 = objeto.entradaC4;
			var entradaC5 = objeto.entradaC5;
			var dtFinal = objeto.dtFinal;
		
			if(foto == ""){foto = "https://www.promoview.com.br/uploads/images/unnamed%2819%29.png";}
			//cardId, foto, nome, telefone, descricao, status, dataEntrada, dataEntradaC1, dataEntradaC2, dataEntradaC3, dataEntradaC4, dataEntradaC5, dataFinalizacao
		
            var card = document.createElement("div");
            card.className = "card";
            card.draggable = true;
            card.id = id;

            card.ondragstart = function(event) {
                drag(event);
            };

            var cardContent = document.createElement("div");
            cardContent.className = "card-content";
            cardContent.innerHTML = `
                <table style="width:100%">
                    <tr>
                        <td>
                            <img src="${foto}" style="width: 45px; height: 45px; border-radius: 50%;">
                        </td>
                        <td>
                            <span>${nome}</span></br>
                            <span>${telefone}</span></br>
                            <span>🤖💬: ${descricao}</span></br>
                         
                        </td>

                    </tr>
					
					<tr>
						<td><button class="botaoMaisOpcao" onClick="maisOpcao(${id});"><span class="iconeMaisOpcoes">⋮</span></button></td>
						<td><button class="move-button" onClick="dropCardInNextColumn(${id});">Próxima etapa →</button></td>
						
					
					</tr>
					
					
                </table>
            `;


            card.appendChild(cardContent);

            return card;
        }

        function dropCardInNextColumn(cardId) {
			
            var currentColumnId = document.getElementById(cardId).parentElement.id;
            var currentIndex = parseInt(currentColumnId.replace("kanbanC", ""));
            var nextColumnIndex = (currentIndex % 5) + 1;
            var nextColumnId = "kanbanC" + nextColumnIndex;
            var target = document.getElementById(nextColumnId);
            if (target.classList.contains("column")) {
                target.appendChild(document.getElementById(cardId));

                // Atualizar o localStorage com as informações da coluna anterior
				var columnAntigo = "kanbanC" + currentIndex;
				
                updateColumnStorage(nextColumnId,columnAntigo,cardId);

            }
        }
 