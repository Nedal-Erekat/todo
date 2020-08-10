'use strict';
console.log('here we are >>> ');
$(function () {
    let task=$('.task');
    if(!task.length){
        $('table').remove();
        let davEl=$("<p></p>").text('There is not anything to display...')
        $('body').append(davEl);
    }

    $('#list').change(function() {
        let name=$(this).val();
        if (name==='all') {
            location.reload();
           console.log('location');
        }
        $('#formList').submit();
        //hide the r
    })
})