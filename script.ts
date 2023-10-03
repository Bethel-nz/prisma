import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query'] });

async function main() {
	await prisma.user.deleteMany();
	const user = await prisma.user.create({
		data: {
			name: 'Bethel',
			email: 'bethel@test.com',
			age: 21,
			userPreference: {
				create: {
					emailUpdates: true,
				},
			},
		},
		include: {
			userPreference: true,
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
