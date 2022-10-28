export const codeErrorsTranslate = (code) => {
  const translations = {
    'ER_DATA_TOO_LONG': 'Data too long for some column',
    'ER_DUP_ENTRY': 'There is already a company registered with this NIT'
  }

  return translations[code] || 'An error has ocurred, please try again';
}
