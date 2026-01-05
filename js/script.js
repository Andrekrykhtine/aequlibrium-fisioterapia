document.addEventListener('DOMContentLoaded', function () {
    // Gallery Modal Logic (Existing)
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
        galleryModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const imgSrc = button.querySelector('img').src;
            const modalImage = document.getElementById('galleryModalImage');
            if (modalImage) {
                modalImage.src = imgSrc;
            }
        });
    }

    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            const whatsappNumber = '5511999999999';

            let text = `Olá, gostaria de agendar uma consulta.\n\n`;
            text += `*Nome:* ${name}\n`;
            text += `*Telefone:* ${phone}\n`;
            text += `*Serviço:* ${service}\n`;
            if (message) {
                text += `*Mensagem:* ${message}`;
            }

            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

            window.open(whatsappUrl, '_blank');
        });
    }
});
