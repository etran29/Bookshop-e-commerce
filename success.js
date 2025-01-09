window.onload = () =>{
    const mobileNav = document.querySelector('#mobileNav');
const nav = document.querySelector('#navigation');

mobileNav.addEventListener('click', function(){
    //if the click is present on the toggle bar, it changes to an 'X'
    mobileNav.classList.toggle('active'); 
    //if the click is present, the nav links will appear
    nav.classList.toggle('active'); 
});

    // document.getElementById("card").innerHTML = localStorage.getItem("cardNum");
    let cardNumber = localStorage.getItem("cardNum");
        let lastFourDigits = cardNumber.substring(cardNumber.length-4);
        document.getElementById("card").innerHTML = "**** **** **** " + lastFourDigits;
}