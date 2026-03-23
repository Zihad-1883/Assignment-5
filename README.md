# Question - 1 . What is the difference between var, let, and const?

## Answer : All of these are used for variable declaration. let and const are new updates from ES6 and we use these instead of var. Because var is not block scoped and it leaks out of a block and gets hoisted to the top of the code and it is used even before the code is written and causes confusion. But let and const is function scoped and does not have the problems var has. In let, we can redeclare the value of stored variable like var but in const we cannot redeclare the value of the stored value. 
<br>
<br>

# Question - 2 . What is the spread operator (...)?
 
## Answer : Spread operator expands an array or an object into individual items. For example, if we have an array like array1 = [1,2,3] and another array like array2 = [4,5,6] and if we want to merge array1 into array2 we use spread method. We write , 
  let array1 = [1,2,3]; <br>
  let array2 = [4,5,6]; <br>
  array2 = [...array1 , 4,5,6]; <br>
  console.log(array2); <br>

## We will get output as [1,2,3,4,5,6]
<br>
<br>

# Question - 3 . What is the difference between map(), filter(), and forEach()?

## Answer : All 3 methods is using to loop through inside an array . Difference is , forEach() only does the looping like an usual for loop and it does not return anything . filter() returns a new array with elements that matches with the condition given to it . map() returns a new array with all elements inside transformed.
<br>
<br>

# Question - 4 .  What is an arrow function?

## Answer : Arrow function is a new method of writing usual functions which came with the ES6 update . Normally we declare a function like ,
  function sum(){ <br>
    // code here <br>
  }

## With arrow function , 
  const sum = () => { <br>
    // code here <br>
  }

## Arrow function also can be used inside addEventListener and all other relevant places . We do not need to type return to return something if the function code is one line, otherwise we need to write return statement . It is a modern way of writing functions.
<br>
<br>

# Question - 5 . What are template literals?

## Answer : We normally use '' or "" for declaring stings and writing class names in js an html . Template literals lets us write dynamic code in place of static sting with backticks `` . Instead of writing 

let card = { price : 500} <br>
let price = "the price is 500tk"
## We Write

let price = `the price is ${card.price} tk`
## So we can add data dynamically.