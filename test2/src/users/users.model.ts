import { Column, Model, Table } from "sequelize-typescript";


@Table
export class User extends Model<User> {
    @Column({
        allowNull: false
    })
    firstname: string;

    @Column({
        allowNull: false
    })
    lastname: string;

    @Column({
        allowNull: false
    })
    age: number;

    @Column({
        allowNull: false
    })
    gender: string;
    
    @Column({
        allowNull: false
    })
    problem: boolean;

}