function modal() {
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = "";
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (event) => {
        if (event.target && event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal()
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

}

module.exports = modal;