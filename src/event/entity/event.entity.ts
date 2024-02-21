import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { EventUser } from '../../event-user/entity/event.user.entity'

@Entity()
export class Event {
  @Index({ unique: true })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: true })
  isPublic: boolean

  @Column({ length: 250, nullable: false })
  title: string

  @Column({ type: 'text', default: '' })
  description: string

  @Index()
  @Column({ nullable: false })
  status: string

  @Column({ nullable: false, type: 'date' })
  startDate: Date

  @Column({ nullable: false, type: 'date' })
  endDate: Date

  @Column({ nullable: false, type: 'time' })
  startTime: Date

  @Column({ nullable: false, type: 'time' })
  endTime: Date

  @OneToMany(() => EventUser, (event) => event.event, {
    cascade: ['remove', 'update'],
    orphanedRowAction: 'delete'
  })
  events: EventUser[]
}
