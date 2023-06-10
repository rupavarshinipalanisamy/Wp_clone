import { View, Text, Image, Button, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Context from '.././context/Context'
import { TextInput } from 'react-native-gesture-handler'
import { signUp } from '../firebase'
import { signIn } from '../firebase'

const SignIn = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState("signUp")

  const {
    theme: { colors },
  } = useContext(Context)

  async function handlePress() {
    if (mode === 'signUp') {
      await signUp(email, password)
    }
    if (mode === 'signIn') {
      await signIn(email, password)
    }
  }

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: colors.white
    }}>
      <Text style={{ color: colors.foreground, fontSize: 24, marginBottom: 20 }}>
        Welcome to Whatsapp
      </Text>
      <Image source={require('../assets/welcome-img.png')}
        style={{ width: 180, height: 180 }} resizeMode='cover'
      />
      <View style={{ marginTop: 20 }}>
        <TextInput placeholder='email'
          value={email}
          onChangeText={setEmail}
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 200

          }} />

        <TextInput placeholder='password'
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 200,
            marginTop: 20

          }} />
        <View style={{ marginTop: 20 }}>
          <Button title={mode === 'signUp' ? "SignUp" : "Signin"}
            disabled={!password || !email}
            color={colors.secondary}
            onPress={handlePress} />
        </View>
        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => { mode === 'signUp' ? setMode('signIn') : setMode("signUp") }}>
          <Text style={{ color: colors.secondaryText }}>
            {mode === 'signUp' ?
              "Already have an acount ? Sign in" :
              "Don't  have an account ? Sign Up"}
          </Text>

        </TouchableOpacity>


      </View>
    </View>
  )
}

export default SignIn