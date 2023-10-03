import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

async function updateUser(email: string, newData: Record<string, any>) {
	try {
		const updatedUser = await prisma.user.update({
			where: {
				email: email,
			},
			data: {
				...newData,
				userPreference: {
					connect: {
						id: '986bd475-f9e9-4617-b781-4eebfbc1e5e8',
					},
				},
			},
		});

		console.log(updatedUser);
	} catch (error) {
		console.error('Error:', error);
	} finally {
		await prisma.$disconnect();
	}
}

// Example usage:
async function run() {
	try {
		const email = 'bethel@test.com';
		const newData = {
			name: 'Sevn',
			age: 22,
			role: 'ADMIN',
		};

		await updateUser(email, newData);
	} catch (error) {
		console.error('Error:', error);
	}
}

run();

// async function updatePreference() {
// 	const preference = await prisma.userPreference.create({
// 		data: {
// 			emailUpdates:true,
// 		}
// 	})

// }

async function listUsersWithoutPreferences() {
	try {
		const usersWithoutPreferences = await prisma.user.findMany({
			include: {
				userPreference: {
					where: {
						emailUpdates: false,
					},
				},
			},
		});

		console.log(usersWithoutPreferences);
	} catch (error) {
		console.error('Error:', error);
	} finally {
		await prisma.$disconnect();
	}
}

listUsersWithoutPreferences()
	.catch((e) => {
		console.error(e.message);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

async function deleteUserByEmail(email: string) {
	try {
		const deletedUser = await prisma.user.delete({
			where: {
				email: email, // Specify the email of the user to delete
			},
		});

		console.log('User deleted:', deletedUser);
	} catch (error) {
		console.error('Error:', error);
	} finally {
		await prisma.$disconnect();
	}
}

// Example usage:
async function deleteUser() {
	try {
		const emailToDelete = 'example@test.com'; // Replace with the email of the user to delete
		await deleteUserByEmail(emailToDelete);
	} catch (error) {
		console.error('Error:', error);
	}
}

deleteUser()
	.catch((e) => {
		console.error(e.message);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
