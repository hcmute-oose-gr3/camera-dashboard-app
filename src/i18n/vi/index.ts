import type { Translation } from '../i18n-types';

const vi = {
	logo: {
		name: 'Camera Dashboard'
	},
	login: {
		header: 'Đăng nhập vào dashboard của bạn',
		email: {
			label: 'Email',
			placeholder: 'Nhập email',
			regex: 'Email không hợp lệ'
		},
		password: {
			label: 'Mật khẩu',
			placeholder: 'Nhập mật khẩu',
			empty: 'Mật khẩu không được trống'
		},
		login: 'Đăng nhập',
		forgotPassword: 'Quên mật khẩu?',
		noAccount: 'Chưa có tài khoản?',
		signUp: 'Đăng ký',
		success: 'Đăng nhập thành công',
		oops: 'Oops!',
		alreadyLoggedIn: 'Có vẻ như bạn đã đăng nhập trước đó.',
		back: 'Quay lại',
		logout: 'Đăng xuất'
	}
} satisfies Translation;

export default vi;
