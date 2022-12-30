const { ApolloServer } = require ("apollo-server");
const mongoose = require("mongoose");


const MONGDB =  "mongodb+srv://capstone:capstone@cluster0.mnobb5d.mongodb.net/?retryWrites=true&w=majority";

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({

    typeDefs,
    resolvers

});

mongoose.connect(MONGDB, {UseNewUrlParser : true})
.then(()=>{

    console.log("Mongodb connection successfull");
    return server.listen({port : 4000});
})
.then((res)=> {

   console.log(`server is running at ${res.url}`);

});


