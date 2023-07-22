import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

const accessRights = [

  {
    id: '1',
    title: 'Acceess Right 1',
    company: {
      id: '0',
      name: 'Company 0',
    }
  },
  {
    id: '2',
    title: 'Acceess Right 2',
    company: {
      id: '3',
      name: 'Company 3',
    }
  },
  {
    id: '0',
    title: 'Acceess Right 0',
    company: {
      id: '1',
      name: 'Company 1',
    }
  },
  {
    id: '3',
    title: 'Acceess Right 3',
    company: {
      id: '2',
      name: 'Company 2',
    }
  },
];

const AccessRightCompanyType = new GraphQLObjectType({
  name: 'AccessRightCompany',
  fields: {
    id: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
  },
});

const AccessRightType = new GraphQLObjectType({
  name: 'AccessRight',
  fields: {
    id: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    company: {
      type: AccessRightCompanyType,
    },
  },
});

const AccessRightsType = new GraphQLObjectType({
  name: 'AccessRights',
  fields: {
    accessRight: {
      type: new GraphQLList(AccessRightType),
    }
  },
});


export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      listAccessRights: {
        type: AccessRightsType,
        resolve: () =>  ({ accessRight: accessRights }),
      },
    },
  }),
});

/*
directive @resolveTo(
  additionalArgs: ResolveToSourceArgs, 
  filterBy: String, 
  keyField: String, 
  keysArg: String, 
  pubsubTopic: String, 
  requiredSelectionSet: String, 
  result: String, 
  resultType: String, 
  sourceArgs: ResolveToSourceArgs, 
  sourceFieldName: String!, 
  sourceName: String!, 
  sourceSelectionSet: String, 
  sourceTypeName: String!
) on FIELD_DEFINITION
*/