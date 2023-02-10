const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    database: 'bhavyadb',
    user: 'root',
    password: 'root123',
})

con.connect(function(err){
     if(err) throw err;
     console.log('Database Connected');
})

// app.get("/message",(req,res)=>{
//     res.json({message: "Hello from server!"});
// })

app.get('/getparent', (req, res) => {
    console.log(req.body);
    const query = `select * from category`;
    con.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})
app.get("/parentdata", (req, res) => {
    const query = `select * from category where parent=0`;
    con.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})
app.get('/getdata', (req, res) => {
    const id = req.query.id;
    console.log(req.query)
    try {
        const query = `select * from category where parent="${id}"`;
        con.query(query, (err, results) => {
            if (err) throw err;
            res.send(results);
        })
    } catch (err) {
        res.status(400).send(err)
    }
})

app.get('/delete',async (req,res)=>{
    console.log(req.query);
    try{
        const ans = await deleteData(req.query);
        res.status(200).send("your data deleted");
    }catch(err){
        res.status(400).send(err);
    }
    

})
const deleteData = (data) =>{
    console.log(data)
    // data =  { name: 'TV', id: '2' }
    return new Promise(async (resolve,reject)=>{
        try{
            const getMyChild = await getChildData(data.id);
            console.log("getMyChild",getMyChild);
            getMyChild.map(async (item)=>{
                await deleteData(item);
            })
            const ans = await deleteSingleData(data.id);
            resolve("ok")
        }catch(err){
            reject(err);
        }
    })
}
const getChildData = (id) =>{
    return new Promise(async (resolve,reject)=>{
        try{
            const query = `select * from category where parent="${id}"`;
            const ans = await sqlQueryRunner(query);
            resolve(ans);
        }catch(err){
            reject(err);
        }
    });
}
const deleteSingleData = (id) =>{
    return new Promise(async (resolve,reject)=>{
        const sqlQuery = `delete from category where id="${id}"`;
        try{
            const ans = await sqlQueryRunner(sqlQuery);
            resolve(ans);
        }catch(err){
            reject(err);
        }
        
    });
}
const sqlQueryRunner = (query) =>{
    return new Promise((resolve,reject)=>{
        con.query(query,(err,results)=>{
            if(err) reject(err);
           resolve(results);
        })    
    })
}

app.post('/addcategory', (req, res) => {
    console.log(req.body);
    const query = `Insert into category (name,parent) values ("${req.body.name}","${req.body.category}")`;
    con.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(9001,()=>{
    console.log(`server is running on port 9001`)
});