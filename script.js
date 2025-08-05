const products = document.querySelectorAll(".product");

let counter = 0;

products.forEach((product) => {
    const button = product.querySelector(".btn-cart");
    const container = product.querySelector(".container");
    const quantity = product.querySelector(".quantity");
    const btnMore = product.querySelector(".btn-more");
    const btnLess = product.querySelector(".btn-less");
    const subtotal = product.querySelector('.subtotal')
    const id = product.dataset.id;
    const nome = product.dataset.nome;
    const preco = parseFloat(product.dataset.price);

    let counter = 0;
    subtotal.textContent = 0;

    button.addEventListener('click', () => {
        container.classList.toggle('toggle');
        button.style.display = 'none';
        quantity.textContent = counter; 
    });

 
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