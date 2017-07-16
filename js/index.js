$(function () {
  const $friends = $('#friends');
  const $name = $('#name');
  const $age = $('#age');

  const friendTemplate = $('#friend-template').html();

  function addFriend(friend) {
    $friends.append(Mustache.render(friendTemplate, friend));
  }


  $.ajax({
    type: 'GET',
    url: 'http://rest.learncode.academy/api/johnbob/friends',
    success: function (friends) {
      $.each(friends, function (i, friend) {
        addFriend(friend);
      })
    },
    error: function () {
      alert('Error loading friends');
    }
  });


  $('#add-friend').on('click', function () {
    const friend = {
      name: $name.val(),
      age: $age.val(),
    };

    $.ajax({
      type: 'POST',
      url: 'http://rest.learncode.academy/api/johnbob/friends',
      data: friend,
      success: function (newFriend) {
        addFriend(newFriend);
      },
      error: function () {
        alert('Error saving friend');
      }
    });
  });


  $friends.on('click', '.remove', function () {
    const $li = $(this).closest('li');

    $.ajax({
      type: 'DELETE',
      url: `http://rest.learncode.academy/api/johnbob/friends/${$(this).attr('data-id')}`,
      success: function () {
        $li.fadeOut(300, function () {
          $(this).remove();
        });
      }
    });
  });


  $friends.on('click', '.editFriend', function () {
    const $li = $(this).closest('li');
    $li.find('input.name').val($li.find('span.name').html());
    $li.find('input.age').val($li.find('span.age').html());
    $li.addClass('edit');
  });


  $friends.on('click', '.cancelEdit', function () {
    $(this).closest('li').removeClass('edit');
  });


  $friends.on('click', '.saveEdit', function () {
    const $li = $(this).closest('li');
    const friend = {
      name: $li.find('input.name').val(),
      age: $li.find('input.age').val(),
    };

    $.ajax({
      type: 'PUT',
      url: `http://rest.learncode.academy/api/johnbob/friends/${$li.attr('data-id')}`,
      data: friend,
      success: function () {
        $li.find('span.name').html(friend.name);
        $li.find('span.age').html(friend.age);
        $li.removeClass('edit');
      },
      error: function () {
        alert('Error updating friend');
      }
    });
  });
});