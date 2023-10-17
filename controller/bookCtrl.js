const books = [
    {id:1, name:'Clean Code', Price:200},
    {id:2, name:'DSA for beginners', Price:500},
    {id:3, name:'Algorithms', Price:800},
];
/*const get = (req,res) => {
    res.status(200).send(books);
};
module.exports ={
    get,
};*/

class BookCtrl {
    get (req,res){
        res.status(200);
        res.json(books);
    }
  //Postman {GET,POST,PUT,PATCH, DELETE}
  getById (req,res){
    const book_id = +req.params.id;
  console.log(typeof book_id);
 for(var i=0;i<books.length; i++){
    if(book_id === books[i].id){
        res.status(200);
        res.json(books[i]);
    } /*else {
 res.status(400);
 res.send("Not Found");
    }*/
}
}
create(req,res){
  const data = req.body;
  books.push(data);
  res.status(201)
  res.send("Book Added");  
}
  update(req,res){
    const data = req.body;
    const book_id =+req.params.id;
    for(var i=0; i<books.length; i++){
        if(books[i].id === book_id) {
        books[i].name = data.name;
        books[i].price = data.price;
     res.status(204).send();
        }
    }
   }
   patch(req,res){
    const data = req.body;
    const book_id =+req.params.id;
    for(var i=0; i<books.length; i++){
        if(books[i].id === book_id) {
       for (let key in data){
        books[i][key]=data[key];
       }
     res.status(204).send();
        }
    }
   }

   delete(req,res){
    const book_id =+req.params.id;
    for(var i=0; i<books.length; i++){
        if(books[i].id === book_id) {
    books.splice(i,1);
        }
        res.status(204).send();

    }
   }
}

module.exports = new BookCtrl();