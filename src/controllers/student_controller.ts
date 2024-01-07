import StudentModel, { IStudent } from "../models/student_model";
import BaseController from "./base_controller";

const studentController = new BaseController<IStudent>(StudentModel);


export default studentController