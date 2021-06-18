let cartObj = []

function initCart() {
    cartQuantityInnerText = JSON.parse(localStorage.getItem('cartQuantityInnerText'))
    updateCartQuantity()
    cartLsit = JSON.parse(localStorage.getItem('cartLsit'))

    if (cartPlace.innerText != "") cartPlace.innerText = ""
    getAjax(("./json/product.json"), (xhr) => {
        let json2objProduct = JSON.parse(xhr.response).products
        cartObj = []
        if (cartLsit == [] || cartLsit == null) {
            cartPlace.innerHTML = "<br><br>您的購物車是空的。"
            return
        }
        for (let i = 0; i < json2objProduct.length; i++) {
            for (let j = 0; j < cartLsit.length; j++) {
                if (json2objProduct[i].title == cartLsit[j]) {
                    cartObj.push(json2objProduct[i])
                }
            }
        }
        showCartFn(cartObj)
    })
    purchaseBtn.addEventListener('click', purchaseFn)
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
                <br>  
                <p class="item-title">${item.title}</p>
                <p class="item-price">NT$${item.price}</p>
                <div class="change-quantity-place">
                    <input type="number" value="1" class="cart-quantity-input">
                    <span data-bs-toggle="modal" data-bs-target="#purchaseModal">
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
    btnOk.style.display = 'inline'
    btnOk.innerText = '確定'
    btnCancel.innerText = '取消'
    purchaseModalContent.innerText = '你確定要刪除商品嗎？QQ'
    btnOk.addEventListener('click', () => {
        let RemoveBtn = e.target
        let itemTitle = RemoveBtn.parentElement.parentElement.parentElement.querySelector('.item-title').innerText
        cartLsit = JSON.parse(localStorage.getItem('cartLsit'))
        cartLsit.forEach((item, i) => {
            if (item == itemTitle) cartLsit.splice(i, 1)
        })
        localStorage.setItem('cartLsit', JSON.stringify(cartLsit))

        btnOk.style.display = 'none'
        btnCancel.innerText = '關閉'
        purchaseModalContent.innerText = '已刪除商品'
        localStorage.setItem('cartLsit', JSON.stringify(cartLsit))

        initCart()
    })
}

function purchaseFn() {
    btnOk.style.display = 'inline'
    purchaseModalContent.innerText = '您購買的商品總共是' + totalContainer.innerText + '元~確定要購買嗎？'
    btnOk.addEventListener('click', () => {
        btnOk.style.display = 'none'
        btnCancel.innerText = '關閉'
        purchaseModalContent.innerText = '感謝您的購買'
        cartLsit = []
        localStorage.setItem('cartLsit', JSON.stringify(cartLsit))
        initCart()
    })
}