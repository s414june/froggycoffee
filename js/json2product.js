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

function filterAndLoader(type) {
    if (location.pathname != "/product.html") {
        // sessionStorage.setItem('typeFromHome', type)
        location.assign("product.html")
    }
    let filterObj = []
    getAjax("../json/product.json", (xhr) => {
        let json2obj = JSON.parse(xhr.response)
        json2obj.products.forEach(item => {
            if (item.filetype == type) filterObj.push(item)
        })
        if (type == "all") Array.prototype.push.apply(filterObj, json2obj.products)
        showProductFn(filterObj)
    })
}

function initProductPage() {
    let typeFromHome = sessionStorage.getItem('typeFromHome')
    filterAndLoader(typeFromHome)
}