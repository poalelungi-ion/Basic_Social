import { BaseEntity } from 'src/commons/base.entity';
import { PostEntity } from 'src/posts/posts.entity';
import { UserEntity } from 'src/users/user.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('likes')
export class LikesEntity extends BaseEntity {
  @ManyToOne(() => PostEntity)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
