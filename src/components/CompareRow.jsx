import React from "react";
import $ from "jquery";

function CompareRow(props) {

    function playAd1() {

        var audio = document.getElementById("audio2");

        audio.setAttribute("src", props.oldUrl);
        audio.play();
    }

    function playAd2(event) {
        var buttons = document.getElementsByClassName("new-ad-btn");

        var audio = document.getElementById("audio2");
        audio.setAttribute("src", props.newUrl);

        for(var i = 0; i< buttons.length; i++) {
            buttons[i].innerHTML = "Wait...";
            buttons[i].disabled = true;
        }
        
        audio.play();
        audio.addEventListener("loadeddata", (event) => {
            for(var i = 0; i< buttons.length; i++) {
                buttons[i].innerHTML = "Play new ad";
                buttons[i].disabled = false;
            }
        });
    }

    function stopAd1() {
        var audio = document.getElementById("audio2");
        audio.pause();
        
    }

    function stopAd2() {
        var buttons = document.getElementsByClassName("new-ad-btn");

        for(var i = 0; i< buttons.length; i++) {
            buttons[i].innerHTML = "Play new ad";
            buttons[i].disabled = false;
        }
        var audio = document.getElementById("audio2");
        audio.pause();
    }

    function submitAd() {
        var url = "http://access4.streamsink.com/PkDb.AdKontrol/PkDbAccessJS.ashx?op=TagSong&pksid=" + props.id + "&tagName=workingAd"
        $("#" + props.id).fadeOut(1000, function() {
            $.get(url);
        });
    }

    return <tr id={props.id}>
        <td>{props.number}</td>
        <td>{props.title}</td>
        <td>{props.duration}</td>
        <td>{props.date}</td>
        <td><button onClick={playAd1} className="btn table-button btn-primary">Play old ad</button></td>
        <td><button onClick={stopAd1} className="btn table-button btn-primary">Stop old ad</button></td>
        <td><button onClick={playAd2} className="btn table-button btn-secondary new-ad-btn">Play new ad</button></td>
        <td><button onClick={stopAd2} className="btn table-button btn-secondary">Stop new ad</button></td>
        <td><button onClick={submitAd} className="btn table-button btn-success">New Ad is OK</button></td>
    </tr>
}

export default CompareRow;