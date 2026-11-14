function checkDealForm() {

  document.getElementById(
    'btn-save-deal'
  ).disabled =
  !(v('d_listing') && n('d_amount'));
}

async function saveDeal() {

  const row = {
    listing_id: v('d_listing'),
    type: v('d_type'),
    amount: n('d_amount'),
    commission: n('d_commission'),
    date: new Date()
      .toISOString()
      .slice(0,10)
  };

  const { error } =
    await supabaseClient
      .from('deals')
      .insert([row]);

  if (error) {

    msg(
      'deals',
      error.message,
      false
    );

    return;
  }

  await loadData();

  msg(
    'deals',
    '✅ تم الحفظ'
  );
}

async function delDeal(id) {

  if (!confirm('حذف؟')) return;

  await supabaseClient
    .from('deals')
    .delete()
    .eq('id', id);

  await loadData();
}
