import Service from "./Service";

class ClassroomService extends Service {
    constructor(model) {
        super(model);
    }

  

    async insertStudent(code, name) {
        console.log("inserting student part 2")
        // print params
        console.log("name: ", name)
        
        console.log("class code: ", code)
        // create user
        // add classroom ObjectId to user
        

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