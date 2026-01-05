/**
 * Aequilibrium Fisioterapia - Main Script
 * Optimized for performance and readability.
 */

document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initAppointmentForm();
});

/**
 * Initialize the Image Gallery Modal
 * Handles the logic for displaying images in a bootstrap modal.
 */
function initGallery() {
    const galleryModal = document.getElementById('galleryModal');
    if (!galleryModal) return;

    galleryModal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget;
        const imgSrc = button.querySelector('img').src;
        const modalImage = document.getElementById('galleryModalImage');

        if (modalImage) {
            modalImage.src = imgSrc;
            // Clear src on close to stop loading/memory usage if video or large image
            // optional but good practice
        }
    });
}

/**
 * Initialize Appointment Form Logic
 * Handles validation and WhatsApp redirection.
 */
function initAppointmentForm() {
    const appointmentForm = document.getElementById('appointmentForm');
    if (!appointmentForm) return;

    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validateForm(appointmentForm)) {
            return;
        }

        const formData = getFormData();
        sendToWhatsApp(formData);
    });
}

/**
 * extract form data
 */
function getFormData() {
    return {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        service: document.getElementById('service').value,
        message: document.getElementById('message').value.trim()
    };
}

/**
 * Basic Validation
 * @param {HTMLFormElement} form 
 * @returns {boolean} isValid
 */
function validateForm(form) {
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }
    return true;
}

/**
 * Constructs the WhatsApp URL and opens it.
 * @param {Object} data 
 */
function sendToWhatsApp(data) {
    const whatsappNumber = '5511999999999'; // Replace with actual number

    let text = `*Nova Solicitação de Agendamento*\n\n`;
    text += `*Nome:* ${data.name}\n`;
    text += `*Telefone:* ${data.phone}\n`;
    text += `*Serviço:* ${data.service}\n`;

    if (data.message) {
        text += `*Mensagem:* ${data.message}`;
    }

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    // Specific window open feature for security
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}
