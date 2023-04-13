// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'vi'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	login: {
		/**
		 * S​i​g​n​ ​i​n​ ​t​o​ ​c​a​m​e​r​a​ ​d​a​s​h​b​o​a​r​d
		 */
		header: string
		email: {
			/**
			 * E​m​a​i​l
			 */
			label: string
			/**
			 * E​n​t​e​r​ ​y​o​u​r​ ​e​m​a​i​l
			 */
			placeholder: string
			/**
			 * E​m​a​i​l​ ​i​s​ ​i​n​v​a​l​i​d
			 */
			regex: string
		}
		password: {
			/**
			 * P​a​s​s​w​o​r​d
			 */
			label: string
			/**
			 * E​n​t​e​r​ ​y​o​u​r​ ​p​a​s​s​w​o​r​d
			 */
			placeholder: string
			/**
			 * P​a​s​s​w​o​r​d​ ​m​u​s​t​ ​b​e​ ​a​t​ ​l​e​a​s​t​ ​{​l​e​n​g​t​h​}​ ​c​h​a​r​a​c​t​e​r​s​ ​l​o​n​g
			 * @param {number} length
			 */
			min: RequiredParams<'length'>
		}
		/**
		 * S​i​g​n​ ​i​n
		 */
		login: string
		/**
		 * F​o​r​g​o​t​ ​p​a​s​s​w​o​r​d​?
		 */
		forgotPassword: string
		/**
		 * D​o​n​'​t​ ​h​a​v​e​ ​a​n​ ​a​c​c​o​u​n​t​?
		 */
		noAccount: string
		/**
		 * S​i​g​n​ ​u​p
		 */
		signUp: string
		/**
		 * Y​o​u​ ​h​a​v​e​ ​l​o​g​g​e​d​ ​i​n​ ​s​u​c​c​e​s​s​f​u​l​l​y
		 */
		success: string
		/**
		 * O​o​p​s​!
		 */
		oops: string
		/**
		 * I​t​ ​s​e​e​m​s​ ​l​i​k​e​ ​y​o​u​ ​h​a​v​e​ ​a​l​r​e​a​d​y​ ​l​o​g​g​e​d​ ​i​n​.
		 */
		alreadyLoggedIn: string
		/**
		 * B​a​c​k
		 */
		back: string
		/**
		 * L​o​g​ ​o​u​t
		 */
		logout: string
	}
}

export type TranslationFunctions = {
	login: {
		/**
		 * Sign in to camera dashboard
		 */
		header: () => LocalizedString
		email: {
			/**
			 * Email
			 */
			label: () => LocalizedString
			/**
			 * Enter your email
			 */
			placeholder: () => LocalizedString
			/**
			 * Email is invalid
			 */
			regex: () => LocalizedString
		}
		password: {
			/**
			 * Password
			 */
			label: () => LocalizedString
			/**
			 * Enter your password
			 */
			placeholder: () => LocalizedString
			/**
			 * Password must be at least {length} characters long
			 */
			min: (arg: { length: number }) => LocalizedString
		}
		/**
		 * Sign in
		 */
		login: () => LocalizedString
		/**
		 * Forgot password?
		 */
		forgotPassword: () => LocalizedString
		/**
		 * Don't have an account?
		 */
		noAccount: () => LocalizedString
		/**
		 * Sign up
		 */
		signUp: () => LocalizedString
		/**
		 * You have logged in successfully
		 */
		success: () => LocalizedString
		/**
		 * Oops!
		 */
		oops: () => LocalizedString
		/**
		 * It seems like you have already logged in.
		 */
		alreadyLoggedIn: () => LocalizedString
		/**
		 * Back
		 */
		back: () => LocalizedString
		/**
		 * Log out
		 */
		logout: () => LocalizedString
	}
}

export type Formatters = {}
