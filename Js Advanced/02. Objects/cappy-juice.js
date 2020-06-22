function solve(input){
    let juices = {};
    let bottles = {};

    input.forEach((line) => {
        let [ name, quantity] = line.split(' => ');
        quantity = Number(quantity);

        if(!juices.hasOwnProperty(name)){
            juices[name] = 0;
        }
        juices[name] += quantity;
        let currentQuantity = juices[name];

        if(currentQuantity>=1000){
            bottles[name] = Math.trunc(currentQuantity/1000);
        }
    });

    
    let keys = Object.keys(bottles);
    for (let name of keys ) {
       let quantity = bottles[name];

       console.log(`${name} => ${quantity}`);
        }
    }
