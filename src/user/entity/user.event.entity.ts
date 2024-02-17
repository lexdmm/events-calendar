import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Event } from '../../event/entity/event.entity'
import { User } from './user.entity'

@Entity()
@Index(['user', 'event'], { unique: true })
export class UserEvent {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @ManyToOne(() => User)
  @JoinColumn()
  user: User

  @ManyToOne(() => Event)
  @JoinColumn()
  event: Event

  @Column({ default: false })
  isEventCreator: boolean
}
