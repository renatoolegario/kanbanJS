# Projeto Kanban com Javascript Puro

Este é um projeto Kanban desenvolvido em Javascript puro que permite gerenciar fluxos de trabalho com várias etapas e configurações personalizadas. O projeto é composto por três colunas principais: "Novo Contato," "Evento de Entrada," e "Evento de Saída."

## Configurações das Colunas

### Novo Contato

Nesta coluna, você pode adicionar novos contatos que precisam ser processados. Você tem as seguintes opções:

- **Subir Contato Individual:** Permite adicionar um único contato manualmente.
- **Subir Contato por Lista:** Permite importar uma lista de contatos para processamento em lote.

### Evento de Entrada

Na coluna "Evento de Entrada," você pode configurar como a entrada de contatos é tratada. As configurações incluem:

- **Modelo de Mensagem a Enviar:** Defina um modelo de mensagem que será enviada automaticamente aos contatos quando entram nesta etapa.
- **Modelo de Arquivo a Enviar:** Especifique um modelo de arquivo que será enviado junto com a mensagem.

### Evento de Saída

A coluna "Evento de Saída" é onde você pode definir as ações a serem tomadas quando os contatos deixam esta etapa. Existem duas opções:

- **Saídas Positivas:** Configure palavras-chave ou textos que, quando encontrados nas respostas dos contatos, os movem automaticamente para a próxima etapa.
- **Saídas Negativas:** Defina palavras-chave ou textos que, ao serem encontrados nas respostas dos contatos, encerram o atendimento automaticamente.

Este projeto Kanban oferece uma maneira eficiente de gerenciar seus contatos e automatizar partes do processo de atendimento. Sinta-se à vontade para personalizar as configurações de acordo com as necessidades do seu fluxo de trabalho.
