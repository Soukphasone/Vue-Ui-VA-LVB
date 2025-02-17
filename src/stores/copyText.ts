export const fallbackCopyText = (text: string) => {
  console.log("Text_Copy", text);
  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()
  try {
    document.execCommand('copy')
    console.log('Copied using execCommand')
  } catch (err) {
    console.error('Fallback: Copy failed', err)
  }
  document.body.removeChild(textArea)
}
