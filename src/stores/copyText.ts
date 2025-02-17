export const fallbackCopyText = (text: string) => {
  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()
  try {
    document.execCommand('copy')
  } catch (err) {
    console.error(err)
  }
  document.body.removeChild(textArea)
}
