import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class User {
  @Field((type) => ID, { nullable: true })
  _id: any;

  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  createdAt?: Date | undefined;

  @Field({ nullable: true })
  updatedAt?: Date | undefined;
}

export default User;
