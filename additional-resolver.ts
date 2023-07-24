import { print } from "graphql";
import { Maybe, Resolvers } from './.mesh'

const resolvers: Resolvers = {
    AccessRightCompany: {
        company: (root, _args, context, info) => {

            const companiesIdsList:(Maybe<string> | undefined)[] = [];

            return context.CompanyService.Query.listCompanies({
                root,
                context,
                info,
                key: root.id,
                argsFromKeys: (companiesIds) => {
                  
                  if(companiesIds){
                    companiesIdsList.push(...companiesIds)
                  }
                  
                  return { input: { companiesIds } }
                },
                valuesFromResults: (data) => {
                  
                  if(!data || !data.companies) return [];

                  return data.companies
                  // return companiesIdsList.map( companyId => data.companies.find( company => company?.id === companyId))
              
                },
                selectionSet: (companySelectionSet) => /* GraphQL */ `
                    { companies ${print(companySelectionSet)} }
                `,
            });
        },
    },
};

export default resolvers
