import { View, Text } from 'react-native'
import React from 'react'
import { DefaultField } from '../../../global/partials/fields'
import { styles } from '../../../styles'

type Props = {}

const Freelance = (props: Props) => {
  return (
    <>
        <Text style = {[styles.h4, {fontFamily: 'Montserrat-SemiBold', marginBottom: 10}]}>Personal Information</Text>
            <DefaultField
                placeholder= 'Firstname*'
            />
            <DefaultField
                placeholder= 'Middlename*'
            />
            <DefaultField
                placeholder= 'Lastname*'
            />
            <DefaultField
                placeholder= 'Suffix'
            />
            <DefaultField
                placeholder= 'Date of Birth*'
            />
            <DefaultField
                placeholder= 'Gender*'
            />
            <DefaultField
                placeholder= 'Nationality*'
            />
       <Text style = {[styles.h4, {fontFamily: 'Montserrat-SemiBold', marginBottom: 10}]}>Employment Details</Text>
            <DefaultField
                placeholder= 'Job Title, Position, or Skills...*'
            />

    </>
  )
}

export default Freelance