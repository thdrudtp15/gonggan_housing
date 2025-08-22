'use server';
import { getHtml, getMailContent, transporter } from '@/utils/mail/mail';
import { createClient } from '@/utils/supabase/server';

export type sendMailTypes = {
    customer_name: string;
    phone: string;
    email: string;
    service_date: string;
    address: string;
    notes: string;
    server: string;
};

export const sendMail = async (prevState: sendMailTypes, formdata: FormData) => {
    const errors = {
        customer_name: '',
        phone: '',
        email: '',
        service_date: '',
        address: '',
        notes: '',
        server: '',
    };
    const customer_name = formdata.get('customer_name') as string;
    const phone = formdata.get('phone') as string;
    const email = formdata.get('email') as string;
    const service_date = formdata.get('service_date') as string;
    const address = formdata.get('address') as string;
    const notes = formdata.get('notes') as string;

    console.log(customer_name, phone, email, service_date, address, notes);

    if (!customer_name || customer_name.trim() === '') {
        errors.customer_name = '고객이름은 필수입니다.';
    }
    if (!phone || phone.trim() === '') {
        errors.phone = '전화번호는 필수입니다.';
    }
    if (!email || email.trim() === '') {
        errors.email = '이메일은 필수입니다.';
    }

    if (Object.values(errors).find((error) => error)) {
        return errors;
    }

    const supabase = await createClient();
    const { data, error } = await supabase
        .from('inquiries')
        .insert({ customer_name, phone, email, service_date, address, notes })
        .select('id')
        .single();

    if (error) {
        errors.server = '서버 에러가 발생하였습니다.';
        console.log(error, '1');
        return errors;
    }
    try {
        const html = getHtml(customer_name);
        const mailContent = getMailContent(html);
        await transporter.sendMail(mailContent);
        await supabase.from('inquiries').update({ status: 'success' }).eq('id', data.id);
    } catch (error) {
        await supabase.from('inquiries').update({ status: 'failed' }).eq('id', data.id);
        errors.server = '서버 에러가 발생하였습니다.';
        console.log(error);
        return errors;
    }

    return errors;
};
