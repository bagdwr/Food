window.addEventListener('DOMContentLoaded', () => {
    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(tab => {
            // tab.style.display = 'none';
            tab.classList.add('hide');
            tab.classList.remove('show','fade');
        });

        tabs.forEach(tabItem => {
            tabItem.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show','fade');
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
    const deadLine='2022-02-02';

    function getTimeRemaining(endtime){
        const t=Date.parse(deadLine)-Date.parse(new Date),
              days=Math.floor(t/(1000*60*60*24)),
              hours=Math.floor((t/(1000*60*60))%24), 
              mins=Math.floor((t/(1000*60))%60),
              sec=Math.floor((t/1000)%60);
        return {
            'total':t,
            'days':days,
            'hours':hours,
            'mins':mins,
            'sec':sec
        };
    }

    function getZero(num){
        if(num<10){
            return "0"+num;
        }

        return num;
    }

    function setClock(selector, endtime){
        const timer=document.querySelector(selector),
              days=document.querySelector('#days'),
              hours=document.querySelector('#hours'),
              minutes=document.querySelector('#minutes'),
              seconds=document.querySelector('#seconds'),
              timeInterval=setInterval(updateClock,1000);
        updateClock();
        function updateClock(){
            const t=getTimeRemaining(endtime);
            console.log(t);
            days.textContent=getZero(t.days);
            hours.textContent=getZero(t.hours);
            minutes.textContent=getZero(t.mins);
            seconds.textContent=getZero(t.sec);

            if(t.total<=0){
                clearInterval(timeInterval);
            }
        }      
    }

    setClock('.timer',deadLine);
});