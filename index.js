const express = require("express");
// const { createProxyMiddleware } = require('http-proxy-middleware');

const app=express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use(
//     "/api",
//     createProxyMiddleware({
//       target: "http://localhost:5000/",
//       changeOrigin: true,
//     })
//   );
  
  
  // controllers
  const read = require('./controller/api/read');
  const write = require('./controller/api/write');
  const update = require('./controller/api/update');

  
  //routes
  app.use('/api/read', read);
  app.use('/api/write', write);
  app.use('/api/update', update);

  const PORT=process.env.PORT||5000;

  if(process.env.NODE_ENV=="production"){
      app.use(express.static('client/build'))
      const path = require('path')
      app.get("*",(req,res)=>{
          res.sendFile(path.resolve(__dirname,'client','build','index.html'))
      })
  }
  
  app.listen(PORT,()=>{
      console.log(`server running at ${PORT}`)
  });