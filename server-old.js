const http = require("http");
const books = [
    {id:1, name:'Clean Code', Price:200},
    {id:2, name:'DSA for beginners', Price:500},
    {id:3, name:'Algorithms', Price:800},
];
let handler=(req,res) => {
switch(req.url){
case "/":
res.writeHead(200);
res.write("Hello World!");
break;
case "/api":
    res.writeHead(200);
    res.write("Hello API");
    break;
    case "/books":
        res.writeHead(200);
        res.write(JSON.stringify(books));
        break;
    default:
        res.writeHead(404); 
}
        res.end();
};
const server = http.createServer(handler)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server is up & running on ${PORT}!`));