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
	logo: {
		/**
		 * C​a​m​e​r​a​ ​D​a​s​h​b​o​a​r​d
		 */
		name: string
	}
	login: {
		/**
		 * S​i​g​n​ ​i​n​ ​t​o​ ​y​o​u​r​ ​d​a​s​h​b​o​a​r​d
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
			 * P​a​s​s​w​o​r​d​ ​m​u​s​t​ ​b​e​ ​n​o​t​ ​b​e​ ​e​m​p​t​y
			 */
			empty: string
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
		error: {
			/**
			 * M​i​s​s​i​n​g​ ​l​o​g​i​n​ ​c​r​e​d​e​n​t​i​a​l​s
			 */
			missingCredentials: string
			/**
			 * E​m​a​i​l​ ​o​r​ ​p​a​s​s​w​o​r​d​ ​i​s​ ​i​n​c​o​r​r​e​c​t
			 */
			emailNotFound: string
			/**
			 * E​m​a​i​l​ ​o​r​ ​p​a​s​s​w​o​r​d​ ​i​s​ ​i​n​c​o​r​r​e​c​t
			 */
			wrongPassword: string
			/**
			 * Y​o​u​r​ ​a​c​c​o​u​n​t​ ​i​s​ ​n​o​t​ ​v​e​r​i​f​i​e​d​ ​y​e​t
			 */
			unverified: string
		}
	}
	dashboard: {
		meta: {
			/**
			 * D​a​s​h​b​o​a​r​d​s
			 */
			title: string
			/**
			 * D​a​s​h​b​o​a​r​d​ ​-​ ​{​d​a​s​h​b​o​a​r​d​N​a​m​e​}
			 * @param {string} dashboardName
			 */
			namedTitle: RequiredParams<'dashboardName'>
		}
		/**
		 * S​e​l​e​c​t​ ​o​n​e​ ​o​f​ ​t​h​e​ ​d​a​s​h​b​o​a​r​d​s​ ​b​e​l​o​w​ ​t​o​ ​c​o​n​t​i​n​u​e​.
		 */
		action: string
		add: {
			meta: {
				/**
				 * A​d​d​ ​d​a​s​h​b​o​a​r​d
				 */
				title: string
			}
			/**
			 * F​i​l​l​ ​t​h​e​ ​f​o​r​m​ ​b​e​l​o​w​ ​t​o​ ​c​r​e​a​t​e​ ​a​ ​d​a​s​h​b​o​a​r​d​.
			 */
			legends: string
			name: {
				/**
				 * D​a​s​h​b​o​a​r​d​ ​n​a​m​e
				 */
				label: string
				/**
				 * E​n​t​e​r​ ​d​a​s​h​b​o​a​r​d​ ​n​a​m​e
				 */
				placeholder: string
				/**
				 * D​a​s​h​b​o​a​r​d​ ​n​a​m​e​ ​m​u​s​t​ ​n​o​t​ ​b​e​ ​e​m​p​t​y​.
				 */
				nonempty: string
			}
			/**
			 * C​r​e​a​t​e​ ​d​a​s​h​b​o​a​r​d
			 */
			submit: string
			/**
			 * D​a​s​h​b​o​a​r​d​ ​h​a​s​ ​b​e​e​n​ ​c​r​e​a​t​e​d​ ​s​u​c​c​e​s​s​f​u​l​l​y​.
			 */
			success: string
		}
		entry: {
			/**
			 * H​o​m​e
			 */
			dashboard: string
			/**
			 * C​a​m​e​r​a​s
			 */
			camera: string
			/**
			 * A​r​e​a​s
			 */
			area: string
			/**
			 * A​l​e​r​t​s
			 */
			alert: string
			/**
			 * P​r​o​f​i​l​e​s
			 */
			profiles: string
			/**
			 * S​e​t​t​i​n​g​s
			 */
			setting: string
			/**
			 * S​t​a​t​i​s​t​i​c
			 */
			statistic: string
			/**
			 * S​i​g​n​ ​o​u​t
			 */
			logout: string
		}
		card: {
			/**
			 * C​r​e​a​t​e​d​ ​d​a​t​e​:​ ​{​d​a​t​e​|​s​h​o​r​t​D​a​t​e​}​.
			 * @param {Date} date
			 */
			createdAt: RequiredParams<'date|shortDate'>
			/**
			 * L​a​s​t​ ​m​o​d​i​f​i​e​d​ ​d​a​t​e​:​ ​{​d​a​t​e​|​s​h​o​r​t​D​a​t​e​}​.
			 * @param {Date} date
			 */
			updatedAt: RequiredParams<'date|shortDate'>
			/**
			 * C​r​e​a​t​e​d​ ​{​d​a​y​s​}​ ​d​a​y​s​ ​a​g​o​.
			 * @param {number} days
			 */
			createdDaysAgo: RequiredParams<'days'>
			/**
			 * C​r​e​a​t​e​d​ ​t​o​d​a​y​.
			 */
			createdToday: string
		}
		area: {
			meta: {
				/**
				 * A​r​e​a
				 */
				title: string
				/**
				 * A​r​e​a​ ​-​ ​{​a​r​e​a​N​a​m​e​}
				 * @param {string} areaName
				 */
				namedTitle: RequiredParams<'areaName'>
			}
			modal: {
				/**
				 * A​d​d​ ​a​r​e​a
				 */
				title: string
				select: {
					/**
					 * S​e​l​e​c​t​ ​a​n​ ​n​a​m​e​:
					 */
					title: string
					/**
					 * C​h​o​o​s​e​ ​n​a​m​e​ ​c​a​m​e​r​a
					 */
					option: string
				}
				name: {
					/**
					 * E​n​t​e​r​ ​n​a​m​e​ ​a​r​e​a​ ​c​o​d​e​:​ 
					 */
					titel: string
					/**
					 * C​o​d​e​ ​n​a​m​e​ ​w​i​t​h​ ​a​t​ ​l​e​a​s​t​ ​6​ ​c​h​a​r​a​c​t​e​r​s
					 */
					min: string
				}
				serial: {
					/**
					 * E​n​t​e​r​ ​n​a​m​e​ ​a​r​e​a​:​ 
					 */
					titel: string
					/**
					 * N​a​m​e​ ​w​i​t​h​ ​a​t​ ​l​e​a​s​t​ ​6​ ​c​h​a​r​a​c​t​e​r​s
					 */
					min: string
				}
				activate: {
					/**
					 * A​c​t​i​v​a​t​e
					 */
					title: string
					/**
					 * t​r​u​e
					 */
					'true': string
					/**
					 * f​a​l​s​e
					 */
					'false': string
					/**
					 * P​l​e​a​s​e​ ​c​h​e​c​k​ ​b​o​x
					 */
					check: string
				}
			}
			table: {
				serial: {
					/**
					 * S​e​r​i​a​l
					 */
					header: string
				}
				name: {
					/**
					 * N​a​m​e
					 */
					header: string
				}
				activate: {
					/**
					 * A​c​t​i​v​a​t​e
					 */
					header: string
				}
				actions: {
					/**
					 * A​c​t​i​o​n​s
					 */
					header: string
				}
			}
			/**
			 * H​o​m​e
			 */
			home: string
			/**
			 * S​e​r​i​a​l
			 */
			serial: string
			/**
			 * N​a​m​e
			 */
			name: string
			/**
			 * A​c​t​i​v​a​t​e
			 */
			activate: string
			add: {
				/**
				 * A​d​d​ ​a​r​e​a​ ​s​u​c​c​e​s​s
				 */
				success: string
				/**
				 * A​d​d​ ​a​r​e​a​ ​f​a​l​s​e
				 */
				failure: string
			}
			layout: {
				/**
				 * H​o​m​e
				 */
				home: string
				/**
				 * A​d​d​ ​a​r​e​a
				 */
				add: string
			}
		}
		settings: {
			meta: {
				/**
				 * S​e​t​t​i​n​g​s
				 */
				title: string
			}
			theme: {
				/**
				 * T​h​e​m​e
				 */
				title: string
				/**
				 * P​a​g​e​ ​c​o​l​o​r
				 */
				color: string
			}
			language: {
				/**
				 * L​a​n​g​u​a​g​e
				 */
				title: string
				/**
				 * C​h​o​o​s​e​ ​l​a​n​g​u​a​g​e
				 */
				language: string
				options: {
					/**
					 * E​n​g​l​i​s​h
					 */
					en: string
					/**
					 * V​i​e​t​n​a​m​e​s​e
					 */
					vi: string
				}
			}
			'delete': {
				/**
				 * D​a​n​g​e​r​ ​z​o​n​e
				 */
				title: string
				/**
				 * D​e​l​e​t​e​ ​t​h​i​s​ ​d​a​s​h​b​o​a​r​d
				 */
				message: string
				/**
				 * O​n​c​e​ ​y​o​u​ ​d​e​l​e​t​e​ ​a​ ​d​a​s​h​b​o​a​r​d​,​ ​t​h​e​r​e​ ​i​s​ ​n​o​t​ ​g​o​ ​b​a​c​k​.​ ​P​l​e​a​s​e​ ​b​e​ ​c​e​r​t​a​i​n​.
				 */
				warning: string
				button: {
					/**
					 * D​e​l​e​t​e​ ​t​h​i​s​ ​d​a​s​h​b​o​a​r​d
					 */
					message: string
				}
			}
			modal: {
				/**
				 * D​e​l​e​t​e​ ​{​d​a​s​h​b​o​a​r​d​}
				 * @param {string} dashboard
				 */
				title: RequiredParams<'dashboard'>
				items: {
					/**
					 * A​r​e​a​s
					 */
					area: string
					/**
					 * C​a​m​e​r​a​s
					 */
					camera: string
				}
				/**
				 * I​ ​w​a​n​t​ ​t​o​ ​d​e​l​e​t​e​ ​t​h​i​s​ ​d​a​s​h​b​o​a​r​d
				 */
				button: string
			}
		}
		alert: {
			meta: {
				/**
				 * A​l​e​r​t​s
				 */
				title: string
			}
			table: {
				serial: {
					/**
					 * S​e​r​i​a​l
					 */
					header: string
				}
				name: {
					/**
					 * N​a​m​e
					 */
					header: string
				}
				type: {
					/**
					 * T​y​p​e
					 */
					header: string
					/**
					 * T​i​m​e​-​b​a​s​e​d​ ​A​l​e​r​t
					 */
					timeBased: string
					/**
					 * P​r​o​f​i​l​e​-​b​a​s​e​d​ ​A​l​e​r​t
					 */
					profileBased: string
					/**
					 * Z​o​n​e​-​b​a​s​e​d​ ​A​l​e​r​t
					 */
					zoneBased: string
				}
				actions: {
					/**
					 * A​c​t​i​o​n​s
					 */
					header: string
				}
			}
			navigation: {
				/**
				 * V​i​e​w​ ​a​l​e​r​t​s
				 */
				viewAlerts: string
				/**
				 * N​e​w​ ​a​l​e​r​t
				 */
				newAlert: string
			}
			'new': {
				name: {
					/**
					 * N​a​m​e
					 */
					label: string
					/**
					 * E​n​t​e​r​ ​a​l​e​r​t​'​s​ ​n​a​m​e
					 */
					placeholder: string
					/**
					 * A​l​e​r​t​'​s​ ​n​a​m​e​ ​m​u​s​t​ ​n​o​t​ ​b​e​ ​e​m​p​t​y​.
					 */
					nonempty: string
				}
				/**
				 * C​r​e​a​t​e​ ​a​l​e​r​t
				 */
				submit: string
				/**
				 * A​l​e​r​t​ ​h​a​s​ ​b​e​e​n​ ​c​r​e​a​t​e​d​ ​s​u​c​c​e​s​s​f​u​l​l​y​.
				 */
				success: string
				time: {
					/**
					 * T​i​m​e​-​b​a​s​e​d
					 */
					navigation: string
					startTime: {
						/**
						 * S​t​a​r​t​ ​t​i​m​e
						 */
						label: string
						/**
						 * I​n​v​a​l​i​d​ ​s​t​a​r​t​ ​t​i​m​e​ ​f​o​r​m​a​t​ ​(​m​u​s​t​ ​b​e​ ​h​h​:​m​m​)​.
						 */
						invalid: string
					}
					endTime: {
						/**
						 * E​n​d​ ​t​i​m​e
						 */
						label: string
						/**
						 * I​n​v​a​l​i​d​ ​e​n​d​ ​t​i​m​e​ ​f​o​r​m​a​t​ ​(​m​u​s​t​ ​b​e​ ​h​h​:​m​m​)​.
						 */
						invalid: string
					}
					alertLevel: {
						/**
						 * C​h​o​o​s​e​ ​a​n​ ​a​l​e​r​t​ ​l​e​v​e​l​:
						 */
						legend: string
						low: {
							/**
							 * L​o​w
							 */
							label: string
						}
						medium: {
							/**
							 * M​e​d​i​u​m
							 */
							label: string
						}
						high: {
							/**
							 * H​i​g​h
							 */
							label: string
						}
						/**
						 * A​n​ ​a​l​e​r​t​ ​l​e​v​e​l​ ​i​s​ ​r​e​q​u​i​r​e​d​.
						 */
						required: string
					}
				}
				profile: {
					/**
					 * P​r​o​f​i​l​e​-​b​a​s​e​d
					 */
					navigation: string
					profile: {
						/**
						 * P​r​o​f​i​l​e
						 */
						label: string
						/**
						 * A​ ​p​r​o​f​i​l​e​ ​m​u​s​t​ ​b​e​ ​s​e​l​e​c​t​e​d​.
						 */
						nonempty: string
					}
				}
				zone: {
					/**
					 * Z​o​n​e​-​b​a​s​e​d
					 */
					navigation: string
					camera: {
						/**
						 * C​a​m​e​r​a
						 */
						label: string
						/**
						 * S​e​l​e​c​t​ ​a​ ​c​a​m​e​r​a
						 */
						placeholder: string
						/**
						 * A​ ​c​a​m​e​r​a​ ​m​u​s​t​ ​b​e​ ​s​e​l​e​c​t​e​d​.
						 */
						nonempty: string
						/**
						 * A​ ​z​o​n​e​ ​o​n​ ​c​a​m​e​r​a​ ​m​u​s​t​ ​b​e​ ​d​r​a​w​n​.
						 */
						missingZone: string
					}
					/**
					 * P​o​s​i​t​i​o​n​:
					 */
					position: string
					/**
					 * S​i​z​e​:
					 */
					size: string
					/**
					 * A​r​e​a
					 */
					area: string
				}
			}
		}
		profiles: {
			meta: {
				/**
				 * P​r​o​f​i​l​e​s
				 */
				title: string
			}
			navigation: {
				/**
				 * V​i​e​w​ ​p​r​o​f​i​l​e​s
				 */
				viewProfiles: string
				/**
				 * N​e​w​ ​p​r​o​f​i​l​e
				 */
				newProfile: string
			}
			'new': {
				name: {
					/**
					 * N​a​m​e
					 */
					label: string
					/**
					 * E​n​t​e​r​ ​p​r​o​f​i​l​e​'​s​ ​n​a​m​e
					 */
					placeholder: string
					/**
					 * P​r​o​f​i​l​e​'​s​ ​n​a​m​e​ ​m​u​s​t​ ​n​o​t​ ​b​e​ ​e​m​p​t​y​.
					 */
					nonempty: string
				}
				image: {
					/**
					 * I​m​a​g​e
					 */
					label: string
					/**
					 * P​l​e​a​s​e​ ​u​p​l​o​a​d​ ​a​n​ ​i​m​a​g​e​ ​f​o​r​ ​t​h​i​s​ ​p​r​o​f​i​l​e​.
					 */
					required: string
				}
				/**
				 * C​r​e​a​t​e​ ​p​r​o​f​i​l​e
				 */
				submit: string
				/**
				 * P​r​o​f​i​l​e​ ​h​a​s​ ​b​e​e​n​ ​c​r​e​a​t​e​d​ ​s​u​c​c​e​s​s​f​u​l​l​y​.
				 */
				success: string
			}
			table: {
				serial: {
					/**
					 * S​e​r​i​a​l
					 */
					header: string
				}
				name: {
					/**
					 * N​a​m​e
					 */
					header: string
				}
				actions: {
					/**
					 * A​c​t​i​o​n​s
					 */
					header: string
				}
			}
			edit: {
				id: {
					/**
					 * I​D
					 */
					label: string
				}
				name: {
					/**
					 * N​a​m​e
					 */
					label: string
					/**
					 * E​n​t​e​r​ ​p​r​o​f​i​l​e​'​s​ ​n​a​m​e
					 */
					placeholder: string
					/**
					 * P​r​o​f​i​l​e​'​s​ ​n​a​m​e​ ​m​u​s​t​ ​n​o​t​ ​b​e​ ​e​m​p​t​y​.
					 */
					nonempty: string
				}
				image: {
					/**
					 * I​m​a​g​e
					 */
					label: string
				}
				/**
				 * E​d​i​t​ ​p​r​o​f​i​l​e
				 */
				submit: string
				/**
				 * P​r​o​f​i​l​e​ ​h​a​s​ ​b​e​e​n​ ​e​d​i​t​e​d​ ​s​u​c​c​e​s​s​f​u​l​l​y​.
				 */
				success: string
			}
		}
	}
	signup: {
		/**
		 * S​i​g​n​ ​u​p​ ​f​o​r​ ​a​ ​c​a​m​e​r​a​ ​d​a​s​h​b​o​a​r​d
		 */
		header: string
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
		confirmpassword: {
			/**
			 * C​o​n​f​i​r​m​ ​p​a​s​s​w​o​r​d
			 */
			label: string
			/**
			 * E​n​t​e​r​ ​y​o​u​r​ ​p​a​s​s​w​o​r​d​ ​a​g​a​i​n
			 */
			placeholder: string
			/**
			 * P​a​s​s​w​o​r​d​ ​a​n​d​ ​c​o​n​f​i​r​m​ ​p​a​s​s​w​o​r​d​ ​d​o​ ​n​o​t​ ​m​a​t​c​h
			 */
			equals: string
		}
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
		/**
		 * S​i​g​n​ ​u​p
		 */
		signup: string
		/**
		 * A​l​r​e​a​d​y​ ​h​a​v​e​ ​a​n​ ​a​c​c​o​u​n​t​?
		 */
		haveAccount: string
		/**
		 * L​o​g​ ​i​n
		 */
		login: string
		/**
		 * P​l​e​a​s​e​ ​c​h​e​c​k​ ​y​o​u​r​ ​m​a​i​l
		 */
		success: string
		/**
		 * B​a​c​k
		 */
		back: string
		verifyMail: {
			/**
			 * Y​o​u​ ​h​a​v​e​ ​s​u​c​c​e​s​s​f​u​l​l​y​ ​c​o​n​f​i​r​m​e​d​ ​y​o​u​r​ ​a​c​c​o​u​n​t
			 */
			success: string
			error: {
				/**
				 * Y​o​u​r​ ​e​m​a​i​l​ ​i​s​ ​n​o​t​ ​v​e​r​i​f​i​e​d
				 */
				userNotFound: string
				/**
				 * A​c​c​o​u​n​t​ ​a​l​d​r​e​a​d​y​ ​v​e​r​i​f​y
				 */
				alreadyAccount: string
				/**
				 * E​m​a​i​l​ ​v​e​r​i​f​i​c​a​t​i​o​n​ ​f​a​i​l​e​d
				 */
				updateFailure: string
			}
			/**
			 * [​C​a​m​e​r​a​ ​D​a​s​h​b​o​a​r​d​]​ ​P​l​e​a​s​e​ ​v​e​r​i​f​y​ ​y​o​u​r​ ​e​m​a​i​l​ ​a​d​d​r​e​s​s​.
			 */
			subject: string
			/**
			 * <​p​>​I​t​'​s​ ​a​l​m​o​s​t​ ​d​o​n​e​!​ ​T​o​ ​c​o​m​p​l​e​t​e​ ​y​o​u​r​ ​c​a​m​e​r​a​ ​d​a​s​h​b​o​a​r​d​ ​s​i​g​n​u​p​,​ ​w​e​ ​j​u​s​t​ ​n​e​e​d​ ​t​o​ ​v​e​r​i​f​y​ ​y​o​u​r​ ​e​m​a​i​l​:​ ​
		​	​	​	​	​	​<​a​ ​h​r​e​f​=​"​m​a​i​l​t​o​:​{​e​m​a​i​l​}​"​>​{​e​m​a​i​l​}​<​/​a​>​
		​	​	​	​	​<​/​p​>​
		​	​	​	​	​<​p​>​
		​	​	​	​	​	​<​a​ ​h​r​e​f​=​"​{​u​r​l​}​"​>​V​e​r​i​f​y​ ​e​m​a​i​l​ ​a​d​d​r​e​s​s​<​/​a​>​.​
		​	​	​	​	​<​/​p​>
			 * @param {string} email
			 * @param {string} url
			 */
			body: RequiredParams<'email' | 'email' | 'url'>
		}
	}
	camera: {
		/**
		 * A​d​d​ ​c​a​m​e​r​a
		 */
		addCamera: string
		navigation: {
			/**
			 * V​i​e​w​ ​c​a​m​e​r​a​s
			 */
			viewCameras: string
			/**
			 * C​r​e​a​t​e​ ​c​a​m​e​r​a
			 */
			newCamera: string
		}
		table: {
			serial: {
				/**
				 * S​e​r​i​a​l
				 */
				header: string
			}
			name: {
				/**
				 * N​a​m​e
				 */
				header: string
			}
			connection: {
				/**
				 * C​o​n​n​e​c​t​i​o​n
				 */
				header: string
				/**
				 * D​i​s​c​o​n​n​e​c​t​e​d
				 */
				disconnected: string
				/**
				 * C​o​n​n​e​c​t​e​d
				 */
				connected: string
			}
			securityLevel: {
				/**
				 * S​e​c​u​r​i​t​y​ ​L​e​v​e​l
				 */
				header: string
				/**
				 * L​o​w
				 */
				low: string
				/**
				 * M​e​d​i​u​m
				 */
				medium: string
				/**
				 * H​i​g​h
				 */
				high: string
			}
			actions: {
				/**
				 * A​c​t​i​o​n​s
				 */
				header: string
			}
		}
		addForm: {
			name: {
				/**
				 * C​a​m​e​r​a​ ​n​a​m​e
				 */
				label: string
				/**
				 * E​n​t​e​r​ ​c​a​m​e​r​a​ ​n​a​m​e
				 */
				placeholder: string
				/**
				 * C​a​m​e​r​a​ ​n​a​m​e​ ​m​u​s​t​ ​n​o​t​ ​b​e​ ​e​m​p​t​y
				 */
				nonempty: string
			}
			url: {
				/**
				 * U​R​L
				 */
				label: string
				/**
				 * E​n​t​e​r​ ​c​a​m​e​r​a​ ​s​t​r​e​a​m​ ​U​R​L
				 */
				placeholder: string
				/**
				 * U​R​L​ ​i​s​ ​n​o​t​ ​v​a​l​i​d
				 */
				url: string
			}
			securityLevel: {
				/**
				 * C​h​o​o​s​e​ ​a​ ​s​e​c​u​r​i​t​y​ ​l​e​v​e​l​:
				 */
				legend: string
				low: {
					/**
					 * L​o​w
					 */
					label: string
				}
				medium: {
					/**
					 * M​e​d​i​u​m
					 */
					label: string
				}
				high: {
					/**
					 * H​i​g​h
					 */
					label: string
				}
				/**
				 * P​l​e​a​s​e​ ​c​h​o​o​s​e​ ​e​x​a​c​t​l​y​ ​o​n​e​ ​o​f​ ​s​e​c​u​r​i​t​y​ ​l​e​v​e​l​s​.
				 */
				required: string
			}
			/**
			 * A​d​d​ ​c​a​m​e​r​a
			 */
			submit: string
			/**
			 * C​a​m​e​r​a​ ​h​a​s​ ​b​e​e​n​ ​a​d​d​e​d​ ​s​u​c​c​e​s​s​f​u​l​l​y​.
			 */
			success: string
		}
		editForm: {
			serial: {
				/**
				 * C​a​m​e​r​a​ ​s​e​r​i​a​l
				 */
				label: string
			}
			name: {
				/**
				 * C​a​m​e​r​a​ ​n​a​m​e
				 */
				label: string
				/**
				 * E​n​t​e​r​ ​c​a​m​e​r​a​ ​n​a​m​e
				 */
				placeholder: string
				/**
				 * C​a​m​e​r​a​ ​n​a​m​e​ ​m​u​s​t​ ​n​o​t​ ​b​e​ ​e​m​p​t​y
				 */
				nonempty: string
			}
			url: {
				/**
				 * U​R​L
				 */
				label: string
				/**
				 * E​n​t​e​r​ ​c​a​m​e​r​a​ ​s​t​r​e​a​m​ ​U​R​L
				 */
				placeholder: string
				/**
				 * U​R​L​ ​i​s​ ​n​o​t​ ​v​a​l​i​d
				 */
				url: string
			}
			securityLevel: {
				/**
				 * C​h​o​o​s​e​ ​a​ ​s​e​c​u​r​i​t​y​ ​l​e​v​e​l​:
				 */
				legend: string
				low: {
					/**
					 * L​o​w
					 */
					label: string
				}
				medium: {
					/**
					 * M​e​d​i​u​m
					 */
					label: string
				}
				high: {
					/**
					 * H​i​g​h
					 */
					label: string
				}
				/**
				 * P​l​e​a​s​e​ ​c​h​o​o​s​e​ ​e​x​a​c​t​l​y​ ​o​n​e​ ​o​f​ ​s​e​c​u​r​i​t​y​ ​l​e​v​e​l​s​.
				 */
				required: string
			}
			/**
			 * E​d​i​t​ ​c​a​m​e​r​a
			 */
			submit: string
			/**
			 * C​a​m​e​r​a​ ​h​a​s​ ​b​e​e​n​ ​e​d​i​t​e​d​ ​s​u​c​c​e​s​s​f​u​l​l​y​.
			 */
			success: string
		}
	}
	statistic: {
		/**
		 * S​t​a​t​i​s​t​i​c
		 */
		title: string
	}
}

