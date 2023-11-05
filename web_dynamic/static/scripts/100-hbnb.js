$(document).ready(() => {
  let amenities = {};
  let states = {};
  let cities = {};

  $('input[type="checkbox"]').change(() => {
    let dataId = $(this).data('id');
    let dataName = $(this).data('name');
    if (this.checked) {
      if ($(this).hasClass('amenity')) {
        amenities[dataId] = dataName;
      } else if ($(this).hasClass('state')) {
        states[dataId] = dataName;
      } else if ($(this).hasClass('city')) {
        cities[dataId] = dataName;
      }
    } else {
      if ($(this).hasClass('amenity')) {
        delete amenities[dataId];
      } else if ($(this).hasClass('state')) {
        delete states[dataId];
      } else if ($(this).hasClass('city')) {
        delete cities[dataId];
      }
    }
    $('.amenities h4').text([...Object.values(amenities), ...Object.values(states), ...Object.values(cities)].join(', '));
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

  $('button').click(() => {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: Object.keys(amenities), states: Object.keys(states), cities: Object.keys(cities) }),
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        $('.places').empty();
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
});
