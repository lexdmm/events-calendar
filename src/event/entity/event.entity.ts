import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from '../../user/entity/user.entity'

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index()
  @Column()
  userId: number

  @Column({ length: 250, nullable: false })
  title: string

  @Column({ nullable: false, type: 'date' })
  date: Date

  @Column({ nullable: false, type: 'time' })
  startTime: Date

  @Column({ nullable: false, type: 'time' })
  endTime: Date

  @ManyToOne(() => User)
  creator: User

  @ManyToMany(() => User, (user) => user.events)
  @JoinTable()
  users: User[]
}
