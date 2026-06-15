import emailjs from '@emailjs/browser';

export const EMAILJS_SERVICE_ID  = 'service_jq6g8jd';
export const EMAILJS_TEMPLATE_ID = 'template_uhgz44k';
export const EMAILJS_PUBLIC_KEY  = 'XngtQj2zxYRWGVbqS';

/** Call once at app start to avoid re-initialising on every send. */
export function initEmailJS() {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

export interface ContactParams {
    from_name: string;
    from_email: string;
    company: string;
    message: string;
    phone?: string;
}

export async function sendContactEmail(params: ContactParams) {
    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  params.from_name,
        from_email: params.from_email,
        company:    params.company,
        message:    params.message,
        phone:      params.phone ?? '',
    });
}
