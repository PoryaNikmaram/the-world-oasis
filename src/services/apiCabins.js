import supabase from '../supabase'
import { editImage } from '../utils/helpers'

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*')

  if (error) cabinError('loaded', error)

  return data
}

export async function AddCabin(newCabin) {
  if (typeof newCabin.image === 'string') {
    const { data, error } = await supabase
      .from('cabins')
      .insert({ ...newCabin })
      .select()
      .single()
    if (error) cabinError('added', error)

    return data
  }
  const { imageName, formattedImg } = editImage(
    newCabin.image[0].name,
    'cabins'
  )

  await uploadImage(newCabin, imageName)

  const { data, error } = await supabase
    .from('cabins')
    .insert({ ...newCabin, image: formattedImg })
    .select()
    .single()

  if (error) cabinError('added', error)
  return data
}

export async function UpdateCabin(updatedCabin) {
  if (typeof updatedCabin.data.image === 'object') {
    const { imageName, formattedImg } = editImage(
      updatedCabin.data.image[0].name,
      'cabins'
    )
    await uploadImage(updatedCabin.data, imageName)

    const { error } = await supabase
      .from('cabins')
      .update({ ...updatedCabin.data, image: formattedImg })
      .eq('id', updatedCabin.editedId)

    if (error) cabinError('updated', error)
  } else {
    const { error } = await supabase
      .from('cabins')
      .update({ ...updatedCabin.data })
      .eq('id', updatedCabin.editedId)

    if (error) cabinError('updated', error)
  }
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from('cabins').delete().eq('id', id)

  if (error) cabinError('deleted', error)

  return data
}

async function uploadImage(cabin, img) {
  const { error: uploadError } = await supabase.storage
    .from('cabins')
    .upload(img, cabin.image[0])
  if (uploadError) {
    await supabase.from('cabins').delete().eq('id', cabin.id)
    throw new Error('cabin image could not be added')
  }
}

function cabinError(errorType, error) {
  console.error(error)
  throw new Error(`cabins could not be ${errorType}`)
}
