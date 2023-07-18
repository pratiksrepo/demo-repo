const droplist = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
 toCurrency = document.querySelector(".to select"),
getButton=document.querySelector('form button');




for (i = 0; i < droplist.length; i++) {
    for (currency_code in country_code) {
        //selecting USD by deafult as from currency and INR as to currency
        let selected;
        if(i==0){
            selected= currency_code == "USD" ? "selected" : " ";
        }
        else if(i==1){
            selected=currency_code =="INR" ? "selected": " ";
        }
        //creating an variable to access the html code for displaying current country_list
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        
        //inserting option tag inside select tag
       droplist[i].insertAdjacentHTML("beforeend",optionTag);
    }
    droplist[i].addEventListener('change',e=>{
        loadflag(e.target);
        //calling loadflag with passing an target element as an argument
    });
}

function loadflag(element){
    for(code in country_code){
        if(code == element.value){
            // if currency code of an country list is equal to option value 
            let imgTag=element.parentElement.querySelector('img');
            //selecting img tag of particular drop list

            //passing an country code of the selected currency code in img url
            imgTag.src=`https://flagsapi.com/${country_code[code]}/flat/64.png`

        }
    }
}

getButton.addEventListener("cilck", e=>{
    
    e.preventDefault(); // preventing from form submiiting
    getExchangeRate()
    
});

window.addEventListener("load", ()=>{

    getExchangeRate();
    
});

const exchangeIcon=document.querySelector('.drop-list .icon');
exchangeIcon.addEventListener('click',()=>{
    let tempcode=fromCurrency.value;
    //temporary currency code of from drop list

    fromCurrency.value=toCurrency.value;
    //passing to currency code to from currency code 

    toCurrency.value=tempcode;
    //passing tempory currency code to TO currency code 

    loadflag(fromCurrency);
    //calling an loadflag with passing select element (FromCurrency) of from  

    loadflag(toCurrency);
    //calling an loadflag with passing select element (ToCurrency) of TO 
    getExchangeRate();
})

function getExchangeRate(){
    const amount=document.querySelector(".amount input "),
     exchangeratetxt=document.querySelector(".exchange-rate");
    let amountVal= amount.value;
    // if user dont enter any value or enter o then we'll put 1 value by default in the textbox 
    if(amountVal == "" || amountVal== "0"){
        amount.value="1";
        amountVal= 1;
    }

    exchangeratetxt.innerText="Getting Exchange Rate...";
    let url=`https://v6.exchangerate-api.com/v6/691e6aeecc3454c332eb9305/latest/${fromCurrency.value}`;
    //fetching api reponse and returning it with parsing js obj and in another then method receiving that obj 
    fetch(url).then(response => response.json()).then(result =>{
        let ExchangeRate=result.conversion_rates[toCurrency.value];
        let TotalExchangeRate=(amountVal * ExchangeRate).toFixed(2);
        
        exchangeratetxt.innerText=`${amountVal} ${fromCurrency.value} = ${TotalExchangeRate} ${toCurrency.value}`
        
    }).catch(()=>{
        exchangeratetxt.innerText="Something Went Wrong???"
    })
}  