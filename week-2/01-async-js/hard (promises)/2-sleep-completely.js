/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep (seconds) {
    var currentTime = Date.now();
    var awakeTime = currentTime + seconds;
    while(Date.now() <= awakeTime){

    }
}

console.log("sleep");
sleep(5000);
console.log("Slept");

