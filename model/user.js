const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Criando o schema
 const UserSchema = new Schema ({
     email: { type: String, required: true, unique:true, lowercase: true},
     password: {  type: String , required: true, select: false },
     created: { type: Date, default: Date.now }
 });

 //Refatorando as funções usando async await
 UserSchema.pre('save', async function (next) {
    let user = this;
    if (!user.isModified('password')) return next();

    user.password = await bcrypt.hash(user.password, 10)
    return next();
 });

 //Exemplo da função sem async await
//  UserSchema.pre('save', function (next) {
//     let user = this;
//     if (!user.isModified('password')) return next();

//     bcrypt.hash(user.password, 10, (err, encrypted) => {
//         user.password = encrypted;
//         return next();
//     });
//  });


module.exports = mongoose.model('User', UserSchema);