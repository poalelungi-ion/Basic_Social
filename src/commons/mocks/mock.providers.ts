import { getRepositoryToken } from '@nestjs/typeorm';
import { PasswordEntity } from 'src/auth/password.entity';
import { SessionsEntity } from 'src/auth/sessions.entity';
import { LikesEntity } from 'src/likes/likes.entity';
import { MockLikesRepository } from './likes.repository.mock';
import { PostEntity } from 'src/posts/posts.entity';
import { UserFollowingEntity } from 'src/users/user-followings.entity';
import { UserEntity } from 'src/users/user.entity';
import { MockPostsRepository } from './posts.repository.mock';
import { MockUsersRepository } from './users.repository.mock';

export const MockUsersRepositoryProvider = {
  provide: getRepositoryToken(UserEntity),
  useValue: MockUsersRepository,
};

export const MockUserFollowingsRepositoryProvider = {
  provide: getRepositoryToken(UserFollowingEntity),
  useValue: {},
};

export const MockPostsRepositoryProvider = {
  provide: getRepositoryToken(PostEntity),
  useValue: MockPostsRepository,
};

export const MockLikesRepositoryProvider = {
  provide: getRepositoryToken(LikesEntity),
  useClass: MockLikesRepository,
};

export const MockPasswordRepositoryProvider = {
  provide: getRepositoryToken(PasswordEntity),
  useValue: {},
};

export const MockSessionRepositoryProvider = {
  provide: getRepositoryToken(SessionsEntity),
  useValue: {},
};
