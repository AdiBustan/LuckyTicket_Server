import StudentPost, { IStudentPost } from "../models/student_post_model";
import BaseController from "./base_controller";

const studentPostController = new BaseController<IStudentPost>(StudentPost);


export default studentPostController