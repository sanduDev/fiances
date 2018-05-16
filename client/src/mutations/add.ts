import gql from 'graphql-tag';

export default gql`
  mutation add($title: String!, $amount: Float!) {
    add(title: $title, amount: $amount) {
      id
      title
      amount
      createdAt
    }
  }
`;
