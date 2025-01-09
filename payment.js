window.onload =()=>{
    const mobileNav = document.querySelector('#mobileNav');
const nav = document.querySelector('#navigation');

mobileNav.addEventListener('click', function(){
    //if the click is present on the toggle bar, it changes to an 'X'
    mobileNav.classList.toggle('active'); 
    //if the click is present, the nav links will appear
    nav.classList.toggle('active'); 
});


//validation for payment
function check(){
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    const card = document.getElementById('cardNum').value;
    const cvvCode = document.getElementById('securityCode').value;
    const expYear = document.getElementById('expYear').value;
    const expMonth = document.getElementById('expMonth').value;

    var cardPattern = /^5[1-5][0-9]{14}$/;
    var cvvPattern = /^[0-9]{3,4}$/;

    if(card.match(cardPattern) && cvvCode.match(cvvPattern) && (expYear >= currentYear) && (expMonth >=currentMonth)) { //checks for cardnum,cvv, currentyear/month
        console.log('check pass');    
        return true;
    }
    else if(card.match(cardPattern) && cvvCode.match(cvvPattern)&&(expMonth<=currentMonth) && expYear>currentYear){ //checks for cardnum,cvv, furture years and check for months between 1-12
        console.log('check pass');    
        return true;
    }

    else {
        console.log('check failed');
         document.getElementById('paymentFailed').innerHTML="Payment verification failed. Please try again."
         return false;
   }
  };

document.getElementById("continueBtn").addEventListener("click",(e)=>{
    
    let cardNum = document.getElementById("cardNum").value;
    let expMonth = document.getElementById("expMonth").value;
    let expYear = document.getElementById("expYear").value;
    let securityCode = document.getElementById("securityCode").value;

    console.log(cardNum, expMonth, expYear,securityCode);
    e.preventDefault();

    
    const url = "https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard";
    const data = {
        "master_card": parseInt(cardNum),
        "exp_year": parseInt(expYear),
        "exp_month": parseInt(expMonth),
        "cvv_code": securityCode
    };

    if(check() === true){ //checks for true validation
        console.log(data);

        fetch(url, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    
        .then((response) => {
            if(response.status === 200){
                return response.json();
            }else if(response.status === 400){
                throw "Payment verification failed. Please try again.";
            }else{
                throw "Something went wrong";
            }
        })
        .then((resJson) => {
            alert(resJson["message"]);
            location.href='success.html';
            localStorage.setItem('cardNum', cardNum.substring(cardNum.length - 4));
            document.getElementById("formResponse").classList ="success";
        })
        .catch((error)=>{
            document.getElementById("formResponse").innerHTML = error;
            document.getElementById("formResponse").classList = "error";
        });
    }
})
}