/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function waitOneSecond() {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
}

function waitTwoSecond() {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
}

function waitThreeSecond() {
    return new Promise((resolve) => {
        setTimeout(resolve, 3000);
    });
}

function calculateTime() {
    console.time("Promise time");
    var a = waitOneSecond();
    var b = waitTwoSecond();
    var c = waitThreeSecond();

    var finalPromise = Promise.all([a, b, c]);
    finalPromise.then((result) => {
        console.timeEnd("Promise time");
    }).catch((err) => {
        console.log(err);
    });
}

calculateTime();

