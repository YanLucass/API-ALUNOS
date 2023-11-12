const pool = require('../db/pool');

class Student {   
    constructor(nome, matricula, telefone, curso) {
        this.nome = nome;
        this.matricula = matricula;
        this.telefone = telefone;
        this.curso = curso;
    }

    static async getAllStudents() {
        try {
            const result = await pool.query('SELECT * FROM students');
            const students = result.rows;
            return students;
        } catch(err) {
            console.log(`Erro ao obter todos os estudantes ${err}`);
            throw err;
        }   
    }

    static async create(newStudent) {
        const { nome, matricula, telefone, curso } = newStudent;
        try {
            const result = await pool.query('INSERT INTO students (nome, matricula, telefone, curso) VALUES ($1, $2, $3, $4) RETURNING *', [nome, matricula, telefone, curso]);
            const createdStudent = result.rows[0];
            return createdStudent;
        } catch(err) {
            console.log('Erro ao criar o estudante', err);
            throw err;
        }
    }

    static async findStudentByRegistration(matricula) {
        try {
            const result = await pool.query('SELECT * FROM students WHERE matricula = $1', [matricula]);
            return result.rows;
        } catch(err) {
            console.log(`Erro ao buscar o estudante com a matricula ${err}`);
            throw err;
        }
    }

    static async deleteStudent(matricula) {
        try {
           const result = await pool.query('DELETE FROM students WHERE matricula = $1 RETURNING *', [matricula]);
           const deleteStudent = result.rows;
           return deleteStudent;
        } catch(err) {
            console.log('Erro ao excluir o estudante por matricula');
            throw err;
        }
    }
}

module.exports = Student;
