const db = require('./db');

const awaitedQuery = async (sql,params=[])=>{
    return new Promise((resolve, reject)=>{
        try {
            db.query(sql,[...params],(err,res)=>{
                if( err)
                    reject(err);
                resolve({data : res});
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = awaitedQuery;