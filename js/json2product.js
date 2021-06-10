function showProductFn(json2obj) {
    console.log('獲取成功')
    json2obj.products.forEach(item => {
        console.log(item)
        let productsAll = document.createElement('div')
        productsAll.className = 'col-lg-4 col-md-6 my-4'
        productsAll.innerHTML = `
        <div class="card w-md-75 text-right">
            <img src="./img/dripbag/${item.img}" class="card-img-top" alt="濾掛式咖啡-綜合4入">
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
        productContainer2.appendChild(productsAll)
    })
}