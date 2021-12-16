var mysql = require("mysql")

var pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: "root",
    password: "root",
    database: "yy_chat_room"
})

exports.query = async function query(query, values){
    return new Promise((resolve, reject) => {
        try{
            pool.getConnection(function(err, connection) {
                if (err) {
                    reject(err);
                }else {
                    connection.query(query, values, function (error, results) {
                        connection.release();
                        if (error){
                            console.log("原語句", this.query)
                            reject(error)
                        } else{
                            resolve(results) 
                        }
                    });
                } 
              });  
        } catch(e) {
            reject(e)
        }

 
    })
 
}
