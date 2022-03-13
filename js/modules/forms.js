function forms(){
    const forms = document.querySelectorAll('form');
    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо, Скоро мы с вами свяжемся",
        failure: "Что то пошло не так!"
    }

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display:block;
                margin:0px auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            const dataaa = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(dataaa.entries()));

            // const jsonForm=JSON.stringify(object);
            // request.send(jsonForm);

            // request.send(dataaa);

            postData("http://localhost:3000/requests", json)
                .then(data => data.text())
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });

            //npx json-server --watch db.json

        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        if (!modal.classList.contains('show')) {
            openModal();
        }

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
            </div>
        `;
        modal.append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    forms.forEach(item => {
        bindPostData(item);
    });
}

module.exports=forms;