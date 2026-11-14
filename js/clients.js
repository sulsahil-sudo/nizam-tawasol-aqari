function checkClientForm() {
  const name = v('c_name');
  const phone = v('c_phone');
  const city = v('c_city');
  const gender = v('c_gender');

  const validPhone =
    phone === '1111111111' ||
    (phone.length === 10 &&
     phone.startsWith('05'));

  document.getElementById(
    'btn-save-client'
  ).disabled =
  !(name && validPhone && city && gender);
}

function openClientModal() {
  document.getElementById(
    'clientModal'
  ).style.display = 'flex';
}

function closeClientModal() {
  document.getElementById(
    'clientModal'
  ).style.display = 'none';
}

async function saveNewClient() {
  const name =
    document.getElementById(
      'new_c_name'
    ).value.trim();

  const gender =
    document.getElementById(
      'new_c_gender'
    ).value;

  if (!name || !gender) {
    alert('اكتب الاسم واختر الجنس');
    return;
  }

  const row = {
    name,
    phone:
      document.getElementById(
        'new_c_phone'
      ).value.trim(),

    city:
      document.getElementById(
        'new_c_city'
      ).value.trim(),

    gender
  };

  const { error } =
    await supabaseClient
      .from('clients')
      .insert([row]);

  if (error) {
    alert(error.message);
    return;
  }

  await loadData();
  closeClientModal();
}

async function saveClient() {

  const row = {
    name: v('c_name'),
    phone: v('c_phone') || '1111111111',
    email: v('c_email'),
    city: v('c_city'),
    gender: v('c_gender')
  };

  const { error } =
    await supabaseClient
      .from('clients')
      .insert([row]);

  if (error) {
    msg(
      'clients',
      error.message,
      false
    );
    return;
  }

  await loadData();

  msg('clients', '✅ تم الحفظ');
}

async function delClient(id) {

  if (!confirm('حذف؟')) return;

  await supabaseClient
    .from('clients')
    .delete()
    .eq('id', id);

  await loadData();
}
