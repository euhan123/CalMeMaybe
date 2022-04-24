/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSelf = /* GraphQL */ `
  subscription OnCreateSelf {
    onCreateSelf {
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
export const onUpdateSelf = /* GraphQL */ `
  subscription OnUpdateSelf {
    onUpdateSelf {
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
export const onDeleteSelf = /* GraphQL */ `
  subscription OnDeleteSelf {
    onDeleteSelf {
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
export const onCreateFriend = /* GraphQL */ `
  subscription OnCreateFriend {
    onCreateFriend {
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
export const onUpdateFriend = /* GraphQL */ `
  subscription OnUpdateFriend {
    onUpdateFriend {
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
export const onDeleteFriend = /* GraphQL */ `
  subscription OnDeleteFriend {
    onDeleteFriend {
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
export const onCreateAlerts = /* GraphQL */ `
  subscription OnCreateAlerts {
    onCreateAlerts {
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
export const onUpdateAlerts = /* GraphQL */ `
  subscription OnUpdateAlerts {
    onUpdateAlerts {
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
export const onDeleteAlerts = /* GraphQL */ `
  subscription OnDeleteAlerts {
    onDeleteAlerts {
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
