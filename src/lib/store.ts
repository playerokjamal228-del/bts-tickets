import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
    sectorId: string
    categoryId: string
    name: string // e.g. "Oberrang 334 - VIP Standing"
    price: number
    quantity: number
    eventName: string
    date: string
}

interface CartState {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (categoryId: string) => void
    updateQuantity: (categoryId: string, quantity: number) => void
    clearCart: () => void
    totalAmount: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const { items } = get()
                const existing = items.find((i) => i.categoryId === item.categoryId)
                if (existing) {
                    set({
                        items: items.map((i) =>
                            i.categoryId === item.categoryId
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i
                        ),
                    })
                } else {
                    set({ items: [...items, item] })
                }
            },
            removeItem: (categoryId) => {
                set({ items: get().items.filter((i) => i.categoryId !== categoryId) })
            },
            updateQuantity: (categoryId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(categoryId)
                    return
                }
                set({
                    items: get().items.map((i) =>
                        i.categoryId === categoryId ? { ...i, quantity } : i
                    ),
                })
            },
            clearCart: () => set({ items: [] }),
            totalAmount: () => {
                return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0)
            },
        }),
        {
            name: 'bts-cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
