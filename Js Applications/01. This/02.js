function getFibonator(){
let prevEl = 0;
let curr = 1;
    return function(){
        const result = prevEl + curr;
        prevEl = curr;
        curr = result;

        return prevEl;
    };
}