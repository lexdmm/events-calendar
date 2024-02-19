import { User } from 'src/user/entity/user.entity'
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Event } from './event.entity'

@Entity()
@Index(['user', 'event', 'isEventOwner', 'isConfirmed'], { unique: true })
export class EventUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index()
  @Column({ length: 30, nullable: false, name: 'user_id_owner' })
  userId: string

  @Column({ default: false })
  isEventOwner: boolean

  @Column({ default: false })
  isConfirmed: boolean

  @ManyToOne(() => User, (user) => user.userEvents)
  user: User

  @ManyToOne(() => Event, (event) => event.eventEvents)
  event: Event
}
