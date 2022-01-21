    window.addEventListener('DOMContentLoaded', () => {
        //tabs
        const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');

        function hideTabContent() {
            tabsContent.forEach(tab => {
                // tab.style.display = 'none';
                tab.classList.add('hide');
                tab.classList.remove('show', 'fade');
            });

            tabs.forEach(tabItem => {
                tabItem.classList.remove('tabheader__item_active');
            });
        }

        function showTabContent(i = 0) {
            // tabsContent[i].style.display = 'block';
            tabsContent[i].classList.remove('hide');
            tabsContent[i].classList.add('show', 'fade');
            tabs[i].classList.add('tabheader__item_active');
        }
        hideTabContent();
        showTabContent();

        tabsParent.addEventListener('click', (event) => {
            const target = event.target;
            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach((tab, i) => {
                    if (target == tab) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });

        //Timer
        const deadLine = '2022-02-02';

        function getTimeRemaining(endtime) {
            const t = Date.parse(deadLine) - Date.parse(new Date),
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60)) % 24),
                mins = Math.floor((t / (1000 * 60)) % 60),
                sec = Math.floor((t / 1000) % 60);
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'mins': mins,
                'sec': sec
            };
        }

        function getZero(num) {
            if (num < 10) {
                return "0" + num;
            }

            return num;
        }

        function setClock(selector, endtime) {
            const timer = document.querySelector(selector),
                days = document.querySelector('#days'),
                hours = document.querySelector('#hours'),
                minutes = document.querySelector('#minutes'),
                seconds = document.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);
            updateClock();

            function updateClock() {
                const t = getTimeRemaining(endtime);
                days.textContent = getZero(t.days);
                hours.textContent = getZero(t.hours);
                minutes.textContent = getZero(t.mins);
                seconds.textContent = getZero(t.sec);

                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }
        }

        setClock('.timer', deadLine);

        // Modal
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
            if (event.target && event.target === modal || event.target.getAttribute('data-close')=='') {
                closeModal()
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.code === "Escape" && modal.classList.contains('show')) {
                closeModal();
            }
        });

        const modalTimerId = setTimeout(openModal, 50000);

        function showModalByScroll(){
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1) {
                openModal();
                window.removeEventListener('scroll',showModalByScroll);
            }
        }

        window.addEventListener('scroll',showModalByScroll);

        // Cards
        class Card{
            constructor(src,alt,title,descr,price,parentSelector,...classes){
                this.src=src;
                this.alt=alt;
                this.title=title;
                this.descr=descr;
                this.price=price;
                this.parent=document.querySelector(parentSelector);
                this.transfer=430;
                this.classes=classes;
            }

            changeToKZT(){
                this.price=this.price*this.transfer;
            }
            render(){
                const element=document.createElement('div');
                if(this.classes.length===0){
                    this.classes=["menu__item"];
                }
                this.classes.forEach(className=>element.classList.add(className));
                element.innerHTML=`
                            <img src=${this.src} alt=${this.alt}>
                            <h3 class="menu__item-subtitle">${this.title}</h3>
                            <div class="menu__item-descr">${this.descr}</div>
                            <div class="menu__item-divider"></div>
                            <div class="menu__item-price">
                                <div class="menu__item-cost">Цена:</div>
                                <div class="menu__item-total"><span>${this.price}</span> тг/день</div>
                            </div>
                `;
                this.parent.append(element);
            }
        }
        new Card("img/tabs/vegy.jpg",
                 "vegy",
                 `Меню "Фитнес"`,
                 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
                 229,
                 ".menu .container",
                 "menu__item",
                 "big"
                 ).render();
        new Card("img/tabs/elite.jpg",
                "elite",
                `Меню “Премиум"`,
                'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
                550,
                ".menu .container",
                ).render();
        new Card("img/tabs/post.jpg",
                "post",
                `Меню "Постное"`,
                'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
                430,
                ".menu .container",
                "menu__item").render();

        //AJAX form
        const forms=document.querySelectorAll('form');
        const message={
            loading:"img/form/spinner.svg",
            success:"Спасибо, Скоро мы с вами свяжемся",
            failure:"Что то пошло не так!"
        }
        
        function postData(form){
            form.addEventListener('submit',(event)=>{
                event.preventDefault(); 

                const statusMessage=document.createElement('img');
                statusMessage.src=message.loading;
                statusMessage.style.cssText=`
                    display:block;
                    margin:0px auto;
                `;
                form.insertAdjacentElement('afterend',statusMessage);
               
                
                const request=new XMLHttpRequest();
                request.open('POST',"server.php");
                // request.setRequestHeader('Content-type','multipart/form-data');
                const dataaa=new FormData(form);

                //if Json
                // request.setRequestHeader('Content-type','application/json');
                // const object={};
                // dataaa.forEach(function(value,key){
                //     object[key]=value;
                // });
                // const jsonForm=JSON.stringify(object);
                // request.send(jsonForm);

                request.send(dataaa);
                request.addEventListener('load',()=>{
                    if(request.status===200){
                        console.log(request.response);
                        showThanksModal(message.success);
                        form.reset();
                        statusMessage.remove();
                    }else{
                        showThanksModal(message.failure);
                    }
                });
            })
        }

        function showThanksModal(message){
            const prevModalDialog=document.querySelector('.modal__dialog');
            prevModalDialog.classList.add('hide');
            if(!modal.classList.contains('show')){
               openModal();
            }

            const thanksModal=document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML=`
                <div class="modal__content">
                        <div data-close class="modal__close">&times;</div>
                        <div class="modal__title">${message}</div>
                </div>
            `;
            modal.append(thanksModal);
            setTimeout(()=>{
                thanksModal.remove();
                prevModalDialog.classList.remove('hide');
                closeModal();
            },4000);
        }

        forms.forEach(item=>{
            postData(item);
        });
    });