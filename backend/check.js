const bcrypt = require('bcrypt')

check = async() =>{
    res = await bcrypt.hash("Leo@1234",10)
    console.log(res)
}
check()