// @refresh reload
import { Suspense } from 'solid-js';
import {
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Meta,
	Routes,
	Scripts,
	Title,
} from 'solid-start';
import I18nProvider from './components/I18nProvider';
import './root.css';

export default function Root() {
	return (
		<Html lang="en">
			<Head>
				<Title>SolidStart - With TailwindCSS</Title>
				<Meta charset="utf-8" />
				<Meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossorigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Body>
				<Suspense>
					<ErrorBoundary>
						<I18nProvider>
							<Routes>
								<FileRoutes />
							</Routes>
						</I18nProvider>
					</ErrorBoundary>
				</Suspense>
				<Scripts />
			</Body>
		</Html>
	);
}
