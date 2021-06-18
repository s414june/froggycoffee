function initProductPage() {
    let productType = sessionStorage.getItem('productType')
    if (productType == undefined) {
        sessionStorage.setItem('productType', 'all')
    }
    productType = sessionStorage.getItem('productType')
    filterAndLoader(productType)
}

function searchFn() {
    searchInput.addEventListener('keyup', function(e) {
        if (e.key == "Enter") {
            filterAndLoader(searchInput.value)
        }
    })
}

function filterAndLoader(filtername) {
    let isProductPath = location.pathname.search(/product.html/)
    if (isProductPath < 0) {
        sessionStorage.setItem('productType', filtername)
        productType = sessionStorage.getItem('productType')
        location.assign("product.html")
        return
    }

    // let rootPath = location.origin
    getAjax(("./json/product.json"), (xhr) => {
            let filterObj = []
            let json2objProduct = JSON.parse(xhr.response).products
            json2objProduct.forEach(item => {
                    //分類商品
                    if (item.filetype == filtername) {
                        filterObj.push(item)
                        changeVerticalNavStyle(filtername)
                    }
                    //搜尋商品
                    if (searchInput.value != "") {
                        let regName = new RegExp(filtername, 'i')
                        let searchReg = item.title.search(regName)
                        if (searchReg >= 0) filterObj.push(item)
                    }
                })
                //不分類
            if (filtername == "all") {
                filterObj = json2objProduct
                changeVerticalNavStyle(filtername)
            }
            showProductFn(filterObj)
        })
        //側邊欄橫條樣式
}

function showProductFn(obj) {
    if (obj != null) productContainer.innerHTML = ""
    obj.forEach(item => {
        let productsAll = document.createElement('div')
        productsAll.className = 'col-lg-4 col-md-6 my-4'
        productsAll.innerHTML = `
            <div class="card w-md-75 text-right">
                <img src="./img/${item.filetype}/${item.img}" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <div class="row justify-content-end">
                        <div>
                            <p class="card-text card-price" style="text-align:right">NT$${item.price}</p>
                        </div>
                        <a class="btn btn-info text-white m-2 add2cart-btn" style="width:6.7rem">加入購物車</a>
                    </div>
                </div>
            </div>
            `
        productContainer.appendChild(productsAll)
    })
    productQuantity.innerHTML = String(obj.length)
    if (obj.length == 0) {
        productContainer.innerHTML = "<p class='text-secondary'>很抱歉，我們搜尋不到任何商品。請嘗試其他關鍵字。</p>"
    }
    listenAdd2CartBtn()
}

function listenAdd2CartBtn() {
    let add2cartBtn = document.querySelectorAll('.add2cart-btn')
    add2cartBtn.forEach(item => {
        item.addEventListener('click', addCartLsit)
    })
}

function addCartLsit(e) {
    let addCartBtn = e.target
    let cartItemDiv = addCartBtn.parentElement.parentElement.parentElement
    let cartItemTitle = cartItemDiv.querySelector('.card-title').innerText
    for (let i = 0; i < cartLsit.length; i++) {
        if (cartLsit[i] == cartItemTitle) {
            alert('此商品已加入購物車。您可以在購物車清單中更改數量。')
            return
        }
    }
    cartLsit.push(cartItemTitle)
    alert('商品加入購物車囉！')

    localStorage.setItem('cartLsit', JSON.stringify(cartLsit))
    updateCartQuantity()
}

function changeVerticalNavStyle(filtername) {
    let verticalNavAll = document.querySelectorAll('.vertical-nav a')
    verticalNavAll.forEach(item => {
        item.classList.remove("border-left-color")
    })
    if (searchInput.value == "") {
        let verticalNavA = document.querySelector('.' + filtername + '-product')
        verticalNavA.classList.add("border-left-color")
    }
}