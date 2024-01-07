import { Request, Response } from "express";
import { Model } from "mongoose";

class BaseController<ModelType> {
    model:Model<ModelType>

    constructor(model: Model<ModelType>) {
        this.model = model;
    }

    async get(req: Request, res: Response) {
        console.log("get all students");
        try {
            if(req.query.name) {
                const students = await this.model.find({name: req.query.name});
                res.send(students);
            } else {
                const students = await this.model.find();
                res.send(students);
            }
        } catch(err){
            res.status(500).json({message: err.message});
        }
    }

    async getById (req: Request, res: Response) {
        console.log("getById: " + req.params.id)
        try {
            const student = await this.model.findById(req.params.id);
            res.send(student);
        } catch(err) {
            res.status(500).json({message: err.message});
        }
    }

    async post (req: Request, res: Response) {
        console.log("post: " + req.body);
        
        try {
            await this.model.create(req.body);
            res.status(201).send("OK");

        } catch(err) {
            res.send("fail: " + err.message);
        }
        
    }

    async putById (req: Request, res: Response) {
        console.log("putById: " + req.params.id)
        try {
            const student = await this.model.findByIdAndUpdate(req.params.id, {name: "adi"}, );
            res.send(student);
        } catch(err) {
            res.status(500).json({message: err.message});
        }
    }

    async deleteById(req: Request, res: Response) {
        console.log("deleteStudentById: " + req.params.id)
        try {
            const student = await this.model.findByIdAndDelete(req.params.id);
            res.send(student);
        } catch(err) {
            res.status(500).json({message: err.message});
        }
    }

        
    }

export default BaseController