<script lang="ts">
  import Navbar from "./components/Navbar.svelte";
  import { Router, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";

  const loadWeather = () => import("./pages/Weather.svelte");
</script>

<Router basepath="/">
  <main class="main">
    <Navbar />
    <Route path="/">
      <Home />
    </Route>
    <Route path="/weather">
      {#await loadWeather()}
        <p>Loading...</p>
      {:then module}
        <svelte:component this={module.default} />
      {:catch error}
        <p>Error al cargar la página: {error.message}</p>
      {/await}
    </Route>
    <Route path="*">
      <h2>404 - Página no encontrada</h2>
    </Route>
  </main>
</Router>

<style>
  .main {
    height: 100vh;
    margin: 0 auto;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
</style>
