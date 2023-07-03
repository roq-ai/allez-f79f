import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { individualUserValidationSchema } from 'validationSchema/individual-users';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getIndividualUsers();
    case 'POST':
      return createIndividualUser();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getIndividualUsers() {
    const data = await prisma.individual_user
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'individual_user'));
    return res.status(200).json(data);
  }

  async function createIndividualUser() {
    await individualUserValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.individual_user.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
