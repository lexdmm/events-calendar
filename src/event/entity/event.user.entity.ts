import { User } from 'src/user/entity/user.entity'
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Event } from './event.entity'

@Entity()
@Index(['userId', 'eventId', 'isEventOwner', 'isConfirmed'], { unique: true })
export class EventUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index()
  @Column({ length: 50, nullable: false })
  userIdOwner: string

  @Column({ default: false })
  isEventOwner: boolean

  @Column({ default: false })
  isConfirmed: boolean

  @Column({ nullable: false })
  userId: string

  @Column({ nullable: false })
  eventId: string

  @ManyToOne(() => User, (user) => user.users)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User

  @ManyToOne(() => Event, (event) => event.events, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'eventId', referencedColumnName: 'id' })
  event: Event
}
