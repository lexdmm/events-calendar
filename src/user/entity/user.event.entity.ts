import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Event } from '../../event/entity/event.entity'
import { User } from './user.entity'

@Entity()
@Index(['user', 'event'], { unique: true })
export class UserEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User

  @ManyToOne(() => Event, { cascade: true })
  @JoinColumn()
  event: Event

  @Column({ default: false })
  isEventCreator: boolean

  @Column({ default: false })
  isConfirmed: boolean
}
