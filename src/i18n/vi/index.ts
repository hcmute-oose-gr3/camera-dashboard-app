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
			area: 'Khu vực',
			logout: 'Đăng xuất'
		},
		card: {
			createdAt: 'Ngày tạo: {date|shortDate}',
			updatedAt: 'Chỉnh sửa cuối: {date|shortDate}'
		},
		area: {
			modal: {
				title: 'Thêm khu vực',
				select: {
					title: 'Chọn camera: ',
					option: 'Tên camera'
				},
				name: {
					titel: 'Nhập tên khu vực: ',
					min: 'Tên phải có ít nhất 6 ký tự'
				},
				serial: {
					titel: 'Nhập tên mã khu vực: ',
					min: 'Mã phải có ít nhất 6 ký tự'
				},
				activate: {
					title: 'Hoạt động',
					true: 'Bật',
					false: 'Tắt',
					check: 'Vui lòng chọn activate'
				}
			},
			table: {
				serial: {
					header: 'Mã khu vực'
				},
				name: {
					header: 'Tên khu vực'
				},
				activate: {
					header: 'Trạng thái'
				},
				actions: {
					header: 'Hành động'
				}
			},
			home: 'Nhà',
			add: 'thêm',
			serial: 'Mã khu vực',
			name: 'Tên',
			activate: 'Hoạt Động'
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
		success: 'Vui lòng kiểm tra email của bạn',
		back: 'Quay lại',
		verifyMail: {
			success: 'Bạn đã xác nhận thành công tài khoản',
			error: {
				userNotFound: 'Email của bạn không được xác thực',
				alreadyAccount: 'Tài khoản đã được xác thực',
				updateFailure: 'Xác thực email thất bại'
			},
			subject: '[Camera Dashboard] Vui lòng xác nhận email.',
			body: `<p>Gần xong rồi! Để hoàn tất đăng ký camera dashboard của bạn, chúng tôi chỉ cần xác minh email của bạn:
					<a href="mailto:{email}">{email}</a>.
				</p>
				<p>
					<a href="{url}">Xác nhận địa chỉ email</a>.
				</p>`
		}
	},
	camera: {
		addCamera: 'Thêm máy quay',
		table: {
			serial: {
				header: 'Mã số máy quay'
			},
			name: {
				header: 'Tên máy quay'
			},
			connection: {
				header: 'Trạng thái',
				disconnected: 'Mất kết nối',
				connected: 'Đã kết nối'
			},
			securityLevel: {
				header: 'Mức bảo mật',
				low: 'Thấp',
				medium: 'Trung bình',
				high: 'Cao'
			},
			actions: {
				header: 'Hành động'
			}
		},
		addForm: {
			name: {
				label: 'Tên máy quay',
				placeholder: 'Nhập tên máy quay',
				nonempty: 'Tên máy quay không được trống.'
			},
			url: {
				label: 'Đường dẫn',
				placeholder: 'Nhập đường dẫn đến luồng máy quay',
				url: 'Đường dẫn không hợp lệ.'
			},
			securityLevel: {
				legend: 'Chọn một mức độ bảo mật:',
				low: {
					label: 'Thấp'
				},
				medium: {
					label: 'Trung bình'
				},
				high: {
					label: 'Cao'
				},
				required: 'Hãy chọn một mức độ bảo mật cho máy quay.'
			},
			submit: 'Thêm máy quay',
			success: 'Máy quay đã được thêm thành công.'
		}
	}
} satisfies Translation;

export default vi;
