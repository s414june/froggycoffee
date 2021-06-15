let cartObjList = []
let cartObj = []

function initCart() {
    let add2cartBtn = document.querySelectorAll('.add2cart-btn')
    add2cartBtn.forEach(item => {
        item.addEventListener('click', add2cart)
    })
}

function add2cart(e) {
    let addCartBtn = e.target
    let cartItemDiv = addCartBtn.parentElement.parentElement.parentElement
    let cartItemTitle = cartItemDiv.querySelector('.card-title').innerText
    let cartItemPrice = cartItemDiv.querySelector('.card-price').innerText
    let cartItemImg = cartItemDiv.querySelector('img').innerText

    showCartFn
    let rootPath = location.pathname.replace(/product.html/, "")
    getAjax((rootPath + "json/product.json"), (xhr) => {
        let json2obj = JSON.parse(xhr.response)
        json2obj.products.forEach((item, i) => {
            if (json2obj.products[i].title == cartItemTitle) {
                if (cartObjList.includes(i)) {
                    console.log('已經加入')
                } else {
                    cartObjList.push(i)
                }
            }
        })
        console.log(cartObjList)
            // showCartFn(cartObjList)
        localStorage.setItem('cartObjList', cartObjList)
        localStorage.setItem('cartQuantity', String(cartObjList.length))
        let cartQuantity = document.querySelector('.cart-quantity')
        updateCartQuantity(cartQuantity)
    })

}

function showCartFn(cartObjList) {
    let rootPath = location.pathname.replace(/product.html/, "")
    getAjax((rootPath + "json/product.json"), (xhr) => {
        let json2obj = JSON.parse(xhr.response)
        json2obj.products.forEach((item, i) => {
            if (json2obj.products[i].title == cartItemTitle) {
                if (cartObjList.includes(i)) {
                    console.log('已經加入')
                } else {
                    // let 
                    // cartObjList.push(i)
                }
            }
        })
        console.log(cartObjList)
            // showCartFn(cartObjList)
        localStorage.setItem('cartObjList', cartObjList)
        localStorage.setItem('cartQuantity', String(cartObjList.length))
        let cartQuantity = document.querySelector('.cart-quantity')
        updateCartQuantity(cartQuantity)
    })
}

function updateCartQuantity(cartQuantity) {
    let cartQuantityValue = localStorage.getItem('cartQuantity')
        // console.log(cartQuantityValue)
    if (cartQuantityValue > 0) cartQuantity.innerText = cartQuantityValue
}