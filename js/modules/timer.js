function timer(){
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
}

module.exports=timer;