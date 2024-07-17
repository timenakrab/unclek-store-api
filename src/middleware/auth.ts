import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface IUserPayload {
	userId: string;
	role: string;
}

declare global {
	namespace Express {
		interface Request {
			user?: IUserPayload;
		}
	}
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
	const token = req.header('Authorization')?.replace('Bearer ', '');

	if (!token) {
		return res.status(401).json({ message: 'No token, authorization denied' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUserPayload;
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Token is not valid' });
	}
};

export const checkRole = (roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		if (!roles.includes(req.user.role)) {
			return res.status(403).json({ message: 'Forbidden' });
		}

		next();
	};
};
