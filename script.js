const buttonCart = document.querySelectorAll(".btn-cart")

buttonCart.forEach((button) => {
button.addEventListener('click', () =>{
    const containerAddCart = document.querySelectorAll(".container")
    containerAddCart.classList.add('.toggle')
 console.log('click')
})

})