function checkListingForm() {

  const type = v('l_type');
  const client = v('l_client');
  const city = v('l_city');
  const district = v('l_district');

  let valid =
    !!(type && client && city && district);

  if (type === 'offer') {
    valid = valid && !!n('l_price');
  } else {
    valid =
      valid &&
      !!n('l_budget_min') &&
      !!n('l_budget_max');
  }

  document.getElementById(
    'btn-save-listing'
  ).disabled = !valid;
}

function toggleListingFields() {

  const t = v('l_type');

  document.getElementById(
    'offerPriceGroup'
  ).style.display =
    t === 'offer'
      ? 'block'
      : 'none';

  document.getElementById(
    'requestBudgetGroup'
  ).style.display =
    t === 'request'
      ? 'grid'
      : 'none';
}

async function saveListing() {

  const type = v('l_type');

  const row = {
    type,
    client_id: v('l_client'),
    city: v('l_city'),
    district: v('l_district'),
    rooms: n('l_rooms') || null,
    area: n('l_area') || null
  };

  if (type === 'offer') {

    row.price = n('l_price');

  } else {

    row.budget_min = n('l_budget_min');
    row.budget_max = n('l_budget_max');

  }

  const { error } =
    await supabaseClient
      .from('listings')
      .insert([row]);

  if (error) {

    msg(
      'listings',
      error.message,
      false
    );

    return;
  }

  await loadData();

  document.getElementById('l_city').value = '';
  document.getElementById('l_district').value = '';

  msg(
    'listings',
    '✅ تم الحفظ'
  );
}

async function delListing(id) {

  if (!confirm('حذف؟')) return;

  await supabaseClient
    .from('listings')
    .delete()
    .eq('id', id);

  await loadData();
}
