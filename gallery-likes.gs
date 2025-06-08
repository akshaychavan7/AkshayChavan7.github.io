function doGet(req) {
  var doc = SpreadsheetApp.openById('1g_3EYOmSTU1S9EvqX2XMPZTsZYb1kBwSfhL4OcECqbY');
  var sheet = doc.getSheetByName('gallery_likes');
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = doc.insertSheet('gallery_likes');
    // Set up headers and formatting
    sheet.getRange('A1:B1').setValues([['Image ID', 'Like Count']]);
    sheet.getRange('A1:B1').setFontWeight('bold');
    sheet.setColumnWidths(1, 2, 100);
  }

  var action = req.parameter.action;
  
  if (action === 'getLikes') {
    return getLikes(sheet);
  } else if (action === 'updateLikes') {
    return updateLikes(sheet, req.parameter);
  } else if (action === 'syncGallery') {
    return syncGallery(sheet, req.parameter);
  } else if (action === 'getNextId') {
    return getNextId(sheet);
  } else if (action === 'registerImage') {
    return registerImage(sheet, req.parameter);
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: 'Invalid action'
  })).setMimeType(ContentService.MimeType.JSON);
}

function getLikes(sheet) {
  var data = sheet.getDataRange().getValues();
  var likes = {};
  
  // Skip header row
  for (var i = 1; i < data.length; i++) {
    if (data[i][0]) { // Only include rows that have an ID
      likes[data[i][0]] = data[i][1];
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    likes: likes
  })).setMimeType(ContentService.MimeType.JSON);
}

function updateLikes(sheet, params) {
  var id = params.id;
  var likes = params.likes;
  
  if (!id || !likes) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Missing required parameters'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  var data = sheet.getDataRange().getValues();
  var rowIndex = -1;
  
  // Find existing row
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      rowIndex = i + 1;
      break;
    }
  }
  
  if (rowIndex === -1) {
    // Add new row
    sheet.appendRow([id, likes]);
  } else {
    // Update existing row
    sheet.getRange(rowIndex, 2).setValue(likes);
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success'
  })).setMimeType(ContentService.MimeType.JSON);
}

function syncGallery(sheet, params) {
  var currentIds = JSON.parse(params.ids);
  var data = sheet.getDataRange().getValues();
  var rowsToDelete = [];
  
  // Find rows to delete (images that no longer exist)
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] && !currentIds.includes(data[i][0])) {
      rowsToDelete.push(i + 1);
    }
  }
  
  // Delete rows from bottom to top to avoid index shifting
  for (var i = rowsToDelete.length - 1; i >= 0; i--) {
    sheet.deleteRow(rowsToDelete[i]);
  }
  
  // Add new images with 0 likes
  currentIds.forEach(id => {
    var exists = false;
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] == id) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      sheet.appendRow([id, 0]);
    }
  });
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Gallery synchronized'
  })).setMimeType(ContentService.MimeType.JSON);
}

function getNextId(sheet) {
  var data = sheet.getDataRange().getValues();
  var maxId = 0;
  
  // Find the highest ID in use
  for (var i = 1; i < data.length; i++) {
    if (data[i][0]) {
      maxId = Math.max(maxId, parseInt(data[i][0]));
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    nextId: maxId + 1
  })).setMimeType(ContentService.MimeType.JSON);
}

function registerImage(sheet, params) {
  var id = params.id;
  var imageUrl = params.imageUrl;
  var title = params.title;
  
  if (!id || !imageUrl) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Missing required parameters'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  var data = sheet.getDataRange().getValues();
  
  // Check if ID already exists
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Image already registered'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  // Add new row with 0 likes
  sheet.appendRow([id, 0]);
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Image registered successfully'
  })).setMimeType(ContentService.MimeType.JSON);
} 