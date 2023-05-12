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
		logout: 'Đăng xuất',
		error: {
			missingCredentials: 'Thiếu thông tin đăng nhập',
			emailNotFound: 'Email hoặc mật khẩu không chính xác',
			wrongPassword: 'Email hoặc mật khẩu không chính xác'
		}
	},
	dashboard: {
		entry: {
			dashboard: 'Bảng điều khiển',
			camera: 'Camera',
			logout: 'Đăng xuất',
			setting: 'cài đặt'
		},
		card: {
			createdAt: 'Ngày tạo: {date|shortDate}',
			updatedAt: 'Chỉnh sửa cuối: {date|shortDate}'
		}
	},
	signup: {
		header: 'Đăng ký tài khoản camera dashboard',
		password: {
			label: 'Mật khẩu',
			placeholder: 'Nhập mật khẩu',
			min: 'Mật khẩu cần có ít nhất {length} ký tự'
		},
		confirmpassword: {
			label: 'Xác nhật mật khẩu',
			placeholder: 'Nhập lại mật khẩu',
			equals: 'Mật khẩu xác nhận không trùng khớp'
		},
		email: {
			label: 'Email',
			placeholder: 'Nhập email',
			regex: 'Email không hợp lệ'
		},
		signup: 'Đăng ký',
		haveAccount: 'Đã có tài khoản?',
		login: 'Đăng nhập',
		success: 'Bạn đã đăng ký thành công'
	}
} satisfies Translation;

export default vi;
