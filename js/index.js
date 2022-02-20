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
        const deadLine = '2022-09-15';

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

        // Cards
        class Card {
            constructor(src, alt, title, descr, price, parentSelector, ...classes) {
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.parent = document.querySelector(parentSelector);
                this.transfer = 430;
                this.classes = classes;
            }

            changeToKZT() {
                this.price = this.price * this.transfer;
            }
            render() {
                const element = document.createElement('div');
                if (this.classes.length === 0) {
                    this.classes = ["menu__item"];
                }
                this.classes.forEach(className => element.classList.add(className));
                element.innerHTML = `
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

        const getResource = async (url) => {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Couldn't fetch ${url}, status: ${res.status} `);
            }
            return await res.json();
        };

        getResource("http://localhost:3000/menu")
            .then(data => {
                data.forEach(({
                    img,
                    altimg,
                    title,
                    descr,
                    price
                }) => {
                    new Card(img, altimg, title, descr, price, ".menu .container").render();
                });
            });

        //Using without Card class    

        // getResource("http://localhost:3000/menu")
        //  .then(data=>createCard(data));

        // function createCard(data){
        //     data.forEach(({img,altimg,title,descr,price})=>{
        //         const element=document.createElement("div");
        //         element.classList.add("menu__item");
        //         element.innerHTML=`
        //                     <img src=${img} alt=${altimg}>
        //                     <h3 class="menu__item-subtitle">${title}</h3>
        //                     <div class="menu__item-descr">${descr}</div>
        //                     <div class="menu__item-divider"></div>
        //                     <div class="menu__item-price">
        //                         <div class="menu__item-cost">Цена:</div>
        //                         <div class="menu__item-total"><span>${price}</span> тг/день</div>
        //                     </div>
        //         `;
        //         document.querySelector('.menu .container').append(element);
        //     });
        // }    

        //Fetch API form
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

        // Slider
        const slides = document.querySelectorAll(".offer__slide"),
            slider=document.querySelector(".offer__slider"),
            prev = document.querySelector(".offer__slider-prev"),
            next = document.querySelector(".offer__slider-next"),
            total=document.querySelector("#total"),
            current=document.querySelector("#current"),
            slidesWrapper=document.querySelector(".offer__slider-wrapper"),
            slidesField=document.querySelector(".offer__slider-inner"),
            width=window.getComputedStyle(slidesWrapper).width;
            
        let slideIndex = 1;
        let offset=0;
        
        if(slides.length<10){
            total.textContent=`0${slides.length}`;
            current.textContent=`0${slideIndex}`;
        }else{
            total.textContent=slides.length;
            current.textContent=slideIndex;
        }

        slidesField.style.width=100*slides.length+"%";
        slidesField.style.display="flex";
        slidesField.style.transition="0.5s all";

        slidesWrapper.style.overflow="hidden";

        slides.forEach(slide=>{
            slide.style.width=width;
        });

        slider.style.position="relative";
        const indicators=document.createElement("ol"),
              dots=[];
        indicators.classList.add("carousel-indicators");
        indicators.style.cssText=`
            position:absolute;
            right:0;
            bottom:0;
            left:0;
            z-index:15;
            display:flex;
            justify-content:center;
            margin-right:15%;
            margin-left:15%;
            list-style:none;
        `;
        for(let i=0; i<slides.length; i++){
            const dot=document.createElement("li");
            dot.setAttribute("data-slide-to",i+1);
            dot.style.cssText=`
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 30px;
                height: 6px;
                margin-right: 3px;
                margin-left: 3px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: .5;
                transition: opacity .6s ease;
            `;
            if(i==0){
                dot.style.opacity=1;
            }
            dots.push(dot);
            indicators.append(dot);
        }
        slider.append(indicators);

        function changeValue(slideInd){
            if(slideInd<10){
                current.textContent=`0${slideInd}`;
            }else{
                current.textContent=`${slideInd}`;
            }

            dots.forEach(dot=>dot.style.opacity=".5");  
            dots[slideInd-1].style.opacity=1;
        }

        next.addEventListener('click',()=>{
            if(offset==width.replace(/\D/g,'')*(slides.length-1)){
                offset=0;
            }else{
                offset+=+width.replace(/\D/g,'');
            }
            slidesField.style.transform=`translateX(-${offset}px)`;

                if(slideIndex==slides.length){
                    slideIndex=1;
                }else{
                    slideIndex++;
                }

                changeValue(slideIndex);
          
        });
        prev.addEventListener("click",()=>{
            if(offset==0){
                offset+=+width.replace(/\D/g,'')*(slides.length-1);
            }else{
                offset-=+width.replace(/\D/g,'');
            }
            slidesField.style.transform=`translateX(-${offset}px)`;

            if(slideIndex==1){
                slideIndex=slides.length;
            }else{
                slideIndex--;
            }

            changeValue(slideIndex);
        });

        dots.forEach(dot=>{
            dot.addEventListener("click",(e)=>{
                const slideTo=e.target.getAttribute("data-slide-to");
                
                slideIndex=slideTo;
                offset=+width.slice(0,width.length-2)*(slideTo-1);
                slidesField.style.transform=`translateX(-${offset}px)`;

                changeValue(slideIndex);
            });
        });

        const changeAutomaticNext=()=>{
            if(offset==width.replace(/\D/g,'')*(slides.length-1)){
                offset=0;
            }else{
                offset+=+width.replace(/\D/g,'');
            }
            slidesField.style.transform=`translateX(-${offset}px)`;

                if(slideIndex==slides.length){
                    slideIndex=1;
                }else{
                    slideIndex++;
                }

                changeValue(slideIndex);
        }

        setInterval(changeAutomaticNext,3000);

        //Calculator
        const result=document.querySelector(".calculating__result span");
        let sex="female",height,weight,age,ratio="1.375";

        function calcTotal(){
            if(!sex || !height || !weight || !age || !ratio){
                result.textContent="____";
                return;
            }

            if(sex==='female'){
                result.textContent=Math.round((447.6 + (9.2 *weight) + (3.1 *height) - (4.3 *age))*ratio);
            }else{
                result.textContent=Math.round((88.36 + (13.4 *weight) + (4.8 *height) - (5.7 *age))*ratio);
            }
        }

        calcTotal();

        function getStaticInformation(parentSelector, activeClass){
            const elements=document.querySelectorAll(`${parentSelector} div`);

            elements.forEach(elem=>{
                elem.addEventListener("click",(event)=>{
                    if(event.target.getAttribute('data-ratio')){
                        ratio=+event.target.getAttribute('data-ratio');
                    }else{
                        sex=event.target.getAttribute("id");
                    }
                    console.log(ratio,sex);
                    elements.forEach(elem=>
                        elem.classList.remove(activeClass));
                     
                    event.target.classList.add(activeClass);
                    
                    calcTotal();   
            });
            });
        }

        getStaticInformation("#gender","calculating__choose-item_active");
        getStaticInformation(".calculating__choose_big","calculating__choose-item_active");

        function getDynamicInformation(selector){
            const input=document.querySelector(selector);

            input.addEventListener("input",()=>{
                    switch(input.getAttribute("id")){
                        case "height":
                            height=+input.value;
                            break;
                        case "weight":
                            weight=+input.value;
                            break;
                        case "age":
                            age=+input.value;
                            break;        
                    };

                    calcTotal();
            });
        }

        getDynamicInformation("#height");
        getDynamicInformation("#weight");
        getDynamicInformation("#age");


    });