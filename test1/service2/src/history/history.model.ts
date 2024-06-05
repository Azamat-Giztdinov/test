import { Column, Model, Table } from "sequelize-typescript";

@Table
export class History extends Model<History> {
    @Column
    action: string;

    @Column
    userId: number;
}