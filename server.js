const express=require('express')
const app=express()
const http=require('http').createServer(app)
const root=__dirname

const PORT=process.env.PORT || 3000

http.listen(PORT, ()=>{
        console.log(`Listening on port ${PORT}`)
})
app.use(express.static(root+'/public'))
app.get('/',(req,res)=>{
        res.sendFile(root+'/index.html')
})

//socket
const io=require('socket.io')(http)
io.on('connection',(socket)=>{
        console.log('connected....')
       
        socket.on('message',(msg)=>{
                socket.broadcast.emit('message',msg);
        })
     
})