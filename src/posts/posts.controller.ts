import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ValidPostIdPipe } from './Pipes/valid-post-id.pipe';
import { PostDto } from './post.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }

  @Get()
  @ApiOperation({
    summary: 'List posts',
    description: 'Returns all posts. Public endpoint.',
  })
  @ApiOkResponse({ description: 'Array of posts', type: PostDto, isArray: true })
  async getAllPosts(): Promise<PostDto[]> {
    return await this.postsService.getAllPosts();
  }

  @Get(':id')
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: 'Get post by id',
    description:
      'Returns a single post by id. NOTE: This endpoint is currently NOT protected by JWT in code (no guard), even though Swagger shows BearerAuth.',
  })
  @ApiParam({
    name: 'id',
    description: 'Post id (UUID)',
    example: '9a9f2c22-3c5b-4a15-9d2d-0f1c2a3b4c5d',
  })
  @ApiOkResponse({ description: 'Post found', type: PostDto })
  @ApiBadRequestResponse({ description: 'Invalid post id' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  async getPostById(
    @Param('id', ValidPostIdPipe) id: string,
  ): Promise<PostDto> {
    return await this.postsService.getPostById(id);
  }

  @Post()
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Create post',
    description: 'Creates a new post. Requires a valid JWT.',
  })
  @ApiCreatedResponse({ description: 'Post created', type: PostDto })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  async newPost(@Body() post: PostDto): Promise<PostDto> {
    return await this.postsService.newPost(post);
  }

  @Put(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Update post',
    description: 'Updates an existing post by id. Requires a valid JWT.',
  })
  @ApiParam({
    name: 'id',
    description: 'Post id (UUID)',
    example: '9a9f2c22-3c5b-4a15-9d2d-0f1c2a3b4c5d',
  })
  @ApiOkResponse({ description: 'Post updated', type: PostDto })
  @ApiBadRequestResponse({ description: 'Invalid post id / Validation error' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  async updatePost(
    @Param('id', ValidPostIdPipe) id: string,
    @Body() post: PostDto,
  ): Promise<PostDto> {
    return await this.postsService.updatePost(id, post);
  }

  @Put('like/:id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Like post',
    description: 'Increments like counter for a post. Requires a valid JWT.',
  })
  @ApiParam({
    name: 'id',
    description: 'Post id (UUID)',
    example: '9a9f2c22-3c5b-4a15-9d2d-0f1c2a3b4c5d',
  })
  @ApiOkResponse({
    description: 'Like applied (TypeORM UpdateResult)',
    type: Object,
  })
  @ApiBadRequestResponse({ description: 'Invalid post id' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  async likePost(
    @Param('id', ValidPostIdPipe) id: string,
  ): Promise<UpdateResult> {
    return await this.postsService.likePost(id);
  }

  @Put('dislike/:id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Dislike post',
    description: 'Increments dislike counter for a post. Requires a valid JWT.',
  })
  @ApiParam({
    name: 'id',
    description: 'Post id (UUID)',
    example: '9a9f2c22-3c5b-4a15-9d2d-0f1c2a3b4c5d',
  })
  @ApiOkResponse({
    description: 'Dislike applied (TypeORM UpdateResult)',
    type: Object,
  })
  @ApiBadRequestResponse({ description: 'Invalid post id' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  async dislikePost(
    @Param('id', ValidPostIdPipe) id: string,
  ): Promise<UpdateResult> {
    return await this.postsService.dislikePost(id);
  }

  @Delete(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Delete post',
    description: 'Deletes a post by id. Requires a valid JWT.',
  })
  @ApiParam({
    name: 'id',
    description: 'Post id (UUID)',
    example: '9a9f2c22-3c5b-4a15-9d2d-0f1c2a3b4c5d',
  })
  @ApiOkResponse({
    description: 'Post deleted (TypeORM DeleteResult)',
    type: Object,
  })
  @ApiBadRequestResponse({ description: 'Invalid post id' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  async deletePost(
    @Param('id', ValidPostIdPipe) id: string,
  ): Promise<DeleteResult> {
    return await this.postsService.deletePost(id);
  }
}
