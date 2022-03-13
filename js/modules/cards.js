function cards() {
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

}

module.exports=cards;