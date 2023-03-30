import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

class Classroom {
    initSchema() {
        const schema = new Schema(
            {
                name: {
                    type: String,
                    required: true,
                },
                code: {
                    type: String,
                    required: true,
                    unique: true,
                },
                // create array of student ids 
                student: {
                    type: [String]

                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
                updatedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
            { timestamps: true }
        );

        schema.plugin(uniqueValidator, {
            message: "Error, expected {PATH} to be unique.",
        });

        mongoose.model("classrooms", schema);
    }

        getInstance() {
            this.initSchema();
            return mongoose.model("classrooms");
        

        }




    
}


export default Classroom;

