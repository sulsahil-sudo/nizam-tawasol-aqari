const SUPABASE_URL =
'https://jlvtkghpbdssrjyeeeim.supabase.co';

const SUPABASE_KEY =
'ضع المفتاح الحالي هنا';

const supabaseClient =
window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

let DB = {
  clients: [],
  listings: [],
  deals: []
};
