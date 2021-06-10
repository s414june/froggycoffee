function headerContain(headNavbar) {
    let headerContainer = document.createElement('div')
    headerContainer.className = "container"
    headerContainer.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="index.html">
                        <div class="text-logo">
                            <h2>雛蛙</h2>
                            <h2>咖啡</h2>
                        </div>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-3">
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="index.html">首頁</a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="index.html#coffee">典藏咖啡</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle mx-2" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  線上選購
                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="product.html">所有商品</a></li>
                                    <li><a class="dropdown-item" href="product.html">濾掛式咖啡</a></li>
                                    <li><a class="dropdown-item" href="product.html">精選咖啡豆</a></li>
                                    <li><a class="dropdown-item" href="product.html">二手書本</a></li>
                                </ul>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="index.html#store-map">聯絡雛蛙</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    `
    headNavbar.appendChild(headerContainer)
}

function footerContain(footerDiv) {
    footerDiv.innerHTML = `
    <div class="container-fluid p-4 text-black-50 text-center bg-light align-bottom">
        <small>Copyright © froggy café 著作權所有. All rights reserved.</small>
    </div>
    `
}