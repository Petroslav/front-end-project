$( "h1" ).on('click', function() {
    alert( "Handler for .click() called." );
});

$( "p" ).click(function() {
  $( this ).slideUp();
});

$('#search-btn').on('click', function(){
    $this = $('search-form');
    $this.submit();
});