const getContentType = (extensao) => {
    try {
      switch (extensao) {
        case '.pdf':
          return 'application/pdf';
        case '.png':
          return 'image/png';
        case '.jpg':
        case '.jpeg':
          return 'image/jpeg';
        case '.bmp':
          return 'image/bmp';
        case '.svg':
          return 'image/svg+xml';
        case '.gif':
          return 'image/gif';
        default:
          return 'application/octet-stream';
      }
    } catch {
      throw new Error('Erro ao enviar extensao do arquivo.'); 
    }
}

module.exports = {
    getContentType
};