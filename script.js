const buttonCart = document.querySelectorAll(".btn-cart")


buttonCart.forEach((button) => {
    button.addEventListener('click', () => {
        const product = button.closest('.product')
        const container = product.querySelector('.container')
        container.classList.toggle('toggle')
        button.style.display = 'none'

        })
    })

const  btnMore = document.querySelectorAll(".btn-more")    
const btnLess = document.querySelectorAll(".btn-less")
let quantity = document. querySelectorAll(".quantitity")

quantity = 0


btnLess.forEach((button) =>{
button.addEventListener('click', () => {

quantity.innerHTML = `${quantity}`

quantity++

})
})
