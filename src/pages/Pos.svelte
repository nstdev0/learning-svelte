<script lang="ts">
    import { MENU } from "../data/products";
    import ProductCard from "../components/ProductCard.svelte";
    import CartSummary from "../components/CartSummary.svelte";
</script>

<main class="layout">
    <section class="menu-section">
        <header>
            <h1>Burgers</h1>
            <p>Punto de Venta</p>
        </header>

        <div class="product-grid">
            {#each MENU as product (product.id)}
                <ProductCard {product} />
            {/each}
        </div>
    </section>

    <aside class="cart-section">
        <CartSummary />
    </aside>
</main>

<style>
    :global(body) {
        margin: 0;
        font-family: system-ui, sans-serif;
    }

    .layout {
        display: grid;
        grid-template-columns: 2fr 1fr;
        height: 100vh;
    }

    .menu-section {
        padding: 2rem;
        overflow-y: auto;
    }
    .cart-section {
        height: 100vh;
        position: sticky;
        top: 0;
    }

    .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
    }
</style>
