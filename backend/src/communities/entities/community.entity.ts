import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('communities')
@Index(['name'], { unique: true })
export class Community {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  creatorId: string;

  @Column({ default: 'public' })
  type: 'public' | 'private';

  @Column({ nullable: true })
  coverImage: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ default: 0 })
  membersCount: number;

  @Column({ type: 'simple-array', default: '' })
  rules: string[];

  @Column({ type: 'simple-array', default: '' })
  moderators: string[];

  @Column({ type: 'jsonb', default: {} })
  settings: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
