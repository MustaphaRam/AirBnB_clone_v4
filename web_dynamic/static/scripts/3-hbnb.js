$(document).ready(() => {
  let amenities = {};

  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).prop('checked')) {
      delete amenities[$(this).attr('data-id')];
    }
    if (Object.keys(amenities).length === 0) {
      $('div.amenities h4').html('&nbsp');
    } else {
      $('div.amenities h4').text(Object.values(amenities).join(', '));
      if ( $('div.amenities h4').text().length > 30 ) {
        $('div.amenities h4').text($('div.amenities h4').text().slice(0, 30) + '...');
      }
    }
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', (data, textStatus) => {
    if (textStatus === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: (data) => {
      for (let i = 0; i < data.length; i++) {
        $('.places').append(`
          <article>
            <div class="title_box">
              <h2>${data[i].name}</h2>
              <div class="price_by_night">${data[i].price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${data[i].max_guest} Guest(s)</div>
              <div class="number_rooms">${data[i].number_rooms} Bedroom(s)</div>
              <div class="number_bathrooms">${data[i].number_bathrooms} Bathroom(s)</div>
            </div>
            <div class="description">
              ${data[i].description}
            </div>
          </article>
        `);
      }
    }
  });
});
