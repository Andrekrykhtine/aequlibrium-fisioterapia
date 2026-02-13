document.addEventListener("DOMContentLoaded", () => {
  initGallery();
  initAppointmentForm();
});

function initGallery() {
  const galleryModal = document.getElementById("galleryModal");
  if (!galleryModal) return;

  galleryModal.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget;
    const imgSrc = button.querySelector("img").src;
    const modalImage = document.getElementById("galleryModalImage");

    if (modalImage) {
      modalImage.src = imgSrc;
    }
  });
}

function initAppointmentForm() {
  const appointmentForm = document.getElementById("appointmentForm");
  if (!appointmentForm) return;

  appointmentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateForm(appointmentForm)) {
      return;
    }

    const formData = getFormData();
    sendToWhatsApp(formData);
  });
}

function getFormData() {
  return {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    service: document.getElementById("service").value,
    message: document.getElementById("message").value.trim(),
  };
}

/**
 * @param {HTMLFormElement} form
 * @returns {boolean}
 */
function validateForm(form) {
  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }
  return true;
}

/**
 * @param {Object} data
 */
function sendToWhatsApp(data) {
  const whatsappNumber = "5511999999999";

  let text = `*Nova Solicitação de Agendamento*\n\n`;
  text += `*Nome:* ${data.name}\n`;
  text += `*Telefone:* ${data.phone}\n`;
  text += `*Serviço:* ${data.service}\n`;

  if (data.message) {
    text += `*Mensagem:* ${data.message}`;
  }

  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;


  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}
