$(document).ready(() => {
  let amenities = {};
	
  $('input[type="checkbox"]').change( function () {
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
});
