import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MyContext } from 'src/types/myContext';
import { LoginInput } from './input/loginInput';
import { SignupInput } from './input/signupInput';
import { ErrorResponse } from './shared/errorResponse';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './aurh.guard';
import { GetUserId } from './getUserId.decorator';
import { ReportMovementArgs } from './input/reportMovementArgs';
import { UpdateMyProfileArgs } from './input/updateProfileArgs';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async hello() {
    return 'hello world';
  }

  @Mutation(() => [ErrorResponse], { nullable: true })
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<ErrorResponse[] | null> {
    return this.userService.signup(signupInput);
  }

  @Mutation(() => [ErrorResponse], { nullable: true })
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() ctx: MyContext,
  ): Promise<ErrorResponse[] | null> {
    return this.userService.login(loginInput, ctx.req);
  }

  @Mutation(() => Boolean)
  async logout(@Context() ctx: MyContext) {
    return this.userService.logout(ctx);
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  async getProfile(@GetUserId() userId: string): Promise<User> {
    return this.userService.getProfile(userId);
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  async toggleDrivingMode(@GetUserId() userId: string): Promise<User> {
    return this.userService.toggleDrivingMode(userId);
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async reportMovenet(
    @GetUserId() userId: string,
    @Args() { lat, lng, orientation }: ReportMovementArgs,
  ): Promise<User> {
    return this.userService.reportMovement(userId, lat, lng, orientation);
  }

  @Query(() => [User])
  @UseGuards(AuthGuard)
  async getNearbeDrivers(@GetUserId() userId: string): Promise<User[]> {
    return this.userService.getNearbyDrivers(userId);
  }

  @Mutation(() => User)
  async updateProfile(
    @Args()
    updateProfileArgs: UpdateMyProfileArgs,
    @GetUserId() userId: string,
  ): Promise<User> {
    return this.userService.updateProfile(userId, updateProfileArgs);
  }
}
