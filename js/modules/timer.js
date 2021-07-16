function timer(timerID, deadLine) {

    function getTimeRemaning(endTime) {
        const res = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(res / (1000 * 60 * 60 * 24)),
            hours = Math.floor((res / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((res / (1000 * 60) % 60)),
            seconds = Math.floor((res / 1000) % 60);
        return {
            'total': res,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function getZero(num) {
            if (num > 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }

        function updateClock() {
            const res = getTimeRemaning(endtime);
            days.innerHTML = getZero(res.days);
            hours.innerHTML = getZero(res.hours);
            minutes.innerHTML = getZero(res.minutes);
            seconds.innerHTML = getZero(res.seconds);

            if (res.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(timerID, deadLine);
}

export default timer;