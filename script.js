const baseURL="https://latest.currency-api.pages.dev/v1/currencies/";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const msg=document.querySelector(".msg");

// for(code in countryList){
//     console.log(code, countryList[code]);
// }

for(let select of dropdowns){

    for(currCode in countryList){
        let newOption= document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to" && currCode==="NPR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}


const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let srcLink=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=srcLink;
}

btn.addEventListener("click", async (evt)=>{
    // console.log(fromCurrency);
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;    
    // console.log(amtVal);

    if(amtVal=="" || amtVal<1){
        amount.value="1";
        amtVal=1;
    }

    const fromCurr=document.querySelector(".from select");
    const toCurr= document.querySelector(".to select");
    const fromCurrency= fromCurr.value.toLowerCase();
    const toCurrency= toCurr.value.toLowerCase();
    
    // console.log(fromCurrency);
    const URL=`${baseURL}${fromCurrency}.json`;
    
    let response= await fetch(URL);
    let data=await response.json();
    // console.log(data);
    // console.log(fromCurrency);
    // console.log(toCurrency);
    // console.log(data[fromCurrency][toCurrency]);
     rate= data[fromCurrency][toCurrency];
    //  console.log(rate);
    let finalAmt=rate*amtVal;
    // console.log(finalAmt)
    msg.innerText= `${amtVal} ${fromCurr.value} = ${finalAmt}  ${toCurr.value}`
    // console.log(msg)

})

