function newItem() {

    let li = $('<li></li>');
    let inputValue = $('#input').val();
    li.append(inputValue);

    if (inputValue === '') {
        alert("Please ");
    } else {
        $('#list').append(li);
    }

    function crossOut() {
        li.toggleClass("strike");
    }

    li.on("dblclick", function crossOut() {
        li.toggleClass("strike");
    });

    let crossOutButton = $('<crossOutButton></crossOutButton>');
    crossOutButton.append(document.createTextNode('X'));
    li.append(crossOutButton);

    crossOutButton.on("click", deleteListItem);
    function deleteListItem() {
        li.addClass("delete");
    }
    $('#list').sortable();

    $('input').val('');
}

$(document).ready(function () {
    $('form[name="toDoList"]').submit(function (e) {
        e.preventDefault();
        newItem();
    })
})

function saveList() {
    let text = '';
    $('#list li').each(function (index) {
        let itemText = (index + 1) + ". ";
        if ($(this).hasClass('strike')) {
            itemText += "[DONE]";
        }
        itemText += $(this).clone().children().remove().end().text().trim();
        text += itemText + '\n';
    });

    let blob = new Blob([text], { type: 'text/plain;charset=uft-8' });
    let link = document.createElement('a');
    let url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'todo-list.txt';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}