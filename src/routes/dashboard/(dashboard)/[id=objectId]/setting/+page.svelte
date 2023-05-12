<script>
	import { darkTheme } from './store';

	const toggleDark = () => ($darkTheme = !$darkTheme);
	$: dark = $darkTheme;
</script>

<div>
	<div class="w-2/3 mx-auto shadow-2xl rounded-xl py-4 px-[32px] space-y-24">
		<h1 class="text-2xl mt-2 border-b-[1px] pb-1">setting</h1>
		<div class="border-b-[1px] pb-1">
			<div class="flex space-x-24 items-center">
				<div class="text-xl w-[350px]">Email Notification</div>
				<div class="flex space-x-4 items-center">
					<div>
						<p>New and Update</p>
					</div>
					<div>
						<label class="switch">
							<input type="checkbox" />
							<span class="slider round" />
						</label>
					</div>
				</div>
				<div class="flex space-x-4 items-center">
					<div>
						<p>Tips and tutorial</p>
					</div>
					<div>
						<label class="switch">
							<input type="checkbox" />
							<span class="slider round" />
						</label>
					</div>
				</div>
			</div>
		</div>
		<div class="border-b-[1px] pb-1">
			<div class="flex space-x-24 items-center">
				<div class="text-xl w-[290px]">Language</div>
				<div class="flex space-x-4 items-center">
					<div>
						<p>English</p>
					</div>
					<div>
						<label class="switch">
							<input type="checkbox" />
							<span class="slider round" />
						</label>
					</div>
				</div>
				<div class="flex space-x-4 items-center">
					<div>
						<p>VietNamese</p>
					</div>
					<div>
						<label class="switch">
							<input type="checkbox" />
							<span class="slider round" />
						</label>
					</div>
				</div>
			</div>
		</div>
		<div class="border-b-[1px] pb-1">
			<div class="flex space-x-24 items-center">
				<div class="text-xl w-[290px]">Display screen</div>
				<div class="flex space-x-4 items-center">
					<div>
						<p>Dark Mode</p>
					</div>
					<div>
						<button on:click={toggleDark}>
							<label class="switch">
								<input type="checkbox" />
								<span class="slider round" />
							</label>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
