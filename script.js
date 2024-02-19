const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const total = document.getElementById('total');
const drawer = document.getElementById('drawer');
const changeDue = document.getElementById('change-due')
const myForm = document.getElementById('myForm')

let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
const values = {
    "PENNY":0.01,
    "NICKEL":0.05,
    "DIME":0.1,
    "QUARTER":0.25,
    "ONE":1,
    "FIVE":5,
    "TEN":10,
    "TWENTY":20,
    "ONE HUNDRED":100
}
const price = 3.26;


const checkBalance = () => {
    const returnCash={};
    changeDue.innerHTML="";
    drawer.innerHTML = "";
    const cashValue = Number((parseFloat(cash.value)).toFixed(4));
    let change = Number((cashValue - price).toFixed(4));
    console.log(change);
    if(isNaN(change) || change<0){
        cash.value ="";
        alert('Customer does not have enough money to purchase the item');
    }
    else if(change===0){
        cash.value ="";
        changeDue.innerText = 'No change due - customer paid with exact cash';
    }
    else{
        const cid_copy = cid;
        cash.value ="";
        let totalCash =0;
        cid.forEach((cid)=>{
            totalCash = totalCash + cid[1];
        })

        if(change > totalCash){
            changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
        }
        else {
            if (change ===totalCash){
                changeDue.innerHTML = `<p>Status: CLOSED</p>`;}
            else{
        changeDue.innerHTML = `<p>Status: OPEN</p>`;}
        cid.slice().reverse().forEach((drawerCash)=>{
            let count = Number((drawerCash[1]/values[drawerCash[0]]).toFixed(4));
            let x = Math.floor(Number((change/values[drawerCash[0]]).toFixed(4))); /*x means the cash required*/ 
            x = Math.min(x,count);
            if(change > values[drawerCash[0]] && change>0 && x>0 ){
            change = Number((change - (x*values[drawerCash[0]])).toFixed(4));
            drawerCash[1] = Number((drawerCash[1]- x * values[drawerCash[0]]).toFixed(2))
            returnCash[drawerCash[0]]= Number((x*values[drawerCash[0]]).toFixed(4));
            }
            
            console.log(change);
        })
        if(change===0){
            Object.keys(returnCash).forEach((key)=>{
                changeDue.innerHTML +=`<p>${key}: $${returnCash[key]}</p>`
            })
            drawerDisplay();

        }
        else{
            changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
            cid=cid_copy;
            drawerDisplay();
        }
    }
    
    


}


}
const drawerDisplay=()=>{
drawer.innerHTML +=`
<p>Change in drawer:</p>
<ul>
<li>Pennies: $${cid[0][1]}</li>
<li>Nickels: $${cid[1][1]}</li>
<li>Dimes: $${cid[2][1]}</li>
<li>Quaters: $${cid[3][1]}</li>
<li>Ones: $${cid[4][1]}</li>
<li>Fives: $${cid[5][1]}</li>
<li>Tens: $${cid[6][1]}</li>
<li>Twenties: $${cid[7][1]}</li>
<li>Hundreds: $${cid[8][1]}</li>
</ul>`}

drawerDisplay();

const handleSubmit = (e) => {
    e.preventDefault(); 
    checkBalance(); 
};


myForm.addEventListener('submit', handleSubmit);


purchaseBtn.addEventListener('click', handleSubmit);