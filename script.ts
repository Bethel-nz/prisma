import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query'] });

async function main() {
	const user = await prisma.user.findUnique({
		where: {
			email: 'bethel@test.com',
		},
		include: {
			userPreference: {
				select: {
					emailUpdates: true,
				},
			},
		},
	});
	console.log(user);
}
main()
	.catch((e) => {
		console.error(e.message);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

async function findUserByName(name: string) {
	const user = await prisma.user.findFirst({
		where: {
			name: { equals: name },
		},
		include: {
			userPreference: {
				select: {
					emailUpdates: true,
				},
			},
		},
	});
	return console.log(user);
}

findUserByName('Sally');
