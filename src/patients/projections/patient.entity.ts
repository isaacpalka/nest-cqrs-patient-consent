import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Patient extends BaseEntity {
  @Field()
  @PrimaryColumn({
    type: 'varchar',
    nullable: false,
  })
  patient_id: string;

  @Field()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Field()
  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  date_created: Date;
}
