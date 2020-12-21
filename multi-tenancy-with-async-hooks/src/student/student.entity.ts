import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryColumn()
  name: string;

  @Column({
    type: 'int',
    default: () => "current_setting('wizreg.current_tenant')::int",
  })
  tenant_id: number;
}
