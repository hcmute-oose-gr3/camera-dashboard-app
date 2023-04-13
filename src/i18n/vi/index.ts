import type { Translation } from '../i18n-types';

const vi = {
	login: {
		header: 'Đăng nhập vào camera dashboard',
		username: {
			label: 'Tên tài khoản',
			placeholder: 'Nhập tên tài khoản',
			min: 'Tên tài khoản cần có ít nhất {length} ký tự',
			regex: 'Tên tài khoản chỉ bao gồm chữ và số'
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
		success: 'Đăng nhập thành công'
	}
} satisfies Translation;

export default vi;
