import supabase from '../supabase'
import { editImage, uploadImage } from '../utils/helpers'

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  })

  if (error) {
    console.error(error)
    throw new Error("Can't sign the user up")
  }

  console.log(data)
  return data
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error(error)
    throw new Error("Can't log the user in")
  }

  return data
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()

  if (!session.session) return null

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error(error.message)
    throw new Error("Can't get the user")
  }

  return data?.user
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error(error.message)
    throw new Error("Can't sign the user out")
  }
}

export async function updateUser({ fullName, avatar }) {
  if (!avatar) {
    const { data, error } = await supabase.auth.updateUser({
      data: { fullName },
    })
    if (error) {
      console.error(error.message)
      throw new Error("Can't sign the user out")
    }
    return data
  }

  const { imageName, formattedImg } = editImage(avatar.name, 'avatars')

  await uploadImage(imageName, avatar, 'avatars')

  const { data, error } = await supabase.auth.updateUser({
    data: { fullName, avatar: formattedImg },
  })
  if (error) {
    console.error(error.message)
    throw new Error("Can't upload user image")
  }
  console.log(data)
  return data
}

export async function updateUserPassword({ password }) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    console.error(error.message)
    throw new Error("Can't change the password")
  }

  return data
}
