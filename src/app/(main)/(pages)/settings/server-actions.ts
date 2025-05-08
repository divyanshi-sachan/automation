'use server'

import { db } from '@/lib/db'

export async function removeProfileImage(userId: string) {
  try {
    const response = await db.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        profileImage: '',
      },
    })
    return response
  } catch (error) {
    console.error("Error removing profile image:", error)
    return null
  }
}

export async function uploadProfileImage(userId: string, image: string) {
  try {
    const response = await db.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        profileImage: image,
      },
    })
    return response
  } catch (error) {
    console.error("Error uploading profile image:", error)
    return null
  }
}

export async function updateUserInfo(userId: string, name: string) {
  try {
    const updateUser = await db.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        name,
      },
    })
    return updateUser
  } catch (error) {
    console.error("Error updating user info:", error)
    return null
  }
}