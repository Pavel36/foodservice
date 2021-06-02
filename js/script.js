window.addEventListener('DOMContentLoaded', () => {

    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
    console.log(tabs);

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer
    const deadLine = '2021-06-06';

    function getTimeRemaning(endTime) {
        const res = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(res / (1000 * 60 * 60 * 24)),
            hours = Math.floor((res /(1000 * 60 * 60) % 24)),
            minutes = Math.floor((res / (1000 * 60) % 60)) ,
            seconds = Math.floor((res / 1000) % 60);
        return {
            'total': res,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();
        function getZero(num) {
            if(num>0 && num<10) {
                return `0${num}`;
            }
            else {
                return num;
            }
        }
        function updateClock() {
            const res = getTimeRemaning(endtime);
            days.innerHTML = getZero(res.days);
            hours.innerHTML = getZero(res.hours);
            minutes.innerHTML = getZero(res.minutes);
            seconds.innerHTML = getZero(res.seconds);

            if(res.total<=0)
            {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer',deadLine);

    //Modal
    const modal = document.querySelector('.modal'),
    modalTrigger = document.querySelectorAll('[data-modal]'),
    modalClose = document.querySelector('.modal__close');

    function closeModal(elem) {
        elem.classList.add('hide');
        elem.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal(elem) {
        elem.classList.add('show');
        elem.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }

    modalTrigger.forEach((item)=>{
        item.addEventListener('click', ()=>{
            openModal(modal);
        }); 
    });

    modalClose.addEventListener('click', ()=>{
       closeModal(modal);
    });

    modal.addEventListener('click',(e) => {
        if(e.target===modal) {
            closeModal(modal);
        }
    });

    document.addEventListener('keydown', (e)=>{
        if(e.code === "Escape" && modal.classList.contains('show')){
            closeModal(modal);
        }
    });

    const modalTimer = setTimeout(openModal,3000, modal);

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
});