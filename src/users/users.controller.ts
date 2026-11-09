import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ExistUserAliasPipe } from './Pipes/exist-user-alias.pipe';
import { ExistUserEmailPipe } from './Pipes/exist-user-email.pipe';
import { ValidUserIdPipe } from './Pipes/valid-user-id.pipe';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get()
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'List users',
    description: 'Returns all users. Requires a valid JWT.',
  })
  @ApiOkResponse({
    description: 'Array of users',
    type: UserDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  async getAllUsers(): Promise<UserDto[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Get user by id',
    description: 'Returns a single user by id. Requires a valid JWT.',
  })
  @ApiParam({
    name: 'id',
    description: 'User id (UUID)',
    example: 'b8f5a2c1-1234-4cde-9a12-ff00aa11bb22',
  })
  @ApiOkResponse({
    description: 'User found',
    type: UserDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid user id' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  async getUserById(
    @Param('id', ValidUserIdPipe) id: string,
  ): Promise<UserDto> {
    return await this.usersService.getUserById(id);
  }

  @Post()
  @UsePipes(ExistUserAliasPipe, ExistUserEmailPipe)
  @ApiOperation({
    summary: 'Create user',
    description:
      'Creates a new user. Alias and email must be unique. Public endpoint (no JWT required).',
  })
  @ApiCreatedResponse({
    description: 'User created',
    type: UserDto,
  })
  @ApiBadRequestResponse({
    description:
      'Validation error / Email value already exists / Alias value already exists',
  })
  async newUser(@Body() user: UserDto): Promise<UserDto> {
    return await this.usersService.newUser(user);
  }

  @Put(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ExistUserAliasPipe, ExistUserEmailPipe)
  @ApiOperation({
    summary: 'Update user',
    description:
      'Updates an existing user by id. Requires a valid JWT. Alias and email must remain unique.',
  })
  @ApiParam({
    name: 'id',
    description: 'User id (UUID)',
    example: 'b8f5a2c1-1234-4cde-9a12-ff00aa11bb22',
  })
  @ApiOkResponse({
    description: 'User updated',
    type: UserDto,
  })
  @ApiBadRequestResponse({
    description:
      'Invalid user id / Validation error / Email value already exists / Alias value already exists',
  })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  async updateUser(
    @Param('id', ValidUserIdPipe) id: string,
    @Body() user: UserDto,
  ): Promise<UserDto> {
    return await this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes a user by id. Requires a valid JWT.',
  })
  @ApiParam({
    name: 'id',
    description: 'User id (UUID)',
    example: 'b8f5a2c1-1234-4cde-9a12-ff00aa11bb22',
  })
  @ApiNoContentResponse({ description: 'User deleted' })
  @ApiBadRequestResponse({ description: 'Invalid user id' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  async deleteUser(@Param('id', ValidUserIdPipe) id: string): Promise<void> {
    return await this.usersService.deleteUser(id);
  }

  @Get('posts/:id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'List posts by user',
    description: 'Returns all posts created by a given user. Requires a valid JWT.',
  })
  @ApiParam({
    name: 'id',
    description: 'User id (UUID)',
    example: 'b8f5a2c1-1234-4cde-9a12-ff00aa11bb22',
  })
  @ApiOkResponse({
    description: 'Posts list for the given user',
  })
  @ApiBadRequestResponse({ description: 'Invalid user id' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  getPostsByUser(@Param('id', ValidUserIdPipe) userId: string) {
    return this.usersService.getPostsByUser(userId);
  }

  @Get('categories/:id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'List categories by user',
    description:
      'Returns all categories created by a given user. Requires a valid JWT.',
  })
  @ApiParam({
    name: 'id',
    description: 'User id (UUID)',
    example: 'b8f5a2c1-1234-4cde-9a12-ff00aa11bb22',
  })
  @ApiOkResponse({
    description: 'Categories list for the given user',
  })
  @ApiBadRequestResponse({ description: 'Invalid user id' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  getCategoriesByUser(@Param('id', ValidUserIdPipe) userId: string) {
    return this.usersService.getCategoriesByUser(userId);
  }
}
