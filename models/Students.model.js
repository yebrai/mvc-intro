
const mongoose= require("mongoose")

const studentSchema = new mongoose.Schema ({

})

const Student = mongoose.model("Student", studentSchema)

module.exports = Student