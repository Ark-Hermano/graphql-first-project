const axios = require('axios')
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} = require('graphql')


//data shape
const PeopleType = new GraphQLObjectType({
  name: 'People',
  fields: () => ({
    name: { type: GraphQLString },
    birth_year: { type: GraphQLString },
    starships: { type: new GraphQLList(GraphQLString) },
    vehicles: { type: new GraphQLList(GraphQLString) }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    people: {
      type: new GraphQLList(PeopleType),
      resolve: () => {
        return axios.get('https://swapi.dev/api/people').then(res => res.data.results)
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})