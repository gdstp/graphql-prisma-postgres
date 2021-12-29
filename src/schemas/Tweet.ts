import { Field, ID, ObjectType } from 'type-graphql';
import User from './User';

@ObjectType()
class Tweet {
  @Field((type) => ID, { nullable: false })
  id: string;

  @Field()
  description: string;

  @Field()
  user: User;

  @Field()
  likes: number;

  @Field({ nullable: true })
  createdAt?: Date | undefined;

  @Field({ nullable: true })
  updatedAt?: Date | undefined;
}

export default Tweet;
