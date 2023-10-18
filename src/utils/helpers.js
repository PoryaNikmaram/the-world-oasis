import { formatDistance, parseISO } from 'date-fns'
import { differenceInDays } from 'date-fns/esm'
import supabase, { supabaseUrl } from '../supabase'

export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)))

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In')

export const getToday = function (options = {}) {
  const today = new Date()
  if (options?.end) today.setUTCHours(23, 59, 59, 999)
  else today.setUTCHours(0, 0, 0, 0)
  return today.toISOString()
}

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  )

export function editImage(img, storage) {
  const imageName = `-${Math.random()}-${img
    .replaceAll('/', '')
    .replaceAll(' ', '')}`
  const formattedImg = `${supabaseUrl}/storage/v1/object/public/${storage}/${imageName}`

  return { imageName, formattedImg }
}

export async function uploadImage(avatarName, avatar, storage) {
  const { error: uploadError } = await supabase.storage
    .from(storage)
    .upload(avatarName, avatar)
  if (uploadError) {
    throw new Error('cabin image could not be added')
  }
}
