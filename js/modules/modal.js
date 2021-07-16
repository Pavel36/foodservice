function closeModal(modalSelector) {
    const elem = document.querySelector(modalSelector);
    elem.classList.add('hide');
    elem.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimer) {
    const elem = document.querySelector(modalSelector);
    elem.classList.add('show');
    elem.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if(modalTimer) {
        clearInterval(modalTimer);
    }
}

function modal( triggerSelector, modalSelector, modalTimer) {

    const modal = document.querySelector(modalSelector),
    modalTrigger = document.querySelectorAll(triggerSelector);


    modalTrigger.forEach((item) => {
        item.addEventListener('click', () => {
            openModal(modalSelector, modalTimer);
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimer);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {openModal};
export {closeModal};
