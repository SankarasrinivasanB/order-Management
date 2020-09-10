module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            email: {
                type: String,
                unique: true,
                required: true
              },
              name: {
                type: String,
                required: true
              },
              hash: String,
              salt: String,
              resetPasswordToken: String
        },
        {
            timestamps : true
        }
    );
const userSchema = mongoose.model("User",schema)
return userSchema;
}
