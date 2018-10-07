declare module "meteor/mongo" {
  module Mongo {
    interface Collection<T> {
      attachSchema(ss: any, options?: [object]): any;
    }
  }
}
