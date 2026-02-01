import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Tour schedule
const events = [
  { country: 'Belgium', city: 'Brussels', stadium: 'King Baudouin Stadium', dates: ['2026-07-01', '2026-07-02'] },
  { country: 'UK', city: 'London', stadium: 'Wembley Stadium', dates: ['2026-07-06', '2026-07-07'] },
  { country: 'Germany', city: 'Berlin', stadium: 'Olympiastadion', dates: ['2026-07-11', '2026-07-12'] },
  { country: 'France', city: 'Paris', stadium: 'Stade de France', dates: ['2026-07-17', '2026-07-18'] },
  { country: 'Spain', city: 'Barcelona', stadium: 'Estadi Olímpic', dates: ['2026-07-26', '2026-07-27'] },
]

// Test sectors
const sectorsData = [
  { name: 'Pitch Standing', capacity: 1000, price: 150 },
  { name: 'Level 1', capacity: 500, price: 120 },
  { name: 'Oberrang', capacity: 300, price: 80 },
]

async function main() {
  console.log('Start seeding ...')

  // Clear existing data (optional, careful in prod)
  // await prisma.orderItem.deleteMany()
  // await prisma.order.deleteMany()
  // await prisma.ticketCategory.deleteMany()
  // await prisma.sector.deleteMany()
  // await prisma.event.deleteMany()

  for (const loc of events) {
    for (const dateStr of loc.dates) {
      const date = new Date(`${dateStr}T19:00:00Z`)
      
      const event = await prisma.event.create({
        data: {
          country: loc.country,
          city: loc.city,
          stadium: loc.stadium,
          date: date,
        },
      })
      console.log(`Created event: ${loc.city} on ${dateStr}`)

      for (const sect of sectorsData) {
        // Create Sector
        const sector = await prisma.sector.create({
          data: {
            name: sect.name,
            capacity: sect.capacity,
            eventId: event.id,
          },
        })

        // Create TicketCategory for this Sector
        await prisma.ticketCategory.create({
          data: {
            name: sect.name, // Using sector name as category name for simplicity
            price: sect.price,
            sectorId: sector.id,
          },
        })
      }
    }
  }
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
