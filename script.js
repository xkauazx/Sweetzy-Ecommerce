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

    let counter = 1;
    subtotal.textContent = `$${preco.toFixed(2)}`;



  button.addEventListener('click', () => {
        container.classList.toggle('toggle');
        button.style.display = 'none';
        quantity.textContent = counter; 
        
        addItemToCart({
          id:id,
          name: name,
          quantity: counter,
          image: product.querySelector('img').src
        })




    });   

    btnLess.addEventListener('click', () => {
         counter++;
        quantity.textContent = counter;
     subtotal.textContent = (counter * preco).toFixed(2);
     updateCartItem(id, counter);


    });


    btnMore.addEventListener('click', () => {
        if(counter > 0 ){
                       counter--;
        quantity.textContent = counter;
      subtotal.textContent = (counter * preco).toFixed(2);
      updateCartItem(id, counter);

        }
    });

});

//função para atualizar o carrinho

function updateCartItem(itemId, newQuantity){
  const item = cartItems,find(item => item.id ===itemId);
  if (item){
    item.quantity = newQuantity;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCounter();
  }


}

document.addEventListener('DOMContentLoaded', updateCartCounter)