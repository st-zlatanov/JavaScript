function solve(x,y){
    while(y){
        let temp = y;
        y = x%y;
        x = temp;
    }

    return x;
}



solve(15,5)