import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { EventUser } from './event.user.entity'

@Entity()
export class Event {
  @Index({ unique: true })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: false })
  isPublic: boolean

  @Column({ length: 250, nullable: false })
  title: string

  @Column({ type: 'text', default: '' })
  description: string

  @Column({ nullable: false, type: 'date' })
  date: Date

  @Column({ nullable: false, type: 'time' })
  startTime: Date

  @Column({ nullable: false, type: 'time' })
  endTime: Date

  @OneToMany(() => EventUser, (event) => event.event)
  eventEvents: EventUser[]
}
