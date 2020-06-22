function solve() {
   const nameinp = document.querySelector("#add-new > input[type=text]:nth-child(2)");
   const quInp = document.querySelector("#add-new > input[type=text]:nth-child(3)");
   const prinp = document.querySelector("#add-new > input[type=text]:nth-child(4)");

   const [filterBtn,addBtn] = Array.from(document.querySelectorAll('button'));
   let totalSum = 0;

   addBtn.addEventListener('click', function(e){
      e.preventDefault();
      const name = nameinp.value;
      const quantity = Number(quInp.value);
      const price = Number(prinp.value);

      createProduct(name,quantity,price);
   });
//    let [btninDiv1] = Array.from(document.querySelector('button'));
//    // btninDiv1 = document.querySelector("#products > ul > li > div > button");
//   // let btninDiv1 = document.querySelector('button');
   

//       btninDiv1.addEventListener('click', function(e){
//          price = document.querySelector("#products > ul > li > div > strong");
//          e.preventDefault();
//          let movedList = document.createElement('li');
//          movedList.textContent = name;
//          let priceSt = document.createElement('strong');
//          priceSt.textContent = `${price.toFixed(2)}`;
//          movedList.appendChild(priceSt);
//          let ul = document.querySelector("#myProducts > ul") ;
//          ul.appendChild(movedList);
//          totalSum += price;
//          let pr = document.querySelector("body > h1:nth-child(4)");
//          pr.textContent = `Total Price: ${price.toFixed(2)}`;
//          let q = document.querySelector("#products > ul > li > strong");
//          q.textContent = `Available: ${quantity-1}`;
         
//       });
   

   function createProduct(name,quantity,price){

      let productList = document.createElement('li');
      let nameEl = document.createElement('span');
      nameEl.textContent = name;
      let quantityEl = document.createElement('strong');
      quantityEl.textContent = `Available: ${quantity}`;
      productList.appendChild(nameEl);
      productList.appendChild(quantityEl);
      
      let priceDiv = document.createElement('div');
      let priceEl = document.createElement('strong');
      priceEl.textContent = `${price.toFixed(2)}`;
      let btninDiv = document.createElement('button');
      btninDiv.textContent = `Add to Client's List`;
      priceDiv.appendChild(priceEl);
      priceDiv.appendChild(btninDiv);
      productList.appendChild(priceDiv);
      
    ul = document.querySelector("#products > ul");
    ul.appendChild(productList);
      
//    let [btninDiv1] = Array.from(document.querySelector('button'));
   // btninDiv1 = document.querySelector("#products > ul > li > div > button");
  // let btninDiv1 = document.querySelector('button');
   
  filterBtn.addEventListener('click', function(){
     let title = document.querySelector("#products > ul > li > span").textContent;
     let string = document.querySelector("#filter").textContent;
     if(!title.search(string)){
      document.querySelector("#products > ul > li").style.display= 'none';
     }
  });

      btninDiv.addEventListener('click', function(e){
         e.preventDefault();
        // price = document.querySelector("#products > ul > li > div > strong");
         let movedList = document.createElement('li');
         movedList.textContent = name;
         let priceSt = document.createElement('strong');
         price = Number(price);
         priceSt.textContent = price.toFixed(2);
         movedList.appendChild(priceSt);
         let ul = document.querySelector("#myProducts > ul") ;
         ul.appendChild(movedList);
         totalSum += price;
         let pr = document.querySelector("body > h1:nth-child(4)");
         pr.textContent = `Total Price: ` + totalSum.toFixed(2);
         let q = document.querySelector("#products > ul > li > strong");
         q.textContent = `Available: ${quantity-1}`;
         quantity--;
         if(quantity<1){
            ul = document.querySelector("#products > ul");
            ul.removeChild(productList);
         }
         
      });

      let buyBtn = document.querySelector("#myProducts > button");
      buyBtn.addEventListener('click', function(e){
         document.querySelector("#myProducts > ul").textContent = '';
         document.querySelector("body > h1:nth-child(4)").textContent = `Total Price: 0.00`;
      });
   }
}