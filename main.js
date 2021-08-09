// SLIDER PHOTOS DANS LA SECTION A PROPOS

let sliderImages = document.querySelectorAll('.slide');
let arrowLeft = document.querySelector('#arrow-left');
let arrowRight = document.querySelector('#arrow-right');
let current = 0;


function reset() {
    for (let i = 0; i < sliderImages.length; i++) {
        sliderImages[i].style.display = 'none';
    }
}

function startSlide() {
    reset();
    sliderImages[0].style.display = 'block';
}

function slideLeft() {
    reset();
    sliderImages[current - 1].style.display = 'block';
    current--;
}

function slideRight() {
    reset();
    sliderImages[current + 1].style.display = 'block';
    current++;
}

arrowLeft.addEventListener('click', function () {
    if (current === 0) {
        current = sliderImages.length
    }
    slideLeft();
})

arrowRight.addEventListener('click', function () {
    if (current === sliderImages.length - 1) {
        current = -1
    }
    slideRight();
})

startSlide();


//---------------------------------------------------------------------------------------------


// SHOW/HIDE THE CART
(function () {
    const btnCart = document.getElementById("img-shopping-cart")
    const cart = document.getElementById("cart")
    const closecart = document.getElementById("closeCart");

    btnCart.addEventListener('click', function () {
        cart.classList.toggle('show-cart');
    })

    closecart.addEventListener('click', function(){
        cart.classList.toggle('show-cart');
    })

})();



// ADD ITEMS TO THE CART
(function () {
    const btnAddToCart = document.querySelectorAll(".img-shopping-cart-mini")

    btnAddToCart.forEach(function (btn) {

        btn.addEventListener('click', function (event) {

            if (event.target.parentElement.classList.contains("store-item-icon")) {

                //---------GET THE IMAGE PATH
                let imgItemFullPath = event.target.parentElement.previousElementSibling.src;
                // maintenant je stocke dans cette variable quelque chose comme ça : file:///media/sf_VirtualShare/Labo/Perso/Projets/Cactus-e-shop/Images/rsz_cactus9.jpg
                // Je ne veux pas le full path de mon image
                // Je vais aller chercher où se situe 'Images' pour ensuite récupérer juste le nom de l'image (par exemple juste "rsz_cactus9.jpg")
                let position = imgItemFullPath.indexOf('Images') + 6 // Je rajoute 6 car je veux exclure la chaine de caractère 'Images'
                // Methode Slice pour récuperer et stocker juste le nom de l'image 
                let ImgItemPartPath = imgItemFullPath.slice(position) //Je lui dis de récupérer la partie à partir de mon indexOf stocké dans la variable 

                //---------GET THE NAME
                let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;

                //----------GET THE PRICE
                let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;

                let finalPrice = price.slice(0, 5)


                const item = {
                    img: `Images/img-cart${ImgItemPartPath}`,
                    name: name,
                    price: finalPrice,
                };

                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'my-3');
                cartItem.innerHTML =
                    `<img src="${item.img}" class="img-fluid rounded-lg" id="item-cart-img" alt="photo cactus">
                    <div class="item-text">
                        <p class="cart-item-name m-0">${item.name } : </p>
                        <span id="cart-item-price" class="cart-item-price"> ${ item.price}</span><span>€</span>
                    </div>
                    <a href="#" id='cart-item-remove' class="cart-item-remove">
                        <i class="fas fa-trash"></i>
                    </a>`;

                // ADD THE ITEM INFO INTO THE CART
                
                const cart = document.getElementById("cart");
                const totalArea = document.querySelector(".cart-total-container");

                cart.insertBefore(cartItem, totalArea);
                
                const infoItemAdded = event.target.parentElement.parentElement.nextElementSibling.nextElementSibling;
                infoItemAdded.innerHTML = "item added to the cart"

                setTimeout(function(){
                    infoItemAdded.innerHTML = ""
                }, 4000)

               cartTotal()

               removeFromCart()

               GotoPayment()

            }

        })
    })

    // Fonction -->"Valider vos Achats"
    function GotoPayment(){
        const btnPayment = document.getElementById("checkPayment")
        const IteminCart = document.querySelectorAll(".cart-item")

        btnPayment.addEventListener("click", function(){     
            alert("Merci pour vos achats. Ils sont en route. A très bientôt")
            location.reload(); 
        })
    }

    // Function --> "Supprimer un aticle" ou "vider le panier"
    function removeFromCart(){

        const IteminCart = document.querySelectorAll(".cart-item")
        const btnClearCart = document.getElementById("clear-cart")

        btnClearCart.addEventListener("click", function(){
            for(let i = 0; i < IteminCart.length; i++){
                IteminCart[i].remove()
                cartTotal()
            }
        })



        const btnDeletefromCart = document.querySelectorAll(".cart-item-remove");

        btnDeletefromCart.forEach(function (btn) {
            btn.addEventListener('click', function (event) {
                if (event.target.parentElement.classList.contains("cart-item-remove")){
                    let ItemtoDelete = event.target.parentElement.parentElement

                    ItemtoDelete.remove()

                    cartTotal()
                }
            })
        })
       
    }

    // Function --> Cacul et update du Prix Total + du nombre d'item 
    function cartTotal(){
        const total = [];
        const itemsprice = document.querySelectorAll(".cart-item-price");

        itemsprice.forEach(function(itemprice){
            total.push(parseFloat(itemprice.textContent));
        });

        const totalMoney = total.reduce(function(total, item){
            total += item
            return total;
        }, 0);

        const finalTotal = totalMoney.toFixed(2); //pour limiter à 2 chiffres après la virgule

        document.getElementById("cart-total").textContent = finalTotal;
        document.getElementById("item-count").textContent = total.length;
        document.getElementById("item-total").textContent = finalTotal;

    }



})();



// PARTIE FILTER BTN

// $(document).ready(function(){

//     $(".btn-cactus-type").click(function(){
//         console.log(this.id)

//         let typeOfCactus = this.id;


//         if (($(".store-item").hasClass(typeOfCactus))){
//             // console.log($(`.${typeOfCactus}`))
//             $(`.${typeOfCactus}`).each(function(){
//                 $(this).css({"display":"none"})
//             })
//         }   
// })

  

// })

//-----------------------------------------------------------------------------------


// SCROLL BUTTON BACK TO TOP

window.addEventListener("scroll", function(){
    const scroll = document.querySelector(".scrollTop")
    scroll.classList.toggle("active", window.scrollY > 500)
})

function scrollToTop(){
    window.scrollTo({
        top: 0
    })
}

//-----------------------------------------------------------------------------------

// SEARCH BAR

$(document).ready(function(){
    $('#cactusFilter').keyup(function(event){
        let input = $(this);
        let inputVal = input.val();
        let regexp = '\\b(.*)';
        for(let i in inputVal){
            regexp += '('+inputVal[i]+')(.*)'
        }
        regexp += '\\b'

        $('#store-items').find('h5').each(function(){
            let h5 = $(this)
            let resultats = h5.text().match(new RegExp(regexp, 'i'))
            console.log(resultats)

            if(resultats){
                h5.parent().parent().parent().parent().css({"display": "block"})
            } else {
                h5.parent().parent().parent().parent().css({"display": "none"})
                
            }

            console.log(h5.parent().parent().parent().parent())
        })
    })
})
