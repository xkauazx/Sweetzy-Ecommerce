const products = document.querySelectorAll(".product");

let counter = 0;

products.forEach((product) => {
    const button = product.querySelector(".btn-cart");
    const container = product.querySelector(".container");
    const quantity = product.querySelector(".quantity");
    const btnMore = product.querySelector(".btn-more");
    const btnLess = product.querySelector(".btn-less");
    const subtotal = product.querySelector('.subtotal')
    const cartList = document.querySelector('.cart-list')
    const id = product.dataset.id;
    const nome = product.dataset.nome;
    const preco = parseFloat(product.dataset.price);

    let counter = 1;
    subtotal.textContent = `$${preco.toFixed(2)}`;


  button.addEventListener('click', () => {
        container.classList.toggle('toggle');
        button.style.display = 'none';
        quantity.textContent = counter; 
        addItem()



    });

    
    function addItem(nome, quantidade, precoUnitario){
    const newItem = document.createElement('li');
    newItem.classList.add('cart-item');
    cartList.appendChild(newItem);

    const nomeItem = document.createElemente('div')
    nomeItem.classList.add('col-product')
    nomeItem.textContent(nome)
    newItem.appendChild(nomeItem)

    const imgItem = document.createElement('img')
    imgItem.classList.add('product-image')
    nomeItem.appendChild(nomeItem)

    const priceItem = document.createElement('div')
    priceItem.classList.add('col-price')
    cartList.appendChild(priceItem)
    priceItem.textContent(preco)

    const qtyItem = document.createElement('div')
    qtyItem.classList.add('col-qty')
    cartList.appendChild(qtyItem)

    const qtyControls = document.createElement('div')
    qtyControls.classList.add('qty-controls')
    qtyItem.appendChild(qtyControls)

    const qtyMore = document.createElement('button')
    qtyMore.classList.add('qty-more')
    qtyControls.appendChild(qtyMore)

    const qtySpan = document.createElement('span')
    qtySpan.classList.add('qty-span')
    qtyControls.appendChild(qtySpan)

    const qtyLess = document.createElement('button')
    qtyLess.classList.add('qty-less')
    qtyControls.appendChild(qtyLess)
    


    }

    btnLess.addEventListener('click', () => {
         counter++;
        quantity.textContent = counter;
     subtotal.textContent = (counter * preco).toFixed(2);

    });


    btnMore.addEventListener('click', () => {
        if(counter > 0 ){
                       counter--;
        quantity.textContent = counter;
      subtotal.textContent = (counter * preco).toFixed(2);
        }
    });
});