"use server";

import { signIn, signOut } from "../../../../auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from 'next/cache';
import { prisma, handleValidationErrors, handlePrismaError, parseFormDates } from '../utils/helpers';
import type { ApiResponse } from '../utils/types';
import { userSchema, createUserSchema, updateUserSchema } from '../entity-zod-schemas';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signOutAction() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
}

// Alias for backward compatibility
export const _signOut = signOutAction;

export async function createUser(data: any): Promise<ApiResponse> {
  try {
    const parsedData = parseFormDates(data);
    const validatedData = createUserSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(validatedData.data.password, 12);

    const user = await prisma.user.create({
      data: {
        name: validatedData.data.name,
        email: validatedData.data.email!,
        password: hashedPassword
      }
    });

    revalidatePath('/dashboard/users');
    return { success: true, data: user };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getAllUsers(): Promise<any[]> {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true
      }
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function updateUser(data: any): Promise<ApiResponse> {
  try {
    const parsedData = parseFormDates(data);
    const validatedData = updateUserSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const updateData: any = { ...validatedData.data };
    
    // Hash password if provided
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 12);
    }

    const user = await prisma.user.update({
      where: { id: validatedData.data.id },
      data: updateData
    });

    revalidatePath('/dashboard/users');
    return { success: true, data: user };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteUser(id: string): Promise<ApiResponse> {
  try {
    await prisma.user.delete({
      where: { id }
    });

    revalidatePath('/dashboard/users');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}
