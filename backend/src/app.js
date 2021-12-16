const express = require('express')
const app = express()
const port = 7000
const cors = require('cors')
const http = require('http')
const server = http.createServer(app);
const { Server } = require("socket.io")
const { query } = require("./utils/db.js")
const { YyResponse } = require("./utils/response.js")
const io = new Server(server, {
    cors: {
      origin: '*',
    }
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/login', async (req, res) =>  {
    try{
        const data = req.body
        if(data.account&&data.password){
            const result = await query("select count(*) as length from user where account=? and password=?;", [data.account, data.password]);
            console.log(result)
            if(result[0].length > 0) {
                res.send(new YyResponse(200, true))
                return
            }
        }
        throw "帳密錯誤"
    }catch(err){
        console.log("err", err)
        res.send(new YyResponse(400, false))        
    }

})

app.get('/chat_message', async (req, res) =>  {
    try{
        const result = await query("select * from chat_message;");
        res.send(new YyResponse(200, true, result))
        return
    }catch(err){
        console.log("err", err)
        res.send(new YyResponse(400, false))        
    }

})

io.on('connection', (socket) => {
    socket.on('chat message', async (data) => {
        console.log("msg", data)
        await query("insert into chat_message (user_id, message, type) values(?, ?, ?);", [data.user_id, data.message, data.type]);

        socket.emit("chat message", data)


    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})
  

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})