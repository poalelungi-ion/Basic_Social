import {
  Body,
  Delete,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/auth/auth.decorator';
import { RequiredAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/users/user.entity';
import { PostEntity } from './posts.entity';
import { PostsService } from './posts.service';

class PostCreateRequestBody {
  @ApiProperty() text: string;
  @ApiPropertyOptional() originalPostId: string;
  @ApiPropertyOptional() replyToPostId: string;
}

class PostDetailsQueryParams {
  @ApiPropertyOptional() authorId: string;
  @ApiPropertyOptional() hashtags: string[];
}

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/')
  async getAllPosts(
    @Query() query: PostDetailsQueryParams,
  ): Promise<PostEntity[]> {
    return await this.postsService.getAllPosts(query.authorId);
  }

  @Get('/:postId')
  async getPostDetails(@Param('postId') postId: string): Promise<PostEntity> {
    return await this.postsService.getPost(postId);
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Post('/')
  async createNewPost(
    @User() author: UserEntity,
    @Body() post: PostCreateRequestBody,
  ): Promise<PostEntity> {
    const createdPost = await this.postsService.createPost(
      post,
      author,
      post.originalPostId,
      post.replyToPostId,
    );
    return createdPost;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Delete('/:postId')
  async deletePost(@Param('postId') postId: string) {
    const deletedPost = {
      id: postId,
      deleted: await this.postsService.deletePost(postId),
    };

    return deletedPost;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Put('/:postid/like')
  async likePost(@Param('postid') postid: string, @Req() req) {
    const token = (req.headers.authorization as string).replace('Bearer ', '');
    const likedPost = {
      postId: postid,
      liked: await this.postsService.likePost(token, postid),
    };

    return likedPost;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Delete('/:postid/like')
  async unlikePost(@Param('postid') postid: string, @Req() req) {
    const token = (req.headers.authorization as string).replace('Bearer ', '');
    const unlikedPost = {
      postId: postid,
      unliked: await this.postsService.unlikePost(token, postid),
    };

    return unlikedPost;
  }
}