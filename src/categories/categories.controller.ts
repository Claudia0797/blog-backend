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
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './category.dto';
import { ExistCategoryCssColorPipe } from './Pipes/exist-category-css-color.pipe';
import { ExistCategoryTitlePipe } from './Pipes/exist-category-title.pipe';
import { ValidCategoryIdPipe } from './Pipes/valid-category-id.pipe';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiExcludeEndpoint()
  @Get()
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'List categories',
    description: 'Returns all categories. Requires a valid JWT.',
  })
  @ApiOkResponse({
    description: 'Array of categories',
    type: CategoryDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  async getAllCategories(): Promise<CategoryDto[]> {
    return await this.categoriesService.getAllCategories();
  }

  @Get(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Get category by id',
    description: 'Returns a single category by id. Requires a valid JWT.',
  })
  @ApiParam({
    name: 'id',
    description: 'Category id (UUID)',
    example: '5e1a7d10-8b4c-4f4d-9c11-1a2b3c4d5e6f',
  })
  @ApiOkResponse({ description: 'Category found', type: CategoryDto })
  @ApiBadRequestResponse({ description: 'Invalid category id' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  async getCategoryById(
    @Param('id', ValidCategoryIdPipe) id: string,
  ): Promise<CategoryDto> {
    return await this.categoriesService.getCategoryById(id);
  }

  @Post()
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ExistCategoryTitlePipe, ExistCategoryCssColorPipe)
  @ApiOperation({
    summary: 'Create category',
    description:
      'Creates a new category. Title and css_color must be unique. Requires a valid JWT.',
  })
  @ApiCreatedResponse({ description: 'Category created', type: CategoryDto })
  @ApiBadRequestResponse({
    description:
      'Validation error / Title value already exists / Css color value already exists',
  })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  async newCategory(@Body() category: CategoryDto): Promise<CategoryDto> {
    return await this.categoriesService.newCategory(category);
  }

  @Put(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ExistCategoryTitlePipe, ExistCategoryCssColorPipe)
  @ApiOperation({
    summary: 'Update category',
    description:
      'Updates an existing category by id. Title and css_color must remain unique. Requires a valid JWT.',
  })
  @ApiParam({
    name: 'id',
    description: 'Category id (UUID)',
    example: '5e1a7d10-8b4c-4f4d-9c11-1a2b3c4d5e6f',
  })
  @ApiOkResponse({ description: 'Category updated', type: CategoryDto })
  @ApiBadRequestResponse({
    description:
      'Invalid category id / Validation error / Title value already exists / Css color value already exists',
  })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  async updateCategory(
    @Param('id', ValidCategoryIdPipe) id: string,
    @Body() category: CategoryDto,
  ): Promise<CategoryDto> {
    return await this.categoriesService.updateCategory(id, category);
  }

  @Delete(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Delete category',
    description: 'Deletes a category by id. Requires a valid JWT.',
  })
  @ApiParam({
    name: 'id',
    description: 'Category id (UUID)',
    example: '5e1a7d10-8b4c-4f4d-9c11-1a2b3c4d5e6f',
  })
  @ApiOkResponse({
    description: 'Category deleted (TypeORM DeleteResult)',
    type: Object,
  })
  @ApiBadRequestResponse({ description: 'Invalid category id' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  async deleteCategory(
    @Param('id', ValidCategoryIdPipe) id: string,
  ): Promise<DeleteResult> {
    return await this.categoriesService.deleteCategory(id);
  }
}
