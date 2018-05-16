import mongoose from "mongoose";
import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
  GraphQLBoolean
} from "graphql";

const Schema = mongoose.Schema;

const TRANSACTION = mongoose.model("Transactions", new Schema({
  id: Schema.Types.ObjectId,
  title: String,
  amount: Number,
  createdAt: { type: Schema.Types.Date, default: Date.now }
}));

const TransactionType = new GraphQLObjectType({
  name: "transaction",
  fields: function () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      title: {
        type: new GraphQLNonNull(GraphQLString)
      },
      amount: {
        type: new GraphQLNonNull(GraphQLFloat)
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString)
      }
    };
  }
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    transactions: {
      type: new GraphQLList(TransactionType),
      args: {
        orderBy: {
          type: GraphQLString,
        },
      },
      resolve: (args: any) => {
        return TRANSACTION.find().sort({ createdAt: -1 });
      }
    }
  })
});

const MutationAdd = {
  type: TransactionType,
  description: "Add new transaction",
  args: {
    title: {
      name: "Transaction title",
      type: new GraphQLNonNull(GraphQLString)
    },
    amount: {
      name: "Transaction amount",
      type: new GraphQLNonNull(GraphQLFloat)
    }
  },
  resolve: (root: any, args: any) => {
    const newTransaction = new TRANSACTION({
      title: args.title,
      amount: args.amount,
    });
    newTransaction.id = newTransaction._id;
    return new Promise((resolve, reject) => {
      newTransaction.save(function (err) {
        if (err) reject(err);
        else resolve(newTransaction);
      });
    });
  }
};

const MutationRemove = {
  type: GraphQLBoolean,
  description: "Remove transaction by id",
  args: {
    id: {
      name: "Transaction id",
      type: new GraphQLNonNull(GraphQLID),
    }
  },
  resolve: (root: any, args: any) => TRANSACTION.remove({ id: args.id }),
};

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    add: MutationAdd,
    remove: MutationRemove,
  }
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

export default schema;
