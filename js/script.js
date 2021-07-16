import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import openModal from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimer = setTimeout(() => openModal('.modal', modalTimer), 300000, modal);

        tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
        modal('[data-modal]','.modal', modalTimer);
        timer('.timer','2021-10-10');
        cards();
        calc();
        forms('form', modalTimer);
        slider({
            container:'.offer__slider',
            wrapper:'.offer__slider-wrapper',
            field:'.offer__slider-inner',
            prevArrow:'.offer__slider-prev',
            nextArrow:'.offer__slider-next',
            slide:'.offer__slide',
            totalCounter:'#total',
            currentCounter:'#current',
            sliderCounter:'.offer__slider-counter'
        });
});