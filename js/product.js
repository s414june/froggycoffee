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
    initCart()
}

function filterAndLoader(filtername) {
    let isProductPath = location.pathname.search(/product.html/)
    if (isProductPath < 0) {
        sessionStorage.setItem('productType', filtername)
        typeSession = sessionStorage.getItem('productType')
        location.assign("product.html")
        return
    }

    let verticalNavAll = document.querySelectorAll('.vertical-nav a')
    verticalNavAll.forEach(item => {
        item.classList.remove("border-left-color")
    })
    if (searchInput.value == "") {
        let verticalNavA = document.querySelector('.' + filtername + '-product')
        verticalNavA.classList.add("border-left-color")
    }

    let rootPath = location.pathname.replace(/product.html/, "")
    getAjax((rootPath + "json/product.json"), (xhr) => {
        let filterObj = []
        let json2obj = JSON.parse(xhr.response)
        json2obj.products.forEach(item => {
            if (item.filetype == filtername) filterObj.push(item)

            if (searchInput.value != "") {
                let regName = new RegExp(filtername, 'i')
                let searchReg = item.title.search(regName)
                if (searchReg >= 0) filterObj.push(item)
            }
        })
        if (filtername == "all") {
            filterObj = json2obj.products
        }
        showProductFn(filterObj)
    })
}

function initProductPage(typeSession) {
    if (typeSession == undefined) {
        sessionStorage.setItem('productType', 'all')
    }
    typeSession = sessionStorage.getItem('productType')
    filterAndLoader(typeSession)
}

function searchFn() {
    searchInput.addEventListener('keyup', function(e) {
        if (e.key == "Enter") {
            filterAndLoader(searchInput.value)
        }
    })
}