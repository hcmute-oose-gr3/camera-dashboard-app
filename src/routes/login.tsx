import Button from '~/components/Button';
import { useI18nContext } from '~/components/I18nProvider';

export default () => {
	const [t] = useI18nContext();
	return (
		<div class="mx-auto mt-24 w-fit">
			<h1 class="text-center">{t.login.header()}</h1>
			<form
				class="flex flex-col gap-y-6 min-w-[300px]
				bg-fill-100 border-fill-300 border-[1px] rounded-md p-4 mt-8"
			>
				<div class="flex flex-col gap-y-1">
					<label for="username">{t.login.usernameLabel()}</label>
					<input
						id="username"
						name="username"
						type="text"
						placeholder={t.login.usernamePlaceholder()}
					/>
				</div>
				<div class="flex flex-col gap-y-1">
					<div class="flex justify-between items-center">
						<label for="password">{t.login.passwordLabel()}</label>
						<a href="#">{t.login.forgotPassword()}</a>
					</div>
					<input
						id="password"
						name="password"
						type="password"
						placeholder={t.login.passwordPlaceholder()}
					/>
				</div>
				<Button type="button" class="bg-primary-700 text-fill-100">
					{t.login.login()}
				</Button>
			</form>
			<div class="bg-fill-200/20 border-fill-300 border-[1px] rounded-md p-4 mt-4">
				<span>{t.login.noAccount()}</span>{' '}
				<a href="#">{t.login.signUp()}</a>.
			</div>
		</div>
	);
};
