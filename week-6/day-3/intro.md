### MONGO DB & Mongoose
It runs on 27017

# What is Databse ?
-- A database is an organized collection of data stored electronically so it can be easily accessed, managed, and updated

# SQL
 ---------------------------------------
| Product | qty | color | Gen | OS | RAM |
 _______________________________________
| Tshirt  | 1   | red   |     |    |     |
| Mobile  | 1   | black |  2nd|    |     |
| Laptop  | 1   | white |  3rd|with| 1TB |
 ---------------------------------------

# NO-SQL / MONGO DB
stored in document format

    {'name':'milk', 'qty':1}
    {'name':'milk', 'qty':1, 'Exi':12}

# cmds

- `show dbs`
- `use db_name`
- `db.createCollection("cl_name")`
- `show collections`
- `db.cl_name.insertOne({"name":"ABC", "city":"ggn", "age": 56})`
- `db.cl_name.updateOne({"name":"CBA"}, {$set:{"active":true}})`

# Most common mongoDB Command

- mongosh
- ctrl + c 
- db - > current db name 
- show dbs -> show all existing db 
- use dbName  -> switch db that we want to use 
- show collections -> show all the existing collection 
- db.createCollection("collectionName")  -> create new collection
- db.collectionName.insertOne({}) -> add 1 new document in collection
- db.collectionName.insertMany([{},{}]) -> add new documents in collection 
- db.collectionName.find() -> return all document in collection
- db.collectionName.findOne() -> return 1st match document in collection
- db.collectionName.find({}) -> return all match document as per query from collection
- db.collectionName.updateOne({query},{$set:{}}) -> update 1 document in collect+ion
- db.collectionName.updateOne({query},{$set:{}}) -> update all document in collection
- db.collectionName.deleteOne({query}) -> delete 1 document in collection
- db.collectionName.deleteMany({query}) -> delete all document in collection