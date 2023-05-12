import { ApiResponder } from '~/lib/server/services/api-responder';
import type { RequestHandler } from './$types';
import httpStatus from 'http-status';
import { DbClient } from '~/lib/server/services/db-client';
import { ObjectId } from 'mongodb';
import { CameraConnection, CameraSecurityLevel } from '~/lib/models/dashboard';

export const GET = (async (e) => {
	try {
		// await DbClient.instance.collections.dashboards.updateOne(
		// 	{
		// 		_id: new ObjectId(e.params.id)
		// 	},
		// 	{
		// 		$set: {
		// 			areas: Array(10)
		// 				.fill(0)
		// 				.map((_, i) => {
		// 					const id = new ObjectId();
		// 					console.log(id);
		// 					return { _id: id, name: `Area ${i}`, activate: true };
		// 				})
		// 		}
		// 	}
		// );
		// await DbClient.instance.collections.dashboards.updateOne(
		// 	{
		// 		_id: new ObjectId(e.params.id),
		// 		'areas._id': new ObjectId(e.params.areaId)
		// 	},
		// 	{
		// 		$set: {
		// 			'areas.$.cameras': Array(10)
		// 				.fill(0)
		// 				.map((_, i) => ({
		// 					_id: new ObjectId(),
		// 					name: `Camera ${i}`,
		// 					url: 'https://freetestdata.com/wp-content/uploads/2022/02/Free_Test_Data_1MB_MP4.mp4',
		// 					connection: CameraConnection.Connected,
		// 					securityLevel: CameraSecurityLevel.Medium,
		// 					updatedAt: new Date()
		// 				}))
		// 		}
		// 	}
		// );
		const dashboard = await DbClient.instance.collections.dashboards.findOne(
			{
				_id: new ObjectId(e.params.id),
				'areas._id': new ObjectId(e.params.areaId)
			},
			{ projection: { _id: 0, areas: { 'cameras.$': 1 } } }
		);
		return ApiResponder.instance.data(
			{
				data:
					dashboard?.areas?.[0].cameras?.map((e) =>
						Object.assign(e, { _id: e._id.toHexString() })
					) || []
			},
			httpStatus.OK
		);
	} catch (e: any) {
		return ApiResponder.instance.error(
			{
				error: { code: 'EXCEPTION_ERROR', message: e.message || 'Exception' }
			},
			httpStatus.INTERNAL_SERVER_ERROR
		);
	}
}) satisfies RequestHandler;
