import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
export const exportToPDF = async (element: any) => {
  const canvas = await html2canvas(element, { scale: 2 })
  const imgData = canvas.toDataURL('image/png')

  const pdf = new jsPDF('p', 'mm', 'a4')
  const pdfWidth = pdf.internal.pageSize.getWidth()
  let pdfHeight = (canvas.height * pdfWidth) / canvas.width
  pdfHeight += 0
  let heightLeft = pdfHeight
  let position = 0
  while (heightLeft > 0) {
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight)
    heightLeft -= pdf.internal.pageSize.getHeight()
    if (heightLeft > 0) {
      pdf.addPage()
      position = -pdf.internal.pageSize.getHeight()
    }
  }
  pdf.save('report-statement.pdf')
}
