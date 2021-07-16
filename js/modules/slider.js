function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field, sliderCounter}) {

    const offerSlider = document.querySelector(container),
        offerSliderWarpper = offerSlider.querySelector(wrapper),
        innerSliderWarpper = offerSlider.querySelector(field),
        offerSliderCounter = offerSlider.querySelector(sliderCounter),
        offerSliderPrev = offerSliderCounter.querySelector(prevArrow),
        offerSliderNext = offerSliderCounter.querySelector(nextArrow),
        currentSlide = offerSliderCounter.querySelector(currentCounter),
        totalSlides = offerSliderCounter.querySelector(totalCounter),
        offerSlides = offerSliderWarpper.querySelectorAll(slide),
        width = window.getComputedStyle(offerSliderWarpper).width;
    
    let slideIndex = 1,
        offset = 0;

    if (offerSlides.length < 10) {
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

    offerSlides.forEach(slide => {
        slide.style.width = width;
    });

    offerSliderNext.addEventListener('click', () => {
        if (offset == +width.replace(/\D/g, '') * (offerSlides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }
        innerSliderWarpper.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == offerSlides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (offerSlides.length < 10) {
            currentSlide.textContent = `0${slideIndex}`;
        } else {
            currentSlide.textContent = slideIndex;
        }

    });

    offerSliderPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.replace(/\D/g, '') * (offerSlides.length - 1);
        } else {
            offset -= +width.replace(/\D/g, '');
        }
        innerSliderWarpper.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = offerSlides.length;
        } else {
            slideIndex--;
        }

        if (offerSlides.length < 10) {
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
}

export default slider;