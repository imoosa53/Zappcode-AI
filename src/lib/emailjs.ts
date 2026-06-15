import emailjs from '@emailjs/browser';

export const EMAILJS_SERVICE_ID  = 'service_jq6g8jd';
export const EMAILJS_TEMPLATE_ID = 'template_uhgz44k';
export const EMAILJS_PUBLIC_KEY  = 'XngtQj2zxYRWGVbqS';

/** Call once at app start to avoid re-initialising on every send. */
export function initEmailJS() {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

export interface ContactParams {
    name: string;
    work_email: string;
    company: string;
    phone_number?: string;
    message?: string;
}

export async function sendContactEmail(params: ContactParams) {
    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name:         params.name,
        work_email:   params.work_email,
        company:      params.company,
        phone_number: params.phone_number ?? '',
        message:      params.message ?? '',
        time:         new Date().toLocaleString(),
    });
}
