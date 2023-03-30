import Service from "./Service";

class ClassroomService extends Service {
    constructor(model) {
        super(model);
    }

  

    async insertStudent(code, name) {
        console.log("inserting student")
        // print params
        console.log("name: ", name)
        
        console.log("class code: ", code)
        try {

            let item = await this.model.findOneAndUpdate(
                { code: code },
                { $push: { student: name } },
                { new: true }
            );
            return {
                error: false,
                statusCode: 202,
                item,
            };
        }
        catch (error) {
            return {
                error: true,
                statusCode: 500,
                message: error.errmsg || "Not able to create item",
                error,
            };
        }
    }

    //     try {
    //       let item = await this.model.findByIdAndUpdate(
    //         id,
    //         { $push: { student: studentId } },
    //         { new: true }
    //       );
    //       return {
    //         error: false,
    //         statusCode: 202,
    //         item,
    //       };
    //     } catch (error) {
    //       return {
    //         error: true,
    //         statusCode: 500,
    //         error,
    //       };
    //     }
    //   }

    }

    

export default ClassroomService;