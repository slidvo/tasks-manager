import  {PrismaClient}  from '../../../generated/prisma/client'
import { randomUUID } from 'crypto'
import { PrismaPg } from '@prisma/adapter-pg';
 
const prisma = new PrismaClient({
  adapter:new PrismaPg({ connectionString: process.env.DATABASE_URL_API })
});

async function main() {
  const users = await prisma.user.findMany({ where: { uuid: null } })
  
  for (const user of users) {
    console.log(`user: ${JSON.stringify(user)}`)
    await prisma.user.update({
      where: { id: user.id },
      data: { uuid: randomUUID() }
    })
  }
  console.log(`Заполнены UUID для ${users.length} пользователей`)
}

main()
  .catch(console.error)
  .finally(() => {
    prisma.$disconnect()
    console.log(`Prisma ORM disconnected`)
  })