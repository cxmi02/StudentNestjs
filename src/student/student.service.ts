import { Body, Injectable, Param } from "@nestjs/common";
import { Student} from './Student.enity';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class StudentService {
    constructor(
        @InjectModel(Student.name) private studentModel: Model<Student>,
    ){}

    findAll(){
        return this.studentModel.find().exec();
    }

    async create(@Body() body): Promise<Student> {
        const studentData = {
            name: body.name,
            password: body.password
        };

        const Student = new this.studentModel(studentData);
        return await Student.save();
    }

    async update (@Param('id') id: number, @Body() body): Promise<Student>{
        const userFound = await this.studentModel.findById(id);

        if(userFound) {
            const newUser = {
                name: body.name,
                password: body.password
            };

            const userUpdated = userFound.updateOne(newUser);
            return userUpdated;
        }
    }

    async deleteStudent (@Param('id') id: number){
        const userFound = await this.studentModel.findById(id);

        if(!userFound){
            return 'Student not found';
        }

        const userDeleted = userFound.deleteOne();
        return userDeleted;
    }
}