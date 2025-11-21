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