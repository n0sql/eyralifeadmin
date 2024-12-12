"use server";
import { cache } from "react";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {  createSession, deleteSession, validateSessionToken} from "@/lib/session";
import { create_user, User, get_user_by_email, change_password } from "@/lib/users";


export const createUser = async (prevState: any, formData:FormData) => {
    const user = {
        username: formData.get('username') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        role: formData.get('role') as string,
        agent_id: formData.get('agent_id') as string,
        isApproved: false
    } as Omit<User, 'id' | 'created_at' | 'constructor'>;
    try {
        user.password = await bcrypt.hash(user.password, 10);
        await create_user(user);
        return {message: 'User created successfully, Please wait for approval'};
    } catch (error) {
        return {message: error instanceof Error ? error.toString().replace("Error: Error: ", "Error: ") : 'An error occurred'};
    }
};

export const loginUser = async (prevState: any, formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
       try {
        const user = await get_user_by_email(email);
        if(user === null || user === undefined){
            return {message: 'User not found'};
        };
        if (!user.isApproved){
            return {message: 'User not approved, please contact your administrator'};
        };
        const match = await bcrypt.compare(password, user.password);
        if(match){
           await createSession(user.id);
        } else {
            return {message: 'Invalid password'};
        }
       } catch (error) {
            return {message: error instanceof Error ? error.toString() : 'An error occurred'};
       };

       return redirect('/');
};


export const logoutUser = async () => {
        const cookieStore = cookies();
        const token = cookieStore.get('session')?.value ?? null;    
    try {
        await deleteSession(token);
        revalidatePath('/');
    } catch (error) {
        console.error(error);
        return;
    };
    return redirect('/signin');
};


export const changePassword = async (prevState: any, formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirm_password = formData.get('confirm_password') as string;

    if(password !== confirm_password){
        return {message: 'Passwords do not match'};
    };

    try {
        const user = await get_user_by_email(email);
        if(user === null || user === undefined){
            return {message: 'User not found'};
        };
        const hashed_password = await bcrypt.hash(password, 10);
        await change_password(email, hashed_password);
        return {message: 'Password changed successfully'};
    } catch (error) {
        return {message: error instanceof Error ? error.toString() : 'An error occurred'};
    }
};

export const getCurrentSession = cache(async () => {
        const cookieStore = cookies();
        const token = cookieStore.get('session')?.value ?? null;
        if( token === null ){
        return {session: null, user: null}
        }
        const {session, user} = await validateSessionToken(token);
        return {session, user};
});


