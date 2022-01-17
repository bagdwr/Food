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
            modal = document.querySelector('.modal'),
            modalCloseBtn = document.querySelector('[data-close]');

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

        modalCloseBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (event) => {
            if (event.target && event.target === modal) {
                closeModal()
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.code === "Escape" && modal.classList.contains('show')) {
                closeModal();
            }
        });

        // const modalTimerId = setTimeout(openModal, 5000);

        function showModalByScroll(){
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1) {
                openModal();
                window.removeEventListener('scroll',showModalByScroll);
            }
        }

        window.addEventListener('scroll',showModalByScroll);

        // Cards
        class Card{
            constructor(src,alt,title,descr,price,parentSelector){
                this.src=src;
                this.alt=alt;
                this.title=title;
                this.descr=descr;
                this.price=price;
                this.parent=document.querySelector(parentSelector);
                this.transfer=430;
            }

            changeToKZT(){
                this.price=this.price*this.transfer;
            }
            render(){
                const element=document.createElement('div');
                element.innerHTML=`
                        <div class="menu__item">
                            <img src=${this.src} alt=${this.alt}>
                            <h3 class="menu__item-subtitle">${this.title}</h3>
                            <div class="menu__item-descr">${this.descr}</div>
                            <div class="menu__item-divider"></div>
                            <div class="menu__item-price">
                                <div class="menu__item-cost">Цена:</div>
                                <div class="menu__item-total"><span>${this.price}</span> тг/день</div>
                            </div>
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
                 ".menu .container"
                 ).render();
        new Card("img/tabs/elite.jpg",
                "elite",
                `Меню “Премиум"`,
                'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
                550,
                ".menu .container").render();
        new Card("img/tabs/post.jpg",
                "post",
                `Меню "Постное"`,
                'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
                430,
                ".menu .container").render();
    });