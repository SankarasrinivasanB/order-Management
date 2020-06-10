module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            sequenceName : String,
            sequenceValue : Number
        },
        {
            timestamps : true
        }
    );
const sequenceGenerator = mongoose.model("sequenceGenerator",schema)
return sequenceGenerator;
}
