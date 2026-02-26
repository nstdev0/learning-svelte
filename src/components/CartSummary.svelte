<script lang="ts">
    import { cart } from "../domain/cart.svelte";

    const handleRemoveItem = (itemId: string) => {
        cart.removeItem(itemId);
    };
    const handleClearCart = () => {
        cart.clearCart();
    };
    const handleCheckout = () => {
        const orderDetails = cart.items.map((item) => {
            return `${item.name} x${item.quantity} - $${item.price * item.quantity}`;
        });
        alert(
            `Pedido confirmado:\n\n - ${orderDetails.join("\n - ")}\n\nTotal: $${cart.totalPrice.toFixed(2)}`,
        );
        cart.clearCart();
    };
</script>

<div class="cart-sidebar">
    <h2>Pedido actual</h2>
    <p>Artículos: {cart.totalItems}</p>

    <div class="items-list">
        {#each cart.items as item (item.id)}
            <div class="cart-item">
                <span>{item.quantity}x {item.name}</span>
                <span>$ {(item.price * item.quantity).toFixed(2)}</span>
                <button
                    class="btn-remove"
                    onclick={() => handleRemoveItem(item.id)}
                >
                    X
                </button>
            </div>
        {:else}
            <p class="empty-msg">El carrito está vacío.</p>
        {/each}
    </div>
    {#if cart.items.length > 0}
        <button class="clear-cart-btn" onclick={handleClearCart}
            >Limpiar carrito</button
        >
    {/if}

    <div class="total-section">
        <h3>Total: $ {cart.totalPrice.toFixed(2)}</h3>
        <button
            class="btn-checkout"
            disabled={cart.items.length === 0}
            onclick={handleCheckout}
        >
            Confirmar Pedido
        </button>
    </div>
</div>

<style>
    .cart-sidebar {
        background: #676767;
        padding: 1.5rem;
        height: 100%;
        border-left: 1px solid #e5e7eb;
    }
    .cart-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        align-items: center;
    }
    .btn-remove {
        background: #ef4444;
        color: white;
        border: none;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
    .total-section {
        margin-top: 2rem;
        border-top: 2px solid #e5e7eb;
        padding-top: 1rem;
    }
    .btn-checkout {
        width: 100%;
        padding: 1rem;
        background: #16a34a;
        color: white;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 8px;
    }
    .btn-checkout:disabled {
        background: #9ca3af;
        cursor: not-allowed;
    }
    .clear-cart-btn {
        width: 110px;
        height: 30px;
        background: #ef4444;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 8px;
        margin-top: 20px;
        display: block;
        margin-left: auto;
    }
</style>