export type TranslationFunctions = {
	logo: {
		/**
		 * Camera Dashboard
		 */
		name: () => LocalizedString
	}
	login: {
		/**
		 * Sign in to your dashboard
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
			 * Password must be not be empty
			 */
			empty: () => LocalizedString
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
		error: {
			/**
			 * Missing login credentials
			 */
			missingCredentials: () => LocalizedString
			/**
			 * Email or password is incorrect
			 */
			emailNotFound: () => LocalizedString
			/**
			 * Email or password is incorrect
			 */
			wrongPassword: () => LocalizedString
			/**
			 * Your account is not verified yet
			 */
			unverified: () => LocalizedString
		}
	}
	dashboard: {
		meta: {
			/**
			 * Dashboards
			 */
			title: () => LocalizedString
			/**
			 * Dashboard - {dashboardName}
			 */
			namedTitle: (arg: { dashboardName: string }) => LocalizedString
		}
		/**
		 * Select one of the dashboards below to continue.
		 */
		action: () => LocalizedString
		add: {
			meta: {
				/**
				 * Add dashboard
				 */
				title: () => LocalizedString
			}
			/**
			 * Fill the form below to create a dashboard.
			 */
			legends: () => LocalizedString
			name: {
				/**
				 * Dashboard name
				 */
				label: () => LocalizedString
				/**
				 * Enter dashboard name
				 */
				placeholder: () => LocalizedString
				/**
				 * Dashboard name must not be empty.
				 */
				nonempty: () => LocalizedString
			}
			/**
			 * Create dashboard
			 */
			submit: () => LocalizedString
			/**
			 * Dashboard has been created successfully.
			 */
			success: () => LocalizedString
		}
		entry: {
			/**
			 * Home
			 */
			dashboard: () => LocalizedString
			/**
			 * Cameras
			 */
			camera: () => LocalizedString
			/**
			 * Areas
			 */
			area: () => LocalizedString
			/**
			 * Alerts
			 */
			alert: () => LocalizedString
			/**
			 * Profiles
			 */
			profiles: () => LocalizedString
			/**
			 * Settings
			 */
			setting: () => LocalizedString
			/**
			 * Statistic
			 */
			statistic: () => LocalizedString
			/**
			 * Sign out
			 */
			logout: () => LocalizedString
		}
		card: {
			/**
			 * Created date: {date|shortDate}.
			 */
			createdAt: (arg: { date: Date }) => LocalizedString
			/**
			 * Last modified date: {date|shortDate}.
			 */
			updatedAt: (arg: { date: Date }) => LocalizedString
			/**
			 * Created {days} days ago.
			 */
			createdDaysAgo: (arg: { days: number }) => LocalizedString
			/**
			 * Created today.
			 */
			createdToday: () => LocalizedString
		}
		area: {
			meta: {
				/**
				 * Area
				 */
				title: () => LocalizedString
				/**
				 * Area - {areaName}
				 */
				namedTitle: (arg: { areaName: string }) => LocalizedString
			}
			modal: {
				/**
				 * Add area
				 */
				title: () => LocalizedString
				select: {
					/**
					 * Select an name:
					 */
					title: () => LocalizedString
					/**
					 * Choose name camera
					 */
					option: () => LocalizedString
				}
				name: {
					/**
					 * Enter name area code: 
					 */
					titel: () => LocalizedString
					/**
					 * Code name with at least 6 characters
					 */
					min: () => LocalizedString
				}
				serial: {
					/**
					 * Enter name area: 
					 */
					titel: () => LocalizedString
					/**
					 * Name with at least 6 characters
					 */
					min: () => LocalizedString
				}
				activate: {
					/**
					 * Activate
					 */
					title: () => LocalizedString
					/**
					 * true
					 */
					'true': () => LocalizedString
					/**
					 * false
					 */
					'false': () => LocalizedString
					/**
					 * Please check box
					 */
					check: () => LocalizedString
				}
			}
			table: {
				serial: {
					/**
					 * Serial
					 */
					header: () => LocalizedString
				}
				name: {
					/**
					 * Name
					 */
					header: () => LocalizedString
				}
				activate: {
					/**
					 * Activate
					 */
					header: () => LocalizedString
				}
				actions: {
					/**
					 * Actions
					 */
					header: () => LocalizedString
				}
			}
			/**
			 * Home
			 */
			home: () => LocalizedString
			/**
			 * Serial
			 */
			serial: () => LocalizedString
			/**
			 * Name
			 */
			name: () => LocalizedString
			/**
			 * Activate
			 */
			activate: () => LocalizedString
			add: {
				/**
				 * Add area success
				 */
				success: () => LocalizedString
				/**
				 * Add area false
				 */
				failure: () => LocalizedString
			}
			layout: {
				/**
				 * Home
				 */
				home: () => LocalizedString
				/**
				 * Add area
				 */
				add: () => LocalizedString
			}
		}
		settings: {
			meta: {
				/**
				 * Settings
				 */
				title: () => LocalizedString
			}
			theme: {
				/**
				 * Theme
				 */
				title: () => LocalizedString
				/**
				 * Page color
				 */
				color: () => LocalizedString
			}
			language: {
				/**
				 * Language
				 */
				title: () => LocalizedString
				/**
				 * Choose language
				 */
				language: () => LocalizedString
				options: {
					/**
					 * English
					 */
					en: () => LocalizedString
					/**
					 * Vietnamese
					 */
					vi: () => LocalizedString
				}
			}
			'delete': {
				/**
				 * Danger zone
				 */
				title: () => LocalizedString
				/**
				 * Delete this dashboard
				 */
				message: () => LocalizedString
				/**
				 * Once you delete a dashboard, there is not go back. Please be certain.
				 */
				warning: () => LocalizedString
				button: {
					/**
					 * Delete this dashboard
					 */
					message: () => LocalizedString
				}
			}
			modal: {
				/**
				 * Delete {dashboard}
				 */
				title: (arg: { dashboard: string }) => LocalizedString
				items: {
					/**
					 * Areas
					 */
					area: () => LocalizedString
					/**
					 * Cameras
					 */
					camera: () => LocalizedString
				}
				/**
				 * I want to delete this dashboard
				 */
				button: () => LocalizedString
			}
		}
		alert: {
			meta: {
				/**
				 * Alerts
				 */
				title: () => LocalizedString
			}
			table: {
				serial: {
					/**
					 * Serial
					 */
					header: () => LocalizedString
				}
				name: {
					/**
					 * Name
					 */
					header: () => LocalizedString
				}
				type: {
					/**
					 * Type
					 */
					header: () => LocalizedString
					/**
					 * Time-based Alert
					 */
					timeBased: () => LocalizedString
					/**
					 * Profile-based Alert
					 */
					profileBased: () => LocalizedString
					/**
					 * Zone-based Alert
					 */
					zoneBased: () => LocalizedString
				}
				actions: {
					/**
					 * Actions
					 */
					header: () => LocalizedString
				}
			}
			navigation: {
				/**
				 * View alerts
				 */
				viewAlerts: () => LocalizedString
				/**
				 * New alert
				 */
				newAlert: () => LocalizedString
			}
			'new': {
				name: {
					/**
					 * Name
					 */
					label: () => LocalizedString
					/**
					 * Enter alert's name
					 */
					placeholder: () => LocalizedString
					/**
					 * Alert's name must not be empty.
					 */
					nonempty: () => LocalizedString
				}
				/**
				 * Create alert
				 */
				submit: () => LocalizedString
				/**
				 * Alert has been created successfully.
				 */
				success: () => LocalizedString
				time: {
					/**
					 * Time-based
					 */
					navigation: () => LocalizedString
					startTime: {
						/**
						 * Start time
						 */
						label: () => LocalizedString
						/**
						 * Invalid start time format (must be hh:mm).
						 */
						invalid: () => LocalizedString
					}
					endTime: {
						/**
						 * End time
						 */
						label: () => LocalizedString
						/**
						 * Invalid end time format (must be hh:mm).
						 */
						invalid: () => LocalizedString
					}
					alertLevel: {
						/**
						 * Choose an alert level:
						 */
						legend: () => LocalizedString
						low: {
							/**
							 * Low
							 */
							label: () => LocalizedString
						}
						medium: {
							/**
							 * Medium
							 */
							label: () => LocalizedString
						}
						high: {
							/**
							 * High
							 */
							label: () => LocalizedString
						}
						/**
						 * An alert level is required.
						 */
						required: () => LocalizedString
					}
				}
				profile: {
					/**
					 * Profile-based
					 */
					navigation: () => LocalizedString
					profile: {
						/**
						 * Profile
						 */
						label: () => LocalizedString
						/**
						 * A profile must be selected.
						 */
						nonempty: () => LocalizedString
					}
				}
				zone: {
					/**
					 * Zone-based
					 */
					navigation: () => LocalizedString
					camera: {
						/**
						 * Camera
						 */
						label: () => LocalizedString
						/**
						 * Select a camera
						 */
						placeholder: () => LocalizedString
						/**
						 * A camera must be selected.
						 */
						nonempty: () => LocalizedString
						/**
						 * A zone on camera must be drawn.
						 */
						missingZone: () => LocalizedString
					}
					/**
					 * Position:
					 */
					position: () => LocalizedString
					/**
					 * Size:
					 */
					size: () => LocalizedString
					/**
					 * Area
					 */
					area: () => LocalizedString
				}
			}
		}
		profiles: {
			meta: {
				/**
				 * Profiles
				 */
				title: () => LocalizedString
			}
			navigation: {
				/**
				 * View profiles
				 */
				viewProfiles: () => LocalizedString
				/**
				 * New profile
				 */
				newProfile: () => LocalizedString
			}
			'new': {
				name: {
					/**
					 * Name
					 */
					label: () => LocalizedString
					/**
					 * Enter profile's name
					 */
					placeholder: () => LocalizedString
					/**
					 * Profile's name must not be empty.
					 */
					nonempty: () => LocalizedString
				}
				image: {
					/**
					 * Image
					 */
					label: () => LocalizedString
					/**
					 * Please upload an image for this profile.
					 */
					required: () => LocalizedString
				}
				/**
				 * Create profile
				 */
				submit: () => LocalizedString
				/**
				 * Profile has been created successfully.
				 */
				success: () => LocalizedString
			}
			table: {
				serial: {
					/**
					 * Serial
					 */
					header: () => LocalizedString
				}
				name: {
					/**
					 * Name
					 */
					header: () => LocalizedString
				}
				actions: {
					/**
					 * Actions
					 */
					header: () => LocalizedString
				}
			}
			edit: {
				id: {
					/**
					 * ID
					 */
					label: () => LocalizedString
				}
				name: {
					/**
					 * Name
					 */
					label: () => LocalizedString
					/**
					 * Enter profile's name
					 */
					placeholder: () => LocalizedString
					/**
					 * Profile's name must not be empty.
					 */
					nonempty: () => LocalizedString
				}
				image: {
					/**
					 * Image
					 */
					label: () => LocalizedString
				}
				/**
				 * Edit profile
				 */
				submit: () => LocalizedString
				/**
				 * Profile has been edited successfully.
				 */
				success: () => LocalizedString
			}
		}
	}
	signup: {
		/**
		 * Sign up for a camera dashboard
		 */
		header: () => LocalizedString
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
		confirmpassword: {
			/**
			 * Confirm password
			 */
			label: () => LocalizedString
			/**
			 * Enter your password again
			 */
			placeholder: () => LocalizedString
			/**
			 * Password and confirm password do not match
			 */
			equals: () => LocalizedString
		}
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
		/**
		 * Sign up
		 */
		signup: () => LocalizedString
		/**
		 * Already have an account?
		 */
		haveAccount: () => LocalizedString
		/**
		 * Log in
		 */
		login: () => LocalizedString
		/**
		 * Please check your mail
		 */
		success: () => LocalizedString
		/**
		 * Back
		 */
		back: () => LocalizedString
		verifyMail: {
			/**
			 * You have successfully confirmed your account
			 */
			success: () => LocalizedString
			error: {
				/**
				 * Your email is not verified
				 */
				userNotFound: () => LocalizedString
				/**
				 * Account aldready verify
				 */
				alreadyAccount: () => LocalizedString
				/**
				 * Email verification failed
				 */
				updateFailure: () => LocalizedString
			}
			/**
			 * [Camera Dashboard] Please verify your email address.
			 */
			subject: () => LocalizedString
			/**
			 * <p>It's almost done! To complete your camera dashboard signup, we just need to verify your email: 
							<a href="mailto:{email}">{email}</a>
						</p>
						<p>
							<a href="{url}">Verify email address</a>.
						</p>
			 */
			body: (arg: { email: string, url: string }) => LocalizedString
		}
	}
	camera: {
		/**
		 * Add camera
		 */
		addCamera: () => LocalizedString
		navigation: {
			/**
			 * View cameras
			 */
			viewCameras: () => LocalizedString
			/**
			 * Create camera
			 */
			newCamera: () => LocalizedString
		}
		table: {
			serial: {
				/**
				 * Serial
				 */
				header: () => LocalizedString
			}
			name: {
				/**
				 * Name
				 */
				header: () => LocalizedString
			}
			connection: {
				/**
				 * Connection
				 */
				header: () => LocalizedString
				/**
				 * Disconnected
				 */
				disconnected: () => LocalizedString
				/**
				 * Connected
				 */
				connected: () => LocalizedString
			}
			securityLevel: {
				/**
				 * Security Level
				 */
				header: () => LocalizedString
				/**
				 * Low
				 */
				low: () => LocalizedString
				/**
				 * Medium
				 */
				medium: () => LocalizedString
				/**
				 * High
				 */
				high: () => LocalizedString
			}
			actions: {
				/**
				 * Actions
				 */
				header: () => LocalizedString
			}
		}
		addForm: {
			name: {
				/**
				 * Camera name
				 */
				label: () => LocalizedString
				/**
				 * Enter camera name
				 */
				placeholder: () => LocalizedString
				/**
				 * Camera name must not be empty
				 */
				nonempty: () => LocalizedString
			}
			url: {
				/**
				 * URL
				 */
				label: () => LocalizedString
				/**
				 * Enter camera stream URL
				 */
				placeholder: () => LocalizedString
				/**
				 * URL is not valid
				 */
				url: () => LocalizedString
			}
			securityLevel: {
				/**
				 * Choose a security level:
				 */
				legend: () => LocalizedString
				low: {
					/**
					 * Low
					 */
					label: () => LocalizedString
				}
				medium: {
					/**
					 * Medium
					 */
					label: () => LocalizedString
				}
				high: {
					/**
					 * High
					 */
					label: () => LocalizedString
				}
				/**
				 * Please choose exactly one of security levels.
				 */
				required: () => LocalizedString
			}
			/**
			 * Add camera
			 */
			submit: () => LocalizedString
			/**
			 * Camera has been added successfully.
			 */
			success: () => LocalizedString
		}
		editForm: {
			serial: {
				/**
				 * Camera serial
				 */
				label: () => LocalizedString
			}
			name: {
				/**
				 * Camera name
				 */
				label: () => LocalizedString
				/**
				 * Enter camera name
				 */
				placeholder: () => LocalizedString
				/**
				 * Camera name must not be empty
				 */
				nonempty: () => LocalizedString
			}
			url: {
				/**
				 * URL
				 */
				label: () => LocalizedString
				/**
				 * Enter camera stream URL
				 */
				placeholder: () => LocalizedString
				/**
				 * URL is not valid
				 */
				url: () => LocalizedString
			}
			securityLevel: {
				/**
				 * Choose a security level:
				 */
				legend: () => LocalizedString
				low: {
					/**
					 * Low
					 */
					label: () => LocalizedString
				}
				medium: {
					/**
					 * Medium
					 */
					label: () => LocalizedString
				}
				high: {
					/**
					 * High
					 */
					label: () => LocalizedString
				}
				/**
				 * Please choose exactly one of security levels.
				 */
				required: () => LocalizedString
			}
			/**
			 * Edit camera
			 */
			submit: () => LocalizedString
			/**
			 * Camera has been edited successfully.
			 */
			success: () => LocalizedString
		}
	}
	statistic: {
		/**
		 * Statistic
		 */
		title: () => LocalizedString
	}
}

export type Formatters = {
	shortDate: (value: Date) => unknown
}
