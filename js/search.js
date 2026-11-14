function doSearch() {

  const q =
    v('searchInput').toLowerCase();

  const scope =
    v('searchScope');

  const box =
    document.getElementById(
      'searchResults'
    );

  if (!q) {
    box.innerHTML =
      '<div class="empty">اكتب كلمة للبحث</div>';
    return;
  }

  let html = '';
  let total = 0;

  const clients =
    DB.clients.filter(c =>
      Object.values(c).some(v =>
        String(v)
          .toLowerCase()
          .includes(q)
      )
    );

  const listings =
    DB.listings.filter(l =>
      Object.values(l).some(v =>
        String(v)
          .toLowerCase()
          .includes(q)
      )
    );

  const deals =
    DB.deals.filter(d =>
      Object.values(d).some(v =>
        String(v)
          .toLowerCase()
          .includes(q)
      )
    );

  total =
    clients.length +
    listings.length +
    deals.length;

  box.innerHTML =
    total
      ? `✅ ${total} نتيجة`
      : 'لا توجد نتائج';
}
