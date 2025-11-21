// Easy 10

// Q1 Console your name
// var name = "Myname"
// console.log(name)

// Q2 Print the result of 45 * 2 -10

// console.log(45 * 2 -10)



// Q3 use console.log to display the current year

// let currentYear = new Date();
// console.log(currentYear.getFullYear())

// Q4 Create a two variable for farst name and lant name, concate and log them.
// let firstName = "ankit";
// let lastName = "singh"
// console.log(`${firstName} ${lastName}`)


// Q5 Track the value of variable by logging it before and after updating
// let val = 34
// console.log(val)
// val = 45
// console.log(val)


// Q6 Use a sonsole.error() to  simulate  an error message.
// console.error("error")

// Q7 Log the squre of the number 12  to the console
// console.log(12*12) 

// Q8 Print the type of variable holding the value TRUE
// var a = true
// console.log(typeof(a))

// Q9 Create a variable holding your age and log whether it's grether than 18
// var age = 19
// if(age > 18) console.log(true)
//     else console.log(false)


// Q10 Log the result of 100 / 0 and observe the output
// console.log(100/0)



// 2. Variable and dataTypes (10 Q)

// Q11 Declare a variable using let and log its value
// let city = "New York";
// console.log(city);

// Q12 Create a const to store the value of PI and log it.
// let pi = Math.PI
// console.log(pi)

// Q13 Reassign a value of variable u

// Q14/
// console.log(typeof(null))
// let n=1
// let sum = 0
// while( n <  11){
//     sum += n
//     n++
// }
// console.log(sum)

//Q 22

// let name = "ankit"
// for (const n of name) {
//     console.log(n)
// }

// Q23
// for (i = 1; i <= 20; i++) {
//     if (i % 2 !== 0) {
//         console.log(i)
//     }

// }

// Q24
// let i =5
// do{
//     console.log(i)
//     i--;
// }
// while(i>0)

// Q25
// let fact = 1
// for(let i=5;i>0;i--){
//    fact = fact*i
// }
// console.log(fact)


// Q26
// let hold = 1
// for(let i=1;i<=3;i++){
//     let str = ""
//     for(let j=1;j<=i;j++){
//         str += `${hold} `
//         hold++
//     }
//     console.log(str)
// }

// #28
// let arr = [1,2,3,4,5]
// for(let i=arr.length-1;i>=0;i--){
//     console.log(arr[i])
// }

// for(let i=0;i< Math.floor(arr.length / 2); i++){
//     let temp = arr[i]
//     arr[i] = arr[arr.length -1 - i]
//     arr[arr.length -1 - i] = temp
// }
// console.log(arr)


// #29 write a while loop that logs a 1 to 100 numbers divisible by 5
// let num = 1
// while(num < 101){
//     if(num % 5 == 0){
//         console.log(num)
//     }
//     num++
// }

// #30 use for..in loop to iterete over an object   and logs its key
// let obj = {
//     name: "a",
//     role: 12,
//     class: "b"
// }
// for (const o in obj) {

//     console.log(o)

// }


// level 4

// #31 create top 5 movie movi name and log it
// let movie = ["q", "r", "n", "t","m"]
// movie.forEach(function( value){
//     console.log(value)
// })

// #32 Find and log second element of array
// let arr = [23, 45, 64]
// console.log(arr[1])

// #33 add two new element to the start of an array using .unshift()
// let arr = [1, 2, 3, 4]
// arr.unshift(0)
// arr.unshift(-1)
// console.log(arr)


// #34 remove the last number of an arr and log the updated array
// let arr = [1, 2, 3,4, 5] 
// arrlength = arr.length
// arr.pop(arrlength-1)
// arr.pop(arrlength-1)
// console.log(arr)

// #35 use the slice() to extract the first three element of an array.
// let arr = [1,2,3,4,5]
// console.log(arr.slice(0, 3))  

// #36 Find the index of a apecific element in an array using .indexOf()
// let arr  = [2, 5, 1]
// console.log(arr.indexOf(2))

// #37 Check if a value exists in an array using .include()
// let arr = [1,2,3,4,5]
// console.log(arr.includes(7))

// #38 conbine two array [1,2] nad [3,4] in assending order
// let arr = [1, 2]
// let arr1 = [3,4]
// console.log(arr.concat(arr1))

//  # 39 Sort an array of number [3, 5, 2 0] in asceding order
// let arr = [3, 5, 2, 0]
// for (let i = 0; i < arr.length - 1; i++) {
//     for (let j = 0; j < arr.length - i; j++) {
//         if (arr[j] > arr[j + 1]) {
//             let temp = arr[j];
//             arr[j] = arr[j+1]
//             arr[j+1] = temp
//         }
//     }
// }
// console.log(arr)

// #40 Write a programe that create a copy of an array without muiting the original
// let arr = [1,2,3,4]
// let arr2 = [...arr]
// arr.forEach(function(val){
//     arr2.push(val)
// })
// arr2.pop()
// console.log(arr2)

// #41 create a fucntion to ckeck if a number even or odd
// function eodd(num){
//     if(num%2==0){
//         console.log(`number is even ${num}`)
//     }
//     else{
//         console.log(`number is odd ${num}`)
//     }
// }
// eodd(3)

// #42 creta a function that caliculates a curcle area rediuse

// function cirsle(radiuse){
//     console.log(`Area of circleid: ${Math.PI * radiuse * radiuse}`)
// }
// cirsle(4)

// #43 write a function that takes an array of number and returns the sum of array

// function sumarray(arr){
//     let array = arr;
//     let sum = 0;
//     array.forEach(e => {
//         sum += e;
//     });
//     return sum;
// }
// let arr = [3,5,2,0]
// console.log(sumarray(arr))

// #44 create a function that takes ckecks if a string start with a specific letter

// function startWith(str, letter) {
//     if(str[0].toLowerCase() == letter.toLowerCase()){
//         console.log(true)
//     }
//     else{
//         console.log(false)
//     }
// }
// startWith("ankit", "a")

// #45 write a function to find the maximum number of two numbers

// function max(a,b){
//     if(a>b) return a
//     else return b
// }
// console.log(max(4,7))

// #46 create a function that takes a number and return its factorial

// function fact(n){
//     let fact = 1
//     for(let i=1; i<=n;i++){
//         fact = fact*i
//     }return fact
// }
// console.log(fact(5))

// #47 write a function that taks a astring and returns it in reverse order

// function reverseStr(str){
//     return str.split("").reverse().join("")
// }

// console.log(reverseStr("ankit"))

// #48 create afunction that return a agest number of an array

function maxValr(arr){
    let temp = 0
    for (let i = 0; i < arr.length; i++) {
        if(arr[i]> arr[temp]){
            temp = i
            
        }
    }
    return arr[temp]
}
let arr = [3,5,2,0]
console.log(maxValr(arr))