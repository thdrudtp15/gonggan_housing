'use server';
import { getHtml, getMailContent, transporter } from '@/utils/mail/mail';

export type sendMailTypes = {
    customerName: string;
    phone: string;
    email: string;
    serviceDate: string;
    address: string;
    notes: string;
};

export const sendMail = async (prevState: sendMailTypes, formdata: FormData) => {
    const errors = {
        customerName: '',
        phone: '',
        email: '',
        serviceDate: '',
        address: '',
        notes: '',
    };
    const customerName = formdata.get('customerName') as string;
    const phone = formdata.get('phone') as string;
    const email = formdata.get('email') as string;
    const serviceDate = formdata.get('serviceDate') as string;
    const address = formdata.get('address') as string;
    const notes = formdata.get('notes') as string;

    console.log(customerName, phone, email, serviceDate, address, notes);

    if (!customerName || customerName.trim() === '') {
        errors.customerName = '고객이름은 필수입니다.';
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

    const html = getHtml(customerName);
    const mailContent = getMailContent(html);
    await transporter.sendMail(mailContent);

    return errors;
    // if(!serviceDate || serviceDate.trim() === "") {
    //     errors.customName = "은 필수입니다."

    // }
    // if(!address || address.trim() === "") {

    // }
    // if(!notes || notes.trim() === "") {

    // }
};
