import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export function showAlert(
  title: string | HTMLElement,
  text: string,
  icon: 'success' | 'error' | 'warning' | 'info',
  confirmButtonText: string = 'Yes',
  cancelButtonText: string = 'No',
  progressBarColor: string = '#86e54c', // Default progress bar color
  confirmButtonColor: string = '#3085d6', // Default confirm button color
  cancelButtonColor: string = '#d33', // Default cancel button color
  showConfirmButton: boolean = true,
  showCancelButton: boolean = true,
  timer?: number
) {
  return Swal.fire({  // <-- Add return here
    title,
    text,
    icon,
    confirmButtonText,
    cancelButtonText,
    timer,
    timerProgressBar: true,
    showConfirmButton,
    showCancelButton,
    customClass: {
      popup: 'custom-swal', // Custom popup class
      confirmButton: 'custom-confirm-button', // Custom confirm button class
      cancelButton: 'custom-cancel-button' // Custom cancel button class
    },
    didOpen: () => {
      // Customize the progress bar color
      const progressBar = document.querySelector('.swal2-timer-progress-bar') as HTMLElement
      if (progressBar) {
        progressBar.style.backgroundColor = progressBarColor
      }

      // Customize confirm button color dynamically
      const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement
      if (confirmButton) {
        confirmButton.style.backgroundColor = confirmButtonColor
        confirmButton.style.borderColor = confirmButtonColor
      }

      // Customize cancel button color dynamically
      const cancelButton = document.querySelector('.swal2-cancel') as HTMLElement
      if (cancelButton) {
        cancelButton.style.backgroundColor = cancelButtonColor
        cancelButton.style.borderColor = cancelButtonColor
      }
    }
  });
}
