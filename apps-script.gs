const TARGET_FOLDER_ID = 'SUA_PASTA_DO_DRIVE_AQUI';
const SHEET_ID = ''; // Opcional: ID da planilha para registro dos dados

/**
 * Recebe POST JSON do frontend e salva o ZIP no Google Drive.
 */
function doPost(e) {
  try {
    const payload = parsePayload(e);
    const folder = DriveApp.getFolderById(TARGET_FOLDER_ID);
    const fileName = payload.filename || `POSSE_${Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss')}.zip`;
    const zipBlob = Utilities.newBlob(Utilities.base64Decode(payload.contents), 'application/zip', fileName);
    const file = folder.createFile(zipBlob);

    if (SHEET_ID && payload.data) {
      appendRecordToSheet(payload.data, file);
    }

    return jsonResponse({
      result: 'success',
      fileId: file.getId(),
      fileUrl: file.getUrl(),
      folder: folder.getName()
    });
  } catch (error) {
    return jsonResponse({
      result: 'error',
      error: error.message || error.toString()
    });
  }
}

/**
 * Parse o JSON recebido pelo Apps Script.
 */
function parsePayload(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Dados inválidos: payload não encontrado.');
  }
  return JSON.parse(e.postData.contents);
}

/**
 * Envia resposta JSON para o cliente.
 */
function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Registra os dados em uma planilha Google, se configurada.
 */
function appendRecordToSheet(data, file) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  const now = new Date();
  const row = [
    Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'),
    data.nome || '',
    data.cpf || '',
    data.email || '',
    data.celular || '',
    data.douNumero || '',
    data.douData || '',
    data.atoNumero || '',
    data.atoData || '',
    file.getUrl(),
    file.getId()
  ];
  sheet.appendRow(row);
}
