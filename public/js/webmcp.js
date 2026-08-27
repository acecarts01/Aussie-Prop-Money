(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: 'browse_products',
        description: 'Browse Australian prop money by category',
        inputSchema: { type: 'object', properties: { category: { type: 'string', description: 'Category slug to browse' } } },
        execute: async ({ category }) => {
          const url = category ? 'https://thereservenote.com/shop/' + category + '/' : 'https://thereservenote.com/shop/';
          window.location.href = url;
          return { url };
        }
      },
      {
        name: 'get_wholesale_info',
        description: 'Get wholesale/bulk pricing info for productions',
        inputSchema: { type: 'object', properties: {} },
        execute: async () => { window.location.href = 'https://thereservenote.com/wholesale/'; return { url: 'https://thereservenote.com/wholesale/' }; }
      },
      {
        name: 'contact',
        description: 'Contact for product questions or orders',
        inputSchema: { type: 'object', properties: {} },
        execute: async () => { window.location.href = 'https://thereservenote.com/contact/'; return { url: 'https://thereservenote.com/contact/' }; }
      }
    ]
  });
})();
