# formulario-posse
Versão 1.1.0

Formulário de posse de servidores nomeados do município de Palmas/TO.

## Sistema de Posse CAS - Instruções de Uso

### Visão Geral
Este projeto funciona apenas no frontend e envia o ZIP de documentação para um endpoint do Google Apps Script. Não há backend Node.js local em uso.

### Como usar
1. Crie ou importe um script no Google Apps Script usando o arquivo `apps-script.gs`.
2. Defina `TARGET_FOLDER_ID` no Apps Script com o ID da pasta do Google Drive onde os ZIPs serão salvos.
3. Publique o Apps Script como URL executável (Deploy > New deployment > Web app).
4. Defina `APPS_SCRIPT_URL` em `app.js` com a URL do deploy do Apps Script.
5. Abra `index.html` no navegador.
6. Preencha todos os campos obrigatórios e anexe os PDFs.
7. Clique em "Enviar documentação de posse".

### O que o app faz
- Valida campos obrigatórios do formulário
- Gera um ZIP com:
  - `DADOS_POSSE.txt`
  - todos os arquivos PDF enviados
- Envia o ZIP para o Apps Script
- Mostra mensagem de sucesso ou erro na tela

### Estrutura do projeto
```
posse-cas/
├── index.html          # Frontend do formulário
├── app.js              # Lógica de validação, ZIP e envio
├── style.css           # Estilos da página
├── apps-script.gs      # Código do Apps Script para salvar no Drive
└── README.md           # Instruções de uso
```

### Ajustes realizados
- Removido backend local e arquivos de configuração Node.js obsoletos
- Atualizado `app.js` para enviar JSON ao Apps Script
- Mantido a lógica de criação de ZIP e coleta de arquivos
- Documentação simplificada para App Script

### Observações
- O script do Apps Script deve processar o Base64 e salvar o arquivo no Google Drive.
- Se usar planilha Google, o Apps Script também pode registrar os dados do formulário.
- Certifique-se de manter a URL do Apps Script atualizada em `app.js`.
