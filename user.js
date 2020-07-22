const users=[];
module.exports={
    addUser(id,userInfo){
        const {username}=userInfo
        users.push({
            id,
            username
        })
    },
    findUser(id){
        return users.find((user)=>user.id==id);
    },
   findAll(){
       return users;
   },
   deleteUser(id){
       users.splice(users.findIndex(user=>user.id==id),1)
   }
}