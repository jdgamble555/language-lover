import { component$, Slot } from '@builder.io/qwik';
import Footer from '~/components/layout/footer/footer';
import Nav from '~/components/layout/nav/nav';
import Header from '~/components/layout/header/header';
import Aside from '~/components/layout/aside/aside';

export default component$(() => {
  return (
    <div class="min-h-screen flex flex-col">
      <header>
        <Header />
      </header>
      <main class="flex-1 flex flex-col sm:flex-row">
        <article class="flex-1">
          <Slot />
        </article>
        <nav class="order-first sm:w-32">
          <Nav />
        </nav>
        <aside class="sm:w-32">
          <Aside />
        </aside>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
});
