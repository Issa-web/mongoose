const mongoose = require('mongoose') // we need to require mongoose after installing it

// we have to connect mongoose to our mongodb server 
//'mongodb://localhost:27017' => the port where we can get access to our mongodb database server
// "/fruitsDB" the name of database we would like to connect or create 
mongoose.connect('mongodb://localhost:27017/fruitsDB', { useNewUrlParser: true, useUnifiedTopology: true}) 

// inserting some datas;
// we have to create a schema for our data

const fruitSchema = new mongoose.Schema({
  // by changing property value to an object, we could insert some validations as below
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified"] 
  },
  rate: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

// after creating a schema, we use it to create our model
// the first parameter is the name of collection(always in singular) => here is Fruit
// and the second parameter is schema, how we want our collection to be structured => fruitSchema

const Fruit = mongoose.model("Fruit", fruitSchema); 

// now let's create a new fruit document
const fruit = new Fruit({
  name: "Apple",
  rate: 9,
  review: "Pretty solid as a fruit"
});

// now let's save() to save fruit inside four fruits collection inside FruitsDB
// fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "pineapple",
  rate: 9,
  review: "Great fruit"
});

const pear = new Fruit({
  name: "Pear",
  rate: 8,
  review: "Love this fruit"
});


const person = new Person({
  name: "Amy",
  age: 12,
  favoriteFruit: pineapple
});

// pineapple.save();
pear.save();
// person.save();

// creating more documents and add them into our collections in one go
const orange = new Fruit({
  name: "Orange",
  rate: 6,
  review: "This orange is so sweet"
});
const banana = new Fruit({
  name: "Banana",
  rate: 9,
  review: "I like this banana"
});
const pinneapple = new Fruit({
  name: "Pinneapple",
  rate: 9,
  review: " so sweet"
});

// inserting many collections in one go
// Fruit.insertMany([banana, orange, pinneapple], function(err){
//   if(err){
//     console.log(err)
//   } else{
//     console.log("Successfully saved all the fruits into fruitsDB")
//   }
// })


// reading from database witg mongoose
// use our model which here Fruit and invoke find(). 
//Find takes a callback function and has two parameters: err and whatever we get back, here we will call fruits

Fruit.find(function(err, fruits){
  if(err){
    console.log(err)
  }else {
    mongoose.connection.close() // to close the connection when we are done with find() and therefore we'll need to use conrol c anymore
    fruits.forEach((fruit) =>{
      console.log(fruit.name)
    })
  }
})

// Updating and deleting using mongoose

// Fruit.updateOne({_id:"5fd6bc90b4bdc121dc6b5a64"}, {name: "Peach"}, function(err){
//     if(err){
//       console.log(err)
//     }else{
//       console.log("Document has been successfully updated")
//     }
// });


// Fruit.deleteOne({name: "Orange"}, (err) =>{
//   if(err){
//     console.log(err)
//   }else{
//     console.log("Doc has been successfully deleted")
//   }
// })

// Fruit.deleteMany({name: "Apple"}, (err) =>{
//   if(err){
//     console.log(err)
//   }else{
//     console.log("docs have been successfully deleted")
//   }
// })

// Etablishing relationships and embedded docs using mongoose

Person.updateOne({name:"John"}, {favoriteFruit: pear}, (err)=>{
  if(err){
    console.log(err)
  }else{
    console.log("doc has been updated")
  }
})







