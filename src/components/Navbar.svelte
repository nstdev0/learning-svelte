<script lang="ts">
    import { Link } from "svelte-routing";
</script>

<nav>
    <Link to="/">Inicio</Link>
    <Link to="/weather">Weather</Link>
    <Link to="/soon">Soon</Link>
</nav>

<style>
    nav {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 2rem;
        padding: 1rem;
        border-bottom: 1px solid #ccc;
        color: #3b82f6;
        font-weight: 800;
    }
</style>
