const buttonCart = document.querySelectorAll(".btn-cart")


buttonCart.forEach((button) => {
    button.addEventListener('click', () => {
        const product = button.closest('.product')
        const container = product.querySelector('.container')
        container.classList.toggle('toggle')
        })
    })
        console.log('click')
    
)