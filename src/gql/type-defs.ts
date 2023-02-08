/* eslint-disable prettier/prettier */
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Being {
    name: String!
    thumbnail: String!
    description: String!
    is_online: Boolean!
    memberOfGroup: [Group!]! @relationship(type: "JOINED", properties: "Joined", direction: OUT)
  }
  
  type Person implements Being {
    nickname: String!
    email: String!
    ownerOfPets: [Pet!]! @relationship(type: "OWNS", properties: "Owns", direction: OUT)
  }

  type Pet implements Being {
    type: String!
    species: String!
    born: String!
    owner: Person! @relationship(type: "OWNS", properties: "Owns", direction: IN)
  }

  union Member = Person | Pet

  
  type Group {
    name: String!
    pet_only: Boolean!
    thumbnail: String!
    description: String!
    consistsOf: [Member!]! @relationship(type: "JOINED", properties: "Joined", direction: IN)
  }

  union Target = Pet | Group

  enum PeriodUnit {
    SEC
    MIN
    HOUR
    DAY
    MONTH
    YEAR
  }

  enum TargetType {
    Pet
    Group
  }
  
  type Todo {
    name: String!
    type: String!
    detail: String!
    period_int: Int!
    period_unit: PeriodUnit!
    scheduled_at: PeriodUnit!
    targets_to: Target!
  }

  interface Owns @relationshipProperties {
    temporary: Boolean!
    until: String! 
  }
  
  interface Joined @relationshipProperties {
    since: String!
    as: String! 
  }

  interface TransferOwnershipTo @relationshipProperties {
    pet: Pet!
    since: String!
  }

  interface Follows @relationshipProperties {
    since: String!
  }

  interface TargetsTo @relationshipProperties {
    since: String!
    target_type: TargetType!
  }

  interface Subscribes @relationshipProperties {
    since: String!
    target_type: TargetType!
    target: Target!
  }

  interface Done @relationshipProperties {
    at: String!
    target: Target!
  }

  extend type Person
  @auth(
    rules: [
      { operations: [READ], allowUnauthenticated: true }
      { operations: [CREATE, DELETE, UPDATE], isAuthenticated: true }
    ]
  )
`;
