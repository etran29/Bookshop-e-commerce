window.onload =()=>{

const mobileNav = document.querySelector('#mobileNav');
const nav = document.querySelector('#navigation');

mobileNav.addEventListener('click', function(){
    //if the click is present on the toggle bar, it changes to an 'X'
    mobileNav.classList.toggle('active'); 
    //if the click is present, the nav links will appear
    nav.classList.toggle('active'); 
});


}