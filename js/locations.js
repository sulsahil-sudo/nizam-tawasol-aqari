let locationsData = [];

async function loadRegions() {

  const { data } = await supabaseClient
    .from('locations')
    .select('*');

  locationsData = data || [];

  const regions =
    [...new Set(
      locationsData.map(x => x.region)
    )];

  const clientRegion =
    document.getElementById('c_region');

  const listingRegion =
    document.getElementById('l_region');

  if (clientRegion) {

    clientRegion.innerHTML =
      '<option value="">اختر المنطقة</option>';

    regions.forEach(region => {

      clientRegion.innerHTML +=
        `<option value="${region}">
          ${region}
        </option>`;

    });
  }

  if (listingRegion) {

    listingRegion.innerHTML =
      '<option value="">اختر المنطقة</option>';

    regions.forEach(region => {

      listingRegion.innerHTML +=
        `<option value="${region}">
          ${region}
        </option>`;

    });
  }
}

function loadClientCities() {

  const region =
    document.getElementById('c_region').value;

  const citySelect =
    document.getElementById('c_city');

  citySelect.innerHTML =
    '<option value="">اختر المدينة</option>';

  const cities =
    [...new Set(
      locationsData
        .filter(x => x.region === region)
        .map(x => x.city)
    )];

  cities.forEach(city => {

    citySelect.innerHTML +=
      `<option value="${city}">
        ${city}
      </option>`;

  });
}

function loadListingCities() {

  const region =
    document.getElementById('l_region').value;

  const citySelect =
    document.getElementById('l_city');

  citySelect.innerHTML =
    '<option value="">اختر المدينة</option>';

  const cities =
    [...new Set(
      locationsData
        .filter(x => x.region === region)
        .map(x => x.city)
    )];

  cities.forEach(city => {

    citySelect.innerHTML +=
      `<option value="${city}">
        ${city}
      </option>`;

  });
}

function loadListingDistricts() {

  const region =
    document.getElementById('l_region').value;

  const city =
    document.getElementById('l_city').value;

  const districtSelect =
    document.getElementById('l_district');

  districtSelect.innerHTML =
    '<option value="">اختر الحي</option>';

  const districts =
    locationsData.filter(
      x =>
        x.region === region &&
        x.city === city
    );

  districts.forEach(item => {

    districtSelect.innerHTML +=
      `<option value="${item.district}">
        ${item.district}
      </option>`;

  });
}
