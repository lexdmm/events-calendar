import { EventUser } from 'src/event/entity/event.user.entity'
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@Index(['providerId'], { unique: true })
export class User {
  @Index({ unique: true })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 30, nullable: false })
  providerId: string

  @Column({ length: 300, nullable: false })
  name: string

  @Column({ length: 200, nullable: false })
  email: string

  @OneToMany(() => EventUser, (eventUser) => eventUser.user)
  users: EventUser[]
}
