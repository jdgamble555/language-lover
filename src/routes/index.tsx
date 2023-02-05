import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="bg-indigo-100">index<input class="read-only:bg-gray-100 ..." /></div>
  );
});

export const head: DocumentHead = {
  title: 'Language Lover',
  meta: [
    {
      name: 'description',
      content: 'A site about language learning and language learning resources!',
    },
  ],
};
