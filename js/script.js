"use strict";
window.addEventListener('DOMContentLoaded', () => {

    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
    //console.log(tabs);

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
    setClock('.timer', deadLine);

    //Modal
    const modal = document.querySelector('.modal'),
        modalTrigger = document.querySelectorAll('[data-modal]')

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

    modalTrigger.forEach((item) => {
        item.addEventListener('click', () => {
            openModal(modal);
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modal);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modal);
        }
    });

    const modalTimer = setTimeout(openModal, 300000, modal);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //Cards

    class Card {
        constructor(image, alt, header, description, price, parentSelector, ...classes) {
            this.image = image;
            this.alt = alt;
            this.header = header;
            this.description = description;
            this.price = price;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach((className) => {
                    element.classList.add(className);
                });
            }
            element.innerHTML = `
                    <img src=${this.image} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.header}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            document.querySelector('.menu .container').append(element);
        }
    }

    const getResource= async (url) => {
        const res = await fetch(url);
        if(!res.ok) {
           throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    // .then(data=>{
    //     data.forEach(({img, altImg, title, descr, price})=>{
    //         new Card(img, altImg, title, descr, price, '.menu .container').render();
    //     });
    // });

    axios.get('http://localhost:3000/menu')
    .then(obj => {
        obj.data.forEach(({img, altImg, title, descr, price})=>{
        new Card(img, altImg, title, descr, price, '.menu .container').render();
        });
    });


    //Forms

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'thanks, we will call you',
        failure: 'failed'
    };

    const forms = document.querySelectorAll('form');

    forms.forEach((item) => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url,{
            method:'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: data 
        });

        return await res.json();
    };
    

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src= message.loading;
            statusMessage.style.cssText = `
                display:block;
                margin:0 auto;
            `;
            form.insertAdjacentElement('afterend',statusMessage);

            const formData = new FormData(form);


            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests',json)
            .then(data=>{
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(()=>{
                showThanksModal(message.failure);
            }).finally(()=>{
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const oldModal = document.querySelector('.modal__dialog'); 
        oldModal.classList.add('hide');
        openModal(modal);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            oldModal.classList.remove('hide');
            oldModal.classList.add('show');
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));

    //Slider
    const offerSlider = document.querySelector('.offer__slider'),
        offerSliderWarpper = offerSlider.querySelector('.offer__slider-wrapper'),
        innerSliderWarpper = offerSlider.querySelector('.offer__slider-inner'),
        offerSliderCounter = offerSlider.querySelector('.offer__slider-counter'),
        offerSliderPrev = offerSliderCounter.querySelector('.offer__slider-prev'),
        offerSliderNext = offerSliderCounter.querySelector('.offer__slider-next'),
        currentSlide = offerSliderCounter.querySelector('#current'),
        totalSlides = offerSliderCounter.querySelector('#total'),
        offerSlides = offerSliderWarpper.querySelectorAll('.offer__slide'),
        width = window.getComputedStyle(offerSliderWarpper).width;
    let slideIndex = 1,
        offset=0;

    if(offerSlides.length<10){
        totalSlides.textContent = `0${offerSlides.length}`;
        currentSlide.textContent = `0${slideIndex}`;
    } else {
        totalSlides.textContent = offerSlides.length;
        currentSlide.textContent = slideIndex;
    }

    innerSliderWarpper.style.width = 100 * offerSlides.length + '%';
    innerSliderWarpper.style.display = 'flex';
    innerSliderWarpper.style.transition = '0.5s all';

    offerSliderWarpper.style.overflow = 'hidden';

    offerSlides.forEach(slide=>{
        slide.style.width=width;
    });

    offerSliderNext.addEventListener('click',()=>{
        if(offset==+width.slice(0,width.length-2)*(offerSlides.length-1)) {
            offset=0;
        } else {
            offset+=+width.slice(0,width.length-2);
        }
        innerSliderWarpper.style.transform=`translateX(-${offset}px)`;

        if(slideIndex==offerSlides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if(offerSlides.length<10){
            currentSlide.textContent = `0${slideIndex}`;
        } else {
            currentSlide.textContent = slideIndex;
        }
    
    });

    offerSliderPrev.addEventListener('click',()=>{
        if(offset==0) {
            offset=+width.slice(0,width.length-2)*(offerSlides.length-1);
        } else {
            offset-=+width.slice(0,width.length-2);
        }
        innerSliderWarpper.style.transform=`translateX(-${offset}px)`;

        if(slideIndex==1) {
            slideIndex = offerSlides.length;
        } else {
            slideIndex--;
        }

        if(offerSlides.length<10){
            currentSlide.textContent = `0${slideIndex}`;
        } else {
            currentSlide.textContent = slideIndex;
        }
    });

    // showSlides(slideIndex);

    // if(offerSlides.length<10){
    //     totalSlides.textContent = `0${offerSlides.length}`;
    // } else {
    //     totalSlides.textContent = offerSlides.length;
    // }

    // function showSlides(n) {
    //     if(n>offerSlides.length){
    //         slideIndex = 1;
    //     }
    //     if(n<1){
    //         slideIndex = offerSlides.length;
    //     }
    //     offerSlides.forEach(slide=>{
    //         slide.style.display='none';
    //     });
    //     offerSlides[slideIndex-1].style.display='block';

    //     if(slideIndex<10){
    //         currentSlide.textContent = `0${slideIndex}`;
    //     } else {
    //         currentSlide.textContent = slideIndex;
    //     }
    // }

    // function changeSlides(n) {
    //     showSlides(slideIndex+=n);
    // }

    // offerSliderPrev.addEventListener('click',()=>{
    //     changeSlides(-1);
    // });

    // offerSliderNext.addEventListener('click',()=>{
    //     changeSlides(1);
    // });
});