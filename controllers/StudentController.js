const Student = require('../models/Student');

module.exports = class StudentController {
    
    static async getStudents(req, res) {
        const students = await Student.getAllStudents();
        res.status(200).json({message: students});
    }

    static async createStudent(req, res) {
        const { nome, matricula, telefone, curso } = req.body;
        if(!nome) {
            res.status(422).json({message: "Nome é obrigatório!"});
            return;
        }

        if(!matricula) {
            res.status(422).json({message: "Matricula é obrigatória!"});
            return;
        }

        if(!telefone) {
            res.status(422).json({message: "telefone é obrigatório!"});
            return;
        }

        if(!curso) {
            res.status(422).json({message: "Curso é obrigatório!"});
            return;
        }

        const studentData = {
            nome,
            matricula,
            telefone,
            curso
        }
        const checkRegistration = await Student.findStudentByRegistration(matricula);

        if(checkRegistration) {
            res.status(422).json({message: "Essa matricula já pertence a um estudante!"});
            return;
        }

        const newStudent = await Student.create(studentData);
        console.log(newStudent);
        res.status(200).json({message: "Estudante criado com sucesso!"});
        return;
    }


    //get one student by registration;
    static async getOneStudent(req, res) {
        const registration = req.params.registration;
        console.log(registration);
        try {
            const student = await Student.findStudentByRegistration(registration);
            res.status(200).json({message: student});
        } catch(err) {
            console.log('Deu erro ', err);
        }
    }

    static async deleteStudent(req, res) {
        const registration = req.params.registration;
        console.log(registration);
        try {
            const student = await Student.findStudentByRegistration(registration);

            if(!student) {
                res.status(404).json({message: `Estudante com matricula ${matricula} não encontrado!`});
                return;
            }

            await Student.deleteStudent(registration);
            res.status(200).json({message: "Aluno deletado com sucesso!"});


        } catch(err) {
            console.log('Deu erro ', err);
        }
    }
}
