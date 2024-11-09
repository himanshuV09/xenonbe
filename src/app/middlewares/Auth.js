import { verifyToken } from '../../utils/jwt.js';

const AppRole = ['Admin'];
export const isAuth =
	(...roles) =>
	async (req, res, next) => {
		try{
			console.log(roles);
			const token = req.headers['authorization']?.split('Bearer ')[1];
			console.log(token)
			if (token) console.log(token);
			else return res.status(401).json('token not found');

			const user = await verifyToken(token);

			if (!user) res.status(401).json('invaild token');
			req.user = { id: user.id, role: user?.role };

			next();
		}
		catch(err){
			console.log(err);
		}
	};
