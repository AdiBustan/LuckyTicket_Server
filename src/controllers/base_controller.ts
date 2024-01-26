import { Request, Response } from "express";
import { Model } from "mongoose";

class BaseController<ModelType> {
    model:Model<ModelType>

    constructor(model: Model<ModelType>) {
        this.model = model;
    }

    async get(req: Request, res: Response) {
        console.log("get all");
        try {
            const models = req.query.name ? 
            await this.model.find({name: req.query.name}) : 
            await this.model.find();
            res.status(200).send(models);

        } catch(err){
            res.status(500).send({message: err.message});
        }
    }

    async getById (req: Request, res: Response) {
        console.log("getById: " + req.params.id)
        try {
            const model = await this.model.findById(req.params.id);
            res.send(model);
        } catch(err) {
            res.status(500).json({message: err.message});
        }
    }

    async post (req: Request, res: Response) {
        console.log("post: " + req.body);
        
        try {
            const model = await this.model.create(req.body);
            res.status(201).send(model);

        } catch(err) {
            console.log(err);
            res.status(406).send("fail: " + err.message);
        }
        
    }

    async putById (req: Request, res: Response) {
        console.log("putById: " + req.params.id)
        try {
            const model = await this.model.findByIdAndUpdate(req.body._id, 
                {name: req.body.name}, 
                {new: true});
            res.status(200).send(model);
        } catch(err) {
            console.log(err)
            res.status(500).json({message: err.message});
        }
    }

    async deleteById(req: Request, res: Response) {
        console.log("deleteById: " + req.params.id)
        try {
            const student = await this.model.findByIdAndDelete(req.params.id);
            res.send(student);
        } catch(err) {
            res.status(500).json({message: err.message});
        }
    }
}

// const createController = <ModelType>(model: Model<ModelType>) => {
//     return new BaseController<ModelType>(model);
// }

export default BaseController