import type { Translation } from '../i18n-types';

const vi = {
	logo: {
		name: 'Camera Dashboard',
	},
	login: {
		header: 'Đăng nhập vào dashboard của bạn',
		email: {
			label: 'Email',
			placeholder: 'Nhập email',
			regex: 'Email không hợp lệ',
		},
		password: {
			label: 'Mật khẩu',
			placeholder: 'Nhập mật khẩu',
			empty: 'Mật khẩu không được trống',
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
			wrongPassword: 'Email hoặc mật khẩu không chính xác',
			unverified: 'Tài khoản chưa được xác thực',
		},
	},
	dashboard: {
		meta: {
			title: 'Bảng điều khiển',
			namedTitle: 'Bảng điều khiển - {dashboardName}',
		},
		action: 'Chọn một trong các bảng điều khiển dưới đây để tiếp tục.',
		add: {
			meta: {
				title: 'Tạo bảng điều khiển',
			},
			legends: 'Điền thông tin vào biểu mẫu bên dưới để tạo bảng điều khiển.',
			name: {
				label: 'Tên bảng điều khiển',
				placeholder: 'Nhập tên bảng điều khiển',
				nonempty: 'Tên bảng điều khiển không được trống.',
			},
			submit: 'Tạo bảng điều khiển',
			success: 'Bảng điều khiển đã được tạo thành công.',
		},
		entry: {
			dashboard: 'Trang chủ',
			camera: 'Camera',
			area: 'Khu vực',
			alert: 'Cảnh báo',
			setting: 'Cài đặt',
			profiles: 'Hồ sơ',
			logout: 'Đăng xuất',
		},
		card: {
			createdAt: 'Ngày tạo: {date|shortDate}.',
			updatedAt: 'Chỉnh sửa cuối: {date|shortDate}.',
			createdDaysAgo: 'Được tạo từ {days} ngày trước.',
			createdToday: 'Được tạo trong hôm nay.',
		},
		area: {
			meta: {
				title: 'Khu vực',
				namedTitle: 'Khu vực - {areaName}',
			},
			modal: {
				title: 'Thêm khu vực',
				select: {
					title: 'Chọn camera: ',
					option: 'Tên camera',
				},
				name: {
					titel: 'Nhập tên khu vực: ',
					min: 'Tên phải có ít nhất 6 ký tự',
				},
				serial: {
					titel: 'Nhập tên mã khu vực: ',
					min: 'Mã phải có ít nhất 6 ký tự',
				},
				activate: {
					title: 'Hoạt động',
					true: 'Bật',
					false: 'Tắt',
					check: 'Vui lòng chọn activate',
				},
			},
			table: {
				serial: {
					header: 'Mã khu vực',
				},
				name: {
					header: 'Tên khu vực',
				},
				activate: {
					header: 'Trạng thái',
				},
				actions: {
					header: 'Hành động',
				},
			},
			home: 'Nhà',
			serial: 'Mã khu vực',
			name: 'Tên',
			activate: 'Hoạt Động',
			add: {
				success: 'Thêm area thành công',
				failure: 'Thêm area thất bại',
			},
			layout: {
				home: 'Nhà',
				add: 'Thêm khu vực',
			},
		},
		settings: {
			meta: {
				title: 'Cài đặt',
			},
			theme: {
				title: 'Màu sắc',
				color: 'Màu của trang',
			},
			language: {
				title: 'Ngôn ngữ',
				language: 'Chọn ngôn ngữ',
				options: {
					en: 'Tiếng Anh',
					vi: 'Tiếng Việt',
				},
			},
			delete: {
				title: 'Khu vực cảnh báo',
				message: 'Xóa bảng điều khiển hiện tại',
				warning:
					'Sau khi xóa, bảng điều khiển sẽ không thể khôi phục lại. Vui lòng cẩn thận.',
				button: {
					message: 'Xóa bảng điều khiển hiện tại',
				},
			},
			modal: {
				title: 'Xóa {dashboard}',
				items: {
					area: 'Khu vực',
					camera: 'Máy quay',
				},
				button: 'Tôi muốn xóa bảng điều khiển này',
			},
		},
		alert: {
			meta: {
				title: 'Cảnh báo',
			},
			table: {
				serial: {
					header: 'Mã cảnh báo',
				},
				name: {
					header: 'Tên cảnh báo',
				},
				type: {
					header: 'Loại cảnh báo',
					timeBased: 'Thời gian',
					profileBased: 'Khuôn mặt',
					zoneBased: 'Khu vực',
				},
				actions: {
					header: 'Hành động',
				},
			},
			navigation: {
				viewAlerts: 'Xem cảnh báo',
				newAlert: 'Tạo cảnh báo',
			},
			new: {
				name: {
					label: 'Tên cảnh báo',
					placeholder: 'Nhập tên cảnh báo',
					nonempty: 'Tên cảnh báo không được trống.',
				},
				submit: 'Tạo cảnh báo',
				success: 'Cảnh báo đã được tạo thành công.',
				time: {
					navigation: 'Thời gian',
					startTime: {
						label: 'Thời gian bắt đầu',
						invalid: 'Thời gian không hợp lệ, định dạng đúng là "giờ:phút".',
					},
					endTime: {
						label: 'Thời gian kết thúc',
						invalid: 'Thời gian không hợp lệ, định dạng đúng là "giờ:phút".',
					},
					alertLevel: {
						legend: 'Chọn một mức độ cảnh báo:',
						low: {
							label: 'Thấp',
						},
						medium: {
							label: 'Trung bình',
						},
						high: {
							label: 'Cao',
						},
						required: 'Hãy chọn một mức độ cảnh báo.',
					},
				},
				profile: {
					navigation: 'Hồ sơ',
					profile: {
						label: 'Hồ sơ',
						nonempty: 'Cần chọn một hồ sơ từ danh sách.',
					},
				},
				zone: {
					navigation: 'Khu vực',
					camera: {
						label: 'Máy quay',
						placeholder: 'Chọn một máy quay',
						nonempty: 'Cần chọn một máy quay.',
						missingZone: 'Cần vẽ một khu vực trên màn hình máy quay.',
					},
					position: 'Vị trí:',
					size: 'Kích thước:',
					area: 'Khu vực',
				},
			},
		},
		profiles: {
			meta: {
				title: 'Hồ sơ',
			},
			navigation: {
				viewProfiles: 'Xem hồ sơ',
				newProfile: 'Tạo hồ sơ',
			},
			new: {
				name: {
					label: 'Tên hồ sơ',
					placeholder: 'Nhập tên hồ sơ',
					nonempty: 'Tên hồ sơ không được trống.',
				},
				image: {
					label: 'Hình ảnh',
					required: 'Hãy tải lên một hình ảnh cho hồ sơ.',
				},
				submit: 'Tạo hồ sơ',
				success: 'Hồ sơ đã được tạo thành công.',
			},
			table: {
				serial: {
					header: 'Mã hồ sơ',
				},
				name: {
					header: 'Tên hồ sơ',
				},
				actions: {
					header: 'Hành động',
				},
			},
			edit: {
				id: {
					label: 'ID',
				},
				name: {
					label: 'Tên hồ sơ',
					placeholder: "Enter profile's name",
					nonempty: "Profile's name must not be empty.",
				},
				image: {
					label: 'Hình ảnh',
				},
				submit: 'Chỉnh sửa hồ sơ',
				success: 'Hồ sơ đã được chỉnh sửa thành công.',
			},
		},
	},
	signup: {
		header: 'Đăng ký tài khoản camera dashboard',
		password: {
			label: 'Mật khẩu',
			placeholder: 'Nhập mật khẩu',
			min: 'Mật khẩu cần có ít nhất {length} ký tự',
		},
		confirmpassword: {
			label: 'Xác nhật mật khẩu',
			placeholder: 'Nhập lại mật khẩu',
			equals: 'Mật khẩu xác nhận không trùng khớp',
		},
		email: {
			label: 'Email',
			placeholder: 'Nhập email',
			regex: 'Email không hợp lệ',
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
				updateFailure: 'Xác thực email thất bại',
			},
			subject: '[Camera Dashboard] Vui lòng xác nhận email.',
			body: `<p>Gần xong rồi! Để hoàn tất đăng ký camera dashboard của bạn, chúng tôi chỉ cần xác minh email của bạn:
					<a href="mailto:{email}">{email}</a>.
				</p>
				<p>
					<a href="{url}">Xác nhận địa chỉ email</a>.
				</p>`,
		},
	},
	camera: {
		addCamera: 'Tạo máy quay',
		navigation: {
			viewCameras: 'Xem máy quay',
			newCamera: 'Tạo máy quay',
		},
		table: {
			serial: {
				header: 'Mã số máy quay',
			},
			name: {
				header: 'Tên máy quay',
			},
			connection: {
				header: 'Trạng thái',
				disconnected: 'Mất kết nối',
				connected: 'Đã kết nối',
			},
			securityLevel: {
				header: 'Mức bảo mật',
				low: 'Thấp',
				medium: 'Trung bình',
				high: 'Cao',
			},
			actions: {
				header: 'Hành động',
			},
		},
		addForm: {
			name: {
				label: 'Tên máy quay',
				placeholder: 'Nhập tên máy quay',
				nonempty: 'Tên máy quay không được trống.',
			},
			url: {
				label: 'Đường dẫn',
				placeholder: 'Nhập đường dẫn đến luồng máy quay',
				url: 'Đường dẫn không hợp lệ.',
			},
			securityLevel: {
				legend: 'Chọn một mức độ bảo mật:',
				low: {
					label: 'Thấp',
				},
				medium: {
					label: 'Trung bình',
				},
				high: {
					label: 'Cao',
				},
				required: 'Hãy chọn một mức độ bảo mật cho máy quay.',
			},
			submit: 'Tạo máy quay',
			success: 'Máy quay đã được tạo thành công.',
		},
		editForm: {
			serial: {
				label: 'Mã máy quay',
			},
			name: {
				label: 'Tên máy quay',
				placeholder: 'Nhập tên máy quay',
				nonempty: 'Tên máy quay không được trống.',
			},
			url: {
				label: 'Đường dẫn',
				placeholder: 'Nhập đường dẫn đến luồng máy quay',
				url: 'Đường dẫn không hợp lệ.',
			},
			securityLevel: {
				legend: 'Chọn một mức độ bảo mật:',
				low: {
					label: 'Thấp',
				},
				medium: {
					label: 'Trung bình',
				},
				high: {
					label: 'Cao',
				},
				required: 'Hãy chọn một mức độ bảo mật cho máy quay.',
			},
			submit: 'Cập nhật máy quay',
			success: 'Máy quay đã được cập nhật thành công.',
		},
	},
} satisfies Translation;

export default vi;
