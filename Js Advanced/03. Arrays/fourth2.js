function solve(input){
    let step = +input.pop()%input.length;

    return input.reduceRight((acc,cur)=>{
         if(step){
          acc= [cur,...acc.slice(0,input.length-1)];
            step--;
        }
        
        return acc;
        
    },[...input]).join(" ");
}