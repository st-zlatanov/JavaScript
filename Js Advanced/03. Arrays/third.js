function solve(input){
    let num = 1;
    let result = [];

    for(let i=0;i<input.length;i++){
        if(input[i]==='add'){
            result.push(num);
        }else{
            result.pop();
        }
        num++;
    }

    return result.length===0 ? "Empty":result.join("\n");
}