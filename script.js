const price = 3.26;
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
        Object.values(clf).map((notes)=>{
            let x = Math.floor(Number((realCash/notes[0]).toFixed(4)));
            if(realCash >0 && realCash >= (notes[0]) && notes[1]>x){
                
                notes[1] = Number((notes[1]- x ).toFixed(4))>0? Number((notes[1]- x ).toFixed(4)): 0;
                
                realCash = Number((realCash - x *notes[0]).toFixed(4));
            
                Object.keys(clf).forEach((key)=>{
                    if(clf[key][0]=== notes[0]){
                        clf[key][1]=notes[1];
                        change[key]=notes[0]*x;
                        
                    }
                }
                    )   }
                
            
            

        }
        )
        if(realCash!==0){
            changeDue.innerHTML = `<h2>Status: INSUFFICIENT_FUNDS</h2>`;
        }
        else if(realCash===0 && Object.values(clf).forEach((key)=>key[1]===0)){
            changeDue.innerHTML = `<h2>Status: CLOSED</h2>`;
        }
        else{
            
            changeDue.innerHTML = `<h2>Status: OPEN</h2>`
        }
        
        Object.keys(change).forEach((key)=>{
            changeDue.innerHTML +=`<p>${[key]}: ${change[key]}</p>`
        })

        drawerDisplay(clf);

        
    }
}


const drawerDisplay = (clf)=>{
    
    drawer.innerHTML =`
    <ul>Change in drawer:
    <li>Pennies: ${Number((clf.Pennie[1] * clf.Pennie[0]).toFixed(2))}</li>
    <li>Nickels: ${Number((clf.Nickel[1] * clf.Nickel[0]).toFixed(2))}</li>
    <li>Dimes: ${Number((clf.Dime[1] * clf.Dime[0]).toFixed(2))}</li>
    <li>Quaters: ${Number((clf.Quater[1] * clf.Quater[0]).toFixed(2))}</li>
    <li>Ones: ${Number((clf.One[1] * clf.One[0]).toFixed(2))}</li>
    <li>Fives: ${Number((clf.Five[1] * clf.Five[0]).toFixed(2))}</li>
    <li>Twenties: ${Number((clf.Twenty[1] * clf.Twenty[0]).toFixed(2))}</li>
    <li>Hundreds: ${Number((clf.Hundreds[1] * clf.Hundreds[0]).toFixed(2))}</li>
    </ul>
    `
}



drawerDisplay(clf);
purchaseBtn.addEventListener('click',balance);

myForm.addEventListener('keypress',(e)=>{
    if(e.key==='Enter'){
    e.preventDefault();
    balance(e);}
    
});

