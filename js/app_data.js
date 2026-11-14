async function loadData() {
  const { data: c } =
    await supabaseClient
      .from('clients')
      .select('*')
      .order('id');

  const { data: l } =
    await supabaseClient
      .from('listings')
      .select('*')
      .order('id');

  const { data: d } =
    await supabaseClient
      .from('deals')
      .select('*')
      .order('id');

  DB.clients = c || [];
  DB.listings = l || [];
  DB.deals = d || [];

  renderAll();
  refreshSelects();
  updateDashboard();
}

function renderAll() {

}

function refreshSelects() {

}

function updateDashboard() {

}

function exportExcel() {
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(DB.clients),
    'العملاء'
  );

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(DB.listings),
    'العروض_والطلبات'
  );

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(DB.deals),
    'الصفقات'
  );

  XLSX.writeFile(
    wb,
    'النظام_العقاري.xlsx'
  );
}

window.addEventListener(
  'load',
  async () => {

    await loadData();

    await loadRegions();

  }
);
