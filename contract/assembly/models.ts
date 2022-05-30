import { u128, PersistentMap, PersistentVector } from "near-sdk-as";

@nearBindgen
export class UserData {
  name: string;
  account: string;
  username: string;
  description: string;
  follower: Array<string>;
  following: Array<string>;
  constructor(name: string, account: string, username: string,description: string,follower: Array<string>,following: Array<string>) {
    this.name = name;
    this.account = account;
    this.username = username;
    this.description = description;
    this.follower = follower;
    this.following = following;
  }
}

@nearBindgen
export class Comment {
  comment: string;
  account: string;
  constructor(comment: string, account: string) {
    this.comment = comment;
    this.account = account;
  }
}

@nearBindgen
export class Post {
  id: u128
  account: string;
  timestamp: u128;
  src: string;
  post: string;
  comments: Array<Comment>;
  constructor(id: u128,account: string, post: string, src: string, timestamp: u128) {
    this.id = id;
    this.account = account;
    this.post = post;
    this.src = src;
    this.timestamp = timestamp;
    this.comments = [];
  }
}


@nearBindgen
export class User {
  name: string;
  account: string;
  username: string;
  constructor(name: string, account: string, username: string) {
    this.name = name;
    this.account = account;
    this.username = username;
  }
}

@nearBindgen
export class GlobalState {
  users: Array<User>;
  posts: Array<Post>;
  constructor(users: Array<User>, posts: Array<Post>) {
    this.users = users;
    this.posts = posts;
  }
}

export const userStorage = new PersistentMap<string, UserData>(
  "userStorage",
);

export const globalState = new PersistentMap<string, GlobalState>(
  "globalState",
);
