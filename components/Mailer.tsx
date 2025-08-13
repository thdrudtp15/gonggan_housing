'use client';
import { useActionState } from 'react';

import { sendMail } from '@/action/mail';
import { sendMailTypes } from '@/action/mail';

import styles from './Mailer.module.scss';

const stateObj: sendMailTypes = {
    customerName: '',
    phone: '',
    email: '',
    serviceDate: '',
    address: '',
    notes: '',
};

const Mailer = () => {
    const [state, action] = useActionState(sendMail, stateObj);

    return (
        <div>
            <form className={styles.mailer} action={action}>
                <input name="customerName" placeholder="이름을 입력해주세요" />
                {state.customerName && <p>이름은 필수입니다.</p>}
                <input name="phone" placeholder="-없이 숫자만 입력해주세요" />
                {state.phone && <p>전화번호는 필수입니다.</p>}
                <input name="email" placeholder="이메일을 입력해주세요" />
                {state.email && <p>이메일은 필수입니다다</p>}
                <input name="serviceDate" placeholder="시공희망일을 입력해주세요" />
                {state.serviceDate && <p>주소는 필수입니다.</p>}
                <input name="address" placeholder="시공주소를 입력해주세요" />
                {state.address && <p></p>}
                <input name="notes" placeholder="요청사항을 입력해주세요" />
                {state.notes && <p></p>}
                <button>문의하기</button>
            </form>
        </div>
    );
};

export default Mailer;
