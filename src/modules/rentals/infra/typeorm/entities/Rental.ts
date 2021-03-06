import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"

@Entity("rentals")
class Rental {

    @PrimaryColumn()
    "id": string;

    @Column()
    "car_id": string;

    @Column()
    "user_id": string;

    @CreateDateColumn()
    "start_date": Date;

    @CreateDateColumn()
    "end_date": Date;

    @CreateDateColumn()
    "expected_return_date": Date;

    @Column()
    "total": number;

    @CreateDateColumn()
    "created_at": Date;

    @UpdateDateColumn()
    "updated_at": Date;


    constructor(){
        if(!this.id){
            this.id = uuidV4()
            // this.created_at = new Date()
            // this.updated_at = new Date()
            // this.start_date = new Date()
            
        }
    }
}

export { Rental } 