import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { UserModel } from '.';

@Entity('tasks')
class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @ManyToOne(() => UserModel, user => user.tasks)
    user: UserModel;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @Column({ nullable: true })
    doneAt: Date;

};

export default Task;