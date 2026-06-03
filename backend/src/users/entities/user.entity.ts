import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { IsEmail, MinLength } from 'class-validator';

@Entity('users')
@Index(['email'], { unique: true })
@Index(['username'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @MinLength(8)
  password: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ nullable: true })
  verificationToken: string;

  @Column({ default: false })
  twoFactorEnabled: boolean;

  @Column({ nullable: true })
  twoFactorSecret: string;

  @Column({ type: 'text', default: '' })
  bio: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column({ default: 'public' })
  privacyLevel: 'public' | 'private' | 'friends';

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: 0 })
  followersCount: number;

  @Column({ default: 0 })
  followingCount: number;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @Column({ type: 'simple-array', default: '' })
  deviceIds: string[];
}
