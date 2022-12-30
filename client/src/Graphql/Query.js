import {gql} from "@apollo/client"

export const getVEHICLES=gql`
{
  getVehicles{
    Condition
    DailyPrice
    Milege
    Model
    carimg
    carname
    fueltyp
    transmissiontyp
    rating
  }
}`

export const getUser= gql
`
{
  getUsers {
    DrivingLicence
    FullName
    email
    password
  }
}

`