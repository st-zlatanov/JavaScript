function solve(input){
    let iteration = +input.pop()%input.length;

    for(let i=0;i<iteration;i++){
       let el = input.pop();
        input.unshift(el);
    }

    return input.join(" ");
}