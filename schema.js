const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


// Location
const LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: () => ({
        id: { type: GraphQLString },
        postalCode: { type: GraphQLString },
        postalAddressLine1: { type: GraphQLString },
        postalAddressTownCity: { type: GraphQLString },
        postalAddressCounty: { type: GraphQLString },
        region: { type: GraphQLString },
        mainPhoneNumber: { type: GraphQLString },
        locationId: { type: GraphQLString },
        name: { type: GraphQLString },
        providerId: { type: GraphQLString },
        provider: {
            type: ProviderType,
            resolve: (loc) => {
                return axios.get('http://localhost:3000/providers/' + loc.providerId)
                    .then(res => res.data);
            }
        },
        organisationType: { type: GraphQLString },
        type: { type: GraphQLString },
        registrationStatus: { type: GraphQLString },
        registrationDate: { type: GraphQLString },
        numberOfBeds: { type: GraphQLString },
        constituency: { type: GraphQLString },
        localAuthority: { type: GraphQLString },
        lastInspection: { type: GraphQLString },
        lastReport: { type: GraphQLString },
        currentRatings: { type: GraphQLString },
    })
});

// Provider
const ProviderType = new GraphQLObjectType({
    name: 'Provider',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        providerId: { type: GraphQLString },
        locationIds: { type: GraphQLString },
        organisationType: { type: GraphQLString },
        ownershipType: { type: GraphQLString },
        type: { type: GraphQLString },
        postalCode: { type: GraphQLString },
        postalAddressLine1: { type: GraphQLString },
        postalAddressTownCity: { type: GraphQLString },
        postalAddressCounty: { type: GraphQLString },
        region: { type: GraphQLString },
        mainPhoneNumber: { type: GraphQLString },
        locationId: { type: GraphQLString },
        registrationStatus: { type: GraphQLString },
        registrationDate: { type: GraphQLString },
        constituency: { type: GraphQLString },
        localAuthority: { type: GraphQLString },
        lastInspection: { type: GraphQLString },
        regulatedActivities: { type: GraphQLString },
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        location: {
            type: LocationType,
            args: {
                locationId: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/locations/' + args.locationId)
                    .then(res => res.data);
            }
        },
        locations: {
            type: new GraphQLList(LocationType),
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/locations')
                    .then(res => res.data);
            }
        },
        provider: {
            type: ProviderType,
            args: {
                providerId: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/providers/' + args.providerId)
                    .then(res => res.data);

            }
        },
        providers: {
            type: new GraphQLList(ProviderType),
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/providers')
                    .then(res => res.data);
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});