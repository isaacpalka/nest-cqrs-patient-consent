import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class PatientConsent extends BaseEntity {
  @Field()
  @PrimaryColumn({
    type: 'varchar',
    nullable: false,
  })
  patient_id: string;

  @Field()
  @PrimaryColumn({
    type: 'varchar',
    nullable: false,
  })
  entity_id: string;

  //FIXME: figure out how to uncomment this
  // @Field()
  @Column({
    type: 'text',
    array: true,
    nullable: false,
  })
  permissions: string[];
}
