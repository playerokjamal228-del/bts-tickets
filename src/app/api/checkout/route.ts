import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { items, paymentMethod, totalAmount } = body

        // Simple validation
        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
        }

        // Determine Status
        const status = paymentMethod === 'CARD' ? 'PAID' : 'PENDING_PAYMENT'

        // Create Order with Transaction
        // Note: In a real app complexity we would check capacity here first.
        // For this MVP, we just create the order.

        const order = await prisma.order.create({
            data: {
                totalAmount,
                paymentMethod,
                status,
                items: {
                    create: items.map((item: any) => ({
                        ticketCategoryId: item.categoryId,
                        quantity: item.quantity
                    }))
                }
            }
        })

        return NextResponse.json({ success: true, orderId: order.id }, { status: 201 })

    } catch (error) {
        console.error('Checkout failed:', error)
        return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
    }
}
