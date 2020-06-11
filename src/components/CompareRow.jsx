import React from "react";
import $ from "jquery";

function CompareRow(props) {

    function playAd1() {
        let audio = new Audio(props.oldUrl);
        document.getElementById("root").append(audio);
        audio.setAttribute("id", props.oldUrl);
        audio.play();

        audio.addEventListener("ended", function() {
            audio.remove();
        })
    }

    function playAd2() {
        let audio = new Audio(props.newUrl);
        document.getElementById("root").append(audio);
        audio.setAttribute("id", props.newUrl);
        audio.play();

        audio.addEventListener("ended", function() {
            audio.remove();
        })
    }

    function stopAd1() {
        var audio = document.getElementById(props.oldUrl);
        audio.pause();
        audio.remove();
        
    }

    function stopAd2() {
        var audio = document.getElementById(props.newUrl);
        audio.pause();
        audio.remove();
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
        <td><button onClick={playAd2} className="btn table-button btn-secondary">Play new ad</button></td>
        <td><button onClick={stopAd2} className="btn table-button btn-secondary">Stop new ad</button></td>
        <td><button onClick={submitAd} className="btn table-button btn-success">New Ad is OK</button></td>
    </tr>
}

export default CompareRow;