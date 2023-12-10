var timer = 0;

function counter(){
    console.log(timer);
    timer ++;
    setTimeout(() => {
        counter();
    }, 1000);
}

counter();