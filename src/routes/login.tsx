import { createSignal, Show } from 'solid-js';
import { A, createRouteAction } from 'solid-start';
import Button from '~/components/Button';
import { useI18nContext } from '~/components/I18nProvider';
import SpinnerPending from '~/components/SpinnerPending';
import { z } from 'zod';
import Input from '~/components/Input';
import { APIErrorResponse, APIResponse } from '~/models/api-response';
import { instanceOf } from '~/utils';

type FormFields = 'username' | 'password';

export default () => {
	const [t] = useI18nContext();
	const [logging, setLogging] = createSignal(false);
	const [fieldErrors, setFieldErrors] = createSignal<
		Partial<Record<FormFields, string[] | null>>
	>({});
	const [formError, setFormError] = createSignal<
		APIErrorResponse['error'] | undefined
	>();
	const [_, { Form }] = createRouteAction(async (formData: FormData) => {
		setLogging(true);

		const schema = z.object({
			username: z.coerce
				.string()
				.trim()
				.min(3, t.login.username.min({ length: 3 }))
				.regex(/[a-zA-Z0-9]+/, t.login.username.regex()),
			password: z.coerce
				.string()
				.min(3, t.login.password.min({ length: 6 })),
		});
		const ret = await schema.safeParseAsync({
			username: formData.get('username'),
			password: formData.get('password'),
		});

		if (!ret.success) {
			setFieldErrors(ret.error.formErrors.fieldErrors);
			setLogging(false);
			return;
		}

		setFieldErrors({});
		formData.set('username', ret.data.username);

		const json = await fetch('/api/v1/login', {
			method: 'post',
			body: formData,
		})
			.then((v) => v.json() as Promise<APIResponse>)
			.finally(() => {
				setLogging(false);
			});

		if (instanceOf<APIErrorResponse>(json, 'error')) {
			setFormError(json.error);
			return;
		}
		setFormError();
	});
	return (
		<>
			<h1 class="text-center mx-auto mt-24">{t.login.header()}</h1>
			<div class="mx-auto w-min mt-6">
				<Form
					class="flex flex-col gap-y-6 min-w-[400px]
					bg-fill-100 border-fill-300 border-[1px] rounded-lg p-4 mt-8"
				>
					<div class="flex flex-col gap-y-1">
						<Input
							id="username"
							name="username"
							type="text"
							spellcheck={false}
							placeholder={t.login.username.placeholder()}
							class="transition"
							label={t.login.username.label()}
							accent={
								fieldErrors().username?.[0]
									? 'negative'
									: undefined
							}
							caption={fieldErrors().username?.[0]}
						/>
					</div>
					<div class="flex flex-col gap-y-1 relative">
						<a href="#" class="absolute right-0 top-0">
							{t.login.forgotPassword()}
						</a>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder={t.login.password.placeholder()}
							class="transition"
							label={t.login.password.label()}
							accent={
								fieldErrors().password?.[0]
									? 'negative'
									: undefined
							}
							caption={fieldErrors().password?.[0]}
						/>
					</div>
					<Button type="submit" disabled={logging()}>
						<SpinnerPending when={logging}>
							{t.login.login()}
						</SpinnerPending>
					</Button>
				</Form>
				<div class="bg-fill-200/20 border-fill-300 border-[1px] rounded-md p-4 mt-4">
					<span>{t.login.noAccount()}</span>{' '}
					<A href="/signup">{t.login.signUp()}</A>.
				</div>
				<Show when={!!formError()}>
					<div class="bg-negative-300 border-negative-400 border-[1px] rounded-md p-4 mt-4">
						<p>
							<span class="text-negative-700 text-h5">
								{formError()!.code}
							</span>{' '}
							{formError()!.message}.
						</p>
					</div>
				</Show>
			</div>
		</>
	);
};
