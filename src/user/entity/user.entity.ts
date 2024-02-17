import { Event } from 'src/event/entity/event.entity'
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@Index(['providerId'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ length: 20, nullable: false })
  providerId: string

  @Column({ length: 300, nullable: false })
  name: string

  @Column({ length: 200, nullable: false })
  email: string

  @Column({ default: false })
  isEventCreator: boolean

  @ManyToMany(() => Event, (event) => event.users)
  @JoinTable()
  events: Event[]
}
