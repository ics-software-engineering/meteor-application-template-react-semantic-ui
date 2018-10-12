declare module "meteor/mongo" {
  module Mongo {
    interface Collection<T> {
      attachSchema(ss: any, options?: [object]): any;
      get(name: string): any;
    }
    interface CollectionStatic {
      get(name: string): any;
    }
  }
}
