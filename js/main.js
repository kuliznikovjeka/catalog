function getTag(tagName, className, text) {
	let tag = document.createElement(`${tagName}`);
	tag.textContent = text;
	tag.classList.add(className);
	return tag
}
function getH(number, className, text) {
	let titleH = document.createElement(`h${number}`);
	titleH.classList.add(className);
	titleH.textContent = text;
	return titleH
}
function getImg(src, className) {
	let img = document.createElement('img');
	img.src = src;
	img.classList.add(className);
	return img
}
// Массив товаров
let catalogArr = [
	{
		title: "iPhone 14 Pro",
		price: 110000,
		desc: "Смартфон Apple iPhone 14 Pro 128GB",
		img: './img/1.jpg'
	},
	{
		title: "iPhone 14",
		price: 90000,
		desc: "Смартфон Apple iPhone 14 128GB",
		img: './img/0.5.jpeg'
	},
	{
		title: "AirPods Pro",
		price: 2100,
		desc: "Наушники Apple AirPods Pro (2-го поколения, 2022)",
		img: './img/2.jpg'
	},
	{
		title: "Чехол iPhone 14 Pro",
		price: 1200,
		desc: "Чехол для Apple iPhone 14 Pro - желтый",
		img: './img/3.jpg'
	}
]
// Массив корзины
let cartCatalogArr = []

// Верстка
let catalog = getTag('div', 'catalog');
let catalogContainer = getTag('div', 'catalog__container');
let catalogTitle = getH(1, 'catalog__main-title', 'Каталог');


let catalogList = getTag('ul', 'catalog__list');
let catalogCart = getTag('ul', 'catalog__cart-list');
let catalogCartBtnOrder = getTag('button', 'catalog__cart-btn-order', `Заказать на сумму 0 рублей`);
catalogCartBtnOrder.onclick = function () {
	alert('Раздел находится в разработке!')
}

let basketBody = getTag('div', 'catalog__basket-body');
let basket = getImg('./img/basket.svg', 'basket');
// Смена картинки при клике, проверяем атрибут + открытие корзины.
basketBody.onclick = function () {
	if (basket.getAttribute('src') == './img/basket.svg') {
		basket.src = './img/close.svg'
		catalogCart.classList.add('_active')
	} else {
		basket.src = './img/basket.svg'
		catalogCart.classList.remove('_active')
	}
}


// Возвращает карточку товара
function getProductLi(catalog, index) {
	let catalogLi = getTag('li', 'catalog__item');

	let imgCatalog = getTag('img', 'catalog__product-img');
	let titleCatalog = getH(2, 'catalog__product-title')
	let descriptionCatalog = getTag('p', 'catalog__product-desc')
	let priceCatalog = getTag('p', 'catalog__prudct-price');

	// Свойства объекта
	titleCatalog.textContent = catalog.title
	priceCatalog.textContent = Number(catalog.price)
	descriptionCatalog.textContent = catalog.desc
	imgCatalog.src = catalog.img

	//Кнопка добавления в корзину
	let addBtnCart = getTag('button', 'catalog__btn-cart', '+ В корзину')
	addBtnCart.onclick = function () {
		cartCatalogArr.push(catalog);
		renderCart(cartCatalogArr);
	}

	catalogLi.append(imgCatalog, titleCatalog, descriptionCatalog, priceCatalog, addBtnCart);
	return catalogLi
}

// Возвращает корзину товаров
function getCartLi(cart, index) {
	let cartRowLi = getTag('li', 'catalog__cart-row');
	let cartImg = getTag('img', 'catalog__cart-img');
	let cartBody = getTag('div', 'catalog__cart-body');
	let cartTitle = getH(2, 'catalog__cart-title');
	let cartPrice = getTag('p', 'catalog__cart-price');
	cartBody.append(cartTitle, cartPrice);
	let cartBtnRemove = getTag('button', 'catalog__cart-removebtn', 'Удалить');
	// Удаление объекта из массива (удаление товара из корзины)
	cartBtnRemove.onclick = function () {
		cartCatalogArr.splice(index, 1)
		renderCart(cartCatalogArr)
	}

	cartImg.src = cart.img
	cartTitle.textContent = cart.title
	cartPrice.textContent = Number(cart.price)

	cartRowLi.append(cartImg, cartBody, cartBtnRemove)
	return cartRowLi
}

// Рендер каталога
function renderCatalog(catalogArray) {
	catalogList.innerHTML = '';

	for (let i = 0; i < catalogArray.length; i++) {
		let catalog = getProductLi(catalogArray[i], i)
		catalogList.append(catalog)
	}
}
// отрисовка товаров при запуске
renderCatalog(catalogArr);

// Рендер корзины
function renderCart(cartCatalogArray) {
	catalogCart.innerHTML = '';

	let totalPrice = 0;

	if (cartCatalogArray.length === 0) {
		let noOrder = getTag('p', 'catalog__basket-no-order', 'Товаров в корзине нет')
		catalogCart.append(noOrder)
		catalogCartBtnOrder.textContent = 'Заказать на сумму 0 рублей';
		catalogCart.append(catalogCartBtnOrder);
		return
	} else if (cartCatalogArray.length > 3) {
		catalogCart.classList.add('_scroll')
	} else if (cartCatalogArray.length < 4) {
		catalogCart.classList.remove('_scroll')
	}

	for (let i = 0; i < cartCatalogArray.length; i++) {
		// Расчет итоговой стоимости
		totalPrice = totalPrice + cartCatalogArr[i].price

		let catalog = getCartLi(cartCatalogArray[i], i)
		catalogCartBtnOrder.append(totalPrice)
		catalogCart.append(catalog)
	}

	catalogCartBtnOrder.textContent = `Заказать на сумму ${totalPrice} рублей`;

	catalogCart.append(catalogCartBtnOrder);
}
// Отрисовка корзины
renderCart(cartCatalogArr)



basketBody.append(basket);
catalogContainer.append(catalogTitle, catalogList, catalogCart, basketBody);
catalog.append(catalogContainer);
document.body.append(catalog);