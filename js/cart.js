function initCart() {
    cartLsit = JSON.parse(localStorage.getItem('cartLsit'))
    let cartLsitQObj = cartLsit.filter(item => item.quantity > 0)
    let cartObj = []
    if (cartPlace.innerText != "") cartPlace.innerText = ""
    let rootPath = location.pathname.replace(/cart.html/, "")
    getAjax((rootPath + "json/product.json"), (xhr) => {
        let json2objProduct = JSON.parse(xhr.response).products
        for (let i = 0; i < json2objProduct.length; i++) {
            for (let j = 0; j < cartLsitQObj.length; j++) {
                if (cartLsitQObj[j].title == json2objProduct[i].title) {
                    cartObj.push(json2objProduct[i])
                    cartObj[j].quantity = cartLsitQObj[j].quantity
                }
            }
        }
        showCartFn(cartObj)
    })
}

function showCartFn(cartObj) {
    if (cartObj.length == 0) cartPlace.innerHTML = "<br><br>您的購物車是空的。"
    cartObj.forEach(item => {
        let cartAll = document.createElement('div')
        cartAll.className = 'cart-inside'
        cartAll.innerHTML = `
            <div>
                <img src="img/${item.filetype}/${item.img}" alt="${item.title}" class="item-img">
            </div>
            <div>
                <p class="item-title">${item.title}</p>
                <p class="item-price">NT$${item.price}</p>
                <div class="change-quantity-place">
                    <input type="number" value=${item.quantity} class="cart-quantity-input">
                    <span>
                    <i class="far fa-trash-alt"></i>
                        </i>
                    </span>
                </div>
            </div>
            `
        cartPlace.appendChild(cartAll)
    })
    updateTotal()
    let removeItemBtn = document.querySelectorAll('.fa-trash-alt')
    removeItemBtn.forEach(item => {
        item.addEventListener('click', removeCartItem)
    })

}

function updateTotal() {
    let cartInside = document.querySelectorAll('.cart-inside')
    let total = 0
    cartInside.forEach(item => {
        let price = item.querySelector('.item-price').innerText.replace('NT$', '')
        let quantityInput = item.querySelector('.cart-quantity-input')
        quantityInput.addEventListener('change', quantityChange)
        total += price * quantityInput.value
    })
    totalContainer = document.querySelector('#cart .total-container')
    totalContainer.innerText = total
}

function quantityChange(e) {
    let input = e.target
    if (isNaN(input.value) || input.value <= 1) {
        input.value = 1
    }
    updateTotal()
}

function removeCartItem(e) {
    let r = confirm('你確定要刪除商品嗎')
    if (r) {
        let RemoveBtn = e.target
        let itemTitle = RemoveBtn.parentElement.parentElement.parentElement.querySelector('.item-title').innerText
        cartLsit = JSON.parse(localStorage.getItem('cartLsit'))
        cartLsit.forEach((item, i) => {
            if (item.title == itemTitle) cartLsit.splice(i, 1)
        })
        localStorage.setItem('cartLsit', JSON.stringify(cartLsit))
        initCart()
        let cartQuantity = document.querySelector('.cart-quantity')
    }
}