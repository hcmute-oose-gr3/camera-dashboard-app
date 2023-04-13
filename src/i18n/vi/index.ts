import type { Translation } from '../i18n-types';

const vi = {
	login: {
		header: 'Đăng nhập vào camera dashboard',
		email: {
			label: 'Email',
			placeholder: 'Nhập email',
			regex: 'Email không hợp lệ'
		},
		password: {
			label: 'Mật khẩu',
			placeholder: 'Nhập mật khẩu',
			min: 'Mật khẩu cần có ít nhất {length} ký tự'
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
