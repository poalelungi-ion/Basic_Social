import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordEntity } from 'src/auth/password.entity';
import { SessionsEntity } from 'src/auth/sessions.entity';
import { LikesEntity } from 'src/likes/likes.entity';
import { PostEntity } from 'src/posts/posts.entity';
import { UserFollowingEntity } from 'src/users/user-followings.entity';
import { UserEntity } from 'src/users/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'admin',
      password: 'jellyfish',
      database: 'socialmedia',
      synchronize: true,
      logger: 'advanced-console',
      logging: 'all',
      entities: [
        UserEntity,
        PostEntity,
        PasswordEntity,
        SessionsEntity,
        UserFollowingEntity,
        LikesEntity,
      ],
    }),
  ],
})
export class ProdDbModule {}

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'admin',
      password: 'jellyfish',
      database: 'socialmedia',
      synchronize: true,
      dropSchema: true,
      logger: 'advanced-console',
      logging: 'all',
      entities: [
        UserEntity,
        PostEntity,
        PasswordEntity,
        SessionsEntity,
        UserFollowingEntity,
        LikesEntity,
      ],
    }),
  ],
})
export class TestDbModule {}
