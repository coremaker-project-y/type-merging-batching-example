import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

const companies = [
  {
    id: '2',
    name: 'Company 2',
    legalName: 'Legal Company 2',
  },
  {
    id: '1',
    name: 'Company 1',
    legalName: 'Legal Company 1',
  },
  {
    id: '3',
    name: 'Company 3',
    legalName: 'Legal Company 3',
  },
  {
    id: '0',
    name: 'Company 0',
    legalName: 'Legal Company 0',
  },
];

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    legalName: {
      type: GraphQLString,
    },
  },
});

const CompaniesType = new GraphQLObjectType({
  name: 'Companies',
  fields: {
    companies: {
      type: new GraphQLList(CompanyType),
    },
  },
});

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      listCompanies: {
        type: CompaniesType,
        args: {
          ids: {
            type: new GraphQLList(GraphQLID),
          },
        },
        resolve: (_, { ids }) => ({ companies: ids ? ids.map(id => companies.find(company => company.id === id)) : companies})
      },
    },
  }),
});
