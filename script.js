const price = 19.5;

let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
cid = cid.slice().reverse();

const numericals = {
    "ONE HUNDRED":100,
    "TWENTY":20,
    "TEN":10,
    "FIVE":5,
    "ONE":1,
    "QUARTER":0.25,
    "DIME":0.1,
    "NICKEL":0.05,
    "PENNY":0.01,


}
const clf=
    {
'Hundreds':[100,1],
'Twenty': [20,3],
'Ten': [10,2],
'Five':[5,11],
'One':[1,90],
'Quater':[0.25,17],
'Dime':[0.1,31],
'Nickel':[0.05,41],
'Pennie':[0.01,101]
};

let cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const myForm = document.getElementById('myForm');
const drawer = document.getElementById('drawer');
const changeDue = document.getElementById('change-due');



const balance =(e)=>{

    
    let realCash = parseFloat(cash.value);
    cash.value="";
    e.preventDefault();
    if(realCash < price){
        alert('Customer does not have enough money to purchase the item');
        return;
    }
    else if(realCash===price){
        changeDue.innerHTML = `<h2>No change due - customer paid with exact cash</h2>` 
    }
    else{
        const change={};
        realCash -=price;
        realCash = Number(realCash.toFixed(4));
        
        changeDue.innerHTML="";
        cid.forEach((notes)=>{
            
           let  coinsNumber = notes[1]/numericals[notes[0]];
            
            let x = Math.floor(Number((realCash/numericals[notes[0]]).toFixed(4)));

            x=Math.min(x,coinsNumber);
            
            if(realCash >0 && realCash >= (numericals[notes[0]])){
                
                coinsNumber = Number((coinsNumber- x ).toFixed(4))>0? Number((coinsNumber- x ).toFixed(4)): 0;
                
                realCash = Number((realCash - x *numericals[notes[0]]).toFixed(4));
            
                cid.forEach((key)=>{
                    
                    if(key[1]=== notes[1]){
                        key[1]=Number((coinsNumber * numericals[notes[0]]).toFixed(4));
                        change[key[0]]=numericals[notes[0]]*x;
                        
                    }
                }
                    )   }
                
            
            console.log(realCash,coinsNumber, x);
            

        }
        )
        if(realCash!==0){
            changeDue.innerHTML = `<span>Status: INSUFFICIENT_FUNDS</span>`;
        }
        else if(realCash===0 && Object.values(cid).forEach((key)=>key[1]===0)){
            changeDue.innerHTML = `<span>Status: CLOSED</span>`;
        }
        else{
            
            changeDue.innerHTML = `<span>Status: OPEN </span>`
        }
        
        Object.keys(change).forEach((key)=>{
            changeDue.innerHTML +=`<span>${[key]}: $${change[key]} </span>`
        })

        drawerDisplay(cid);

        
    }
}


const drawerDisplay = (cid)=>{
    
    drawer.innerHTML =`
    <ul>Change in drawer:
    <li>Pennies: ${Number((cid[7][1]).toFixed(2))}</li>
    <li>Nickels: ${Number((cid[6][1]).toFixed(2))}</li>
    <li>Dimes: ${Number((cid[5][1]).toFixed(2))}</li>
    <li>Quaters: ${Number((cid[4][1]).toFixed(2))}</li>
    <li>Ones: ${Number((cid[3][1]).toFixed(2))}</li>
    <li>Fives: ${Number((cid[2][1]).toFixed(2))}</li>
    <li>Twenties: ${Number((cid[1][1]).toFixed(2))}</li>
    <li>Hundreds: ${Number((cid[0][1]).toFixed(2))}</li>
    </ul>
    `
}



drawerDisplay(cid);
purchaseBtn.addEventListener('click',balance);

myForm.addEventListener('keypress',(e)=>{
    if(e.key==='Enter'){
    e.preventDefault();
    balance(e);}
    
});

