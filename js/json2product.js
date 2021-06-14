function showProductFn(obj) {
    if (obj != null) productContainer.innerHTML = ""
    obj.forEach(item => {
        let productsAll = document.createElement('div')
        productsAll.className = 'col-lg-4 col-md-6 my-4'
        productsAll.innerHTML = `
            <div class="card w-md-75 text-right">
                <img src="./img/${item.filetype}/${item.img}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <div class="row justify-content-end">
                        <div>
                            <p class="card-text" style="text-align:right">NT$${item.price}</p>
                        </div>
                        <a href="#" class="btn btn-info text-white m-2" style="width:6.7rem">加入購物車</a>
                    </div>
                </div>
            </div>
            `
        productContainer.appendChild(productsAll)
        productQuantity.innerHTML = String(obj.length)
    })
}

function filterAndLoader(filtername) {
    let isProductPath = location.pathname.search(/product.html/)
    if (isProductPath < 0) {
        sessionStorage.setItem('productType', filtername)
        location.assign("product.html")
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

function initProductPage() {
    let typeSession = sessionStorage.getItem('productType')
    if (typeSession == undefined) {
        sessionStorage.setItem('productType', 'all')
    }
    typeSession = sessionStorage.getItem('productType')
    filterAndLoader(typeSession)
}