module.exports = mongoose => {
    const Howto = mongoose.model(
      "howto",
      mongoose.Schema(
        { 
          link: String,
          name: {type: String, required:true},
          img: {type: String, required:true},
          published: {type: String, required:true},
          related: Number,
          created_by: {type: String, required:true},
          totalTime: String,
          description: {type: String, required:true},
          content: String,
          comment: String,
        },
        { timestamps: true }
      )
    );
  
    return Howto;
  };