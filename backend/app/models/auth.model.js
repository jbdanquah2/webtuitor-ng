module.exports = mongoose => {
    const Auth = mongoose.model(
      "auth",
      mongoose.Schema(
        { 
          token: String,
          email: {type: String, required:true},
          password: {type: String, required:true},
          firstName: {type: String},
          lastName: {type: String}
        },
        { timestamps: true }
      )
    );
  
    return Auth;
  };