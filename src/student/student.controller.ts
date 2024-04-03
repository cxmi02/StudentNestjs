import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { StudentService } from "./student.service";

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @Get('all')
    // Función para obtener todos los estudiantes
    obtainsStudent() {
        return this.studentService.findAll();
    }

    @Post('create')
    // Función para crear un estudiante
    createStudent(@Body() body) {
        return this.studentService.create(body);
    }

    @Put('update/:id')
    // Función para actualizar un estudiante
    updateStudent(@Param('id') id: number, @Body() body){
        return this.studentService.update(id, body);
    }

    @Delete('delete/:id')
    // Función para eliminar un estudiante
    deleteStudent(@Param('id') id: number){
        return this.studentService.deleteStudent(id);
    }
}