import httpStatus from 'http-status';
import { DbClient } from '~/lib/server/services/db-client.js';
import { ApiResponder } from '~/lib/server/services/api-responder';
import { ObjectId } from 'mongodb';

export const POST = async (e: any) => {
	const formData = await e.request.formData();
	const name = formData.get('name');
	const activate = formData.get('activate');
	const id = formData.get('id');
	let boolean: boolean;
	if ((activate as string) === 'true') {
		boolean = true;
	} else {
		boolean = false;
	}
	console.log(formData);
	if (!name) {
		return ApiResponder.instance.error(
			{
				error: {
					code: 'MISSING_DATA_ERROR',
					message: 'Missing required data'
				}
			},
			httpStatus.UNAUTHORIZED
		);
	}
	const find = await DbClient.instance.collections.dashboards.findOne(
		{
			_id: new ObjectId(id),
			'areas.name': name
		},
		{
			limit: 1
		}
	);
	console.log(find);
	if (find) {
		return ApiResponder.instance.error(
			{
				error: {
					code: httpStatus[409],
					message: 'Name is existed'
				}
			},
			httpStatus.CONFLICT
		);
	}
	const update = await DbClient.instance.collections.dashboards.updateOne(
		{
			_id: new ObjectId(id)
		},
		{
			$push: {
				areas: {
					_id: new ObjectId(),
					name: name,
					activate: boolean
				}
			}
		}
	);
	return ApiResponder.instance.data({ data: 'ok' }, httpStatus.OK);
};

export const PUT = async (e: any) => {
	const formData = await e.request.formData();
	const activate = formData.get('activate');
	const id = formData.get('id');
	const idA = formData.get('idA');
	const update = await DbClient.instance.collections.dashboards.updateOne(
		{
			_id: new ObjectId(id),
			'areas._id': new ObjectId(idA)
		},
		{
			$set: {
				'areas.$.activate': activate !== 'true'
			}
		}
	);
	return ApiResponder.instance.data({ data: 'ok' }, httpStatus.OK);
};
