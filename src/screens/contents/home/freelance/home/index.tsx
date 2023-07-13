import { View, Text,FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAllData, getSpecificData } from '../../../../../firebase';
import { data, jobdata } from '../../../../../library/constants';
import { useSelector } from 'react-redux';

type Props = {

    focus: number,
    setfocus: (e: number) => void

}

interface getdata {

    _userdata: data

}

const JobsLists: React.FC<Props> = ({focus, setfocus}) => {

    const [data, setdata] = useState<jobdata[]>([]);
    const userdata = useSelector((action: getdata) => action._userdata)
    const [nodata, setnodata] = useState(false)
    console.log(userdata);
    
    useEffect(() => {
        fetchData()
    },[focus])

    
    const fetchData = async () => {
        try {
          if(focus == 0){
            const retrievedData: jobdata[] = await getSpecificData('job-post','jobtitle', userdata.jobTitle);
            if (!retrievedData.length) {
                setnodata(true)
            } else {
                setdata(retrievedData)
            }
          } 
          if(focus == 1){
            setnodata(false)
            const retrievedData: jobdata[] = await getAllData('job-post');
            setdata(retrievedData)
           
          }

        } catch (error) {
          console.log('Error fetching data:', error);
          throw error;
        }
      };

      const renderitem = ({item}:{item: jobdata}) => {
        return(
            <View>
                <Text style = {{color: 'black'}}>
                    {item.jobtitle}
                </Text>
            </View>
        )
      }
      
  return (
    <>
      {nodata ? <Text style = {{color: 'black'}}>No Jobs Matches your preferrence</Text>: <FlatList
            data={data}
            renderItem={renderitem}
        />}
    </>
  )
}

export default JobsLists