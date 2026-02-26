import type { Product } from '../data/products';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class CartSystem {
    // $state envuelve nuestro arreglo. Svelte reaccionará a cualquier mutación aquí.
    items = $state<CartItem[]>([]);

    // $derived se recalcula automáticamente SOLO cuando "items" cambia.
    totalPrice = $derived(
        this.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    );

    totalItems = $derived(
        this.items.reduce((total, item) => total + item.quantity, 0)
    );

    // Métodos puros de negocio
    addItem(product: Product, quantity: number) {
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            // Mutar la propiedad directamente disparará la reactividad en la UI.
            existingItem.quantity += quantity;
        } else {
            this.items.push({ ...product, quantity });
        }
    }

    removeItem(productId: string) {
        this.items = this.items.filter(item => item.id !== productId);
    }

    clearCart() {
        this.items = [];
    }
}

// Exportamos una única instancia (Singleton) para que toda la app comparta el mismo carrito.
export const cart = new CartSystem();