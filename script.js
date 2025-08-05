const products = document.querySelectorAll(".product");

let counter = 0;

products.forEach((product) => {
    const button = product.querySelector(".btn-cart");
    const container = product.querySelector(".container");
    const quantity = product.querySelector(".quantity");
    const btnMore = product.querySelector(".btn-more");
    const btnLess = product.querySelector(".btn-less");

    let counter = 0;

    // Botão "Adicionar ao carrinho"
    button.addEventListener('click', () => {
        container.classList.toggle('toggle');
        button.style.display = 'none';
        quantity.textContent = counter; // valor inicial
    });

    // Botão "+"
    btnLess.addEventListener('click', () => {
        counter++;
        quantity.textContent = counter;
    });

    // Botão "-"
    btnMore.addEventListener('click', () => {
        if (counter > 0) {
            counter--;
            quantity.textContent = counter;
        }
    });
});