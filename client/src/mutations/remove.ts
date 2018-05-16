import gql from 'graphql-tag';

export default gql`
  mutation remove($id: ID!) {
    remove(id: $id)
  }
`;
