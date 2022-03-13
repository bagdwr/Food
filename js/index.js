window.addEventListener('DOMContentLoaded', () => {
        //tabs
            const tabs=require('./modules/tabs'),
            timer=require('./modules/timer'),
            modal=require('./modules/modal'),
            cards=require('./modules/cards'),
            forms=require('./modules/forms'),
            slider=require('./modules/slider'),
            calculator=require('./modules/calculator');


            tabs();
            timer();
            modal();
            cards();
            forms();
            slider();
            calculator();

    });