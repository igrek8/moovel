const gql = require("graphql-tag");

const gqlClient = require("./apollo-client");

const querySearchRepositoriesByLanguage = gql`
  query SearchRepositoriesByLanguage($query: String!) {
    search(query: $query, type: USER, first: 25) {
      nodes {
        ... on User {
          login
          url
          url
          name
          avatarUrl
          followers {
            totalCount
          }
        }
      }
    }
  }
`;

async function searchUsersByLanguage({ languages, username }) {
  // Build GitHub search query
  const users = username ? [`${username} in:login`, "type:user"] : [];
  const langs = languages.map((language) => `language:${language}`);
  const query = [...users, ...langs].join(" ");

  // Make request to GitHub GraphQL API
  const { data, errors } = await gqlClient.query({
    query: querySearchRepositoriesByLanguage,
    variables: { query },
  });

  if (errors && errors.length > 0) {
    const [err] = errors;
    throw err;
  }

  // Map data to the requested DTO
  return data.search.nodes.map((user) => {
    return {
      username: user.login,
      name: user.name,
      url: user.url,
      avatarUrl: user.avatarUrl,
      followersCount: user.followers.totalCount,
    };
  });
}

module.exports = {
  searchUsersByLanguage,
};
