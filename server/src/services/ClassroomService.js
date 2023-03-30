import Service from "./Service";

class ClassroomService extends Service {
    constructor(model) {
        super(model);
    }

    async insertStudent(id, studentId) {
        console.log(studentId)
        try {
          let item = await this.model.findByIdAndUpdate(
            id,
            { $push: { student: studentId } },
            { new: true }
          );
          return {
            error: false,
            statusCode: 202,
            item,
          };
        } catch (error) {
          return {
            error: true,
            statusCode: 500,
            error,
          };
        }
      }
    }

export default ClassroomService;