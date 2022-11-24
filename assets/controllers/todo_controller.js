import { Controller } from '@hotwired/stimulus';

export default class extends Controller
{
    static targets = ['text', 'red', 'green', 'textfield'];

    save( {params: {id}} )
    {
        var textfield = this.textfieldTarget;
        var green = this.greenTarget;;
        var red = this.redTarget;
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "upd", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200)
            {
                var response = this.responseText;
                var status = JSON.parse(response);
                if (status.done)
                {
                    var d = document.createElement('div');
                    d.setAttribute('class', 'todo_text');
                    d.setAttribute('data-todo-target', 'text');
                    d.textContent = textfield.value;
                    textfield.parentNode.replaceChild(d, textfield)

                    green.textContent = 'Изменить';
                    green.setAttribute('data-action', 'todo#update');
                    red.textContent = 'Удалить';
                    red.setAttribute('data-action', 'todo#delete');
                }
            }
        };
        xhttp.send(JSON.stringify({ i: id, text: textfield.value }));
    }

    cancel( {params: {txt}} )
    {
        var d = document.createElement('div');
        d.setAttribute('class', 'todo_text');
        d.setAttribute('data-todo-target', 'text');
        d.textContent = txt;
        this.textfieldTarget.parentNode.replaceChild(d, this.textfieldTarget)

        this.greenTarget.textContent = 'Изменить';
        this.greenTarget.setAttribute('data-action', 'todo#update');
        this.redTarget.textContent = 'Удалить';
        this.redTarget.setAttribute('data-action', 'todo#delete');
    }

    update( {params: {txt}} )
    {
        var d = document.createElement('input');
        d.setAttribute('type', 'text');
        d.setAttribute('value', txt);
        d.setAttribute('data-todo-target', 'textfield');
        d.setAttribute('class', 'textfield');
        this.textTarget.parentNode.replaceChild(d, this.textTarget);

        this.greenTarget.textContent = 'Сохранить';
        this.greenTarget.setAttribute('data-action', 'todo#save');
        this.redTarget.textContent = 'Отменить';
        this.redTarget.setAttribute('data-action', 'todo#cancel');
    }

    delete( {params: {id}} )
    {
        var me = this;
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", "del", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200)
            {
                var response = this.responseText;
                var status = JSON.parse(response);
                if (status.done)
                {
                    me.element.remove();
                }
            }
        };
        xhttp.send(id);
    }
}