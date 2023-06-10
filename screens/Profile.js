import { View, Text, TouchableOpacity, Image ,TextInput,Button} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
import GlobalContext from '../context/Context'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import {pickImage ,askForPermission, uploadImage} from '../utils'
import {auth,db} from '../firebase'
import { updateProfile } from 'firebase/auth'
import { doc,setDoc } from 'firebase/firestore'
const Profile = () => {

    const [displayName, setDisplayName] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const { theme: { colors } } = useContext(GlobalContext)
    const[permissionStatus,setPermissionStatus]=useState(null)


useEffect(()=>{
       (async () =>{
        const status = await askForPermission()
        setPermissionStatus(status)
       })();
},[]);

const handlePress= async()=>{
    const user  = auth.currentUser
    let photoURL
    if(selectedImage){
        const{url}=  await uploadImage(selectedImage, `images/${user.uid}` , "profilePicture")
        photoURL = url;
    }
    const userData ={
        displayName,
        email:user.email
    }
    if(photoURL){
        userData.photoURL = photoURL
    }

    console.log({...userData , uid:user.uid})
    await Promise.all([
        updateProfile(user,userData),
        setDoc(doc(db,"users", user.uid),{...userData , uid:user.uid})
    ] )

}


const handleProfilePicture = async () => {
    const result = await pickImage();
    console.log(result);
    if (!result.canceled) {
      const { uri } = result; // Extract the 'uri' property from 'result'
      setSelectedImage(uri); // Set 'uri' in the state
    }
  };
  

// if(!permissionStatus){
//     return<Text>Loading</Text>
// }
if(permissionStatus === "granted"){
    return <Text>You ned to allow this permission</Text>
}

    return (
        <React.Fragment>
            <StatusBar style="auto" />
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1, paddinngTop: Constants.statusBarHeight + 20,
                padding: 20
            }}>

                <Text style=
                    {{
                        fontSize: 22,
                        color: colors.foreground,
                    }}>
                    Profile Info
                </Text>
                <Text style=
                    {{
                        fontSize: 14,
                        color: colors.text,
                        marginTop: 20
                    }}>
                    Profile provide ypur name and an optional profile photo
                </Text>
                <TouchableOpacity 
                onPress={handleProfilePicture}
                style={{marginTop:30,
                    borderRadius:120,
                    width:120,
                    height:120,
                    backgroundColor:colors.background,
                    alignItems:"center" ,
                    justifyContent:'center'}}>
                    {!selectedImage ? (<MaterialCommunityIcons name="camera-plus" color={colors.iconGray} size={45} />) :
                        <Image  source={{uri:selectedImage}} style={{width: "100%" ,height:"100%" ,borderRadius:120}}/>

                    }
                </TouchableOpacity>

                <TextInput placeholder='Type your name' value={displayName} onChangeText={setDisplayName}
                style=
                {{borderBottomColor:colors.primary,
                    borderBottomWidth:2,
                    marginTop:40,
                    borderRadius:2,
                    width:"100%"}}
                />
                <View style={{marginTop:"auto", width:80}}>
                    <Button title="Next" color={colors.secondary} 
                    onPress={handlePress} 
                    disabled={!displayName}
                    />
                </View>
            </View>


        </React.Fragment>
    )
}

export default Profile