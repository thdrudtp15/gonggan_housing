'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function login(prevState: { error: string }, formData: FormData) {
    const supabase = await createClient();

    const errorState = prevState;

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        prevState.error = '이메일이 유효하지 않거나 비밀번호가 일치하지 않습니다.';
        return errorState;
    }

    revalidatePath('/', 'layout');
    redirect('/admin');
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signUp(data);

    // if (error) {
    //     redirect('/error');
    // }

    revalidatePath('/', 'layout');
    redirect('/');
}

export async function signOut() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/');
}
