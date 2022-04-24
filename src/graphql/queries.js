/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSelf = /* GraphQL */ `
  query GetSelf($id: ID!) {
    getSelf(id: $id) {
      id
      name
      posts {
        items {
          id
          username
          email
          nickname
          createdAt
          updatedAt
          selfPostsId
        }
        nextToken
      }
      alerts {
        items {
          id
          from
          to
          message
          createdAt
          updatedAt
          selfAlertsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSelves = /* GraphQL */ `
  query ListSelves(
    $filter: ModelSelfFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSelves(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        posts {
          nextToken
        }
        alerts {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFriend = /* GraphQL */ `
  query GetFriend($id: ID!) {
    getFriend(id: $id) {
      id
      username
      email
      nickname
      createdAt
      updatedAt
      selfPostsId
    }
  }
`;
export const listFriends = /* GraphQL */ `
  query ListFriends(
    $filter: ModelFriendFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriends(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        nickname
        createdAt
        updatedAt
        selfPostsId
      }
      nextToken
    }
  }
`;
export const getAlerts = /* GraphQL */ `
  query GetAlerts($id: ID!) {
    getAlerts(id: $id) {
      id
      from
      to
      message
      createdAt
      updatedAt
      selfAlertsId
    }
  }
`;
export const listAlerts = /* GraphQL */ `
  query ListAlerts(
    $filter: ModelAlertsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAlerts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        from
        to
        message
        createdAt
        updatedAt
        selfAlertsId
      }
      nextToken
    }
  }
`;
