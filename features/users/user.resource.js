import { Resource } from '#lib';
export default class UserResource extends Resource {
  transform(user) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: this.formatDate(user.createdAt),
    };
  }
}
