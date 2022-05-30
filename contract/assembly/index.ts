/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import { Context, logging, storage, u128 } from 'near-sdk-as'
import { GlobalState, globalState, Post,Comment, User, UserData, userStorage } from './models'

const DEFAULT_MESSAGE = 'Hello'

export function createAccount(name: string, username: string, description: string): void {
  const accountId = Context.sender
  const user = new UserData(name, accountId, username, description, [], [])
  userStorage.set(accountId, user)
  var state = globalState.get('public');
  var id = 0;
  if (state) {
    for (let index = 0; index < state.users.length; index++) {
      const element = state.users[index];
      if (element.account == accountId) {
        id = 1;
        break;
      }
      
    }
      if (id === 0) {
        state.users.push(new User(name, accountId, username));
      }
    globalState.set('public', state);
  }
  else {
    state = new GlobalState([new User(name, accountId, username)], []);
    globalState.set('public', state);
  }
}

export function createPost(post: string, src: string, timestamp: u128): void {
  const accountId = Context.sender;
  const state = globalState.get('public');
  if (state) {
    if (state.posts) {
      var id = u128.add(u128.from(state.posts.length), u128.from(1));
      state.posts.push(new Post(id, accountId, post,src, timestamp));
      globalState.set('public', state);
    }
    else {
      state.posts = [new Post(u128.from(1), accountId, post,src, timestamp)];
      globalState.set('public', state);
    }
  }
}

export function createComment(comment: string, id: u128): void {
  const accountId = Context.sender;
  const state = globalState.get('public');
  if (state) {
    if (state.posts) {
      for (let index = 0; index < state.posts.length; index++) {
        const element = state.posts[index];
        if (element.id == id) {
          element.comments.push(new Comment(comment, accountId));
          globalState.set('public', state);
          break;
        }
      }
    }
  }
}


export function getUser(accountId: string): UserData | null {
  const user = userStorage.get(accountId)
  return user;
}

export function getUsers(): Array<User> | null {
  const state = globalState.get('public');
  if (state) {
    return state.users;
  }
  return null;
}



export function getPosts(): Array<Post>|null {
  const state = globalState.get('public');
  if (state) {
    return state.posts;
  }
  return null;
}

export function follow(account: string) : void {
  const accountId = Context.sender
  const user = userStorage.get(accountId)
  if (user) {
    user.following.push(account)
    userStorage.set(accountId, user)
  }
  const user2 = userStorage.get(account)
  if (user2) {
    user2.follower.push(accountId)
    userStorage.set(account, user2)
  }
}

export function unfollow(account: string) : void {
  const accountId = Context.sender
  const user = userStorage.get(accountId)
  if (user) {
    const index = user.following.indexOf(account)
    if (index > -1) {
      user.following.splice(index, 1)
    }
    userStorage.set(accountId, user)
  }
  const user2 = userStorage.get(account)
  if (user2) {
    const index = user2.follower.indexOf(accountId)
    if (index > -1) {
      user2.follower.splice(index, 1)
    }
    userStorage.set(account, user2)
  }
}

export function getPost(id: u128): Post | null {
  const state = globalState.get('public');
  if (state) {
    for (let index = 0; index < state.posts.length; index++) {
      const element = state.posts[index];
      if (element.id == id) {
        return element;
      }
    }
  }
  return null;
}

export function getPostofUser(account: string): Array<Post> | null {
  const state = globalState.get('public');
  const posts: Array<Post> = [];
  if (state) {
    for (let index = 0; index < state.posts.length; index++) {
      const element = state.posts[index];
      if (element.account == account) {
        posts.push(element);
      }
    }
  }
  return posts;
}

