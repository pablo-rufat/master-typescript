import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import bcrypt from 'bcryptjs';
import { TaskModel } from '.';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;
    
    @OneToMany(() => TaskModel, task => task.user)
    tasks: TaskModel[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPasword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

};

export default User;