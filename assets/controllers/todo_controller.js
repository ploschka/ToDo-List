import { Controller } from '@hotwired/stimulus';

export default class extends Controller
{
    static targets = ['text'];


    delete( {params: {id}} )
    {
        var me = this;
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", "del", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
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