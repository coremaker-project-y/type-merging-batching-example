import { GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

const companies = [
  {
    id: '2',
    name: 'Company 2',
    legalName: 'Legal Company 2',
  },
  {
    id: '0',
    name: 'Company 0',
    legalName: 'Legal Company 0',
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

const ListCompaniesByIdsInputType = new GraphQLInputObjectType({
  name: 'ListCompaniesByIdsInput',
  fields: () => ({
    companiesIds: {
      type: new GraphQLList(GraphQLString),
    }
  }),
});

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      listCompanies: {
        type: CompaniesType,
        args: {
          input : {
            type: ListCompaniesByIdsInputType, //new GraphQLList(GraphQLString),
          },
        },
        resolve: (_, { input: {companiesIds } }) => ({ companies: companiesIds ? companiesIds.map(id => companies.find(company => company.id === id)).sort((a, b) => 0.5 - Math.random()) : companies})
      },
    },
  }),
});
